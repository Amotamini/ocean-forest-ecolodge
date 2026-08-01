STATUS: SHIPPED 2026-07-31

# Ocean Forest — Main Page (the hotel)

## 1. Goal

Rebuild `index.html` into the single hotel main page — hero to footer, booking never more than one click away — exactly per Eli's approved vision.

## 2. Decisions

- The live site's codebase is the static folder `Clients/Ocean Forest Ecolodge/Landing Page retreat leaders/` (deployed to https://ocean-forest-ecolodge.vercel.app via Vercel, `cleanUrls: true`). It is plain HTML/CSS/JS. No framework. Keep it that way.
- Two pages only: this main page (`/`) and the retreat page (`/retreats`). Everything else is a section on this page, reached by anchors.
- The two-path hero stays, but the page no longer stops there — the full hotel content lives below it. `stay.html`'s content merges into `index.html`; `stay.html` then becomes exactly this stub (do NOT copy gateway.html, whose canonical/target differ): `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=/"><meta name="robots" content="noindex"><title>Ocean Forest Ecolodge</title></head><body><p>Moved to <a href="/">the homepage</a>.</p></body></html>`
- "I want to stay" and every Book now button go straight to the booking engine — no intermediate page, no request form. The Formspree booking-request form in `stay.html` and its placeholder room prices (`var ROOMS = [` at stay.html:794) are deleted, not migrated. The engine owns prices; the site never shows a nightly rate.
- Room count is TEN (not eleven). Capacity 32 guests. Three meals a day included. These three facts override anything the old copy says.
- Copy is never invented. Sources, in priority order: (1) `source-copy/org-copy.md`, (2) `source-copy/com-copy.md` where it adds something org lacks, (3) Eli's own rewrites in `ocean-forest-redline-backup-2026-07-29.md` (her voice, freshest — prefer these for food/ocean/rainforest blurbs where they exist; note: that file's notes were written against a DIFFERENT, older build — ignore its CSS selectors and quoted originals entirely, use only the text after each "**Note:**" as a copy bank), (4) copy already in this codebase's pages (it is client-approved). Cutting, tightening and reordering allowed; new facts forbidden. Exception: numbers and facts stated in this spec's Contracts are client-corrected finals and override all four sources. A section with no source copy gets a labelled placeholder frame (the pattern already used for missing media), never invented text.
- Disposition rule: any section currently on index.html or stay.html that is not mapped in the Contracts below is deleted. Specifically: index.html's "We built this place slowly" letter section merges into `#about`; stay.html's promise/perks section, quote band and booking form die.
- Tours and Logistics are shared blocks used by both pages, defined once (see Contracts) so touching one touches the other.
- The .com gradient becomes part of the palette (see Contracts) — used for section-title bands / accents, blended tastefully into the existing dark luxury style. Style execution is the builder's taste; the colors are not.
- Trust section launches with hand-picked real reviews, not a live widget.
- The site has a light/dark theme switch (client decision 2026-07-30). Dark is the default. See Contracts.
- The Redline feedback script tag stays on every page.
- Existing labelled-media-placeholder system stays; any new image slot uses it.

## 3. Contracts

**Folder:** `Clients/Ocean Forest Ecolodge/Landing Page retreat leaders/` (git repo `primalbynaturepro-lgtm/Ocean-forest`, branch `main`).

**Layout reference:** `design-preview.html` at repo root is the client-approved mockup — match its section order, interaction patterns (tabs, accordion, stat line, theme toggle, header behaviour) and overall feel. Its copy and its calculator math are NOT sources — copy comes only from the sources named in Decisions.

**Key URLs (exact):**
- Booking engine (rooms): `https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3`
- WhatsApp: `https://wa.me/50687379416` · Email: `eli@oceanforest.org`
- Tour bookings (WeTravel, all prefixed `https://www.wetravel.com/trips/`):
  - Corcovado – Sirena → `corcovado-national-park-sirena-station-ocean-forest-ecolodge-75443139`
  - Corcovado – San Pedrillo → `corcovado-national-park-san-pedrillo-station-ocean-forest-ecolodge-28113992`
  - Caño Island Snorkeling → `cano-island-snorkelling-tour-ocean-forest-ecolodge-69074848`
  - Caño Island Diving → `cano-island-diving-tour-ocean-forest-ecolodge-22781271`
  - Dolphin & Whale Encounters → `dolphin-whales-encounter-ocean-forest-ecolodge-57401510`

**Section order and ids on `index.html`** (each `id` exact — the nav and the retreat page depend on them):

1. `#fork` — existing hero. Keep h1 "The wild edge of Costa Rica." and both path cards. Card copy fix: "Eleven rooms" → "Ten rooms" (also fix the meta description and JSON-LD `numberOfRooms` 11 → 10). "I want to stay / SEE THE LODGE" card now links to the booking engine URL. "I lead retreats / HOST YOUR RETREAT" card links to `/retreats`.
2. `#rooms` — "Choose Your Perfect Room": the three marketed room types from com-copy.md `/accommodations/` (Beach Bungalows · Jungle Suites · Family Bungalows), each with photo slot, its verbatim description + specs, and a Book now → booking engine. No prices. No map — instead one short location paragraph (source: org-copy.md `/setting/`), max 3 sentences.
3. `#food` — one section from com-copy.md `/food-and-experiences/` (+ Eli's redline note #1/#3 rewrites): local, fresh, made by hand. Four visual diet chips: Vegetarian · Vegan · Gluten-free · Omnivore. Chips are icons/badges, not a paragraph.
4. `#experiences` — Tours, shared block (below).
5. `#arriving` — Logistics, shared block (below).
6. `#retreats-pitch` — short section: you can trust us with your whole retreat; one button → `/retreats`. Copy source: retreats.html's existing hero/about lines, tightened.
7. `#trust` — stats strip + reviews. Stats (real facts only): Since 2000 · 10 rooms · 32 guests max · 46-ft three-level yoga shala · 6 km from Corcovado. Reviews: find the lodge's official Google Business listing by searching "Ocean Forest Ecolodge Drake Bay" (warning: `maps.app.goo.gl/34sQPv43R8bUP1H66` in com-copy.md is the SCHOOL PARKING pin, not the lodge — do not use it). If 3–5 real reviews can be verifiably retrieved, use them verbatim with reviewer first name + a link to the listing and record the listing URL in an HTML comment; if not, ship 3 labelled placeholder review slots ("waiting for: real Google review — Mehdi") — never write a review. Plus a hidden, ready slot for press mentions (display:none until content exists). Never use the testimonials from the Host Kit file.
8. `#about` — assembled ONLY from org-copy.md `/ecolodge/` + `/setting/` plus index.html's existing "We built this place slowly" letter section and its JSON-LD facts (foundingDate 2000). Every sentence must be traceable to those sources (cut/reorder allowed).
9. `#gallery` — photo grid of exactly 8 slots, filenames `media/gallery-01.jpg` … `media/gallery-08.jpg`, labelled placeholders until the files exist. Create `media/README.md` listing every media filename the site expects (it does not exist yet).
10. Footer — keep the current footer-with-menus pattern; menu links mirror the nav.

**Nav (sticky header):** logo · Arriving→`#arriving` · Stay→`#rooms` · Retreats→`/retreats` · Experiences→`#experiences` · Gallery→`#gallery` · About→`#about` · Book now (button, booking engine URL, always visible). This menu deliberately omits Food and Trust — it is the client's chosen list; do not add items. Header pinned to top, shrinks on scroll (reduce height/padding via a `.scrolled` class), on both pages. Mobile: hamburger, same links, Book now stays visible outside the hamburger. Footer menus mirror this nav exactly.

**Shared blocks — file `shared-sections.js`** at repo root, loaded by both `index.html` and `retreats.html`. It injects two blocks into mount points `<div data-shared="tours"></div>` and `<div data-shared="logistics"></div>`:

*Tours block:* two tabs on one spot — **Ocean Discovery** and **Rainforest Discovery** — switching in place (no page jump). Content verbatim from org-copy.md `PAGE: /activities/`:
- Ocean Discovery (5): The Island – Caño Island · Scuba Diving at Caño Island · Snorkeling at Caño Island · Dolphin and Whale Encounters · Surf Tour at Rio Claro
- Rainforest Discovery (4): Corcovado National Park (intro) · Corcovado – Sirena · Corcovado – San Pedrillo · Goddess Jacuzzi
Each tour: one big photo + a per-tour photo slider (media placeholders until photos exist) + its verbatim description + one CTA. CTA mapping: Sirena, San Pedrillo, Snorkeling, Diving, Dolphin & Whale → their WeTravel URL above. The Island – Caño Island → two buttons, "Book snorkeling" and "Book diving", to those two URLs. Surf Tour, Goddess Jacuzzi, Corcovado intro → button "Ask us on WhatsApp" → the WhatsApp URL.

*Logistics block:* heading + three accordion rows, closed by default. The numbers below are CLIENT-SUPPLIED FINALS (Mehdi, 2026-07-30) — they are the source of truth and override every contradicting figure in com-copy.md (which disagrees with itself). Descriptive texture (what the ride feels like, what to pack) comes verbatim-trimmed from com-copy.md `/ecolodge/` and org-copy.md `/arriving/`; the prices, hours and seasons come from here:
1. **By boat — all seasons, our recommendation.** Get to Sierpe: private taxi $70 (~6 h from San José) or public bus $20 (~7 h). Boat Sierpe → San Josecito beach: $30 (11:30 am) / $40 (4:00 pm), ~1.5 h. Then a 15-minute walk along the beach.
2. **By car — dry season only (Dec–Apr).** 4×4 required, two shallow river crossings; park at San Josecito Rural School (secure), then the 15-minute beach walk.
3. **By air — all seasons.** Fly San José → Drake Bay (~45 min), then 4×4 taxi $70/vehicle, ~45 min.
Each row opens to its detail (verbatim from source, trimmed); season tag visible on the closed row.

**Palette addition** (append to existing `:root` in each page or `color-palette.css`): `--grad-1:#3C88A4; --grad-2:#469B94; --grad-3:#53A871; --grad-4:#7DB359; --grad-5:#A3C455; --grad-6:#DFDF5B;` and `--gradient-ocean-lime: linear-gradient(90deg, var(--grad-1), var(--grad-3), var(--grad-6));`

**Theme switch:** an icon button (moon/sun) in the header, immediately left of Book now, on both pages. Default = dark (the current look). Light theme = same layout and gradient, with backgrounds swapped to warm off-whites (`#f6f4ee` page, `#ffffff` cards) and text to the dark ink — implement by toggling a `light` class on `<body>` that overrides the CSS variables; never duplicate stylesheets. Every component — including the shared blocks, accordion, tabs, footer and the concierge popup — must stay readable in both themes. Persist the choice in `localStorage` key `of-theme` and re-apply it on load on both pages.

**Keep:** `<script defer src="https://redline-xi-ten.vercel.app/w.js" data-redline="ocean-forest"></script>` on every page, right before `</body>`.

## 4. Acceptance checks

1. On `/`, clicking "I want to stay" (hero), the nav Book now, and each of the three room-type Book now buttons all open `https://book.securebookings.net/roomrate?id=6f26c974-…` — with no intermediate page or form.
2. Nothing on the site says "eleven rooms" or shows a nightly price in dollars; page text, meta description and JSON-LD all say ten rooms, and "three meals" appears in the rooms or food section.
3. Every nav anchor (Arriving, Stay, Experiences, Gallery, About) scrolls to a section that exists on `/`; Retreats opens `/retreats`; the header stays pinned and visibly shrinks after scrolling; Book now remains visible on mobile at 375 px width; the theme toggle flips the whole page dark↔light with no unreadable element, and the choice survives a reload and carries to `/retreats`.
4. The tours block shows exactly 5 Ocean + 4 Rainforest tours with the CTA mapping above (open each of the 5 WeTravel links and confirm they resolve to the matching tour); Surf Tour, Goddess Jacuzzi and Corcovado intro CTAs open wa.me/50687379416.
5. The logistics accordion has exactly 3 rows in order boat/car/air, closed on load, with the season tags and the exact prices from the Contracts ($70/$20/$30/$40/$70) and no bus-hour or taxi-price contradictions anywhere.
6. Editing one word in `shared-sections.js` changes both `/` and `/retreats` (verify by grep + loading both pages).
7. Every copy block on the page can be traced to org-copy.md, com-copy.md, the redline backup's Note texts, the pre-existing pages of this codebase, or this spec's Contracts (spot-check: food section, About section, 3 random tour descriptions — diff against source, allowing only deletion/reordering); no review text exists that wasn't verifiably retrieved; the Host Kit's testimonials appear nowhere.
8. `stay.html` redirects to `/`; the Formspree form and `var ROOMS` array no longer exist in the repo; the Redline script tag is present on `/` and `/retreats`.

## 5. Out of scope

- The retreat page restructure (own spec: `of-retreats-page.md`).
- The AI concierge popup (own spec, pending).
- DNS switch, redirect map from old oceanforest.org, SEO work.
- Fixing the Host Kit's contents.
- Live Google/TripAdvisor widget (launch = hand-picked quotes).
- New photography / Ryan's video (placeholders ship).

## 6. Parking line

(empty)

## 7. Build prompt

> Open the folder `Clients/Ocean Forest Ecolodge/Landing Page retreat leaders/` and read `specs/of-main-page.md` fully before touching anything. Also read `source-copy/org-copy.md`, `source-copy/com-copy.md`, and `ocean-forest-redline-backup-2026-07-29.md` — they are the only allowed sources of copy. Build exactly what the spec says: rebuild index.html into the full hotel main page, create shared-sections.js, retire stay.html to a redirect. Do not invent a single fact or sentence; where source copy or media is missing, use the labelled placeholder pattern already in the codebase. Match the existing visual language (Cormorant Garamond / DM Sans / Space Mono, dark luxury) and blend in the gradient variables from the spec. When done, verify every acceptance check yourself and report each one pass/fail with evidence. Deploy nothing.
