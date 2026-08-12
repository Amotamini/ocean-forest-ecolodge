# Handover — Ocean Forest Ecolodge website

Written 2026-08-09, for the developer taking this over. You have not seen this project before,
and you are going to be changing it without us in the room. This document is the map.

## How the site is laid out

There are two sites living in one folder, and they are separate on purpose.

- **V1 is everything at the root of this folder** — `index.html`, `retreats.html`, `lodging.html`
  (via `stay.html`), and so on. **This is the live site right now.** Anything you touch here goes
  out to real visitors immediately on the next deploy.
- **V2 is everything inside ``** — six pages (`index.html`, `arriving.html`, `lodging.html`,
  `experiences.html`, `retreats.html`, `about.html`). This is the new site, built to replace V1,
  not yet switched on.

V2 has **its own copy** of `shared-sections.js` (the tour and logistics data both the Retreats and
Arriving pages pull from), separate from the one at the folder root that V1 uses. This looks like
duplication and it is deliberate: a V2 build once edited the shared root copy directly, and that
change would have gone live on V1 on the next push, before V2 was ready to launch. Always edit
`shared-sections.js` for V2 work. Never touch the root one unless you are intentionally
changing V1.

## Three rules that have already broken this project. Follow them.

**1. Every local reference inside `` must be root-absolute** — `/shell.css`,
`/lodging.html`, `/images/logo-white.png`, `/media/gallery/gallery-01.jpg`. Never a relative
filename, never a `../` climb. Reason: this site deploys to Vercel with `trailingSlash: false`, so
a page served at a clean URL with no trailing slash resolves a relative `shell.css` to the wrong
place, and the page renders with no stylesheet at all. This exact bug has hit this project three
times: fixed in commit `230189f`, silently reverted in `79d9c6f`, fixed again in `cfe3f60`, and
even after all three of those, five of V2's six pages (everything except `index.html`) were still
using relative and `../` paths until this pass, 2026-08-09 — the earlier fixes only ever reached
the home page. All six pages are root-absolute now. Keep them that way. Test the **deployed URL**,
not just a local file open, because relative paths can look fine locally and still break in
production.

**2. V2 never shares a file with V1.** See "How the site is laid out" above. If a change belongs to
both sites, make it in both places separately, or ask before assuming they should merge.

**3. `media/` is additive only.** V1 and V2 share this one folder. Add new files freely. Never
rename, move, or delete a file that's already there — something on the live V1 site is probably
using it, even if you can't see the reference from inside ``.

## Running it locally

```bash
cd ocean-forest-website
python3 -m http.server 8080
```

Then open `http://localhost:8080/` (or `http://localhost:8080/` for V1).

**Do not open any HTML file by double-clicking it.** Because every V2 reference is root-absolute
(rule 1 above), a file opened directly from Finder loads over `file://`, where a leading slash
resolves to your filesystem root, not the site root. Every image and stylesheet will 404 and the
page will look broken even though nothing is actually wrong. It has to be served over http.

## Specs — one per page, and they are the source of truth

They live in `specs/`, one level above `ocean-forest-website/`, one file per page: `of-v2-shell.md`
(the shared header/footer/hero/gallery every page sits inside), `of-v2-arriving.md`,
`of-v2-lodging.md`, `of-v2-experiences.md`, `of-v2-retreats.md`, `of-v2-about.md`, plus
`of-v2-home.md` and `of-v2-assets.md`. Each one ends in a numbered list of acceptance checks
describing exactly what "done" looks like for that page: markup, behaviour, copy, everything.

**As of 2026-08-09, every one of these specs is true.** They were re-read against the live code
during this pass and corrected wherever the two had drifted apart, so a rebuild from any spec
today reproduces the live page rather than reverting it.

**A correction is not finished until it is written back into the spec it corrects.** This project
has already had a fix applied, silently reverted by a later build that only read the spec (not the
live code), and then reapplied — the root-absolute path rule above is that exact story, twice
over. If you fix something the spec doesn't mention, or the spec turns out to be wrong, edit the
spec in the same sitting. A `STATUS: SHIPPED` spec with a dated `REVISED` note at the top, folding
in what changed and why, is the pattern used throughout — follow it.

## Where the media lives

`ocean-forest-website/media/`. `media/README.md` lists every expected filename and where it's
used, with the naming convention (lowercase, hyphens, JPG or WebP). **A missing file is not a
bug** — `shell.js`'s media loader shows a labelled dashed-frame placeholder naming the exact
filename it's waiting for, on any page, for any image. That's intentional: it tells you at a
glance what's still needed instead of failing silently. Drop a correctly-named file into `media/`
and the placeholder becomes the photo, with no code change.

## Settled facts — do not re-litigate these

Multiple sources disagreed on all of these at different points. They are decided now, Mehdi's
call, 2026-08-09:

- **Eleven rooms, 32 guests maximum.**
- **Lapa Lapa West and East are bookable**, same as any other room, not held back for facilitators.
- **Rates are final: $120 beach bungalow, $140 jungle suite, $150 family bungalow.** No separate
  per-room, per-season table is coming.
- **Route prices are published as straight numbers**, not "from" prices: boat from Sierpe $30/$40,
  the fly-to-Drake-Bay 4x4 transfer $60.
- **Founded 2003.**
- **The site's address is oceanforestecolodge.com.**

## Still outstanding

- **Redirect list from oceanforest.org.** Every page live on the old site needs its new-site
  target before the domain switches, or existing links and Google rankings break on launch day.
  Owed by Eli.
- **Group Travel section copy on Arriving.** The only piece of writing on the site with no source
  anywhere yet. Owed by Eli.
- **Confirming the Helpful Contacts are still current.** Other people's personal numbers, last
  checked in 2018, currently marked "unconfirmed" on the page. Owed by Eli.
- **Ryan's per-page hero video cuts.** Every page runs the same full aerial film meanwhile; the
  Retreats page's shala video slot is also waiting on him (see below). Owed by Ryan.
- **The newsletter.** Which email service, and the signup code from it. The form isn't wired to
  anything yet. Owed by Eli.
- **Google reviews.** Needs Eli's own Google Business Profile login so the review widget is set up
  on her account, not ours. Owed by Eli.

## Found during this pass, not fixed

- **`retreats.html`'s shala video** (`media/video/shala-360.mp4`) shows a labelled placeholder
  and a 404 in the console. This is expected, not a bug: the file has never been delivered, and
  the placeholder is exactly the "waiting for" pattern described above. It'll resolve itself the
  day the file is dropped into `media/video/`.
- **One em dash survives**, in the Lodging page's Hold Harmless heading
  (`HOLD HARMLESS AGREEMENT — For Visiting Ocean Forest Ecolodge Retreat`). Left alone on purpose:
  that section's text is explicitly retrieved verbatim from the client's legal wording, and
  `of-v2-lodging.md` says not to rewrite it into the site's voice. Every other em and en dash found
  across `` during this pass, including two in the shared logistics data
  (`shared-sections.js`), was fixed.
- **A stale $70 price** was found alongside the em-dash sweep, in `shared-sections.js`'s shared
  logistics widget (the "By air" transfer summary, used on both Arriving and Retreats). It
  contradicted the $60 figure decided the same day this pass ran, and has been corrected to match.
