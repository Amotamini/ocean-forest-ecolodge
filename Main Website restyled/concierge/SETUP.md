# Ocean Forest Concierge — Setup Guide

This guide walks you through launching Teresa, the AI concierge on your website.

## What you need

1. A free [Vercel](https://vercel.com) account
2. An [Anthropic](https://console.anthropic.com) API key
3. About 15 minutes

Estimated cost: **$5–30/month** depending on how many guests use the chat.

---

## Step 1 — Update what Teresa knows

Edit these files whenever rates, policies, or seasonal info change:

- **`concierge/knowledge.md`** — rates, room tips, policies, seasonal notes
- **`concierge/area-guide.md`** — travel, weather, packing, local area

The website pages are included automatically when you deploy.

---

## Step 2 — Deploy to Vercel

1. Push this project to GitHub (or connect your folder in Vercel)
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Vercel will detect the settings from `vercel.json`
4. Click **Deploy**

---

## Step 3 — Add your Anthropic API key

In the Vercel dashboard:

1. Open your project → **Settings** → **Environment Variables**
2. Add:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | Your key from console.anthropic.com |
| `ANTHROPIC_MODEL` | `claude-haiku-4-5` (optional — default) |

3. Redeploy (Deployments → … → Redeploy)

---

## Step 4 — Test

1. Open your live site
2. Click **Ask Teresa** (bottom-right corner)
3. Try: *How do I get to the lodge?*
4. Have a short conversation, then tap **Complete your enquiry** — the contact form should pre-fill

---

## Local development (optional)

```bash
npm install
npm run dev:full
```

Open **http://localhost:3001** (not 3000).

Use `npm run dev:full` — not `npm run dev` — so the chat API works locally.  
(`npm run dev` only serves static files; the chat will show a connection error.)

Copy `.env.example` to `.env.local` and add your key:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
ANTHROPIC_MODEL=claude-haiku-4-5
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Chat says "not fully set up" | Add `ANTHROPIC_API_KEY` in Vercel env vars and redeploy |
| "Trouble connecting" on localhost:3000 | Use `npm run dev:full` and open **localhost:3001** |
| Wrong or made-up answers | Update `concierge/knowledge.md` and redeploy |
| Form not pre-filling | Make sure the guest tapped **Complete your enquiry** from the chat |

---

## Updating Teresa's knowledge later

1. Edit `concierge/knowledge.md` and/or `concierge/area-guide.md`
2. Push to GitHub (or redeploy in Vercel)
3. Vercel runs `npm run build` automatically, which rebuilds the knowledge base

No code changes needed for routine updates.
