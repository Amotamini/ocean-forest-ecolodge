STATUS: SHIPPED 2026-07-31

# Ocean Forest — Retreats Page

## 1. Goal

Restructure `retreats.html` to the approved vision: a story-led page for retreat leaders whose one promise is "everything goes smoothly if you choose us", with the shala first, six anchor stats, the calculator embedded, and WhatsApp/email as the close.

## 2. Decisions

- Same codebase and rules as `specs/of-main-page.md` (read its Decisions first — copy sources, no invention, placeholders, Redline tag, palette). This spec assumes that spec is built or being built; `shared-sections.js` comes from it.
- The page keeps its existing dark luxury visual language and most of its existing copy — this is a restructure, not a rewrite.
- The hero must NOT repeat the main page's positioning (no "beachfront sanctuary between park and Pacific" retelling — they already read that). The page's spine, stated in the hero: everything goes smoothly if you choose us.
- Retreat leaders read; the page tells a story top to bottom. No content is moved off-page — the six stat items are in-page anchors only.
- Pricing = the retreat calculator, fully embedded and functional in the page (the page already carries an in-page calculator at `#calculator`; it stays and must match the reference calculator's features).
- The downloadable kit is Eli's own presentation file, shipped as-is. Its factual errors are explicitly not this build's problem. Its testimonials and stats must never leak onto the page itself.
- Primary conversion = WhatsApp and email. The kit download is the secondary CTA.

## 3. Contracts

**File:** `retreats.html` in `Clients/Ocean Forest Ecolodge/Landing Page retreat leaders/` (served at `/retreats` via Vercel cleanUrls).

**Layout reference:** `design-preview.html` at repo root (toggle to its Retreats view) is the client-approved mockup — match its structure and interactions; its copy and calculator math are NOT sources.

**Hero:** keep the existing hero visuals. Headline/subline rewritten around the spine "Everything goes smoothly if you choose us" — assembled from existing retreats.html copy + org/com source files only (tighten, don't invent). Directly under the hero: the stat line.

**Stat line — six items, this exact order, each an in-page anchor:**
1. Accommodation for 32 → `#accommodation`
2. Three meals a day → `#food`
3. Tours → `#experiences`
4. Logistics → `#arriving`
5. Yoga Shala → `#shala`
6. Pricing → `#calculator`

**Section order below the stat line** (the shala leads even though it is 5th on the stat line — Eli's explicit ask):
1. `#shala` — the premium thing. Big media slot for a 360°/video tour of the three-level, 46-ft shala: labelled placeholder frame ("waiting for: shala-360.mp4 — Ryan") until the asset exists. Keep the existing "A beachfront sanctuary. Built for practice." copy — it currently lives in the un-id'd `section.about`, NOT in `#spaces` — as this section's text (the phrase is about the shala and is allowed here; the hero rule below doesn't apply to it). Shala-specific copy from `#spaces` may be merged in.
2. `#accommodation` — rooms for retreat groups: existing `#spaces` accommodation content, capacity 32, ten rooms, Lapa Lapa reserved for facilitators (facts per main-page spec). In-page only — NO link to the main page's rooms (leaders stay on this page).
3. `#food` — three meals a day, full board; reuse/tighten existing "Everything covered." food copy.
4. `#experiences` — shared tours block: `<div data-shared="tours"></div>` (from shared-sections.js).
5. `#arriving` — shared logistics block: `<div data-shared="logistics"></div>`.
6. `#calculator` — existing in-page calculator, kept fully embedded and working. Required features (this list is the contract; the Netlify URL `https://endearing-travesseiro-145405.netlify.app` is reference only and may be unreachable): editable guest count, room allocation view, cost to lodge, break-even price per guest, leader profit, payment schedule. If the existing section already does all this, keep it; add anything missing.
7. `#kit` — "Want everything in one document?" → button "Get the Retreat Host Kit" opening `/retreat-host-kit` in a new tab (it is a browsable slide page, not a file download — do not label it "download"). The file `retreat-host-kit.html` already sits at repo root; do not edit its contents.
8. `#inquire` — closing CTA: two equal buttons, "WhatsApp Eli" → `https://wa.me/50687379416` and "Email Eli" → `mailto:eli@oceanforest.org`. Keep the existing discovery-call modal only if it already works without a backend; otherwise remove it in favour of the two buttons.

**Nav on this page:** same sticky/shrinking header as the main page. Links in PAGE order (not stat-line order): Shala→`#shala` · Rooms→`#accommodation` · Food→`#food` · Tours→`#experiences` · Arriving→`#arriving` · Pricing→`#calculator`, plus one link back: "Book a stay" → `/`. Book now button here targets `#inquire` (retreat leaders don't use the room engine).

**Kill list:** any hero/intro copy repeating the main page's positioning; any remaining `location` section retelling where Ocean Forest is (the logistics block now carries arrival; one line of location context inside `#arriving` is enough).

## 4. Acceptance checks

1. The `/retreats` HERO SECTION (this check is scoped to the hero only) contains the smooth/effortless promise and none of: "wild edge", "beachfront sanctuary", "between Corcovado and the Pacific", or any sentence reused from the `/` hero.
2. The stat line shows the six items in the exact order above; clicking each scrolls to its section on this page; no stat item navigates away from `/retreats`.
3. The first content section after the stat line is `#shala`, and it shows the labelled placeholder frame for `shala-360.mp4` (or the real asset if present).
4. `#experiences` and `#arriving` on `/retreats` are byte-identical in content to the same blocks on `/` (both injected from shared-sections.js).
5. The calculator at `#calculator` works in-page with no external site: changing guest count updates cost, break-even and profit; a payment schedule is shown.
6. "Get the Retreat Host Kit" opens `/retreat-host-kit` and the kit renders (17 slides, arrow-key navigation); no quote, rating or stat from the kit file appears anywhere on `/retreats`.
7. WhatsApp and Email CTAs open `wa.me/50687379416` and `mailto:eli@oceanforest.org`; there is no Formspree or dead form on the page.
8. Header behaves identically to the main page (pinned, shrinks on scroll, works at 375 px, light/dark toggle present and honouring the saved `of-theme` preference).

## 5. Out of scope

- Main page work (`specs/of-main-page.md`).
- AI concierge (own spec, pending).
- Editing the Host Kit's contents or facts.
- Ryan's shala video (placeholder ships).
- DNS / redirects / SEO.

## 6. Parking line

(empty)

## 7. Build prompt

> Open the folder `Clients/Ocean Forest Ecolodge/Landing Page retreat leaders/` and read `specs/of-retreats-page.md` AND `specs/of-main-page.md` (its Decisions bind here too) before touching anything. Restructure retreats.html exactly as specified: spine "everything goes smoothly", six-anchor stat line, shala first, shared tours/logistics blocks, calculator kept fully embedded, kit download, WhatsApp + email close. Copy may only come from the existing page and the source files named in the main-page spec — never invented. Missing media uses the labelled placeholder pattern. When done, verify every acceptance check yourself and report each pass/fail with evidence. Deploy nothing.
