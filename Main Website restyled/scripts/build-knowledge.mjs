import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const HTML_PAGES = [
  'index.html',
  'accommodations.html',
  'wellness.html',
  'about.html',
  'contact.html',
];

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim();
}

function splitMarkdownSections(markdown, source) {
  const chunks = [];
  const lines = markdown.split('\n');
  let title = source;
  let body = [];

  const flush = () => {
    const text = body.join('\n').trim();
    if (text.length > 40) {
      chunks.push({
        id: `${source}::${title}`,
        source,
        title,
        text,
      });
    }
    body = [];
  };

  for (const line of lines) {
    if (line.startsWith('# ')) {
      flush();
      title = line.replace(/^#+\s*/, '').trim();
    } else if (line.startsWith('## ')) {
      flush();
      title = line.replace(/^#+\s*/, '').trim();
    } else {
      body.push(line);
    }
  }
  flush();
  return chunks;
}

function splitHtmlIntoChunks(html, source) {
  const text = stripHtml(html);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let buffer = '';
  let part = 0;

  for (const sentence of sentences) {
    if ((buffer + sentence).length > 900) {
      if (buffer.trim().length > 80) {
        chunks.push({
          id: `${source}::part-${part++}`,
          source,
          title: source.replace('.html', ''),
          text: buffer.trim(),
        });
      }
      buffer = sentence;
    } else {
      buffer += ' ' + sentence;
    }
  }

  if (buffer.trim().length > 80) {
    chunks.push({
      id: `${source}::part-${part}`,
      source,
      title: source.replace('.html', ''),
      text: buffer.trim(),
    });
  }

  return chunks;
}

function readOptional(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return '';
  }
}

const chunks = [];

for (const page of HTML_PAGES) {
  const html = readFileSync(join(root, page), 'utf8');
  chunks.push(...splitHtmlIntoChunks(html, page));
}

const knowledgeMd = readOptional(join(root, 'concierge/knowledge.md'));
const areaMd = readOptional(join(root, 'concierge/area-guide.md'));

if (knowledgeMd) chunks.push(...splitMarkdownSections(knowledgeMd, 'knowledge.md'));
if (areaMd) chunks.push(...splitMarkdownSections(areaMd, 'area-guide.md'));

const output = {
  generatedAt: new Date().toISOString(),
  chunkCount: chunks.length,
  chunks,
};

writeFileSync(join(root, 'concierge/knowledge.json'), JSON.stringify(output, null, 2));
console.log(`Built ${chunks.length} knowledge chunks → concierge/knowledge.json`);
