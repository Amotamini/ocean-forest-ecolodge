STATUS: DRAFT

# A2 — Lodging

## 1. Goal

Give the three room categories, the property map, food, and the rate/policy links one full page each guest reads before they book.

## 2. Decisions

- Built on the A0 shell, as `ocean-forest-website/v2/lodging.html`, hero slug `lodging`, gallery offset `8`.
- Section order, top to bottom: hero, accommodations line, nature note, three room categories (expand in place), amenity row as photos, property map, food, rates/hold-harmless/cancellation, gallery.
- The three room categories are Beach Bungalows (couples), Jungle Suites (families of 3), Family Bungalows (up to 4) — these three only. The `.com` accordion's extra unit types (Quadruple Bungalow, Lapa Lapa Rooms, Garden Bungalow) are not part of the three marketed categories and are not shown here; that's retreat-capacity inventory, not the nightly-stay room chart.
- Each room card expands in place to its full description; nothing links out to a separate page.
- Amenity row is five photographs, not icons — Eli's explicit preference. The five amenities are the same five icons currently render in `index.html` (three meals a day, en-suite private bathrooms, private balconies, fresh linens and towels, mosquito nets); only the visual treatment changes, from SVG icon to photo.
- The nature note sits near the top, above the room cards, framed as normal information, not an apology and not a warning-styled callout.
- No menu, ever. Food copy uses the "no menu" reframe from the current Vercel build (`index.html` lines 762–764), carried forward verbatim.
- The property map is the hand-drawn scan, shipped as-is. The digital redraw is not used, per brief §5 — it has an unreadable label and a wrong compass rose.
- Rates render as the same room-price pattern already live in `index.html` (`$120` / `$140` / `$150` "from" prices) — this deliberately keeps prices in HTML per the existing precedent noted in `index.html` line 420.
- Hold harmless and cancellation are external links, not reproduced text, since neither source page's full text was captured for this build. They sit together at the foot, beside the rates.

## 3. Contracts

### Hero
- Slug: `lodging`
- Eyebrow: `Accommodations`
- `h1`: `Ten Rooms, One Remote Mile of Beach`
- Sub: `Rustic, private, and steps from the Pacific. Choose the room that fits how you travel.`

### Accommodations line, verbatim, directly under the hero
> Located plumb in a remote mile of coconut-laddered beach, the property is situated looking out over the sparkling Pacific Ocean and is surrounded by botanical gardens and rainforest.

### Nature note, near the top, framed not apologised for
> This is one of the most thriving ecosystems on the planet. Rooms are bugproof, but life gets in — that is the place working exactly as it should. Expect to meet insects. It is part of being here, not a defect in your room.

### Three room categories, expand in place, copy source: `index.html` lines 636–685 (the current live V1 copy), verbatim
1. **Beach Bungalows** — "Ideal for couples". Tag copy, bullet list (1 double bed; private balcony overlooking the ocean; en-suite bathroom with natural ventilation; rustic open design, 260 ft² / 24 m²). Price: "From **$120** per night".
2. **Jungle Suites** — "Ideal for families of three". Tag copy, bullet list (1 double bed + 1 single bed; large balcony with partial ocean view; hardwood floors, 430 ft² / 40 m²; en-suite bathroom with hot water). Price: "From **$140** per night".
3. **Family Bungalows** — "Ideal for families up to 4 guests". Tag copy, bullet list (1 double + 2 single beds; private terrace overlooking garden; generous layout, 540 ft² / 50 m²; en-suite bathroom with fans). Price: "From **$150** per night".
Each card's "Book now" CTA points at the same booking URL used everywhere else: `https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3`.

### Amenity row — five photographs
Same five labels as `index.html` lines 696–716, in the same order: Three meals a day, En-suite private bathrooms, Private balconies, Fresh linens and towels, Mosquito nets. Each slot is a `data-media` frame (`lodging/amenity-<slug>.jpg`, `data-ratio="1/1"`) using the placeholder pattern, not the existing inline SVG icon markup.

### Property map
- `data-media="property/property-map.webp"` — the file already exists at `ocean-forest-website/media/property/property-map.webp` and can be reused directly (path becomes `../media/property/property-map.webp` from inside `v2/`).
- Caption, verbatim from `index.html` line 722: `The grounds, drawn by hand — beach bungalows on the sand, jungle suites in the trees, the shala at the center.`
- Do not attempt to redraw, relabel, or fix the compass rose. That is a separate asset job per brief §5.

### Food section — verbatim from `index.html` lines 762–767
> Three meals a day, made from what the garden and the sea offer that morning. Fresh fruit juices, medicinal herbs, detox teas. Food that tastes like the place it came from.
>
> No menus. Every meal changes with the tides and the season. Local fishermen, the lodge garden, and the jungle itself supply the kitchen. Come hungry.
>
> Every dish can be tailored to your needs. We accommodate allergies and special diets — gluten-free, vegetarian, and vegan. Share your preferences at least 48 hours before arrival.
Plus the four diet chips (Vegetarian, Vegan, Gluten-free, Omnivore), reusing the exact SVG icon markup from `index.html` lines 743–757.

### Rates, hold harmless, cancellation — at the foot, beside the room prices already shown in each room card
- Hold harmless link: `https://www.oceanforest.org/hold-harmless/`
- Cancellation link: `https://www.oceanforest.org/cancellation/`
- Both rendered as plain outbound links, labelled exactly "Hold Harmless Agreement" and "Cancellation Policy" (matching the labels already used in `index.html`'s source, `source-copy/org-copy.md` line 45–46).

## 4. Acceptance checks

1. Exactly three room categories appear, in the order Beach Bungalows, Jungle Suites, Family Bungalows, each expanding in place with no page navigation.
2. The amenity row renders as five photo-placeholder frames, not icons.
3. The property map shown is the hand-drawn scan (`property-map.webp`), not any digital redraw.
4. The nature note appears above the room cards and does not use warning or error styling.
5. The food section contains the words "No menus" and states the 48-hour notice for dietary needs.
6. Both the hold harmless and cancellation links point at the exact `oceanforest.org` URLs given above.
7. All three room prices match the figures given here exactly ($120, $140, $150).
8. No em dash or en dash appears anywhere in this page's visible copy.

## 5. Out of scope

Redrawing the property map with altitude (separate asset job, brief §5), sourcing real amenity or room photographs, reproducing the full hold-harmless/cancellation text in-page.

## 6. Parking line

**Room photographs** — blocked on Eli, per brief §10. This is the single thing holding launch; the page is built to accept them with no code change once they exist.

## 7. Build prompt

```
Read specs/of-v2-shell.md first and build this page on top of what it defines — reuse shell.css
and shell.js exactly as that spec describes. If ocean-forest-website/v2/shell.css and shell.js do
not exist yet, build them first, following of-v2-shell.md exactly, then build this page.

Read specs/of-v2-lodging.md in full — Section 3 "Contracts" is literal: room copy, bullet lists,
and prices are quoted from ocean-forest-website/index.html and must match exactly, byte for byte.

Build ocean-forest-website/v2/lodging.html: hero, accommodations line, nature note, three
expand-in-place room cards with prices and Book now buttons, the five-photo amenity row, the
hand-drawn property map (reuse ocean-forest-website/media/property/property-map.webp directly, do
not create a placeholder for it since the real file already exists), food section with the four
diet chips, the hold-harmless and cancellation links, and the shell's gallery section at offset 8.

When done, open ocean-forest-website/v2/lodging.html directly from Finder in a browser (no server)
and click through all three room cards to confirm they expand correctly, and confirm the property
map image actually loads (it is a real file, not a placeholder). List the eight acceptance checks
from the spec and state pass/fail for each.
```
