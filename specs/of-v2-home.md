STATUS: DRAFT

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
- **Built on the A0 shell.** Reuse `v2/shell.css` and `v2/shell.js` as every other page does: linked
  same-directory as `shell.css` and `shell.js` (not `../shell.js`, which does not exist), asset
  references climbing one level (`../images/...`, `../media/...`). The header, the empty hero slot,
  the gallery section and the footer all come from A0 verbatim.
- **No "Home" nav item.** The menu is the five pages in order (Arriving, Lodging, Experiences,
  Retreats, About), per A0 §2. No nav link carries `aria-current` on the home, because the home is not
  in the menu; the logo is the link back here. Do not add a sixth nav item.
- **The hero is the A0 slot, slug `home`,** carrying Ryan's 30-second cut when it lands
  (`../media/hero/home.mp4`, then `.jpg`, then the labelled placeholder, per the A0 hero-slot
  contract). On top of the slot the home adds one thing no other page has: a visible "Watch the full
  film" control that opens the full video on YouTube in a new tab (brief §9, "clickable through to the
  full film on YouTube"). The YouTube URL is a content slot, see §6.
- **The headline compresses to the brief's copy** (brief §9), split across the slot's `h1` and sub:
  `h1` = "Your beachfront ecolodge at the edge of Corcovado National Park.", sub = "The most
  biodiverse place on Earth. No roads. No crowds. Just jungle." Everything else on V1's current hero is
  dropped (brief §9).
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
The A0 header markup exactly (`of-v2-shell.md` §3 "Nav markup"), the five links in order, the logo
linking to `index.html`, the theme button, and the A0 "Book now" button targeting
`https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3`. No link
is marked current.

### Hero
A0 hero slot markup (`of-v2-shell.md` §3 "Hero slot contract"), `data-hero-slug="home"`, carrying:
- `h1`: `Your beachfront ecolodge at the edge of Corcovado National Park.`
- Sub: `The most biodiverse place on Earth. No roads. No crowds. Just jungle.`
- Plus a "Watch the full film" link inside `.hero-inner`, `target="_blank" rel="noopener"`, pointing at
  the full-film YouTube URL (content slot, §6). It renders as a text/button control, not by making the
  autoplaying background itself the click target, so it is keyboard reachable. When the 30-second cut
  exists it plays muted-loop in the slot behind this control; until then the slot shows its standard
  labelled placeholder and the control still works.

### Path boxes — "I want to stay" / "I want to lead a retreat"
Two boxes directly under the hero, less text than V1's (brief §9). Each is a titled card linking to a
page:
- **I want to stay** → `lodging.html`. One line, e.g. "Ten rooms on a remote mile of beach. Choose how
  you travel." (shortened from Lodging's hero "Ten Rooms, One Remote Mile of Beach" and its sub).
- **I want to lead a retreat** → `retreats.html`. One line, verbatim from the Retreats page's own
  positioning: "You bring your program. We handle everything else."

### Three room cards
The three Lodging categories, in Lodging's order and under Lodging's exact names, photo-led:
1. **Beach Bungalows** — "Ideal for couples", "From $120 / night".
2. **Jungle Suites** — "Ideal for families of three", "From $140 / night".
3. **Family Bungalows** — "Ideal for families up to 4 guests", "From $150 / night".
Each card is photo-led and, per brief §9, hovers to swap its photo (a second image per room) and
expands in place to a short detail. The detail is a shortened form of that room's Lodging tagline, not
the full Lodging entry, and the card links to `lodging.html` for the full room. The photos are
`[data-media]` hosts pointing at the same Lodging images the page uses (`../media/lodging/
beach-bungalow-01.jpg` and a `-02.jpg` for the hover swap, and the same for jungle-suite and
family-bungalow); while those files are missing the labelled placeholder shows, exactly as on Lodging.
Prices and category names must match Lodging; if they ever differ, Lodging wins.

### Three visual blocks — Food, Tours, Retreats
Three photo-led blocks, each a one-paragraph tease that links to its page. Copy summarised from the
pages:
- **Food** → `lodging.html#food`. From Lodging's food section ("Nourishing the Soul"): three meals a
  day made from what the garden and the sea offer that morning, no menus, allergies and diets
  accommodated with 48 hours' notice.
- **Tours** → `experiences.html`. From Experiences: Rainforest Discovery, Ocean Discovery, and eight
  complementary activities. Keep the line the page and Eli both use: "Where the silence of the jungle
  speaks loudest."
- **Retreats** → `retreats.html`. From the Retreats page: exclusive use for groups up to 32, a
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
WhatsApp, email and Instagram). Every internal `href`/`src` keeps the `../` climb except the nav's own
page links and the logo, which stay `v2/`-relative.

### Styles — what lives in the page's own `<style>`
Keep only rules `shell.css` does not already provide: the path boxes, the room-card grid and its
hover-swap / expand states, the three visual blocks, the reviews block, and the newsletter field.
`shell.css` already provides the palette, `body.light`, base reset, `.wrap`, `.skip`, header/nav, the
`.hero` slot, `.eyebrow`, `h1`, `.hero-sub`, `main`, `section` (base, no `.alt`), `.sec-head`,
`.grad-text`, `.grad-bar`, `.lead`, `.ph`/`[data-media]`, `.cta`, `.gal`, the footer, `.reveal`, and
focus/hidden. If the home uses alternating section backgrounds, add the one `section.alt` rule
(`shell.css` does not define it), matching the sibling pages.

### Asset paths — the `../` climb
Same rule as every V2 page (A0 §2): every `images/` and `media/` reference gains the `../` prefix,
because the file lives in `v2/`. Nav links and the logo stay page-relative within `v2/`
(`lodging.html`, `experiences.html`, `retreats.html`, `index.html`). External links (Book now,
WhatsApp, email, Instagram, the YouTube film) are absolute and unchanged.

### Scripts the page must load
- `shell.js` (theme, header shrink, burger, hero-slot loader, gallery rotation, reveal). Same-directory
  reference, not `../shell.js`.
- The home's own single inline `<script>`: the room-card hover-photo-swap and expand-in-place, and the
  hero "Watch the full film" control if it needs any behaviour beyond a plain link. It must not
  re-implement theme, reveal, header or the media loader; the shell owns those.
- **Not** `shared-sections.js` (the home mounts no `data-shared` block), and **not** `concierge.js` or
  any analytics script (the built V2 pages do not carry them).

## 4. Acceptance checks

1. Opening `ocean-forest-website/v2/index.html` straight from Finder (no server) renders a working
   page: A0 header with the five nav links in order and none marked current, the hero slot showing its
   labelled placeholder with the compressed headline and sub and a working "Watch the full film"
   control, the footer, and the theme starting light.
2. The two path boxes render with short copy and link correctly: "I want to stay" to `lodging.html`,
   "I want to lead a retreat" to `retreats.html`.
3. Three room cards show the three Lodging categories in Lodging's order and names (Beach Bungalows
   From $120, Jungle Suites From $140, Family Bungalows From $150); each is photo-led, swaps its photo
   on hover, expands in place to a short detail, links to `lodging.html`, and shows the labelled
   placeholder where a room photo does not exist yet. No price or name contradicts Lodging.
4. The three visual blocks (Food, Tours, Retreats) each carry copy shortened from the matching page and
   link to it (`lodging.html#food`, `experiences.html`, `retreats.html`), with the tours block keeping
   "Where the silence of the jungle speaks loudest." Nothing in a block contradicts its page.
5. The reviews block shows an honest "to come" placeholder with no invented testimonial, and the
   newsletter shows a real email field and button whose action is an inert, clearly-marked TODO that
   does not pretend to subscribe anyone.
6. The A0 gallery section shows eight slots at offset 20, a slice none of the five pages show, and the
   A0 footer's four columns are present and correct.
7. Every asset reference resolves with the `../` climb from inside `v2/`; the page loads `shell.css`
   and `shell.js` and does not load `shared-sections.js`, `concierge.js` or any analytics script; nav
   and logo links are plain `v2/`-relative.
8. No em dash or en dash appears in any visible copy; V1's `ocean-forest-website/index.html` is byte
   for byte unchanged and no file anywhere above `v2/` has been created, edited or moved.

## 5. Out of scope

- Editing V1's `ocean-forest-website/index.html`, or anything else in `ocean-forest-website/` above the
  `v2/` folder. The V2 home is a new file inside `v2/` and nothing outside it is touched.
- Deploying `v2/` and mapping `v2/index.html` to the served route `/`. That is a deploy-time decision
  (A0 §6).
- Supplying media: Ryan's 30-second hero cut, the full-film YouTube link, and the room photographs. The
  hero slot and every `[data-media]` host are built empty and take real files later with no code change,
  exactly like every other V2 page.
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
| Room photographs (and a second photo per room for the hover swap) | Eli | The room cards' real images. Still zero across the whole build (brief §10). Placeholders show meanwhile |
| Ryan's 30-second hero cut (`../media/hero/home.mp4`) | Ryan | The hero background. Slot is built empty |
| The full-film YouTube URL | Ryan / Eli | The "Watch the full film" link's target. Control is built with the URL as a slot |
| Reviews / testimonials copy | Eli | The reviews block's real content. Honest placeholder ships meanwhile |
| Newsletter submission target (where a signup goes) | Undecided | Wiring the newsletter form. The field and button ship inert and clearly marked |

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

Build ocean-forest-website/v2/index.html on the A0 shell:
- The A0 header (five nav links in order, none marked current, logo links to index.html) and the A0
  footer, both verbatim from the shell.
- The A0 empty hero slot, slug "home", carrying the compressed headline from the spec (h1 "Your
  beachfront ecolodge at the edge of Corcovado National Park." and sub "The most biodiverse place on
  Earth. No roads. No crowds. Just jungle."), plus a keyboard-reachable "Watch the full film" link
  opening the YouTube full film in a new tab (leave the YouTube URL as a clearly-marked slot).
- The two path boxes ("I want to stay" to lodging.html, "I want to lead a retreat" to retreats.html),
  short copy, per the spec.
- Three photo-led room cards for the three Lodging categories, in Lodging's order and names and
  prices, hovering to swap photos and expanding in place to a short detail, each linking to
  lodging.html. Use [data-media] hosts for the photos so missing files show the labelled placeholder.
- Three visual blocks (Food, Tours, Retreats), each a one-paragraph tease shortened from its page and
  linking to it (lodging.html#food, experiences.html, retreats.html), keeping the Experiences line
  "Where the silence of the jungle speaks loudest."
- A reviews block as an honest "to come" placeholder (no invented quotes), and a newsletter field +
  button whose form action is an inert, clearly-marked TODO (it must not pretend to subscribe anyone).
- The A0 gallery section at data-gallery-offset="20".
- Load shell.js only. Do not load shared-sections.js, concierge.js or any analytics script. Add one
  small inline script for the room-card hover-swap and expand, and nothing the shell already does.
- In the page's own <style>, keep only rules shell.css does not already provide (the path boxes, room
  cards, three blocks, reviews, newsletter, and section.alt if you use alternating backgrounds).
- Add the ../ climb to every images/ and media/ reference. Keep nav and logo links v2/-relative.
- No em dash or en dash in any visible copy.

When done, open ocean-forest-website/v2/index.html directly from Finder in a browser (no server), and
open the five pages beside it to confirm every tease matches its page (room names and prices, the food
framing, the tour groups, the retreats line). Confirm ocean-forest-website/index.html (V1) is
unchanged and nothing above v2/ was touched. List the eight acceptance checks from the spec and state
pass/fail for each. If a tease and a page disagree, fix the home to match the page and say so.
```
