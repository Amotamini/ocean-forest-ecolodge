# Handover — Ocean Forest Ecolodge website

Written 2026-08-09, for the developer taking this over. You have not seen this project before,
and you are going to be changing it without us in the room. This document is the map.

Repaired 2026-08-13: the addresses in it were describing a layout the site left behind on
2026-08-11. The rules, the reasoning and the history are unchanged.

Reissued 2026-09-03: the project passed from Eli to Jonas, and the repository moved with it. It now
lives at `github.com/Amotamini/ocean-forest-ecolodge`, and Vercel's Root Directory for it must be
`ocean-forest-website`. Documents in `specs/`, `audits/` and `waiting-on/` still name Eli
throughout — that is correct history and was deliberately not rewritten.

## How the site is laid out

One site, at the root of this folder. There is nothing else here.

**Seven pages.** Six are files at the root:

| Page | File | Address |
|---|---|---|
| Home | `index.html` | `/` |
| Arriving | `arriving.html` | `/arriving` |
| Lodging | `lodging.html` | `/lodging` |
| Experiences | `experiences.html` | `/experiences` |
| Retreats | `retreats.html` | `/retreats` |
| About | `about.html` | `/about` |

The seventh is the blog, which is a folder rather than a file: `blog/index.html` is the list of
posts, and each post is its own file at `blog/<slug>.html`. It is read at `/blog/`.

**There is no `blog.html`, and there must never be one.** `vercel.json` sets `cleanUrls: true`, so
a `blog.html` file and a `blog/` folder would both claim the address `/blog`, and which one the
platform served would be nobody's decision. The folder with an index inside it has no such
collision. The stub that used to sit at `blog.html` was removed on 2026-08-13.

**What appears on the blog is decided in `posts.js` at the root**, one entry per post, and the
index builds its cards from that list. Same pattern as `ACTIVITIES` and `FAQ` in
`shared-sections.js`. Post photographs live in `media/blog/<slug>/`, one folder per post.

## Three rules that have already broken this project. Follow them.

**1. Every local reference must be root-absolute** — `/shell.css`, `/lodging.html`,
`/images/logo-white.png`, `/media/gallery/gallery-01.jpg`, `/media/blog/<slug>/hero.webp`. Never a
relative filename, never a `../` climb. Reason: this site deploys to Vercel with
`trailingSlash: false`, so a page served at a clean URL with no trailing slash resolves a relative
`shell.css` to the wrong place, and the page renders with no stylesheet at all. This exact bug has
hit this project three times: fixed in commit `230189f`, silently reverted in `79d9c6f`, fixed
again in `cfe3f60`, and even after all three of those, five of the six pages (everything except
`index.html`) were still using relative and `../` paths until the pass of 2026-08-09 — the earlier
fixes only ever reached the home page. Every page is root-absolute now, and so are `blog/index.html`,
`blog/_template.html` and every post generated from that template. Keep them that way. Test the
**deployed URL**, not just a local file open, because relative paths can look fine locally and
still break in production.

**2. A shared file changes every page at once.** `shell.css`, `shell.js` and `shared-sections.js`
hold one definition each of the header, the menu, the room card, the slider, the lightbox, the
tours and the arrival routes, and every page draws on them. There is no page-level copy of any of
it, on purpose: this was consolidated on 2026-08-09 out of four sliders, five expanders, two
lightboxes and three room cards, and the menu alone had six hand-written copies driven by one
brain, so adding a link meant six edits and five of them going right was a silently broken site.
The cost of that consolidation is this rule. A change made because one page needs it lands on all
seven. If a change belongs to one page only, it does not belong in a shared file.

**3. `media/` is additive only.** Add new files freely. Never rename, move, or delete a file that
is already there. Something on the site is probably using it, and you cannot see every reference
from the page in front of you. Taking a photograph "off the site" means changing the page that
points at it, never touching the file.

## Running it locally

```bash
cd ocean-forest-website
python3 serve.py
```

Then open `http://localhost:8080/`. Use this script rather than `python3 -m http.server`: the
plain module sends `Last-Modified` and no cache policy, so Chrome holds on to `shell.css` and
`shell.js` and keeps serving you an old build. On 2026-08-09 that cost a full review round.
`serve.py` sends `Cache-Control: no-store` on everything, so a plain refresh is always the truth.

**Do not open any HTML file by double-clicking it.** Because every reference is root-absolute
(rule 1 above), a file opened directly from Finder loads over `file://`, where a leading slash
resolves to your filesystem root, not the site root. Every image and stylesheet will 404 and the
page will look broken even though nothing is actually wrong. It has to be served over http.

One thing the local server does not do is clean URLs. Vercel serves `/blog/turtles` from
`blog/turtles.html`; the local Python server does not, so a blog card clicked locally will 404
while being perfectly correct in production. Open the post at its `.html` address locally.

## Specs — one per page, and they are the source of truth

They live in `specs/`, one level above `ocean-forest-website/`, one file per page: `of-v2-shell.md`
(the shared header/footer/hero/gallery every page sits inside), `of-v2-arriving.md`,
`of-v2-lodging.md`, `of-v2-experiences.md`, `of-v2-retreats.md`, `of-v2-about.md`, plus
`of-v2-home.md` and `of-v2-assets.md`. Each one ends in a numbered list of acceptance checks
describing exactly what "done" looks like for that page: markup, behaviour, copy, everything.

The blog and the handover documents were covered by a spec held on PxN's machine, which is not part of this repository. Everything it required is already built and described here.

**As of 2026-08-09, every one of these specs is true.** They were re-read against the live code
during that pass and corrected wherever the two had drifted apart, so a rebuild from any spec
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

Blog photographs are the one part of `media/` with a rule of their own: they go in
`media/blog/<slug>/`, resized to 1600px on the long edge and saved as `.webp` before they go in.
See `media/blog/README.md`.

## Settled facts — do not re-litigate these

Multiple sources disagreed on all of these at different points. They are decided now: Mehdi's call
on 2026-08-09, except the room count, which is Eli's own answer and was corrected to ten on
2026-08-13.

- **Ten rooms, 32 guests maximum.**
- **Ten bookable guest rooms. Twelve units exist; Lapa Lapa West and East are facilitator space.
  Settled with Eli, do not re-open** — every contrary source in this folder descends from a single
  incorrect note dated 2026-08-09.
- **Rates are final: $120 beach bungalow, $140 jungle suite, $150 family bungalow.** No separate
  per-room, per-season table is coming.
- **Route prices are published as straight numbers**, not "from" prices: boat from Sierpe $30/$40,
  the fly-to-Drake-Bay 4x4 transfer $60.
- **Founded 2003.**
- **The site's address is oceanforestecolodge.com.**

## Who edits what

Jonas edits words, photographs, prices and the blog, by talking to Claude, constrained by
`ocean-forest-website/CLAUDE.md`. That file holds the four recipes he will need more than once
(publish a post, edit or remove a post, change a price, take a photograph off a page), tells
Claude to refuse anything structural and route it to a developer, and requires one line in
`CHANGES.md` after every edit. `CHANGES.md` is your first stop when he reports a problem: a
plain-English list of what changed and when, newest first, with the git log behind it.

He can also revert his own last change from GitHub Desktop's History pane without anybody's help.
`EDITING-YOUR-WEBSITE.md` is the same ground in his language, with no filenames in it at all.

There is no developer on retainer. PxN built the site and handed it over on 2026-09-03; if you are
reading this, you are probably the person Jonas brought in. Everything you need is in this file and
in `specs/`.

**If you change the architecture, update `CLAUDE.md` too.** It names specific files as off-limits.
Out of date, it stops protecting anything.

## Still outstanding

- **Redirect list from oceanforest.org.** Every page live on the old site needs its new-site
  target before the domain switches, or existing links and Google rankings break on launch day.
  Owed by Jonas.
- **Group Travel section copy on Arriving.** The only piece of writing on the site with no source
  anywhere yet. Owed by Jonas.
- **Confirming the Helpful Contacts are still current.** Other people's personal numbers, last
  checked in 2018, currently marked "unconfirmed" on the page. Owed by Jonas.
- **Ryan's per-page hero video cuts.** Every page runs the same full aerial film meanwhile; the
  Retreats page's shala video slot is also waiting on him (see below). Owed by Ryan.
- **The newsletter.** Which email service, and the signup code from it. The form isn't wired to
  anything yet. Owed by Jonas.
- **Google reviews.** Needs the lodge's own Google Business Profile login so the review widget is set up
  on his own Google account, not PxN's. Owed by Jonas.

## Found during earlier passes, not fixed

- **`retreats.html`'s shala video** (`media/video/shala-360.mp4`) shows a labelled placeholder
  and a 404 in the console. This is expected, not a bug: the file has never been delivered, and
  the placeholder is exactly the "waiting for" pattern described above. It'll resolve itself the
  day the file is dropped into `media/video/`.
- **One em dash survives**, in the Lodging page's Hold Harmless heading
  (`HOLD HARMLESS AGREEMENT — For Visiting Ocean Forest Ecolodge Retreat`). Left alone on purpose:
  that section's text is explicitly retrieved verbatim from the client's legal wording, and
  `of-v2-lodging.md` says not to rewrite it into the site's voice. Every other em and en dash found
  across the site during the 2026-08-09 pass, including two in the shared logistics data
  (`shared-sections.js`), was fixed.
- **A stale $70 price** was found alongside the em-dash sweep, in `shared-sections.js`'s shared
  logistics widget (the "By air" transfer summary, used on both Arriving and Retreats). It
  contradicted the $60 figure decided the same day that pass ran, and has been corrected to match.
