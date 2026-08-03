# Ocean Forest — client feedback audit
42 notes collected 2026-08-03 06:44. Checked against the live code:
`ocean-forest-website/index.html`, `retreats.html`, `shared-sections.js`.

**Headline:** 42 notes collapse to ~30 distinct actions. 21 I can apply cleanly today.
7 need a decision from you or Eli. 5 are blocked on assets that do not exist yet.
4 are a site restructure, not a copy edit. 1 is junk.

---

## A. I can apply now — no input needed (21)

| # | What | Note |
|---|---|---|
| 3 | h1 → "Your Beachfront Ecolodge at the Edge of Corcovado National Park" | Keeps the gradient `<em>` treatment on the last phrase |
| 8 | Retreat path title → "I want to lead the retreat they'll never forget." | |
| 9 | Retreat path desc → "A 46-foot beachfront shala. Up to 32 guests. You teach — we handle the rest." | |
| 10 | Monthly-stay link → "Staying longer? Ask us about monthly rates." | |
| 11 | Nav order → Arriving, Stay, Experiences, Retreats, Gallery, About | Only change is swapping Retreats and Experiences |
| 12+13 | Centre the rooms section heading and lead | Same request twice |
| 15 | Rooms lead rewrite | |
| 17 | Jungle Suites card rewrite | |
| 18 | Family Bungalow card rewrite | **Also fixes a real error** — site says 540 ft² / 45 m², Eli says 50 m². 540 ft² = 50.2 m². She is right. |
| 20 | Food lead → "Farm-to-Table · Jungle Kitchen · Every Day Different" | |
| 22 | Tours h2 → "Tours and Adventures" | |
| 23+24+25 | Rainforest tab first (left), Ocean second (right), tab group centred | Three notes, one change |
| 26 | Footer address reformat to dot-separated + "Six kilometers from Corcovado National Park" | |
| 27 | Google Maps link in the footer | Coordinates already in the page's structured data (8.6957, -83.675) — I can build the link from those |
| 28 | Remove the "Made for retreat leaders" pitch from the home page | **Verified safe** — that copy already exists on retreats.html (line 1031). The fork still sends retreat leaders to /retreats. |
| 33 | Add a "3 hectares" stat to the lodge-in-numbers block | Eli wrote it in Spanish; I'd render it in English to match — flag below |
| 37 | Icons on the three arrival methods (boat / car / air) | I'll draw them in the same stroke style as the food chips |
| 5 | Hero sub rewrite | Applying, but see flag #3 below |
| 7 | Fork label → "Why Ocean Forest Ecolodge?" | Applying, but see flag #4 below |

---

## B. I need you or Eli (7)

**1. "Since 2000" or "Since 2003"? — notes 2, 32**
Eli says 2003 twice. The site says 2000 in **six** places, not the two she flagged:
the meta description, the structured data `foundingDate`, the hero eyebrow, the trust
eyebrow, the stat block, and the About letter. If 2003 is correct I change all six.
*Need: confirm 2003 is the founding year, and I go global with it.*

**2. Note 4 contradicts note 2.** Both point at the same line — the hero eyebrow.
Note 2 says change 2000 to 2003. Note 4 says make it "DRAKE BAY". She probably means
`Drake Bay · Osa Peninsula · Costa Rica · Since 2003`, but I am guessing.
*Need: the exact final string.*

**3. Prices on the site — notes 16, 17, 18. This is the big one.**
All three room rewrites end with a price: from $120, $140, $150. The codebase carries an
explicit standing decision — *"No prices anywhere — the booking engine owns prices."*
Putting rates in HTML means every rate change is a website edit, and the page will drift
out of sync with the booking engine.
*Need: your call. Publish prices, or drop the price line and keep the booking engine
authoritative? (Note 16 also writes "From 120" with no currency symbol.)*

**4. Note 21 deletes a paragraph without saying so.**
Her food rewrite drops the whole passage about the open-air dining room, the fresh juices,
and the self-serve filtered water, coffee and tea. That may be intentional trimming, or
she may have simply not copied it.
*Need: confirm that paragraph goes.*

**5. The three real reviews — notes 29, 30, 31.** Good news, these unblock the trust
section. Three gaps:
- The slots are labelled "· Google". Are these from Google, or TripAdvisor?
- Note 30 has no reviewer name.
- Note 31 is in German. Publish as-is, translated, or German with an English line under it?
- Note 29 has a stray unmatched quote mark — I'll fix silently.

**6. Note 34 — footer "MORE" → "BLOG".** That column currently holds Gallery, About and
Book now. Renaming it BLOG makes no sense unless a blog is coming.
*Need: is a blog being built, or does she just want a blog link added?*

**7. Note 7 — "What brings you here?" → "Why Ocean Forest Ecolodge?"**
Not wrong, but that element is the two-way fork (stay / lead a retreat). The old label
asks a question the two boxes answer. The new one reads like a section header and leaves
the two boxes unintroduced. Worth pushing back once. I'll apply it if she holds.

**Also flagging in note 5's copy:** *"Arrive by boat from Sierpe, by plane from San José,
or by 4×4 from Drake Bay."* The plane route and the 4×4 route are the same journey — you
fly to Drake Bay, then take a 4×4 taxi. And "No roads in" sits one sentence away from
"by 4×4". A guest will read that as a contradiction. Suggested fix: *"Arrive by boat from
Sierpe, or fly to Drake Bay and continue by 4×4. No road reaches the lodge."*

---

## C. Blocked on assets (5)

**The media folders are empty.** `media/rooms`, `media/property`, `media/video` contain
zero files. Every room, property and tour image on the site is still a dashed placeholder
box. This is the single biggest thing standing between the site and launch — bigger than
any note in this list.

| # | What | What's missing |
|---|---|---|
| 6+14+19 | Amenities row with icons, moved below the room grid | Icons I can draw. **Placement is contradictory:** note 14 says below the room grid, note 19 says after the location paragraph (which sits below the grid). *Need: pick one.* |
| 39 | A reference photo on each diet chip (Vegetarian / Vegan / GF / Omnivore) | 4 food photos |
| 40 | Minimum 4 food photos as a carousel | 4+ food photos. I can build the carousel now with placeholders and drop images in later. |
| 38 | "How to get here" needs 3 maps: Costa Rica, routes, pickup points | Either designed map graphics from Eli, or I build them as SVG. That is a half-day on its own. |

---

## D. Not a copy edit — this is a rebuild (4)

Notes **35, 36, 41, 42** together ask for something much larger than the rest of the list:

- **Arriving** becomes its own page (note 36)
- **Experiences/Tours** becomes its own page (note 35), with three sections —
  Rainforest Discovery, Ocean Discovery, Complementary Activities (note 41)
- **Every page gets its own short hero video** (note 42):
  Arriving → boat / flight / walking · Stay → rooms and food ·
  Experiences → Corcovado, wildlife, sealife · Retreats → shala and yoga practice

Right now the site is one long homepage with anchor links, plus retreats.html.
This turns it into a five-page site and needs four new hero videos cut.

**My recommendation:** do not mix this into the feedback pass. Apply sections A and B
now so Eli sees her copy live this week, and spec the page split separately.

---

## E. Discard (1)

**Note 1** — "sdgsdg" on the retreats hero. Stray keystroke, yours, 11:07. Deleting.

---

## Duplicates worth knowing about

Eli passed over the same elements several times: 2+4 (hero eyebrow), 6+14+19 (amenities),
12+13 (centring), 23+24+25 (tabs), 26+27 (footer), 35+41 (experiences page),
36+42 (arriving page). Not a problem, just why 42 notes is really ~30 jobs.

---

## On the Redline prompt — clear enough? No. Four fixes.

The wrapper reads: *"Apply each change. Keep the existing design system, fonts, spacing and
palette. Do not change anything not mentioned."* Good instincts, but a build thread would
get burned by it.

**1. It never names the file.** The notes span three files — index.html, retreats.html and
shared-sections.js — and nothing in the dump says which. A builder has to guess.
→ *Emit the source file and line for each note, not just a CSS selector.*

**2. "Do not change anything not mentioned" is impossible to honour here.** The tours block
and the arriving block live in `shared-sections.js`, which renders on **both** the homepage
and the retreats page. Editing note 22 or note 37 silently changes the retreats page too.
→ *The prompt needs a line like: "Shared components render on multiple pages. Name every
page a change lands on before applying it."*

**3. The prompt assumes every note is a text swap.** At least twelve of them are not — they
ask for icons, photo carousels, maps, new pages and new videos. A builder told to "apply
each change" will either invent assets or stall.
→ *Split the export into two streams: `EDITS` (text/markup a builder can execute) and
`REQUESTS` (needs assets, a decision, or its own spec).*

**4. Note ids are dumped unmapped at the bottom.** Forty-two hashes in a row with no note
number attached. There is no way to report per-note status back to Redline, which defeats
the point of having ids.
→ *Put the id inline on each note: `## 18 · 4835 · p · Family Bungalow…`*

**One more, smaller:** the selectors are `body > div:nth-of-type(1) > div:nth-of-type(4)`.
Those break the moment a wrapper div is added. And the quoted text is truncated with "…",
so a builder cannot string-match to find the element. Truncate the *display* text, but ship
the full string in the payload.
