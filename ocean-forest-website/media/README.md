# Media drop folder

Drop files in here using the exact filenames below. No code changes needed.
Any slot with no file shows a labelled placeholder frame on the page telling you
which filename it is waiting for.

## Format rules

- Photos: JPG or WebP, longest edge 2400px, quality 80. Name in lowercase, hyphens only.
- Video: MP4 (H.264, AAC audio) plus a WebM copy if you have one. Under 12MB for the hero.
- Every photo needs a real alt text. Add it to `alt-text.md` next to the filename.

---

## Main page — `/` (index.html)

### Gallery (exactly 8 slots, top level of `media/`)

| File | Where it goes |
|---|---|
| `gallery-01.jpg` … `gallery-08.jpg` | `#gallery` photo grid, in order |

### rooms/ — the three marketed room types

`-01` is the shot used in the room grid, so make it the strongest.

| File | Where it goes |
|---|---|
| `rooms/beach-bungalow-01.jpg` | Beach Bungalows card, `#rooms` |
| `rooms/jungle-suite-01.jpg` | Jungle Suites card, `#rooms` |
| `rooms/family-bungalow-01.jpg` | Family Bungalows card, `#rooms` |

### property/

| File | Where it goes |
|---|---|
| `property/kitchen-table.jpg` | `#food`, open-air dining room |
| `property/shala-exterior.jpg` | `#about`, the Lapa Lapa Lodge from the beach |

### tours/ — shared tours block (appears on `/` and `/retreats`)

Four photos per tour, `-01` through `-04`. `-01` is the big lead image; the rest
feed that tour's slider. Filenames are derived from the tour slug in
`shared-sections.js`, so they must match exactly.

Ocean Discovery:
`tours/cano-island-01.jpg` … `-04.jpg`
`tours/scuba-diving-cano-island-01.jpg` … `-04.jpg`
`tours/snorkeling-cano-island-01.jpg` … `-04.jpg`
`tours/dolphin-whale-encounters-01.jpg` … `-04.jpg`
`tours/surf-tour-rio-claro-01.jpg` … `-04.jpg`

Rainforest Discovery:
`tours/corcovado-national-park-01.jpg` … `-04.jpg`
`tours/corcovado-sirena-01.jpg` … `-04.jpg`
`tours/corcovado-san-pedrillo-01.jpg` … `-04.jpg`
`tours/goddess-jacuzzi-01.jpg` … `-04.jpg`

---

## Still parked (not blocking launch)

| File | Where it goes | Notes |
|---|---|---|
| `video/shala-360.mp4` | Retreats page, the shala | Ryan · full 360° tour of the three floors |
| `video/hero-stay.mp4` + `.webm` + `-poster.jpg` | Hero video slot | Muted autoplay loop, 10–20s, slow movement only. Until it arrives the hero uses the existing YouTube embed. |
| `video/aerial-band.mp4` + `-poster.jpg` | Full-bleed drone band | 15–25s. Coastline or canopy. |

---

## Legacy slots (older `stay.html` build — kept for reference)

`stay.html` is now a redirect to `/`, so these are no longer requested by any
page. Keep the files if you have them; they are useful for the room galleries.

Beach bungalows: `rooms/coco-solo-01…03.jpg` · `rooms/palmiche-01…03.jpg` · `rooms/naranjo-01…03.jpg`
Garden: `rooms/mango-01…03.jpg`
Jungle suites: `rooms/solo-bueno-north-01…03.jpg` · `rooms/solo-bueno-south-01…03.jpg` · `rooms/white-hawk-top-01…03.jpg` · `rooms/white-hawk-bottom-01…03.jpg`
Gardens and stream: `rooms/cachimbo-top-01…03.jpg` · `rooms/cachimbo-bottom-01…03.jpg`
Facilitator rooms: `rooms/lapa-lapa-west-01.jpg` · `rooms/lapa-lapa-east-01.jpg`

Other legacy property slots: `property/beach-wide.jpg` · `property/kitchen-prep.jpg` ·
`property/food-plate.jpg` · `property/staff-portrait.jpg` · `property/garden-path.jpg` ·
`property/boat-arrival.jpg` · `property/airstrip.jpg` · `property/corcovado-wildlife.jpg` ·
`property/cano-island.jpg` · `property/sunset-band.jpg`
