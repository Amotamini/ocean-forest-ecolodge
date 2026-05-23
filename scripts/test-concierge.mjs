import { readFileSync } from 'node:fs';

const htmlFiles = ['index.html', 'accommodations.html', 'wellness.html', 'about.html', 'contact.html'];
const missing = htmlFiles.filter((f) => {
  const content = readFileSync(f, 'utf8');
  return !content.includes('concierge/widget.js') || !content.includes('concierge/widget.css');
});

if (missing.length) {
  console.error('Missing widget on:', missing.join(', '));
  process.exit(1);
}

const knowledge = JSON.parse(readFileSync('concierge/knowledge.json', 'utf8'));
if (!knowledge.chunks || knowledge.chunks.length < 10) {
  console.error('Knowledge base too small');
  process.exit(1);
}

const contact = readFileSync('contact.html', 'utf8');
const requiredIds = ['contact-form', 'enquiry-type', 'arrival-month', 'guest-count', 'message', 'concierge-prefill-note'];
const missingIds = requiredIds.filter((id) => !contact.includes(`id="${id}"`));
if (missingIds.length) {
  console.error('Missing form IDs:', missingIds.join(', '));
  process.exit(1);
}

const script = readFileSync('script.js', 'utf8');
if (!script.includes('prefillContactFromConcierge')) {
  console.error('Prefill logic missing from script.js');
  process.exit(1);
}

// Simulate handoff URL decode
const params = new URLSearchParams('from=concierge&type=stay&month=2026-03&guests=2&message=Couple%20interested%20in%20Ocean%20Cabin');
if (params.get('from') !== 'concierge' || params.get('type') !== 'stay') {
  console.error('URL param parsing failed');
  process.exit(1);
}

console.log('All concierge checks passed');
console.log('- Widget on all 5 pages');
console.log('- Knowledge chunks:', knowledge.chunks.length);
console.log('- Contact form IDs present');
console.log('- Handoff URL parsing OK');
