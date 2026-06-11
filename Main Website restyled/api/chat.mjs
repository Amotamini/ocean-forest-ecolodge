import { anthropic } from '@ai-sdk/anthropic';
import { generateObject } from 'ai';
import { z } from 'zod';
import { retrieveRelevantChunks, buildContextBlock } from '../lib/retrieve.mjs';

export const config = {
  runtime: 'nodejs',
  maxDuration: 30,
};

const enquirySchema = z.object({
  enquiryType: z.enum(['stay', 'retreat', 'group', 'press', 'other']).nullable(),
  arrivalMonth: z.string().nullable().describe('YYYY-MM format when known'),
  guestCount: z.number().int().min(1).max(30).nullable(),
  suggestedRoomOrProgram: z.string().nullable(),
  summary: z.string().nullable().describe('Polished enquiry summary for the contact form'),
});

const responseSchema = z.object({
  reply: z.string().describe('Teresa reply to the guest, in the same language they used'),
  enquiry: enquirySchema,
  readyForHandoff: z.boolean().describe('True when enough info collected to pre-fill enquiry form'),
});

const SYSTEM_PROMPT = `You are Teresa, the warm digital host at Ocean Forest Ecolodge on San Josecito Beach, Drake Bay, Osa Peninsula, Costa Rica.

PERSONALITY:
- Warm, personal, unhurried — like a real lodge host, not a corporate bot
- Introduce yourself as Teresa, your digital host at Ocean Forest (AI-assisted)
- Reply in the SAME language the guest uses (English, Spanish, French, etc.)
- Keep answers clear and precise — 2–4 short paragraphs max unless they ask for detail
- Gently guide toward booking once their questions are answered

STRICT KNOWLEDGE RULES (never break these):
- Answer ONLY using facts from the KNOWLEDGE CONTEXT below
- NEVER invent rates, prices, availability, retreat dates, or policies not in context
- If information is missing, say honestly: "I don't have that detail — our team will confirm by email within 24 hours"
- For rates: always say they are on request; offer to help complete an enquiry
- Never claim rooms are available on specific dates

BOOKING FLOW:
- Learn over the conversation: stay vs retreat vs group buyout, rough dates, guest count, interests
- Suggest a room (Garden Bungalow, Ocean Cabin, Lapa Family Suite) or retreat type when appropriate
- Update the enquiry object each turn — merge with previous enquiry state provided
- Set readyForHandoff true when you have: enquiryType + (guestCount OR arrivalMonth) + a useful summary
- When readyForHandoff is true, invite them to tap "Complete your enquiry" to send a pre-filled form

CONTACT (only from context):
- visit@oceanforest.org · eli@oceanforest.org · WhatsApp +506 8737 9416`;

function mergeEnquiry(previous = {}, next = {}) {
  return {
    enquiryType: next.enquiryType ?? previous.enquiryType ?? null,
    arrivalMonth: next.arrivalMonth ?? previous.arrivalMonth ?? null,
    guestCount: next.guestCount ?? previous.guestCount ?? null,
    suggestedRoomOrProgram: next.suggestedRoomOrProgram ?? previous.suggestedRoomOrProgram ?? null,
    summary: next.summary ?? previous.summary ?? null,
  };
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({
      error: 'Concierge not configured',
      reply: "I'm sorry — I'm not fully set up yet. Please write to us at visit@oceanforest.org or WhatsApp +506 8737 9416.",
    });
  }

  try {
    const { messages = [], enquiry: previousEnquiry = {} } = req.body ?? {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages required' });
    }

    const retrievalQuery = messages
      .slice(-6)
      .map((m) => m.content)
      .join(' ');

    const chunks = retrieveRelevantChunks(retrievalQuery, 10);
    const context = buildContextBlock(chunks);

    const contextMessage = {
      role: 'system',
      content: `${SYSTEM_PROMPT}

KNOWLEDGE CONTEXT:
${context}

PREVIOUS ENQUIRY STATE (merge and update):
${JSON.stringify(previousEnquiry, null, 2)}`,
    };

    const chatMessages = messages.filter((m) => m.role === 'user' || m.role === 'assistant');

    const { object } = await generateObject({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5'),
      schema: responseSchema,
      messages: [contextMessage, ...chatMessages],
      temperature: 0.4,
    });

    const enquiry = mergeEnquiry(previousEnquiry, object.enquiry);

    const hasMinimum =
      enquiry.enquiryType &&
      (enquiry.guestCount || enquiry.arrivalMonth) &&
      enquiry.summary &&
      enquiry.summary.length > 20;

    return res.status(200).json({
      reply: object.reply,
      enquiry,
      readyForHandoff: object.readyForHandoff && hasMinimum,
    });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({
      error: 'Chat failed',
      reply: "I'm having a little trouble right now. Please write to visit@oceanforest.org — we reply within 24 hours.",
    });
  }
}
