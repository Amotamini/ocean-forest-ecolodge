import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
  'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'i', 'you', 'we',
  'they', 'he', 'she', 'it', 'my', 'your', 'our', 'their', 'this', 'that', 'what',
  'how', 'when', 'where', 'who', 'which', 'about', 'from', 'into', 'there', 'here',
  'me', 'us', 'them', 'also', 'just', 'like', 'get', 'got', 'want', 'need', 'please',
]);

let cachedKnowledge = null;

export function loadKnowledge() {
  if (cachedKnowledge) return cachedKnowledge;
  const path = join(__dirname, '..', 'concierge', 'knowledge.json');
  cachedKnowledge = JSON.parse(readFileSync(path, 'utf8'));
  return cachedKnowledge;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

export function retrieveRelevantChunks(query, limit = 8) {
  const { chunks } = loadKnowledge();
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return chunks.slice(0, limit);

  const scored = chunks.map((chunk) => {
    const chunkTokens = new Set(tokenize(`${chunk.title} ${chunk.text}`));
    let score = 0;
    for (const token of queryTokens) {
      if (chunkTokens.has(token)) score += 2;
      for (const ct of chunkTokens) {
        if (ct.includes(token) || token.includes(ct)) score += 0.5;
      }
    }
    if (chunk.source === 'knowledge.md') score += 1;
    if (chunk.source === 'area-guide.md') score += 0.5;
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.chunk);
}

export function buildContextBlock(chunks) {
  return chunks
    .map((c) => `[Source: ${c.source} | ${c.title}]\n${c.text}`)
    .join('\n\n---\n\n');
}
