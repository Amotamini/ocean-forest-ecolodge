STATUS: SHIPPED 2026-08-05

All 8 acceptance checks passed, verified in a browser by the build thread on 2026-08-05. The map
stays hidden until a route is picked, which was the one trap named in advance. Two items remain
structurally blocked on Eli and are marked in the page rather than guessed: the Group Travel CTA
copy, and the Helpful Contacts numbers, which render with an (unconfirmed) marker until she
confirms each one is still live.

**REVISED 2026-08-09.** Five corrections landed after this spec shipped, recorded only in
`of-v2-revisions.md` (C5–C9). Folded in below: the hero now pins to a real photograph instead of the
shared film, the arrival-gate photo block is gone with the gap closed, "What Happens When You Land"
carries the full-bleed treatment, the Sansa Airlines label and Tracopa link are updated and Drake Bay
Taxi is removed, and the "Traveling as a group?" placeholder block is gone entirely. A rebuild from
this document now reproduces the live page rather than reverting it.

# A1 — Arriving

## 1. Goal

Replace the site's weakest page with a three-layer answer, in the order a traveller actually asks it: where is this place, how do I get there, what happens when I land.

## 2. Decisions

- Built on the A0 shell (`ocean-forest-website/v2/shell.css`, `shell.js`), as `ocean-forest-website/v2/arriving.html`, hero slug `arriving`, gallery offset `0`.
- Three map layers, in this fixed order on the page: Layer 1 (where is this place, always visible, static, no zoom), Layer 2 (how do I get there, no map until a route is picked, then that route's map appears alone), Layer 3 (what happens when I land, always visible, applies to every route).
- The warning block sits above the four route cards, not buried, not styled as an error state — styled as a plain info block matching the rest of the page.
- The route-card sentence (School vs. Beach, which direction, which side the ocean is on) sits on the card itself, above any map, exactly as written in brief §4 "The sentence comes before the map" — that text is final, verbatim, not to be paraphrased.
- Walk time is 20 minutes for both directions, deliberately overriding any "15" or "15-20" figure in the source copy. This is settled — do not "correct" it back.
- Maps ship as the existing `.org` artwork (raster images), not rebuilt as SVG. Because of this, Layer 2's "light one route, hide the rest" behavior is simulated by swapping the entire map image per route (four raster files, one per route) rather than lighting a path inside one shared SVG. This is a known limitation, not a bug — the real interactive version is a separate later spec.
- Departing section, Helpful Contacts, and Travel Tips / What to Pack are ported from `.org` (verbatim where quoted below), not rewritten.
- Helpful Contacts renders in the page but each phone number carries a small "unconfirmed" marker until Eli confirms it — see §6 Parking. Do not publish the section without that marker.
- **The Group Travel CTA is removed entirely** (rewritten 2026-08-09, C9 — superseding the original
  "placeholder card until Eli writes the copy" decision). The heading, the "Copy for this section is
  still being written" line and the `[Group Travel CTA — Eli]` placeholder marker are all gone, with
  the gap they left closed. Do not reintroduce a placeholder card here; there is no Group Travel CTA
  on this page.
- The downloadable is one arrival card PDF per route (four PDFs total), not a PDF per map. Since no PDF exists yet, each route card gets a "Download arrival card" button wired to `media/pdf/arrival-<route-slug>.pdf` using the same missing-file placeholder pattern as images: if the file 404s, the button becomes disabled and shows "PDF to come".
- FAQ shown on this page is Arriving-specific only (which drop point, what to pack, porter service). The general FAQ (site-wide, retreats, food, etc.) lives on About (A5), not here.
- **The hero pins to a still photograph, not the shared film** (C5, `of-v2-revisions.md` §3.3): the
  hero's `data-hero-image` attribute is set to `hero/hero-wide.jpg` (Ryan's `Hero_DSC00779.jpg`,
  already on disk), which per the A0 hero-slot contract's first branch overrides the shared
  autoplaying YouTube background with a static photo. This is Arriving-specific; no other page pins a
  hero image.
- **No standalone "arrival gate" photo block exists on this page, before or after Layer 1.** A prior
  build inserted one and it was deleted whole, section wrapper and all, with the gap above "Four
  Routes, One Beach" closed (C6). It is not part of this spec's section order and a rebuild must not
  add it back; `media/arriving/arrival-gate.jpg` stays on disk, unused, for a possible future use.
- **"What Happens When You Land" carries `.media-band .media-fade`** (C7, treatment defined in
  `of-v2-revisions.md` §3.2): the beach-walk photo runs full viewport width with the text scrimmed over
  it, fading at the edges rather than sitting in a hard-edged frame.
- **Who To Call, three corrections** (C8): Sansa Airlines' label becomes `Sansa Airlines, the airline
  between Drake Bay and San José` (numbers and `(unconfirmed)` markers unchanged); the Drake Bay Taxi
  entry is removed entirely; Tracopa Bus Lines' name links to `https://www.tracopacr.com/`.

## 3. Contracts

### Hero
- Slug: `arriving`
- Eyebrow: `Getting Here`
- `h1`: `Arriving Is Part of the Adventure`
- Sub: `Every route to Ocean Forest Ecolodge ends the same way: a walk on the sand. Here is exactly what to expect, in the order you will need it.`
- `data-hero-image="hero/hero-wide.jpg"` on the `.hero-media` slot. (Added 2026-08-09, C5 — superseding
  the original plain A0 slot, which used the shared YouTube film like every other page. Arriving pins
  to this still photograph instead; see Decisions.)

### Section order on the page
1. Layer 1 — regional map
2. The warning block
3. Layer 2 — four route cards, each with its sentence, then the four-route picker, then the picked route's map
4. Layer 3 — what happens when you land
5. Departing
6. Helpful Contacts
7. Travel Tips / What to Pack
8. Arriving FAQ
9. Gallery (shell-provided, offset 0)

(Renumbered 2026-08-09 — the original item 8, "Group Travel CTA (placeholder)", is removed. C9. What
was FAQ/Gallery at 9/10 are now 8/9.)

### Layer 1 — regional map
- Static image, no zoom controls, no embed. `data-media="arriving/map-region.jpg"` inside a `.ph`-pattern frame, `data-ratio` left to the builder based on the source artwork's real proportions once dropped in.
- Caption text: `Costa Rica, San José to the Osa Peninsula. Ocean Forest Ecolodge sits just south of Drake Bay, on the northern edge of Corcovado National Park.`
- Shows, per brief §4: San José, Palmar Sur, Drake Bay, the lodge. No other layer.
- **Verify before relying on this as shipped:** `media/arriving/map-region.jpg` exists on disk as of
  2026-08-09 but is a 0-byte file, so the frame currently renders the labelled "Photo to come"
  placeholder, not a real map, regardless of what any earlier report claimed. Confirm the file's actual
  size before treating Layer 1 as done.

### The warning block, verbatim
Render as three short lines, not a paragraph, above the route cards:
> The boat from Sierpe is the safest arrival and you do not need a car here.
>
> Driving means a 4x4 and two river crossings, and in rain neither direction can be guaranteed.
>
> **Every route ends with a 20 minute walk on sand. Pack light, bring a backpack.** Porter service exists and suitcases are fine, but nobody should discover this on arrival.

### The route-card sentence, verbatim, appears on whichever route card involves that leg (both boat and bus+boat routes get the first paragraph; both drive and fly routes get the second)
> **Boat from Sierpe** → you land at San Josecito **Beach** → walk **SOUTH** 20 minutes, ocean on your **right**.
>
> **Car, taxi or plane** → you are dropped at San Josecito **School** → walk **NORTH** 20 minutes, ocean on your **left**.

### The four route cards, in this order, each collapsed until picked (reuse the `.sh-acc` accordion pattern from `shared-sections.js` lines 271–284, scoped locally rather than imported, since this page needs its own picker-plus-map behavior the shared component doesn't have)
1. **Boat from Sierpe** — slug `boat`. Season: all year. Badge: "Our recommendation". Summary: `Donde Jorge Restaurant, Sierpe. Departs 11:30 AM ($30) or 4:00 PM ($40). Arrive 30 minutes early, 15 kg limit. 90 minutes through the mangroves and out to the Pacific. Lands at San Josecito Beach, walk south.`
2. **Bus + Boat** — slug `bus-boat`. Season: all year. Badge: "Budget". Summary: `Tracopa bus from San José. Get off at Palmar Norte. Taxi to Sierpe. Connect with the afternoon boat.`
3. **Drive to San Josecito** — slug `drive`. Season: dry season only, December to April. Summary: `4x4 required, two river crossings. About 370 km from San José. Park at the rural school. Walk north.`
4. **Fly to Drake Bay** — slug `fly`. Season: dry season only. Summary: `Sansa Airlines from San José, book a month ahead. 4x4 taxi transfer. Dropped at the school. Walk north.`
Clicking a card marks it selected (single-select, radio behavior) and reveals, below the four cards, the map for that route only: `data-media="arriving/map-route-<slug>.jpg"`. Before any card is picked, no map renders — that space is simply not there, not a placeholder (per brief §4, Layer 2 "begins as no map at all").
Below the picked map, a "Download arrival card" button, `href="/media/pdf/arrival-<slug>.pdf"` (root-absolute, not a `../` climb — see the standing rule), disabled with label "PDF to come" if the file 404s (test via the same `img.onerror`-style check used elsewhere, adapted for a link: a `HEAD`-equivalent probe via `fetch` with a `.catch`, or simpler, an `<a>` that a small script disables after an `Image()`-style existence probe on a matching marker file — implementer's choice, but the visible behavior contract is fixed: real PDF present → button works; absent → button visibly disabled with that exact label).

### Layer 3 — what happens when you land, verbatim source: `.org/departing/` "VIA DRAKE BAY" and "VIA THE SIERPE RIVER" blocks (source-copy/org-copy.md lines 756–815), condensed to the walk-and-onward-transport facts only, not the full return-flight logistics (that belongs in Departing, not here):
> Every route ends the same way: a 20 minute walk along San Josecito Beach, in the direction your route card told you. If you asked for porter service, our staff will meet you at the drop point and help with your bags.

Keeps `arriving/beach-walk.jpg` and gains `.media-band .media-fade` (added 2026-08-09, C7, treatment
defined in `of-v2-revisions.md` §3.2): full viewport width, minimum 70vh, fading at the edges rather
than a hard-edged frame.

### Departing section — ported verbatim from `.org/departing/` (source-copy/org-copy.md lines 751–815)
Include both sub-blocks as written there:
- **Via Drake Bay**: the 6:30 AM breakfast, 7:00 beach walk, 7:30 taxi, 8:15 airport arrival, 9:10 flight timeline, plus the note about giving 3 hours before an international departure.
- **Via the Sierpe River**: the 6:00 AM breakfast, 6:30 beach walk, 6:50 water ferry, 8:30 Sierpe arrival timeline, plus onward-by-land and onward-by-air options and the transfer rates ($20 boat to Sierpe per person, $5 colectivo or $20 private taxi).

### Helpful Contacts — ported verbatim from `.org/helpful-contacts/` (source-copy/org-copy.md lines 928–1058), limited to the entries the brief names, **with the three 2026-08-09 corrections below (C8)**: Donde Jorge Restaurant / boat dock (+506 8825-3326), Sansa Airlines (+506 2290 4100, US 1-877-767-2672), Trans Alvarez / Pedro, Sierpe taxi (+506 8703-2121, transalvarezso@hotmail.com), ~~Drake Bay taxi ($50 for 2-4 people, $40 for 1, paid in cash)~~, Tracopa bus lines (+506 2221-4214). Every phone number and email carries a small inline marker, styled with the same dashed/teal language as the `.ph` placeholder but inline: `(unconfirmed)`. Remove the marker only once Eli confirms — see §6.

**C8, superseding the entries above where they conflict:**
- **Sansa Airlines'** entry label becomes `Sansa Airlines, the airline between Drake Bay and San José`. Numbers and the `(unconfirmed)` markers are unchanged.
- **The Drake Bay Taxi entry is removed entirely.** Do not render it, marker or no marker.
- **Tracopa Bus Lines'** name links to `https://www.tracopacr.com/`.

### Travel Tips / What to Pack — ported verbatim from `.org/travel-tips-on-route-info/` and `.org/pack/` (source-copy/org-copy.md lines 1143–1247), specifically:
- The full "What to Pack list" bullet list (head lamp, sunhat/towel/flip-flops, suntan lotion/sunscreen/bug repellant, day pack/water bottle, bathing suit and quick-dry clothes, toiletries, rain poncho May–December, pullover for San José, hiking shoes).
- The "Optional items" list (sunglasses, water shoes, windbreaker, camera/binoculars, snorkel set, journal).
- The 25 lb (not 15 kg here — this is the Sansa domestic-flight limit, distinct from the boat's 15 kg carry limit already stated on the boat route card) local-flight weight note and its $1/lb overage charge.
- The backpack-not-suitcase note, verbatim: `Remember the last leg of the journey is by foot, best to use a back pack rather than a suitcase. Non the less, porter service is provided, and suitcase is fine if it's what you have.`

### Group Travel CTA — removed
(Rewritten 2026-08-09, C9 — superseding the original "placeholder card" contract below, which this
section used to specify.) There is no Group Travel CTA on this page: no heading, no "Copy for this
section is still being written" line, no `[Group Travel CTA — Eli]` marker, and no gap where it used
to sit. If group-travel copy is ever written, it gets its own spec addition rather than reviving this
placeholder.

### Arriving FAQ — new, not sourced verbatim (no existing FAQ is Arriving-specific), built from facts already established elsewhere on this page. Three entries minimum:
1. "What is the difference between San Josecito School and San Josecito Beach?" — answer restates the route-card sentence in prose.
2. "Do I need a car?" — answer restates the warning block's first line.
3. "Can someone carry my bags?" — answer restates the porter-service line from What to Pack.

## 4. Acceptance checks

**Run these over http, not from Finder** (A0 §4) — `python3 -m http.server 8080`, then
`http://localhost:8080/v2/arriving.html`.

1. Layer 2 shows no map at all until a route card is clicked, and shows only that route's map once one is.
2. The route-card sentence (School vs. Beach, direction, which side the ocean is on) appears verbatim, unedited, on the relevant cards.
3. All four route summaries match brief §4 exactly on price, time, and season.
4. The walk time reads 20 minutes everywhere on this page, with no instance of 15.
5. The Helpful Contacts section is not rendered without its "(unconfirmed)" marker on every remaining
   phone number and email, Sansa Airlines' label reads "Sansa Airlines, the airline between Drake Bay
   and San José", Drake Bay Taxi does not appear anywhere on the page, and Tracopa Bus Lines' name
   links to `https://www.tracopacr.com/`. *(Rewritten 2026-08-09 to add C8, which the original check
   never tested for.)*
6. **There is no Group Travel CTA anywhere on the page** — no heading, no placeholder card, no `[Group
   Travel CTA — Eli]` marker, and no gap where it used to sit. `grep -n "Group Travel\|Traveling as a
   group" v2/arriving.html` returns nothing. *(Rewritten 2026-08-09 — this check previously required
   the placeholder to render, which would make a build thread reinstate the whole block and report
   success. C9.)*
7. There is no standalone "arrival gate" photo section anywhere on the page, and no gap left above
   "Four Routes, One Beach" where one might have been. The hero shows `hero-wide.jpg` as a still image,
   not the shared autoplaying film. "What Happens When You Land" is full viewport width with the
   beach-walk photo and fades at its edges rather than sitting in a hard-edged frame. *(Added
   2026-08-09 for C5, C6, C7, which the original eight checks did not cover at all.)*
8. No em dash or en dash appears anywhere in this page's visible copy.
9. The full page loads with no console errors, including the Layer 1 map frame (which may still show
   its labelled placeholder — see the note under Layer 1 in Section 3 about `map-region.jpg`'s current
   file size) and all four route cards. *(Rewritten 2026-08-09 — root-absolute paths mean this can no
   longer be verified by double-clicking the file from Finder; see A0 §2.)*

## 5. Out of scope

The SVG rebuild of the regional/route maps (separate later spec), the property map (belongs to Lodging, A2), the general site-wide FAQ (belongs to About, A5), actually producing the four arrival-card PDFs, writing Group Travel copy (removed from this page entirely, C9 — a future version is a new spec, not a revival of the placeholder).

## 6. Parking line

- **Confirming the Helpful Contacts numbers** — blocked on Eli. The section can be built and reviewed with the "(unconfirmed)" marker in place; only publishing it live requires her sign-off, per brief §4.
- **The four arrival-card PDFs** — not blocked on anyone in particular, just not produced yet. The page is built to accept them with no code change once they exist.
- **`media/arriving/map-region.jpg` is a 0-byte file as of 2026-08-09** — not blocked on anyone named, just flagged so it is not mistaken for shipped. Confirm its real size before treating Layer 1 as done. *(Added 2026-08-09 — the original parking line named "Group Travel CTA copy" here; that item is removed along with the section itself, C9.)*

## 7. Build prompt

```
Read specs/of-v2-shell.md first and build this page on top of what it defines — reuse shell.css
and shell.js exactly as that spec describes, do not fork or duplicate them. If ocean-forest-website
/v2/shell.css and shell.js do not exist yet, build them first, following of-v2-shell.md exactly,
then build this page.

Read specs/of-v2-arriving.md in full — Section 3 "Contracts" is literal: the warning block, the
route-card sentence, and the four route summaries are exact copy, not to be paraphrased. Where the
spec cites source-copy/org-copy.md line ranges, open that file and pull the copy from there
verbatim.

Build ocean-forest-website/v2/arriving.html: hero pinned to hero-wide.jpg via data-hero-image (not
the shared film), Layer 1 static map (check the real file size of media/arriving/map-region.jpg
before assuming it renders — as of 2026-08-09 it is 0 bytes and shows the placeholder), the warning
block, four route cards with the no-map-until-picked behavior, Layer 3 with the beach-walk photo in
.media-band .media-fade, Departing, Helpful Contacts (every remaining contact marked unconfirmed,
Sansa's label updated, Drake Bay Taxi absent, Tracopa linked), Travel Tips / What to Pack, the
three-entry Arriving FAQ, and the shell's gallery section at offset 0. Do NOT build an
"arrival gate" photo section and do NOT build a Group Travel CTA of any kind, placeholder or
otherwise — both are deliberately absent from this page.

Every local reference is root-absolute (/v2/shell.css, /media/arriving/..., /media/hero/...). Never
a ../ climb.

When done, serve the folder over http (python3 -m http.server 8080) and open
http://localhost:8080/v2/arriving.html. Do NOT test by double-clicking the file — every local
reference is root-absolute and will 404 over file://. Click through all four route cards to confirm
the no-map-then-map behavior works, the FAQ entries expand, and nothing is broken. List the nine
acceptance checks from the spec and state pass/fail for each, including which item is structurally
blocked on Eli (state it as blocked, not failed).
```
