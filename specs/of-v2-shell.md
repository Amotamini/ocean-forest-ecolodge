STATUS: SHIPPED 2026-08-05

All 8 acceptance checks passed, verified in a browser by the build thread on 2026-08-05.
Two fixes were needed beyond a literal lift and both are correct: a 1.5s timeout fallback on the
hero video, because a <video> element's error event does not reliably fire for a missing file; and
the `.foot-map` CSS rule, which sits outside the line range this spec quoted and without which the
map link renders unstyled.

# A0 — Shell

## 1. Goal

Build the header, footer, hero slot, and gallery section that every V2 page sits inside, plus flip the site's default theme to light.

## 2. Decisions

- V2 is built in a new folder, `ocean-forest-website/v2/`, so V1 (`index.html`, `retreats.html`, etc., all still live) is untouched while V2 is under construction.
- Five static HTML files, one per page, not anchors on one page: `arriving.html`, `lodging.html`, `experiences.html`, `retreats.html`, `about.html`. `index.html` (home) is added later, by design — see brief §11.
- Nav links between v2 pages use plain relative filenames (`arriving.html`, not `/arriving`), and asset references climb one level (`../images/...`, `../media/...`) to reuse V1's existing images and media folders rather than duplicating them. This is so every page opens correctly straight from Finder, with no server. Turning `arriving.html` into the route `/arriving` is a deploy-time decision, out of scope here — see §6.
- Nav is exactly five items, in this order and under these exact labels: **Arriving, Lodging, Experiences, Retreats, About**. Gallery is not a nav item, per brief §1.
- Shared chrome (fonts, `:root` variables, header/nav, hero, section heading pattern, media-placeholder pattern, footer, reveal-on-scroll motion) lives in two files everything else `<link>`s and `<script>`s: `ocean-forest-website/v2/shell.css` and `ocean-forest-website/v2/shell.js`. Each page's own `<style>` block holds only that page's unique sections.
- Theme defaults to light. The toggle stays, the `of-theme` localStorage key stays, and anyone who already chose dark keeps dark.
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
- **Theme**: same `of-theme` localStorage key, same `paintTheme()` function, but the default flips. Change the one line that currently reads
  ```js
  paintTheme(saved === 'light');
  ```
  to
  ```js
  paintTheme(saved !== 'dark');
  ```
  Everything else in the theme block (the toggle button, its `☀`/`☾` swap, the click handler that writes back to storage) is unchanged.
- **Header shrink on scroll**: unchanged, verbatim.
- **Mobile menu burger**: unchanged, verbatim.
- **Media placeholders**: the exact `[data-media]` loader (lines 1002–1033) — any element with `data-media="path.jpg"` gets the real image if it exists at `media/path.jpg` (now `../media/path.jpg` from inside `v2/`), or the labelled dashed-frame placeholder if it doesn't.
- **Hero slot loader** (new function, no V1 equivalent — see Hero Slot Contract below).
- **Gallery rotation** (new function, no V1 equivalent — see Gallery Contract below).
- **Reveal on scroll**: unchanged, verbatim.

### Nav markup, identical on all five pages except which link carries the "current page" state
```html
<header class="site-head" id="siteHead">
  <a href="index.html" class="nav-logo">
    <img class="logo-dark" src="../images/logo-white.png" alt="Ocean Forest Ecolodge">
    <img class="logo-light" src="../images/logo-color.png" alt="" aria-hidden="true">
  </a>
  <nav class="nav-menu" id="navMenu" aria-label="Main">
    <a href="arriving.html">Arriving</a>
    <a href="lodging.html">Lodging</a>
    <a href="experiences.html">Experiences</a>
    <a href="retreats.html">Retreats</a>
    <a href="about.html">About</a>
  </nav>
  <div class="nav-actions">
    <button class="theme-btn" id="themeBtn" type="button" aria-label="Switch between light and dark" title="Light / dark">☾</button>
    <a class="book-btn" href="https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3" rel="noopener">Book now</a>
    <button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="navMenu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>
```
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
`shell.js` looks inside `.hero-media` for a video, then a still, in this order, using the same load/error pattern as the existing `[data-media]` loader:
1. Try `../media/hero/<slug>.mp4` as a background `<video autoplay muted loop playsinline>`.
2. If that 404s, try `../media/hero/<slug>.jpg` as a cover-fit `<img>`.
3. If that 404s too, render the standard `.ph` placeholder, full-bleed, reading `Hero video or still to come` / `media/hero/<slug>.mp4 or .jpg`.
Each page's build prompt (A1–A6) supplies its own `<slug>`, eyebrow, headline, and sub-line — those are fixed per page and not part of this shell spec.

### Gallery contract
One shared list of 24 filenames lives at the top of `shell.js`:
```js
var GALLERY = [
  'gallery-01.jpg', 'gallery-02.jpg', 'gallery-03.jpg', 'gallery-04.jpg',
  'gallery-05.jpg', 'gallery-06.jpg', 'gallery-07.jpg', 'gallery-08.jpg',
  'gallery-09.jpg', 'gallery-10.jpg', 'gallery-11.jpg', 'gallery-12.jpg',
  'gallery-13.jpg', 'gallery-14.jpg', 'gallery-15.jpg', 'gallery-16.jpg',
  'gallery-17.jpg', 'gallery-18.jpg', 'gallery-19.jpg', 'gallery-20.jpg',
  'gallery-21.jpg', 'gallery-22.jpg', 'gallery-23.jpg', 'gallery-24.jpg'
];
```
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
`shell.js` reads `data-gallery-offset`, takes 8 filenames starting there (wrapping around the 24-item list), and builds 8 `[data-media]` divs pointed at `../media/gallery/<filename>` with `data-ratio="1/1"`, exactly like the existing gallery markup in `index.html` lines 878–885. Offsets, one per page, so no two adjacent pages show the same slice: Arriving `0`, Lodging `8`, Experiences `16`, Retreats `4`, About `12`.

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

1. Opening `arriving.html` directly from Finder (no server) shows a working page: header, empty hero slot with its labelled placeholder, footer, all five nav links present in order.
2. Toggling the theme button on a fresh browser profile (no `of-theme` key set) starts light; clicking it once switches to dark; reloading keeps whatever was last chosen.
3. Each of the five nav links, clicked from any page, lands on the correct sibling file and highlights itself as current.
4. The gallery section on any one page shows exactly 8 slots, and no two of the five pages show an identical 8-image slice.
5. All five palette pairs in the audit table pass WCAG AA, or have been adjusted until they do.
6. No `<html lang>` switcher, no translate widget, and no second language anywhere in the shell markup.
7. Every asset reference (`images/`, `media/`) resolves with a `../` prefix and loads correctly from inside `v2/`.
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

When you are done, open ocean-forest-website/v2/arriving.html directly in a browser from Finder
(double-click, no server) and confirm it renders correctly, the theme starts light, the nav links
work, and the hero and gallery placeholders both show their labelled "media to come" state. Fix
anything broken before you report back. List the six acceptance checks from the spec and state
pass/fail for each.
```
