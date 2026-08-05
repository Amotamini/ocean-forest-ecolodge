STATUS: DRAFT

# A4 — Retreats

> Amended 2026-08-05 after reading `ocean-forest-website/retreats.html` in full. The first draft
> was written without that file (brief §13 flags it as the one real defect among the seven specs),
> so its Contracts section described a thin "carry the body verbatim" page. The page is the opposite:
> the largest and most interactive of the seven. Everything below now matches what is actually on it.

## 1. Goal

Carry the existing retreats page onto the V2 shell with its content unchanged, since Eli called it
already right ("exactly what we have, I think it's perfect, we don't need to change nothing"). The
page is not thin: it is eight sections, a hero with a six-anchor stat line, two `shared-sections.js`
mounts, and a fully embedded interactive pricing calculator with its own room database and payment
math. "Carry it onto the shell" means every one of those survives verbatim; only the chrome (header,
hero shell, footer, gallery) is swapped for A0's, and the page's own inline asset paths gain the
`../` climb that living inside `v2/` requires.

## 2. Decisions

- Eli, quoted in the brief (§7): the retreats page is perfect and needs no content change. So no
  copy, no section, no card, no calculator behaviour, no CTA on this page is rewritten, reordered,
  or removed. The only changes are the shared A0 chrome and the hero slot.
- Built on the A0 shell, as `ocean-forest-website/v2/retreats.html`, hero slug `retreats`, gallery
  offset `4` (both fixed by `of-v2-shell.md` §3).
- **Header swap.** The current page carries its own header: an in-page anchor nav (Shala, Rooms,
  Food, Tours, Arriving, Pricing, Book a stay) plus a "Talk to Eli" button targeting `#inquire`.
  That is replaced wholesale by the A0 header: the five cross-page links (Arriving, Lodging,
  Experiences, Retreats, About) with **Retreats** marked `aria-current="page"`, and the A0 "Book now"
  button targeting the securebookings URL. The in-page wayfinding the old header provided does not
  vanish, because the hero's stat line (kept, see below) carries the same anchors.
- **Hero swap, with the page's real copy.** The current hero is a full-bleed YouTube aerial-video
  background (`youtube-nocookie` embed, id `AjqtTXfJbeg`) with a scrim, the headline, and the stat
  line. It is replaced by the standard A0 empty hero slot (slug `retreats`, `mp4` then `jpg` then
  placeholder — `of-v2-shell.md` §3 Hero slot contract). This is the one deliberate media change on
  the page: the YouTube background is dropped, and the slot shows its labelled placeholder until
  `../media/hero/retreats.mp4` or `.jpg` exists. The **headline copy is carried from the page, not
  invented** — the first draft guessed at hero copy that does not exist on the page; the real copy is
  in §3 below and is Eli's, frozen.
- **Stat line is kept.** The hero's `<nav class="statline">` (six in-page anchors) moves onto the V2
  page directly beneath the A0 hero slot, verbatim. It is page-specific, not part of the A0 shell, and
  it is now the page's only in-page navigation once the A0 header stops carrying anchors. Its figures
  (32, 3 meals, 9 tours, 3 ways in, 46 ft, $) are Eli's content and are not touched.
- **Footer swap.** The current footer's "This page" / "More" columns are in-page anchor lists; they
  are replaced by the A0 footer (five-page mirror plus "Book now"), per `of-v2-shell.md` §3.
- **The two shared mounts are carried as-is.** `<div data-shared="tours">` (§4 Experiences) and
  `<div data-shared="logistics">` (§5 Arriving) stay mounted exactly where they are, and the page
  loads `../shared-sections.js` so they render. `shared-sections.js` self-injects its own styles and
  renders placeholder frames (it does not load real image files), so it works from inside `v2/` with
  no path change — do not alter it.
- **The calculator is carried whole.** The `#calculator` section, its two inline `<script>` blocks,
  and the `CALC_ROOMS` twelve-room database are page-specific and stay in the page. Its CSS stays in
  the page's own `<style>`.
- No new copy is written anywhere on this page. If the current page has an outdated figure or a bug,
  it is carried forward as-is and named in the build report, not silently fixed (§5).

## 3. Contracts

The page, top to bottom. Header, hero shell, gallery, and footer come from A0 (`of-v2-shell.md` §3);
everything between the hero and the gallery is this page's own content, carried verbatim.

### Header
The A0 header markup exactly (`of-v2-shell.md` §3 "Nav markup"), with the **Retreats** link given
`aria-current="page"` and the `.current` class. Do not carry the old header's anchor nav or its
"Talk to Eli" button.

### Hero
A0 hero slot markup (`of-v2-shell.md` §3 "Hero slot contract"), `data-hero-slug="retreats"`, filled
with the page's real hero copy, carried verbatim:
- Eyebrow: `Made for retreat leaders`
- `h1`: `Everything goes smoothly <em>if you choose us.</em>` (the `<em>` on "if you choose us." is
  in the source and the shell's `h1 em` italic/accent styling renders it; keep it)
- Sub: `You bring your program, your teaching, your students. That's all. We handle everything else:
  accommodation, three meals a day, space setup, local logistics, and any activities your group wants
  to add on.` (longer than the A0 "one-sentence sub" default; kept in full because Eli froze the copy)

### Stat line
Directly beneath the hero slot, carried verbatim from the current hero (`retreats.html` lines
663–670): `<nav class="statline" aria-label="What's covered">` with six anchors, in order:
`#accommodation` (32, "Accommodation for") · `#food` (3, "Meals a day") · `#experiences` (9, "Tours")
· `#arriving` (3, "Ways in — logistics") · `#shala` (46 ft, "Yoga shala") · `#calculator` ($,
"Pricing"). The `.statline` CSS is page-specific and stays in the page's `<style>`.

### Body — eight sections, verbatim into `<main>`
Every section below moves into the V2 page's `<main>` exactly as it is today, with its `id`, heading,
copy, and markup unchanged. Section IDs are load-bearing: the stat line, and any in-page link, target
them.

1. **`#shala`** — eyebrow "The premium thing", `h2` "A beachfront sanctuary. Built for practice.",
   lead, the shala video placeholder (`data-video="video/shala-360.mp4"`, waiting on Ryan), the
   four-paragraph body (Dharma Hall / "foot candy" / 2003 horse-pasture history / two-decades
   refinement), the conservation pull-quote, the `shala-feature.jpg` photo, and the four-cell specs
   grid (Height 46 feet / 3 levels · Dharma Hall 1,614 sq ft · Floor Hardwood, polished · Equipment
   Full props included).
2. **`#accommodation`** (`.alt`) — eyebrow "Accommodation", `h2` "Accommodation for up to 32 guests",
   lead, five `accom-card`s (Beach Bungalows · Jungle Suites · Cachimbo Rooms · Garden Bungalow ·
   Lapa Lapa Rooms) plus the `accom-total` card "Ten rooms, 32 guests". The ten-rooms / 32-guests
   finals are the client-corrected numbers from `of-main-page.md` §2; carry them as written.
3. **`#food`** — eyebrow "Retreat package · full board", `h2` "Everything covered. Nothing to
   manage.", lead, the `food-quote` plus `lodge-breakfast.jpg` photo, the six-item `included-grid`
   (Full Accommodation · 3 Meals Daily + Beverages · Exclusive Yoga Shala Use · Guided Río Claro Tour
   · Travel Logistics Support · On-Site Staff Throughout), and the `leader-banner` ("The group leader
   stays complimentary.").
4. **`#experiences`** (`.alt`) — the shared tours block: `<div data-shared="tours"></div>`, nothing
   else. Rendered by `../shared-sections.js`.
5. **`#arriving`** — the shared logistics block: `<div data-shared="logistics"></div>` plus the one
   `loc-note` paragraph ("Playa Rincón de San Josecito · Osa Peninsula · Costa Rica…").
6. **`#calculator`** (`.alt`) — eyebrow "Pricing", `h2` "Run your own numbers.", the pricing intro,
   and the fully embedded interactive retreat calculator: guests / nights / season / price-per-guest
   inputs, automatic room allocation, per-room sliders that rebalance, add/remove room controls, the
   25 / 50 / 25 payment schedule, the PDF-export-via-print button, the disclaimer, and the
   complimentary-leader pricing note. Driven by `CALC_ROOMS` and the section's two inline `<script>`
   blocks. Carried whole.
7. **`#kit`** — eyebrow "One document", `h2` "Want everything in one document?", the ghost CTA to
   `/retreat-host-kit` (opens in a new tab).
8. **`#inquire`** (`.alt`) — eyebrow "Before you write", `h2` "Is Ocean Forest right for your group?",
   the `fit-grid` (seven-item `fit-list` plus the two side-boxes "Worth knowing" and "What you
   bring"), the four-step `process-steps` grid (Reach out · Quick call · Book & deposit · Arrive &
   teach), and the `close-box` (`h3` "Let's talk about your retreat.") with its two CTAs: WhatsApp Eli
   (`https://wa.me/50687379416`) and Email Eli (`mailto:eli@oceanforest.org`).

Note: the old page's discovery-call Google-Calendar modal is already gone from the source (it was
never configured); do not reintroduce it.

### Gallery
A0 gallery section, `data-gallery-offset="4"` (`of-v2-shell.md` §3 Gallery contract). Replaces
nothing on the current page, which has no gallery of its own.

### Footer
A0 footer markup exactly (`of-v2-shell.md` §3 "Footer markup"). Do not carry the old footer's
"This page" / "More" anchor columns.

### Styles — what stays in the page's own `<style>`
shell.css now provides the chrome and the shared vocabulary (`:root` palette, `body.light`, header/
nav, the A0 `.hero`, `.sec-head`, `.grad-text`, `.grad-bar`, `.lead`, `.ph` / `[data-media]`, `.cta`,
footer, `.reveal`, base). Keep in the page's own `<style>` only the rules shell.css does not define:
`.statline`, `.body-p`, and the section-specific blocks — shala (`.shala-*`, `.specs`, `.spec*`),
accommodation (`.accom-*`), food (`.food-*`, `.included-grid`, `.include-*`, `.leader-banner*`), the
entire calculator block (`.calc-*`, `.payment-*`, `.pricing-*`, `.cr-*`, `#calcPrintBlock` and its
`@media print` rules), `.kit-box`, and inquire (`.fit-*`, `.side-*`, `.process-*`, `.step-*`,
`.close-*`, `.loc-note`). Drop the old page's duplicated chrome CSS (its own `:root`, `body.light`,
header/nav, footer, `.cta`, `.reveal`, `.ph`, base reset) and its now-unused hero rules (`.r-hero*`),
since shell.css and the A0 hero slot replace them.

### Asset paths — the `../` climb
Every asset reference on this page must gain the `../` prefix that `of-v2-shell.md` §2 mandates for
everything inside `v2/`. This page has its own inline loaders the shell does not touch, and each is a
place to get this wrong:
- Direct `<img src>`: `images/shala-feature.jpg` and `images/lodge-breakfast.jpg` become
  `../images/…`.
- The shala video probe (the page's own `<script>`) builds `'media/' + data-video`; change that
  prefix to `'../media/'` so `../media/video/shala-360.mp4` resolves.
- Any `[data-media]` host on this page resolves through shell.js's `../media/` loader; no per-element
  change needed beyond using shell.js.
- `../shared-sections.js` is loaded with a `<script src>`; it needs no path edit itself.

### Scripts the page must load
- `../shell.js` (theme, header shrink, mobile burger, hero-slot loader, gallery rotation, reveal).
- `../shared-sections.js` (mounts the tours and logistics blocks; self-injects its styles).
- The page's own two inline `<script>` blocks: the shala-video probe / reveal helpers, and the
  calculator (with `CALC_ROOMS`). Carried verbatim except the `media/` → `../media/` prefix fix above.

## 4. Acceptance checks

1. Every section of body copy on the current `retreats.html` appears on `v2/retreats.html` unedited:
   the shala copy, pull-quote and specs; the five accommodation cards and the "Ten rooms, 32 guests"
   total; the food quote, the six included-package items and the leader banner; the calculator; the
   kit box; and the seven-item fit list, two side notes, four process steps and close box.
2. The header is the A0 five-page nav (Arriving, Lodging, Experiences, Retreats, About) with Retreats
   marked current and the A0 "Book now" button — not the old anchor nav or the "Talk to Eli" button.
3. The hero is the A0 slot (slug `retreats`) carrying the page's real copy — eyebrow "Made for retreat
   leaders", `h1` "Everything goes smoothly *if you choose us.*" with "if you choose us." italicised,
   and the "You bring your program…" sub — and it shows the hero placeholder, because no
   `../media/hero/retreats.*` exists yet. The old YouTube background is gone.
4. The stat line sits directly beneath the hero with its six anchors, and each one jumps to its
   in-page section: `#accommodation`, `#food`, `#experiences`, `#arriving`, `#shala`, `#calculator`.
5. Both shared blocks render from `../shared-sections.js`: the `data-shared="tours"` tabs under
   `#experiences`, and the `data-shared="logistics"` accordion plus the `loc-note` under `#arriving`.
6. The embedded pricing calculator works end to end when the page is opened from Finder: changing the
   guest count re-allocates rooms, a room slider rebalances the others, the payment schedule renders,
   and the PDF-export button opens the print dialog. The whole component and its `CALC_ROOMS` data are
   carried whole.
7. Every asset reference resolves with the `../` prefix from inside `v2/` (the two `<img>`s, the shala
   video probe's `../media/` path, any `[data-media]` host), the A0 gallery shows the offset-4 slice,
   and the A0 footer has replaced the old anchor-column footer.
8. No em dash or en dash appears anywhere in this page's visible copy (check the carried-forward copy
   too; fix only dash characters, nothing else, if any are found).

## 5. Out of scope

- Any content change beyond the header, hero, footer, and gallery swaps. If the current page has a
  bug or an outdated figure, carry it forward as-is and flag it in the build report; do not fix it
  silently.
- Editing `shared-sections.js` or the calculator's logic. Both are carried whole.
- Supplying hero media. The slot is built empty and takes `../media/hero/retreats.mp4` (or `.jpg`)
  later with no code change, exactly like every other V2 page. Dropping the old YouTube background is
  a deliberate consequence of adopting the A0 slot (brief §2, §7), not an omission — but if Mehdi
  wants the aerial video kept as the interim hero rather than the empty slot, that is his call to
  make before A4 is built.

## 6. Parking line

The hero being empty until Ryan's per-page footage lands is the same wait every V2 page shares; it
does not block building A4. Not blocked on the client, just not filmed yet.

## 7. Build prompt

```
Read specs/of-v2-shell.md first and build this page on top of what it defines: reuse
ocean-forest-website/v2/shell.css and shell.js exactly as that spec describes. If those two files do
not exist yet, build them first, following of-v2-shell.md exactly, then build this page.

Read specs/of-v2-retreats.md, then read ocean-forest-website/retreats.html in full. That file is your
copy source, verbatim: Eli has confirmed the retreats page needs no content changes. Your job is to
carry all eight of its body sections, its hero stat line, its two shared-sections mounts, and its
whole embedded pricing calculator onto the A0 shell, changing only the chrome.

Build ocean-forest-website/v2/retreats.html:
- The A0 header, with the Retreats link marked current. Not the old anchor nav or "Talk to Eli".
- The A0 empty hero slot, slug "retreats", carrying the real hero copy from the spec (eyebrow,
  the h1 with "if you choose us." in <em>, and the "You bring your program…" sub). Drop the old
  YouTube aerial background.
- The stat line, verbatim, directly beneath the hero slot.
- Every section currently in retreats.html's <main> (#shala, #accommodation, #food, #experiences,
  #arriving, #calculator, #kit, #inquire) carried forward unedited, including the two
  data-shared mounts and the entire calculator with its CALC_ROOMS data and both inline scripts.
- The A0 footer, then the A0 gallery section at offset 4.
- Load ../shell.js and ../shared-sections.js. Keep the page's own two inline scripts, changing only
  the shala video probe's 'media/' prefix to '../media/'.
- In the page's own <style>, keep only the rules shell.css does not already provide (the stat line,
  .body-p, and the section-specific blocks listed in the spec's Styles contract); drop the duplicated
  chrome CSS and the old .r-hero* rules.
- Add the ../ climb to every asset reference (the two <img> src attributes and the video probe path).

When done, open ocean-forest-website/v2/retreats.html directly from Finder in a browser (no server),
and open the current ocean-forest-website/retreats.html beside it to confirm every section of body
copy matches. Exercise the calculator: change the guest count, drag a room slider, and click Export
as PDF. List the eight acceptance checks from the spec and state pass/fail for each. If you find
anything in the existing page that looks broken or outdated, name it in your report without fixing it.
```
