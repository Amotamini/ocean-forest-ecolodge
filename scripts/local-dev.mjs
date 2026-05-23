/**
 * Local dev server — static site + concierge API.
 * Usage: npm run dev:full
 * Requires ANTHROPIC_API_KEY in .env.local
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import chatHandler from '../api/chat.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const PORT = process.env.PORT || 3000;

// Load .env.local into process.env
const envPath = join(root, '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString() || '{}'));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function serveStatic(req, res) {
  let path = req.url?.split('?')[0] || '/';
  if (path === '/') path = '/index.html';

  const filePath = join(root, path);

  if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const ext = extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  res.end(readFileSync(filePath));
}

function createResAdapter(res) {
  const adapter = {
    statusCode: 200,
    setHeader(k, v) {
      res.setHeader(k, v);
      return adapter;
    },
    status(code) {
      adapter.statusCode = code;
      return adapter;
    },
    json(data) {
      if (!res.headersSent) {
        res.writeHead(adapter.statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
      }
      res.end(JSON.stringify(data));
      return adapter;
    },
    end() {
      res.end();
      return adapter;
    },
  };
  return adapter;
}

const server = createServer(async (req, res) => {
  if (req.url?.startsWith('/api/chat')) {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }

    if (req.method === 'POST') {
      try {
        req.body = await readBody(req);
        await chatHandler(req, createResAdapter(res));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad request' }));
      }
      return;
    }
  }

  serveStatic(req, res);
});

function listen(server, port) {
  return new Promise((resolve, reject) => {
    const onError = (err) => {
      server.off('listening', onListening);
      reject(err);
    };
    const onListening = () => {
      server.off('error', onError);
      resolve(port);
    };
    server.once('error', onError);
    server.once('listening', onListening);
    server.listen(port);
  });
}

async function startServer() {
  const basePort = Number(process.env.PORT || 3000);
  let port = basePort;

  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      port = await listen(server, basePort + attempt);
      break;
    } catch (err) {
      if (err.code !== 'EADDRINUSE') throw err;
      if (attempt === 19) {
        throw new Error(`No free port found near ${basePort}`);
      }
    }
  }

  const hasKey = process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY.includes('your-key');
  console.log('');
  console.log(`  Ocean Forest — local dev`);
  console.log(`  Open: http://localhost:${port}`);
  if (port !== basePort) {
    console.log(`  (Port ${basePort} was busy — using ${port} instead)`);
  }
  console.log(`  Chat API: ${hasKey ? 'ready' : '⚠ add ANTHROPIC_API_KEY to .env.local'}`);
  console.log('');
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
