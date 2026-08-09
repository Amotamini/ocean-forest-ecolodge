STATUS: SHIPPED 2026-08-06

Built as `ocean-forest-website/v2/index.html`. All 8 acceptance checks pass, verified on
2026-08-06: DOM, copy and paths checked programmatically in a browser against the five source pages.
No tease disagreed with its page, so no home-to-page fixes were needed. Every teasable string
(room names, prices and meta, the food framing, the tour groups, the two retreats lines) was lifted
from the built pages, not re-authored. V1's `ocean-forest-website/index.html` is untouched (last
modified 2026-08-03) and nothing above `v2/` was created, edited or moved.

**REVISED 2026-08-09.** The home shipped 2026-08-06 with a self-invented hero — two white path
cards below the fold — because the build thread that wrote it was told to summarise from the five
built pages and never read V1's `index.html`. Mehdi rejected that hero on 2026-08-07 (C3, C4) and
it was rebuilt by porting V1's hero verbatim with V2's words, per `of-v2-revisions.md` §3.1. The
room photographs this spec's parking line called the launch blocker are also in: Eli delivered
twelve files to `media/lodging/` on 2026-08-07. Both corrections are folded in below, plus the
asset-path rule, which was wrong in the original. A rebuild from this document now reproduces the
live page rather than reverting it.

# A6 — Home

> Written last, and derived from the five built V2 pages, exactly as brief §1 and §9 require. This
> spec summarises what already exists on `v2/arriving.html`, `v2/lodging.html`, `v2/experiences.html`,
> `v2/retreats.html` and `v2/about.html`; it never invents copy that sits beside them. Where the home
> and a page could disagree, the page is right and this spec defers to it. Every fact below was read
> off the built pages on 2026-08-06.

## 1. Goal

Build the V2 home: the one page for the visitor who wants to scan, not read. It teases everything the
five pages hold and lets that visitor understand what is offered without opening a single one, then
sends them to the right page when they want the full version. It is assembled on the A0 shell, and
its content is a shortened mirror of the pages, written once (brief §1): the home shortens the pages,
it does not restate them in new words.

The home is the page the site opens on at `/`. It is built as `ocean-forest-website/v2/index.html`.

## 2. Decisions

- **The file is `ocean-forest-website/v2/index.html`.** It does not, ever, overwrite or edit V1's
  `ocean-forest-website/index.html`, which stays live and untouched while V2 is under construction
  (A0 §2). Nothing in `ocean-forest-website/` above the `v2/` folder is edited by this build. Turning
  `v2/index.html` into the served route `/` is a deploy-time decision, out of scope here, exactly as
  the sibling pages turn `arriving.html` into `/arriving` at deploy time (A0 §6).
- **Built on the A0 shell.** Reuse `v2/shell.css` and `v2/shell.js` as every other page does, linked
  same-directory (`shell.css`, `shell.js`, not `../shell.js`). **Every local reference is
  root-absolute** — `/v2/shell.css`, `/v2/lodging.html`, `/images/logo-white.png`, `/media/...` — not
  a `../` climb. (Rewritten 2026-08-09 — the original rule broke the deployed home twice: a relative
  `shell.css` on a page served with `vercel.json`'s `trailingSlash: false` resolves to nothing and the
  page renders with no stylesheet at all. See A0 §2, the standing rule.) **Consequence:** the home no
  longer opens correctly by double-clicking from Finder; it must be served over http and tested at
  `http://localhost:8080/v2/` or the deployed URL. The header, hero slot, gallery section and footer
  come from A0.
- **No "Home" nav item.** The menu is the five pages in order (Arriving, Lodging, Experiences,
  Retreats, About), per A0 §2. No nav link carries `aria-current` on the home, because the home is not
  in the menu; the logo is the link back here. Do not add a sixth nav item.
- **The home's hero is V1's hero, ported verbatim in structure, with V2's words.** (Rewritten
  2026-08-09 — this spec originally described the pre-revision hero: an empty A0 slot with a compressed
  headline and, below the fold, two white path-box cards. Mehdi rejected that build on 2026-08-07: the
  build thread that wrote it was told to summarise from the five built pages and never read V1's
  `index.html`, so it invented a hero instead of evolving the one that already worked. C3, C4,
  `of-v2-revisions.md` §3.1.) Source of truth is `ocean-forest-website/index.html`'s `<div class="hero">`
  block: port `.hero`, `.hero-media` (the A0 slot, `data-hero-slug="home"`), `.hero-scrim`,
  `.hero-inner`, `.fork`, `.fork-grid`, `.path`, `.path-kicker`, `.path-title`, `.path-desc`,
  `.path-arrow`, `.fork-extra` structurally unchanged; take only the CSS these classes need, not V1's
  stylesheet wholesale. V1's `.fork-label` ("Why Ocean Forest Ecolodge?") is dropped — V2's boxes carry
  their own kickers and the label is redundant. Content, see §3 Hero below.
- **The home's teasable copy is lifted and shortened from the pages, never re-authored.** Room names,
  prices, the food framing, the tour groups and the retreats line are taken from the built pages as
  quoted in §3. If a page is later edited, the home is re-shortened from it; the page is the source of
  truth.
- **The three visual blocks are static teasers, not the shared interactive components.** The home does
  not mount `data-shared="tours"` and does not load `shared-sections.js`; it shows a photo-led block
  that links to `experiences.html`. Only the two pages with live shared mounts load that script.
- **Reviews and the newsletter are the two home elements with no page to mirror.** They are built as
  honest, labelled slots: the reviews block shows a "testimonials to come" placeholder rather than any
  invented quote, and the newsletter is a real signup field whose submission target is undecided (§6).
  Both are in brief §9's running order and are kept.
- **Light is the default theme,** inherited from `shell.js`. No second theme handler, no second reveal
  observer: the shell owns theme, header shrink, burger, hero slot, gallery and reveal. The home's own
  inline script does only what the shell has no equivalent for (§3, Scripts).
- **No em dashes or en dashes** anywhere in visible copy (A0 §2). Use "and", a comma, or a period.

## 3. Contracts

Top to bottom. Header, hero shell, gallery and footer come from A0 (`of-v2-shell.md` §3); everything
between the hero and the gallery is the home's own teaser content, summarised from the pages.

### Head
Same `<head>` shape as the five pages: the three Google font links, `<link rel="stylesheet"
href="shell.css">`, and a page-only `<style>` block holding just the home's own section rules (see
Styles). Title `Ocean Forest Ecolodge · Beachfront rainforest lodge on the Osa Peninsula` (or similar;
this is the one page whose title is not "X · Ocean Forest Ecolodge", because it is the root).

### Header
The A0 header markup exactly (`of-v2-shell.md` §3 "Nav markup"), the five links in order and the logo
linking to `index.html`. **There is no theme button.** (Rewritten 2026-08-09 — light is the only
theme, D7. See A0 §2 and §3.) The A0 "Book now" button targets
`https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3`. No link
is marked current.

### Hero — ported from V1, not the A0 empty slot alone
(Rewritten 2026-08-09, replacing the original "empty A0 slot plus headline plus a Watch-the-full-film
link" contract, and absorbing what used to be the separate "Path boxes" section below it — C3, C4,
`of-v2-revisions.md` §3.1. The build that shipped 2026-08-06 put two white path-box cards below the
fold instead; that was rejected and this is what replaced it.)

The A0 hero slot (`data-hero-slug="home"`) sits inside V1's full hero structure, ported verbatim:
`.hero` → `.hero-media` (the slot) → `.hero-scrim` → `.hero-inner`, and inside `.hero-inner` the copy
below followed by `.fork` (the two path boxes) as a child of the hero, not a separate section after it.

Inside `.hero-inner`:
- Eyebrow: `Drake Bay · Osa Peninsula · Costa Rica · Since 2003` — restored from V1 exactly.
- `h1`: `Your beachfront ecolodge at the edge of Corcovado National Park.`
- Sub: `The most biodiverse place on Earth. No roads. No crowds. Just jungle.`
- A "Watch the full film" link (`.hm-film`), `target="_blank" rel="noopener"`, pointing at the
  full-film YouTube URL (content slot, §6), placed between the sub and the fork, sized so it does not
  compete with the boxes. It renders as a text/button control, not by making the autoplaying
  background itself the click target, so it is keyboard reachable.

`.fork` — two translucent panels sitting **on** the hero, not white cards below the fold:
- **`.path-stay`** → `/v2/lodging.html`. Kicker `I WANT TO STAY`, title `Ten rooms on a remote mile of
  beach.`, description `Choose how you travel. Beach bungalows, jungle suites, and family bungalows,
  all steps from the Pacific.`, arrow label `See the rooms`.
- **`.path-lead`** → `/v2/retreats.html`. Kicker `I WANT TO LEAD A RETREAT`, title `You bring your
  program. We handle everything else.`, description `Exclusive use for groups up to 32, a beachfront
  yoga shala, and a team that runs the logistics.`, arrow label `Plan a retreat`.
- `.fork-extra`, beneath the two boxes: `Staying longer? Ask us about monthly rates.`, linking
  `mailto:eli@oceanforest.org?subject=Monthly%20stay%20enquiry` — restored from V1 exactly.

The 30-second hero cut, when it lands, plays muted-loop behind this content in the `.hero-media` slot
(A0 hero-slot contract); until then the slot's standard fallback shows.

### Three room cards
The three Lodging categories, in Lodging's order and under Lodging's exact names, photo-led:
1. **Beach Bungalows** — "Ideal for couples", "From $120 / night".
2. **Jungle Suites** — "Ideal for families of three", "From $140 / night".
3. **Family Bungalows** — "Ideal for families up to 4 guests", "From $150 / night".
Each card is photo-led and, per brief §9, hovers (or focuses) to swap to a second shot and expands in
place to a short detail. The detail is a shortened form of that room's Lodging tagline, not the full
Lodging entry, and the card links to `/v2/lodging.html` for the full room. The photos are `[data-media]`
hosts at `/media/lodging/beach-bungalow-01.jpg` and `-02.webp` for the hover swap, and the matching
pair for jungle-suite and family-bungalow. **The room photographs are in** — Eli delivered twelve files
to `media/lodging/` on 2026-08-07, so these hosts render real photographs, not the labelled
placeholder. (Rewritten 2026-08-09 — the original spec called these images the launch blocker and
described the placeholder as the expected render; that is stale. §6 Parking line updated to match.)
Prices and category names must match Lodging; if they ever differ, Lodging wins.

### Three visual blocks — Food, Tours, Retreats
Three photo-led blocks, each a one-paragraph tease that links to its page, using the `.media-bleed
.media-fade` treatment from `of-v2-revisions.md` §3.2: the photograph runs off one edge of the
viewport, alternating sides down the page, with `mask-image` fading the edge where photo meets text so
there is no visible rectangle. (Added 2026-08-09, C4 — the original spec described plain photo-led
blocks with no named treatment; this is the specific fix for the "white card" look Mehdi rejected.)
Copy summarised from the pages:
- **Food** → `/v2/lodging.html#food`. From Lodging's food section ("Nourishing the Soul"): three meals
  a day made from what the garden and the sea offer that morning, no menus, allergies and diets
  accommodated with 48 hours' notice.
- **Tours** → `/v2/experiences.html`. From Experiences: Rainforest Discovery, Ocean Discovery, and
  eight complementary activities. Keep the line the page and Eli both use: "Where the silence of the
  jungle speaks loudest."
- **Retreats** → `/v2/retreats.html`. From the Retreats page: exclusive use for groups up to 32, a
  46-foot three-level yoga shala, three meals a day. Lead line "Everything covered. Nothing to manage."

### Reviews
A reviews/testimonials block in the running order (brief §9). No page carries testimonials, so there
is no copy to mirror: build it as a labelled placeholder ("Guest reviews to come", same honest-slot
spirit as the media placeholders) awaiting Eli's testimonials (§6). Do not fabricate quotes.

### Newsletter
A single email-signup field with a submit button and one line of framing, at the foot before the
footer (brief §9). The submission target is undecided (§6); build the field and button, and leave the
form's action as an inert, clearly-marked TODO rather than wiring it to an endpoint. It must not
silently pretend to subscribe anyone.

### Gallery
A0 gallery section (`of-v2-shell.md` §3 Gallery contract), `data-gallery-offset="20"` — an offset none
of the five pages use (they use 0, 8, 16, 4, 12), so the home's eight-image slice differs from all of
them.

### Footer
The A0 footer markup exactly (`of-v2-shell.md` §3 "Footer markup"), the same four columns the five
pages carry (brand and map link; Explore with the five pages plus Book now; Blog; Book your stay with
WhatsApp, email and Instagram). Every internal `href`/`src` is root-absolute, including the nav's own
page links and the logo. (Rewritten 2026-08-09 — see Asset paths below.)

### Styles — what lives in the page's own `<style>`
Keep only rules `shell.css` does not already provide: the hero's `.fork`/`.path`/`.hm-film` rules
(ported from V1, per Hero above), the `.media-bleed`/`.media-band`/`.media-fade` treatments if not
already added to `shell.css` by another page, the room-card grid and its hover-swap / expand states,
the three visual blocks, the reviews block, and the newsletter field. `shell.css` already provides the
palette, `body.light`, base reset, `.wrap`, `.skip`, header/nav, the `.hero` slot, `.eyebrow`, `h1`,
`.hero-sub`, `main`, `section` (base, no `.alt`), `.sec-head`, `.grad-text`, `.grad-bar`, `.lead`,
`.ph`/`[data-media]`, `.cta`, `.gal`, the footer, `.reveal`, and focus/hidden. If the home uses
alternating section backgrounds, add the one `section.alt` rule (`shell.css` does not define it),
matching the sibling pages.

### Asset paths — root-absolute, not the `../` climb
**Every local reference is root-absolute** — `/v2/shell.css`, `/v2/lodging.html`, `/v2/shell.js`,
`/images/logo-white.png`, `/media/...`. (Rewritten 2026-08-09, superseding the original `../`-climb
rule — see A0 §2 and the STATUS note above. Broken twice on this project already.) External links
(Book now, WhatsApp, email, Instagram, the YouTube film) are absolute and unchanged, as before.
**Consequence:** the home no longer opens correctly by double-clicking from Finder over `file://`;
test it over http.

### Scripts the page must load
- `shell.js` (theme, header shrink, burger, hero-slot loader, gallery rotation, reveal). Same-directory
  reference, not `../shell.js`.
- The home's own single inline `<script>`: the room-card hover-photo-swap and expand-in-place, and the
  hero "Watch the full film" control if it needs any behaviour beyond a plain link. It must not
  re-implement theme, reveal, header or the media loader; the shell owns those.
- **Not** `shared-sections.js` (the home mounts no `data-shared` block), and **not** `concierge.js` or
  any analytics script (the built V2 pages do not carry them).

## 4. Acceptance checks

**Run these over http, not from Finder** (A0 §4) — `python3 -m http.server 8080`, then
`http://localhost:8080/v2/index.html`. Root-absolute paths do not resolve over `file://`.

1. The hero shows the eyebrow `Drake Bay · Osa Peninsula · Costa Rica · Since 2003`, V1's video slot
   playing behind it, both path boxes sitting **on** the hero as translucent panels (not white cards
   below the fold), and `Staying longer? Ask us about monthly rates.` beneath them. The boxes carry
   V2's wording (kickers, titles, descriptions, arrow labels) from the table above, not V1's. There is
   no theme button in the header. *(Rewritten 2026-08-09 — the original check accepted the empty-slot,
   two-white-card version Mehdi rejected. C3, C4.)*
2. The two path boxes link correctly: "I want to stay" to `/v2/lodging.html`, "I want to lead a
   retreat" to `/v2/retreats.html`. *(Rewritten 2026-08-09 — paths are now root-absolute, not
   page-relative filenames.)*
3. Three room cards show the three Lodging categories in Lodging's order and names (Beach Bungalows
   From $120, Jungle Suites From $140, Family Bungalows From $150); each is photo-led with a real
   photograph (not a placeholder — Eli's twelve files are in `media/lodging/`), swaps its photo on
   hover, expands in place to a short detail, and links to `/v2/lodging.html`. No price or name
   contradicts Lodging. *(Rewritten 2026-08-09 — the original check expected the labelled placeholder
   as the passing state; the photos have since shipped.)*
4. The three visual blocks (Food, Tours, Retreats) each carry copy shortened from the matching page,
   link to it (`/v2/lodging.html#food`, `/v2/experiences.html`, `/v2/retreats.html`), alternate sides
   down the page, run off the edge of the window with `.media-bleed`, and fade into the page with
   `.media-fade` rather than showing a hard rectangle edge. The tours block keeps "Where the silence of
   the jungle speaks loudest." Nothing in a block contradicts its page. *(Rewritten 2026-08-09 to add
   the C4 treatment, which the original check did not test for.)*
5. The reviews block shows an honest "to come" placeholder with no invented testimonial, and the
   newsletter shows a real email field and button whose action is an inert, clearly-marked TODO that
   does not pretend to subscribe anyone.
6. The A0 gallery section shows eight slots at offset 20, a slice none of the five pages show, and the
   A0 footer's four columns are present and correct.
7. **Every local reference is root-absolute and loads.** `grep -oE '(src|href)="[^"/#][^"]*"'
   v2/index.html | grep -vE 'https?:|mailto:|tel:'` returns nothing. The page loads `shell.css` and
   `shell.js` and does not load `shared-sections.js`, `concierge.js` or any analytics script.
   *(Rewritten 2026-08-09 — this check previously required the `../` climb, the exact instruction that
   broke the deployed home twice.)*
8. No em dash or en dash appears in any visible copy; V1's `ocean-forest-website/index.html` is byte
   for byte unchanged and no file anywhere above `v2/` has been created, edited or moved.

## 5. Out of scope

- Editing V1's `ocean-forest-website/index.html`, or anything else in `ocean-forest-website/` above the
  `v2/` folder. The V2 home is a new file inside `v2/` and nothing outside it is touched.
- Deploying `v2/` and mapping `v2/index.html` to the served route `/`. That is a deploy-time decision
  (A0 §6).
- Supplying media: Ryan's 30-second hero cut and the full-film YouTube link. The hero slot and its
  YouTube-link slot are built to take these later with no code change. (Rewritten 2026-08-09 — the room
  photographs are no longer in this list; Eli delivered them 2026-08-07. See §6.)
- Writing the reviews copy or wiring the newsletter to a real mailing-list backend. Both are built as
  labelled slots; their content and endpoint are named in §6.
- Rebuilding or duplicating the shared tours/logistics component on the home. The home links out to
  Experiences; the interactive component stays on the pages that mount it.
- Re-authoring any page copy. If a tease reads wrong, the fix is on the page, then the home is
  re-shortened from it.

## 6. Parking line

None of these block building the home; it ships with the same labelled placeholders every other V2
page uses, and takes real content later with no code change.

| Item | Who | Blocks |
|---|---|---|
| Ryan's 30-second hero cut | Ryan | The hero background. Slot falls back to the shared YouTube film meanwhile (A0 hero-slot contract) |
| The full-film YouTube URL | Ryan / Eli | The "Watch the full film" link's target. Control is built with the URL as a slot |
| Reviews / testimonials copy | Eli | The reviews block's real content. Honest placeholder ships meanwhile |
| Newsletter submission target (where a signup goes) | Undecided | Wiring the newsletter form. The field and button ship inert and clearly marked |

**Room photographs — resolved 2026-08-09.** Eli delivered twelve files to `media/lodging/` on
2026-08-07 (four per room type). This row is removed from the table above because it no longer blocks
anything; the room cards render real photographs.

## 7. Build prompt

```
Read specs/of-v2-shell.md first and build this page on top of what it defines: reuse
ocean-forest-website/v2/shell.css and shell.js exactly as that spec describes (linked same-directory
as shell.css and shell.js, not ../shell.js). Then read specs/of-v2-home.md, and read all five built
pages in ocean-forest-website/v2/ (arriving.html, lodging.html, experiences.html, retreats.html,
about.html) in full. Those five pages are your copy source: the home is summarised FROM them and must
match them. If the home and a page would disagree, the page is right.

HARD CONSTRAINT: build the home as ocean-forest-website/v2/index.html. Never edit, overwrite or move
ocean-forest-website/index.html or anything else in ocean-forest-website/ above the v2/ folder. V1
stays live and untouched.

Read ocean-forest-website/index.html for the hero you are porting: the whole home hero (eyebrow,
video, the two path boxes ON the hero as translucent panels, the monthly-rates line) is V1's hero
verbatim in structure, with V2's words substituted per the spec's table. Do not invent a new hero.

Build ocean-forest-website/v2/index.html on the A0 shell:
- The A0 header (five nav links in order, none marked current, logo links to index.html, NO theme
  button) and the A0 footer, both verbatim from the shell.
- The hero, ported from V1: .hero > .hero-media (the A0 slot, slug "home") > .hero-scrim > .hero-inner
  (eyebrow, h1, sub, the "Watch the full film" link) > .fork (the two translucent path boxes) >
  .fork-extra (the monthly-rates line). Copy exactly as the spec's table gives it. Leave the YouTube
  full-film URL as a clearly-marked slot.
- Three photo-led room cards for the three Lodging categories, in Lodging's order and names and
  prices, hovering to swap photos and expanding in place to a short detail, each linking to
  /v2/lodging.html. Use [data-media] hosts pointing at /media/lodging/ — the real files already exist.
- Three visual blocks (Food, Tours, Retreats) using .media-bleed .media-fade (alternating sides,
  bleeding off the viewport edge, fading at the text boundary), each a one-paragraph tease shortened
  from its page and linking to it (/v2/lodging.html#food, /v2/experiences.html, /v2/retreats.html),
  keeping the Experiences line "Where the silence of the jungle speaks loudest."
- A reviews block as an honest "to come" placeholder (no invented quotes), and a newsletter field +
  button whose form action is an inert, clearly-marked TODO (it must not pretend to subscribe anyone).
- The A0 gallery section at data-gallery-offset="20".
- Load shell.js only. Do not load shared-sections.js, concierge.js or any analytics script. Add one
  small inline script for the room-card hover-swap and expand, and nothing the shell already does.
- In the page's own <style>, keep only rules shell.css does not already provide (the hero's fork/path
  rules, media-bleed/media-band/media-fade if not already in shell.css, room cards, three blocks,
  reviews, newsletter, and section.alt if you use alternating backgrounds).
- Every local reference is root-absolute (/v2/shell.css, /v2/lodging.html, /images/logo-white.png,
  /media/...). Never a ../ climb — it breaks the deployed home.
- No em dash or en dash in any visible copy.

When done, serve the folder over http (python3 -m http.server 8080) and open
http://localhost:8080/v2/index.html. Do NOT test by double-clicking the file — every local reference
is root-absolute and will 404 over file://. Open the five pages beside it to confirm every tease
matches its page (room names and prices, the food framing, the tour groups, the retreats line).
Confirm ocean-forest-website/index.html (V1) is unchanged and nothing above v2/ was touched. List the
eight acceptance checks from the spec and state pass/fail for each. If a tease and a page disagree,
fix the home to match the page and say so.
```
