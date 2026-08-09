STATUS: SHIPPED 2026-08-07

Built and verified as commit `79d9c6f`.

**REVISED 2026-08-09.** This build's own commit silently reverted the root-absolute asset-path rule
(`of-v2-shell.md` §2) back to a `../` climb — the second of the three times that rule broke and was
re-fixed on this project. It was corrected again in `cfe3f60`, after this spec's work landed, so the
regression never reached this document until now. Nothing in this spec's own contracts was wrong;
the root-absolute rule simply lives in `of-v2-shell.md`, not here, and a rebuild from this spec alone
would not by itself reintroduce the bug. Recorded here only so the history is not a mystery to
whoever reads it next. The gallery-list shrink to 22 real files (§2, this spec) and the restored
hero video are both also now the standing description in `of-v2-shell.md` §3 — that document is
authoritative for the shell-wide contract; this one remains authoritative for the asset-fetch job
itself.

# Ocean Forest V2 — fill the placeholders

Pull every photograph that already exists on the client's own live sites into `media/`, wire them
into the V2 pages, put the hero video back on every page, and fix the amenity row so it uses the
five photographs Eli already has.

Written 2026-08-06 after an audit found 27 empty placeholder frames on V2 while real photography
sat unused on `oceanforestecolodge.com`. Nothing here needs anything from Eli. It is all already
published on her own website.

## 1. Goal

Every placeholder frame on V2 that can be filled from the client's existing sites is filled, and
every page opens with the hero video again.

## 2. Decisions

- **Source is `oceanforestecolodge.com` only.** The `.org` site is older and lower resolution. Use `.org` only for the arrival map, which `.com` does not have.
- **Files are downloaded into the repo, not hotlinked.** Hotlinking a WordPress site means the V2 site breaks the day Eli reorganises her media library, and it is slower for every visitor.
- **Keep the source format.** These are already `.webp`. Do not convert. Change the `data-media` filenames in the HTML to match, rather than renaming or re-encoding the files.
- **The amenity row adopts the five amenities Eli actually photographed**, replacing the five the page currently invents. She has photographs of breakfast, the bed, linens, mosquito nets and hand soap. The page currently asks for en-suite bathrooms and private balconies, which were never photographed, and ignores the bed and the soap, which were. Match the page to the photographs.
- **The hero video returns on all six pages**, the same YouTube embed V1 uses, until Ryan's per-page cuts exist. A hero slot with nothing in it reads as broken; the same film on six pages reads as deliberate.
- **The video is the background, the still is the fallback.** Where a page later gets its own cut, one line changes.
- **The gallery list shrinks to what exists.** `shell.js` names 24 gallery files; 22 are published. Set the list to the 22 real ones rather than leaving two frames permanently empty.
- **Anything with no source stays a labelled placeholder.** Do not substitute a vaguely similar photograph to make a frame look full. A labelled empty frame is a request to Eli; a wrong photograph is a lie that nobody catches.

## 3. Contracts

### 3.1 Repo and house rules

Repo root: `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge`. Static HTML, no framework, no
build step, deployed by Vercel from `main`.

- **This build touches only `ocean-forest-website/v2/` and `ocean-forest-website/media/`.** Nothing above `v2/` may be edited. V1 is live and frozen, and a V2 change that reaches V1 has already happened once on this project.
- **`media/` is shared by V1 and V2 and is additive only.** Add files. Never rename, move or delete a file already in `media/`.
- Light is the default theme. No language switcher. No em-dashes or en-dashes in any UI copy.
- No new npm dependencies. No build step. No scroll listeners.

### 3.2 Download script — `ocean-forest-website/fetch-v2-images.sh`

New file, modelled on the existing `fetch-live-images.sh`, which works and should be read first.
`set -euo pipefail`, `cd "$(dirname "$0")"`, a `get()` helper using `curl -fsSL --retry 2` that
prints `ok` with the file size or `FAILED` per file, and never aborts the whole run on one failure.

It must be safe to run twice. It creates `media/lodging`, `media/gallery`, `media/experiences`,
`media/retreats`, `media/property` and `media/arriving` as needed.

**Confirmed URLs.** These were verified on 2026-08-06 by reading the live pages. Base is
`https://www.oceanforestecolodge.com/wp-content/uploads`.

| Destination | Source |
|---|---|
| `media/lodging/beach-bungalow-01.webp` | `/2025/11/Beach-Bungalow-Coco-Solo-1-1.webp` |
| `media/lodging/beach-bungalow-02.webp` | `/2025/11/Beach-Bungalow-Coco-Solo-2-1.webp` |
| `media/lodging/beach-bungalow-03.webp` | `/2025/11/Beach-Bungalow-Coco-Solo-3.webp` |
| `media/lodging/beach-bungalow-04.webp` | `/2025/11/Beach-Bungalow-Coco-Solo-5-1.webp` |
| `media/lodging/family-bungalow-01.webp` | `/2025/12/Family-Bungalows-1.webp` |
| `media/lodging/family-bungalow-02.webp` | `/2025/12/Family-Bungalows-2.webp` |
| `media/lodging/family-bungalow-03.webp` | `/2025/12/Family-Bungalows-3.webp` |
| `media/lodging/family-bungalow-04.webp` | `/2025/12/Family-Bungalows-4.webp` |
| `media/gallery/gallery-01.webp` … `-22.webp` | `/2025/12/Ocean-Forest-Ecolodge-1-1.webp` … `-22.webp` |

Note the beach bungalow numbering: files 1, 2 and 5 carry a `-1` suffix, file 3 does not. That is
how they are named on the server, not a typo.

**URLs to discover.** These images are on the live site but their `src` is lazy-loaded, so reading
the rendered page does not reveal them. Fetch the raw HTML with `curl` and read the
`data-src`, `data-lazy-src` or `srcset` attributes, or query
`https://www.oceanforestecolodge.com/wp-json/wp/v2/media?per_page=100&search=<term>`, which is open
on that site and returns `source_url` for every match.

| Needed for | Search term | Destination |
|---|---|---|
| Jungle Suites, 4 shots | `Jungle Suites` | `media/lodging/jungle-suite-01..04.webp` |
| Open-air dining, long table | mine `/food-and-experiences/` | `media/property/kitchen-table.webp` |
| Yoga shala exterior | mine `/yoga/` | `media/retreats/retreat-teaser.webp` and `media/property/shala-exterior.webp` |
| A tours hero | mine `/experiences-tours/` | `media/experiences/tours-teaser.webp` |
| Regional arrival map | mine `https://www.oceanforest.org/arriving/` | `media/arriving/map-region.jpg` |

Print a clear summary at the end: how many files downloaded, how many failed, and **which
placeholder slots remain unfilled**. That list is what Mehdi sends Eli.

### 3.3 Rewire the `data-media` attributes

Every slot below is currently `.jpg`. The downloaded files are `.webp`. Update the attribute in the
HTML; do not rename the files.

`v2/index.html` and `v2/lodging.html` both reference the room shots. Keep them pointing at the same
files so the home and the page cannot drift.

| Current attribute | Becomes |
|---|---|
| `lodging/beach-bungalow-01.jpg` | `lodging/beach-bungalow-01.webp` |
| `lodging/beach-bungalow-02.jpg` | `lodging/beach-bungalow-02.webp` |
| `lodging/jungle-suite-01.jpg` | `lodging/jungle-suite-01.webp` |
| `lodging/jungle-suite-02.jpg` | `lodging/jungle-suite-02.webp` |
| `lodging/family-bungalow-01.jpg` | `lodging/family-bungalow-01.webp` |
| `lodging/family-bungalow-02.jpg` | `lodging/family-bungalow-02.webp` |
| `property/kitchen-table.jpg` | `property/kitchen-table.webp` |
| `experiences/tours-teaser.jpg` | `experiences/tours-teaser.webp` |
| `retreats/retreat-teaser.jpg` | `retreats/retreat-teaser.webp` |
| `property/shala-exterior.jpg` | `property/shala-exterior.webp` |

`property/property-map.webp` already resolves and is not touched.

Any slot whose download failed keeps its current attribute and stays a labelled placeholder.

### 3.4 The amenity row — `v2/lodging.html`

Five photographs already exist at `media/amenities/`, downloaded by `fetch-live-images.sh`. They
are the five amenities Eli's own site advertises. Replace the current five slots with these, in
this order, keeping the existing `.lo-amen` grid and `.lo-amen-label` markup exactly as it is:

| `data-media` | `data-note` and visible label |
|---|---|
| `amenities/meals.webp` | Breakfast, served fresh each morning |
| `amenities/bed.webp` | Queen-size double bed |
| `amenities/linens.webp` | Fresh linens and towels |
| `amenities/mosquito-nets.webp` | Mosquito nets |
| `amenities/hand-soap.webp` | Hand soap |

`data-ratio="1/1"` on all five, as now. Delete the `amenity-ensuite-bathrooms` and
`amenity-private-balconies` slots. En-suite bathrooms and private balconies are still described in
the room detail text, so nothing is lost from the page; they simply stop being photograph slots
that can never be filled.

### 3.5 The hero video, on all six pages

V1's `index.html` carries this embed. Copy it exactly, changing nothing in the query string:

```
https://www.youtube-nocookie.com/embed/AjqtTXfJbeg?autoplay=1&mute=1&loop=1&playlist=AjqtTXfJbeg&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&start=2
```

Read how V1 mounts it in `ocean-forest-website/index.html` and reproduce that treatment inside the
existing V2 hero slot in `v2/shell.js`, so all six pages get it from one place rather than six.

Rules:

- `title` attribute set, `loading="lazy"`, and `aria-hidden="true"` since it is decoration and carries no information a screen reader needs.
- The existing hero scrim, headline and controls stay exactly where they are, on top of the video.
- **`prefers-reduced-motion: reduce` must suppress the video** and show the still fallback instead. This is a house rule and an autoplaying background film is exactly what it exists for.
- One line per page, or better one constant in `shell.js`, must be able to swap in a per-page cut later without touching six files. Ryan's footage is coming and this is the seam it arrives through.
- The home's existing WATCH THE FULL FILM button is unchanged.

### 3.6 The gallery list — `v2/shell.js`

`GALLERY` currently names `gallery-01.jpg` through `gallery-24.jpg`. Twenty-two exist. Replace the
array with `gallery/gallery-01.webp` through `gallery/gallery-22.webp`. The rotation logic, the
offsets per page and the eight-wide slice are unchanged; only the list and the extensions change.

### 3.7 Unchanged

Everything in `ocean-forest-website/` above `v2/`. Every existing file in `media/`. Every spec.
`vercel.json`. All page copy, all headings, all structure. This build changes filenames, adds
images, adds a video embed, and swaps five amenity slots. It writes no new prose.

## 4. Acceptance checks

1. `bash ocean-forest-website/fetch-v2-images.sh` runs twice with no error, and prints a closing summary naming every slot it could not fill.
2. `media/` gains at least 30 image files, and `git status` shows **no** modification or deletion of any file that was already in `media/`.
3. `grep -rn 'data-media' ocean-forest-website/v2/*.html` returns no path ending `.jpg` except any whose download failed and which the summary in check 1 names.
4. Opening `v2/lodging.html` from the Finder shows real photographs in the room cards, the five amenity photographs with their five labels, and the property map. No dashed placeholder frame remains in the amenity row.
5. Opening `v2/index.html` from the Finder shows the hero video playing muted and looping, with the headline legible on top of it. The same video appears on all five other pages.
6. With macOS Reduce Motion switched on, the video does not play on any page and the still fallback shows instead.
7. The gallery at the foot of each of the six pages shows eight real photographs, and no two adjacent pages show the same eight.
8. `git diff --stat` shows changes only under `ocean-forest-website/v2/` and `ocean-forest-website/media/`, plus the new `fetch-v2-images.sh`. No file above `v2/` is touched.

## 5. Out of scope

- Google reviews. Separate decision, separate build.
- Wiring the newsletter form to an endpoint.
- The arrival card PDFs and the dead `Download arrival card` link.
- Room photography Eli has not published. If it is not on her site, it stays a placeholder.
- Cropping, retouching, resizing or re-encoding anything.
- The property map redraw with altitude.
- Ryan's video. This puts the existing film back; his cuts replace it later.
- No deploy, no push. Mehdi does that.

## 6. Parking line

Empty. Nothing in this build is blocked on anyone.

## 7. Build prompt

```
Read specs/of-v2-assets.md in this repo. That spec is your ONLY input. Do not read other
specs. Do not infer requirements from the existing code beyond what the spec tells you to
keep.

You DO have network access for this one, and you need it: the job is to download images
from the client's own live site. Read ocean-forest-website/fetch-live-images.sh first,
it already works and is the pattern to follow.

New file: ocean-forest-website/fetch-v2-images.sh. Edited: the six HTML files in
ocean-forest-website/v2/ and ocean-forest-website/v2/shell.js. Touch nothing else.

CRITICAL: nothing above ocean-forest-website/v2/ may be edited. V1 is live. A V2 build
already leaked into V1 once on this project by editing a shared file, and check 8 exists
to catch it. media/ is shared by V1 and V2: you may ADD files to it, never rename, move
or delete one that is already there.

Section 3.2 has the URLs I confirmed by hand and the ones you have to discover. For the
lazy-loaded ones, the WordPress REST endpoint at
/wp-json/wp/v2/media?per_page=100&search=<term> is open on that site and is the fastest
way in. If an image genuinely is not published anywhere, leave that slot as a labelled
placeholder and name it in the closing summary. Do NOT substitute a similar-looking
photograph to make a frame look full.

Section 3.5 is the one with a real trap: prefers-reduced-motion must suppress the video
and show the still instead, and the embed should live in ONE place in shell.js rather
than being pasted into six pages, because Ryan's per-page cuts are coming.

House rules: light default theme, no language switcher, no em-dashes or en-dashes in UI
copy, no new npm dependencies, no build step, no scroll listeners.

Run all 8 acceptance checks in section 4 yourself except 4, 5, 6 and 7, which need a
browser and eyes. Report those four as "deferred to Mehdi". Verify the rest with evidence.
Do not commit, do not push, do not deploy.
```
