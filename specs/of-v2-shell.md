STATUS: SHIPPED 2026-08-05

All 8 acceptance checks passed, verified in a browser by the build thread on 2026-08-05.
One fix was needed beyond a literal lift and it is correct: the `.foot-map` CSS rule, which sits
outside the line range this spec quoted and without which the map link renders unstyled.

**REVISED 2026-08-09.** Two rounds of corrections landed in `v2/` after this spec shipped and were
recorded only in `of-v2-revisions.md` and `of-v2-revisions-2.md`. They are folded in below, so this
spec now describes the shell as it actually stands. A rebuild from this document reproduces the
live pages rather than reverting them. What changed: the theme toggle is gone (D7), the hero slot
is a YouTube embed rather than an mp4-then-jpg probe, the gallery list is 22 real files rather than
24 imagined ones, and every local reference is root-absolute rather than climbing with `../`. The
1.5s hero-video timeout named in the original note no longer exists — the loader it belonged to was
replaced.

# A0 — Shell

## 1. Goal

Build the header, footer, hero slot, and gallery section that every V2 page sits inside, plus flip the site's default theme to light.

## 2. Decisions

- V2 is built in a new folder, `ocean-forest-website/v2/`, so V1 (`index.html`, `retreats.html`, etc., all still live) is untouched while V2 is under construction.
- Five static HTML files, one per page, not anchors on one page: `arriving.html`, `lodging.html`, `experiences.html`, `retreats.html`, `about.html`. `index.html` (home) is added later, by design — see brief §11.
- **Every local reference is root-absolute** — `/v2/shell.css`, `/v2/lodging.html`, `/images/logo-white.png`, `/media/...`. (Superseding this spec's original rule of relative filenames and a `../` climb.) The original rule broke the site twice: `vercel.json` sets `trailingSlash: false`, so a relative `shell.css` on the deployed home resolves to nothing and the page renders with no stylesheet at all. Fixed in `230189f`, silently reverted by `79d9c6f`, fixed again in `cfe3f60`. It is a standing rule in `of-v2-brief.md` §2 and it is not negotiable.
  - **Consequence, recorded because it was never decided out loud:** root-absolute paths mean a V2 page **no longer opens correctly straight from Finder.** Over `file://` a leading slash resolves to the filesystem root, so images and stylesheets 404. V2 must be tested over http — `python3 -m http.server 8080` locally, then `http://localhost:8080/v2/`, or the deployed URL. The original "opens from Finder with no server" goal is dead and the acceptance checks below have been rewritten accordingly.
- Nav is exactly five items, in this order and under these exact labels: **Arriving, Lodging, Experiences, Retreats, About**. Gallery is not a nav item, per brief §1.
- Shared chrome (fonts, `:root` variables, header/nav, hero, section heading pattern, media-placeholder pattern, footer, reveal-on-scroll motion) lives in two files everything else `<link>`s and `<script>`s: `ocean-forest-website/v2/shell.css` and `ocean-forest-website/v2/shell.js`. Each page's own `<style>` block holds only that page's unique sections.
- **Light is the only theme. There is no toggle.** (D7, 2026-08-07, superseding this spec's original "the toggle stays, and anyone who already chose dark keeps dark".) The `of-theme` localStorage key is not read and not written. `<body class="light">` is set unconditionally in the markup so a page is never briefly the wrong colour before script runs. Anyone who previously chose dark now sees light, and that is intended. The dark CSS rules stay in `shell.css` but are unreachable, wrapped in a comment block reading `Dark theme, unreachable since 2026-08-07. Kept for one cleanup pass; delete when confident.`
- No language switcher, no translation widget, anywhere in the shell.
- Hero is built once as a reusable slot, empty by default (no image, no video), and takes real media later with no code change.
- Gallery sits at the foot of every page, always 8 slots, and rotates — each page shows a different slice of one shared image list, edited in one place.
- Footer's "Explore" column mirrors the nav exactly (five links) plus "Book now" — same pattern as `index.html`'s footer today. It does not add a separate Gallery link, since gallery is a repeated section, not a distinct destination.
- No em dashes or en dashes anywhere in UI copy. Use "and", a comma, or a period instead.

## 3. Contracts

### Files to create
- `ocean-forest-website/v2/shell.css`
- `ocean-forest-website/v2/shell.js`
- Five page shells that `<link>` shell.css and `<script src>` shell.js: `arriving.html`, `lodging.html`, `experiences.html`, `retreats.html`, `about.html`, all in `ocean-forest-website/v2/`.

### What shell.css contains, lifted verbatim from `ocean-forest-website/index.html`
Pull these rule blocks byte for byte from `index.html` (line numbers as of this spec being written; re-check if the file has moved):
- `:root` variables, lines 45–73
- `body.light` overrides, lines 78–87
- Base `html`/`body`/`a`/`.wrap`, lines 89–104
- `.skip`, lines 107–112
- Everything under "HEADER / NAV" through the `@media (max-width: 480px)` block, lines 114–205
- `.hero`, `.hero-video`, `.hero-still`, `.hero-scrim`, `.hero-inner`, `.eyebrow`, `h1`, `.hero-sub`, lines 207–244 (drop `.fork*`, lines 246–322 — home-only, not part of the shell)
- `main`, `section`, `.sec-head*`, `.grad-text`, `.grad-bar`, `.lead`, lines 324–336
- `.ph*`, `[data-media]`, lines 338–356
- `.cta*`, lines 375–383
- `.gal`, lines 486–489
- Everything under "FOOTER", lines 491–517
- `.reveal` and the `prefers-reduced-motion` block, lines 519–530
- `:focus-visible`, `[hidden]`, lines 532–533

### What shell.js contains, lifted and adapted from `index.html`'s inline `<script>` (lines 939–1073) and `shared-sections.js`'s placeholder helper
- **Theme**: nothing. There is no theme code in `shell.js` at all (D7). No `of-theme` read or write, no `paintTheme()`, no toggle handler, no `☀`/`☾` swap, no `themeBtn` reference. In its place sits a comment recording that light is the only theme and when that was decided. Do not reintroduce any of it — a rebuild that "restores" the toggle is the specific regression this revision exists to prevent.
- **Header shrink on scroll**: unchanged, verbatim.
- **Mobile menu burger**: unchanged, verbatim.
- **Media placeholders**: the exact `[data-media]` loader (lines 1002–1033) — any element with `data-media="path.jpg"` gets the real image if it exists, or the labelled dashed-frame placeholder if it doesn't. It resolves **root-absolute**, as `'/media/' + file`, not with a `../` climb.
- **Hero slot loader** (new function, no V1 equivalent — see Hero Slot Contract below).
- **Gallery rotation** (new function, no V1 equivalent — see Gallery Contract below).
- **Reveal on scroll**: unchanged, verbatim.

### Nav markup, identical on all five pages except which link carries the "current page" state
```html
<header class="site-head" id="siteHead">
  <a href="/v2/index.html" class="nav-logo">
    <img class="logo-dark" src="/images/logo-white.png" alt="Ocean Forest Ecolodge">
    <img class="logo-light" src="/images/logo-color.png" alt="" aria-hidden="true">
  </a>
  <nav class="nav-menu" id="navMenu" aria-label="Main">
    <a href="/v2/arriving.html">Arriving</a>
    <a href="/v2/lodging.html">Lodging</a>
    <a href="/v2/experiences.html">Experiences</a>
    <a href="/v2/retreats.html">Retreats</a>
    <a href="/v2/about.html">About</a>
  </nav>
  <div class="nav-actions">
    <a class="book-btn" href="https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3" rel="noopener">Book now</a>
    <button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="navMenu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>
```
`.nav-actions` holds **two** children — Book now and the burger. There is no theme button (D7).
The `.theme-btn` CSS rule survives in `shell.css` unused; it is part of the unreachable dark block
and goes in the same cleanup pass.
The link matching the current page gets `aria-current="page"` and a visual underline (reuse the existing `.nav-menu a:hover` border-color styling, applied permanently via a `.current` class rather than only on hover/focus).

### Hero slot contract
Markup, identical shape on every page, only the slug, eyebrow, `h1`, and sub-line change:
```html
<div class="hero" id="hero">
  <div class="hero-media" data-hero-slug="arriving"></div>
  <div class="hero-scrim" aria-hidden="true"></div>
  <div class="hero-inner">
    <div class="wrap">
      <p class="eyebrow">[page-specific eyebrow]</p>
      <h1>[page-specific headline]</h1>
      <p class="hero-sub">[page-specific one-sentence sub]</p>
    </div>
  </div>
</div>
```
**Superseding the original mp4-then-jpg-then-placeholder probe**, which no longer exists. Ryan's
per-page cuts never arrived, and an empty slot on every page was worse than V1's film. `shell.js`
now picks one of three branches, in this order (`of-v2-assets.md` §3.5, and C5 for the still):

1. **`data-hero-image` is set** → a `.hero-media-photo` div with that file as its background, at
   `/media/<value>`. This is how Arriving pins itself to `hero/hero-wide.jpg` (C5). One attribute,
   no other change.
2. **Otherwise, `prefers-reduced-motion: reduce`** → a static `.hero-media-still` div. No video.
3. **Otherwise** → a `youtube-nocookie.com` iframe, autoplaying muted and looping, controls off,
   `aria-hidden`, `tabindex="-1"`, `loading="lazy"`. The same film V1 uses.

Two constants at the top of that block are the seam:

```js
var HERO_YOUTUBE_ID = 'AjqtTXfJbeg';
var HERO_OVERRIDES = {}; // slug -> youtube id, filled in as Ryan delivers per-page cuts
```

A page gets its own cut by adding one entry to `HERO_OVERRIDES`. Nothing else changes.

There is **no `.ph` placeholder branch on the hero any more**, and no timeout fallback — both
belonged to the mp4 probe that was removed. `media/hero/` holds only `hero-alt.jpg` and
`hero-wide.jpg`; no per-slug file exists and none is expected.

Each page's build prompt (A1–A6) supplies its own `<slug>`, eyebrow, headline, and sub-line — those
are fixed per page and not part of this shell spec.

### Gallery contract
One shared list lives at the top of `shell.js`. **It is 22 entries, not 24, it carries the
`gallery/` prefix, and 09 to 22 are `.webp`** — this is the list of files that actually exist in
`media/gallery/`, not a placeholder list. 01 to 08 were re-sourced as higher-resolution `.jpg` on
2026-08-07 and deliberately left as `.jpg`.

```js
var GALLERY = [
  'gallery/gallery-01.jpg', 'gallery/gallery-02.jpg', 'gallery/gallery-03.jpg', 'gallery/gallery-04.jpg',
  'gallery/gallery-05.jpg', 'gallery/gallery-06.jpg', 'gallery/gallery-07.jpg', 'gallery/gallery-08.jpg',
  'gallery/gallery-09.webp', 'gallery/gallery-10.webp', 'gallery/gallery-11.webp', 'gallery/gallery-12.webp',
  'gallery/gallery-13.webp', 'gallery/gallery-14.webp', 'gallery/gallery-15.webp', 'gallery/gallery-16.webp',
  'gallery/gallery-17.webp', 'gallery/gallery-18.webp', 'gallery/gallery-19.webp', 'gallery/gallery-20.webp',
  'gallery/gallery-21.webp', 'gallery/gallery-22.webp'
];
```

**Adding a gallery image means adding its real filename here.** Never pad the list to a round
number with names that do not exist — a missing file renders a labelled placeholder, which reads as
a bug.
Each page declares which 8-image slice it shows via a `data-gallery-offset` attribute on its `<section id="gallery">`:
```html
<section id="gallery">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">Gallery</span>
      <h2>The place, <span class="grad-text">as it is</span></h2>
      <hr class="grad-bar">
    </div>
    <div class="gal reveal" data-gallery-offset="0"></div>
  </div>
</section>
```
`shell.js` reads `data-gallery-offset`, takes 8 filenames starting there (wrapping around the
22-item list), and builds 8 `[data-media]` divs resolved root-absolute at `/media/<filename>` with
`data-ratio="1/1"`, exactly like the existing gallery markup in `index.html` lines 878–885.

Offsets, one per page: Arriving `0`, Lodging `8`, Experiences `16`, Retreats `4`, About `12`,
Home `20`.

**Note the list shrank from 24 to 22 and the offsets did not move.** With 22 entries, Home's
offset of 20 wraps to `20, 21, 0, 1, 2, 3, 4, 5` — six of those eight also appear in Arriving's
offset-0 slice. No two pages show an *identical* slice, so the original rule technically holds, but
its intent (a visibly distinct set per page) no longer does. Re-spacing the offsets across 22 is a
small open improvement, not a defect.

### Footer markup, identical on all five pages
Reuse `index.html`'s footer (lines 892–937) verbatim, with two changes:
1. The "Explore" list's five page links become `arriving.html` / `lodging.html` / `experiences.html` / `retreats.html` / `about.html` (no `#rooms`, no `#arriving` anchors, no Gallery item), plus "Book now" unchanged.
2. Every internal `href` and image `src` gains the `../` prefix needed from inside `v2/` (e.g. `../images/...`), except the nav's own five page links and the logo link, which stay page-relative within `v2/`.
Brand block (address, map link, socials, copyright, PxN credit) is unchanged, verbatim.

### Light palette audit
Check these five text/background pairs against WCAG AA (4.5:1 for body text, 3:1 for large text/UI elements), using the `body.light` values in `index.html` lines 78–87:
1. `--mist` (`#1a221c`) body text on `--ink` (`#f6f4ee`) background
2. `--dim` (`rgba(20,26,22,.64)`) lead/caption text on `--ink` (`#f6f4ee`) background
3. `--teal-light` (`#16707E`) eyebrow/accent text on `--ink-2` (`#ffffff`) background
4. `--white` (`#0e1310`) heading text on `--ink` (`#f6f4ee`) background
5. Book-button text (`#0b1210`) on the lightest stop of `--gradient-ocean-lime` (`--grad-6`, `#DFDF5B`) — the gradient's worst-case contrast point
Any pair that fails gets its light-theme hex adjusted (minimally, preserving the palette's character) and the new value recorded in a one-line comment beside the variable in `shell.css`.

## 4. Acceptance checks

**Run these over http, not from Finder** — `python3 -m http.server 8080`, then
`http://localhost:8080/v2/`. Root-absolute paths do not resolve over `file://`.

1. `http://localhost:8080/v2/arriving.html` shows a working page: header, hero, footer, all five nav links present in order, stylesheet applied.
2. **There is no theme button on any of the six pages.** Every page loads light and stays light — including after a hard reload with `of-theme` still set to `dark` in localStorage. `grep -rn "of-theme\|themeBtn" v2/` returns nothing outside the commented-out dark block. *(Rewritten 2026-08-09 — this check previously required the toggle to work, which would make a build thread reinstate it and report success. D7.)*
3. Each of the five nav links, clicked from any page, lands on the correct sibling file and highlights itself as current.
4. The gallery section on any one page shows exactly 8 slots, every one a real photograph and not a labelled placeholder.
5. All five palette pairs in the audit table pass WCAG AA, or have been adjusted until they do.
6. No `<html lang>` switcher, no translate widget, and no second language anywhere in the shell markup.
7. **Every local reference is root-absolute and loads.** `grep -oE '(src|href)="[^"/#][^"]*"' v2/*.html | grep -vE 'https?:|mailto:|tel:'` returns nothing. *(Rewritten 2026-08-09 — this check previously required the `../` climb, which is the exact instruction that broke the deployed home twice.)*
8. No em dash or en dash character appears in any visible shell copy (nav labels, button labels, footer text).

## 5. Out of scope

Page-specific content (A1–A6), the home page (A6, written last), deploying `v2/` to replace the live `index.html`, and turning relative filenames into root routes (`/arriving`).

## 6. Parking line

Turning `arriving.html` etc. into clean routes (`/arriving`) is a deploy-time decision for whoever ships V2 — not blocked on the client, just not decided yet because V2 isn't shipping this round.

## 7. Build prompt

```
Read ocean-forest-website/index.html and ocean-forest-website/shared-sections.js in this repo for
the existing design system, then build exactly what specs/of-v2-shell.md describes: Section 3
"Contracts" is literal — follow the file paths, the lifted line ranges, the markup blocks, the
gallery list, and the palette audit table exactly as written.

Create ocean-forest-website/v2/shell.css, ocean-forest-website/v2/shell.js, and five page files
(arriving.html, lodging.html, experiences.html, retreats.html, about.html) inside
ocean-forest-website/v2/, each a complete, valid HTML document with the shared header, an empty
hero slot, an empty main (just a placeholder comment where that page's content will go), the
8-slot gallery at its assigned offset, and the shared footer. Do not write any page-specific
content — that is a separate spec for a separate thread.

When you are done, serve the folder over http (python3 -m http.server 8080) and open
http://localhost:8080/v2/arriving.html. Do NOT test by double-clicking the file - every
local reference is root-absolute and will 404 over file://. Confirm it renders correctly
with its stylesheet applied, the page is light and has NO theme toggle, the nav links
work, and the hero shows the shared YouTube film. Fix anything broken before you report
back. List the eight acceptance checks from the spec and state pass/fail for each.

Two instructions in this spec were rewritten on 2026-08-09 because the originals caused
regressions. Do not "restore" either of them: there is no theme toggle (D7), and every
local reference is root-absolute, never a ../ climb.
```
