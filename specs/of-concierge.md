STATUS: DRAFT

# Ocean Forest — AI Concierge

## 1. Goal

A discreet chat bubble, bottom-right on both pages, that answers guests' questions about the lodge from its real information only — and hands anything it doesn't know to Eli on WhatsApp.

## 2. Decisions

- Fresh build (client decision 2026-07-30 — the older concierge in `Main Website restyled/` is abandoned; do not port it).
- Same codebase and rules as `specs/of-main-page.md`. Runs on both `/` and `/retreats`, in both light and dark themes.
- Discreet: closed bubble by default, never auto-opens, no sound, no notification badge. (The client overrode Eli's objection — discretion is the compromise; keep it quiet.)
- The brain is the Anthropic API called from a serverless function on Vercel. The API key lives server-side as an environment variable, never in the browser.
- The concierge answers ONLY from a distilled knowledge file. It never invents. Unknown → warm short apology + WhatsApp handoff.
- It replies in the language it is asked in. Replies stay short.
- Conversation memory lasts only while the panel is open (kept in a JS variable). Nothing stored.

## 3. Contracts

**Files (all in `Clients/Ocean Forest Ecolodge/Landing Page retreat leaders/`):**
- `api/concierge.js` — Vercel serverless function. `POST {messages:[{role,content}…]}` → `{reply:string}`. Reads the key from `process.env.ANTHROPIC_API_KEY`. Model: the current cheapest/fastest Claude (Haiku tier). Max ~300 output tokens. Loads `concierge-knowledge.md` and injects it into the system prompt.
- `concierge.js` + its CSS — one self-contained widget script, included by `index.html` and `retreats.html` before `</body>`. No framework.
- `concierge-knowledge.md` — the distilled knowledge file.

**Deploy dependency (the one thing the builder cannot do):** the env var `ANTHROPIC_API_KEY` must be added in the Vercel project settings by Mehdi. The build must run correctly the moment the key exists, and degrade gracefully while it doesn't.

**Knowledge file** — assembled ONLY from `source-copy/org-copy.md`, `source-copy/com-copy.md`, and the Contracts of the two page specs (which override on any conflict). Must cover: the 3 room types + 10 rooms/32 guests/3 meals; the 4 diet options; the 9 tours with add-on prices where sourced (Corcovado Sirena $120, San Pedrillo $110, Caño snorkel $99, dive $165, horses $80); arrival — boat all-seasons/recommended ($70 taxi ~6 h or $20 bus ~7 h to Sierpe, boat $30 am/$40 pm, 15-min beach walk), car dry-season 4×4, air Drake Bay + $70 taxi; seasons (Green May–Nov, Dry Dec–Apr); packing list; cancellation policy (30+ days 100% · 29 days 80% · 7 days 50% · 48 hrs full charge · reschedule within a year); the shala + retreats in one paragraph; contact (WhatsApp +506 8737 9416, eli@oceanforest.org, location Playa Rincón de San Josecito, Drake Bay).

**System-prompt rules (write them into the function):** answer only from the knowledge file; nightly room prices → send them to the booking engine link (`https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3`); retreat-leader questions → point to `/retreats` and WhatsApp; anything unknown → one warm sentence + `https://wa.me/50687379416`; reply in the user's language; max ~120 words; warm, plain, no emoji.

**UI:** ~56 px round bubble, gradient fill (`--gradient-ocean-lime`), bottom-right, above the fold on mobile without covering the Book now button; opens a ~360 px panel (full-width sheet on mobile) themed with the site's CSS variables so it follows light/dark automatically; typing indicator while waiting; on network/API failure: "I can't reach the lodge right now — message Eli directly" + WhatsApp link.

## 4. Acceptance checks

1. Both `/` and `/retreats` show the closed bubble bottom-right in both themes; it never opens by itself; at 375 px width it does not cover the Book now button.
2. Ask "How do I get there?" → the reply recommends the boat and includes $30/$40, matching the knowledge file.
3. Ask "Do you have a gym?" (not in the knowledge) → graceful decline + WhatsApp link, zero invented facts.
4. Ask a question in Spanish → the reply is in Spanish.
5. `grep` of every client-served file finds no API key or fragment of one; the key is read only via `process.env.ANTHROPIC_API_KEY` in `api/concierge.js`.
6. With the key absent, the bubble still opens and shows the fallback message with the WhatsApp link (no console crash).
7. Every fact in `concierge-knowledge.md` is traceable to the source-copy files or the page specs' Contracts; replies never exceed ~150 words in checks 2–4.

## 5. Out of scope

- Booking or payment actions inside the chat.
- Conversation history persistence, accounts, analytics.
- Porting anything from `Main Website restyled/`.
- The retreat calculator.

## 6. Parking line

(empty)

## 7. Build prompt

> Open the folder `Clients/Ocean Forest Ecolodge/Landing Page retreat leaders/` and read `specs/of-concierge.md` plus the Contracts of `specs/of-main-page.md` before touching anything. Build the concierge exactly as specified: `api/concierge.js` serverless function, self-contained `concierge.js` widget on both pages, and `concierge-knowledge.md` distilled only from the named sources. No invented facts anywhere. Verify every acceptance check yourself (use a temporary local env var for the key tests; never write the key into any file) and report each pass/fail with evidence. Tell Mehdi at the end that the only remaining step is adding `ANTHROPIC_API_KEY` in the Vercel project settings. Deploy nothing.
