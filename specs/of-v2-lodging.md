STATUS: SHIPPED 2026-08-05

All 8 acceptance checks passed, verified in a browser on 2026-08-05. One deliberate reconciliation:
Section 3 says the room tags, nature note, map caption and food copy are lifted verbatim, but those
source strings carry em dashes that acceptance check 8 (and the house no-dash rule) forbids. The
wording is kept identical; only each em dash is swapped for house-style punctuation (a comma in the
Beach and Family tags, a period in the nature note, a colon in the map caption and the food diet
line). Room photographs remain the launch blocker per parking line 6; the page renders their
labelled placeholders and takes the real files with no code change.

**REVISED 2026-08-09.** Two rounds of corrections landed after this spec shipped, recorded only in
`of-v2-revisions.md` (C11–C15) and `of-v2-revisions-2.md` (D1–D3), plus Eli's photo delivery on
2026-08-07. Folded in below: the accommodations paragraph and the "What It Costs" section are gone,
"Choose your perfect room" now sits directly under the nature note and opens expanded by default,
each room has a clickable four-photo gallery with synced arrows and dots, the Hold Harmless and
Cancellation texts are reproduced in full on the page instead of linking to `oceanforest.org`,
"Nourishing the Soul" bleeds off the viewport edge, the room photographs are in, and every local
reference is root-absolute. A rebuild from this document now reproduces the live page rather than
reverting it.

# A2 — Lodging

## 1. Goal

Give the three room categories, the property map, food, and the rate/policy links one full page each guest reads before they book.

## 2. Decisions

- Built on the A0 shell, as `ocean-forest-website/v2/lodging.html`, hero slug `lodging`, gallery offset `8`.
- **Section order, top to bottom, rewritten 2026-08-09** (C11, C12, C15): hero, nature note, three room
  categories (expanded by default, each with a clickable photo gallery), amenity row as photos,
  property map, food ("Nourishing the Soul"), policies (Hold Harmless and Cancellation, reproduced in
  full), gallery. The original order — hero, accommodations line, nature note, room categories,
  amenity row, property map, food, rates/hold-harmless/cancellation, gallery — is superseded: the
  accommodations line is removed entirely (C11) and "Choose your perfect room" now sits directly under
  the nature note, above everything else on the page (C12).
- The three room categories are Beach Bungalows (couples), Jungle Suites (families of 3), Family Bungalows (up to 4) — these three only. The `.com` accordion's extra unit types (Quadruple Bungalow, Lapa Lapa Rooms, Garden Bungalow) are not part of the three marketed categories and are not shown here; that's retreat-capacity inventory, not the nightly-stay room chart.
- **All three room cards render expanded by default, photographs visible with no click.** (Rewritten
  2026-08-09, C13 — superseding "expand in place" as the closed starting state. The expand/collapse
  control stays and still works; only the starting state changed.) Each room card expands in place to
  its full description; nothing links out to a separate page.
- **Each room shows a clickable four-photo gallery, not one photograph** (C14), **with a left and
  right arrow overlaid on the photograph itself as well as the existing dots** (D1,
  `of-v2-revisions-2.md` §3.1): arrows and dots stay in sync, wrap around (last photo's "next" goes to
  the first), are real `<button>` elements with `aria-label="Previous photo"` / `"Next photo"`,
  keyboard reachable, styled as a semi-transparent dark circle with a light chevron so they read
  against both light and dark photographs, and are hidden when a room has only one photograph. Files,
  already on disk in `media/lodging/`: `beach-bungalow-01.jpg`, `-02.webp`, `-03.webp`, `-04.webp` (and
  the matching four for `jungle-suite-` and `family-bungalow-`).
- Amenity row is five photographs, not icons — Eli's explicit preference. The five amenities are the same five icons currently render in `index.html` (three meals a day, en-suite private bathrooms, private balconies, fresh linens and towels, mosquito nets); only the visual treatment changes, from SVG icon to photo.
- The nature note sits near the top, directly under the hero, framed as normal information, not an apology and not a warning-styled callout.
- No menu, ever. Food copy uses the "no menu" reframe from the current Vercel build (`index.html` lines 762–764), carried forward verbatim.
- **"Nourishing the Soul" gets the `.media-bleed .media-fade` treatment** (D3, `of-v2-revisions-2.md`
  §3.3), matching the home's three blocks: minimum 60vh, running off the edge of the viewport on its
  side, fading where it meets the text.
- The property map is the hand-drawn scan, shipped as-is. The digital redraw is not used, per brief §5 — it has an unreadable label and a wrong compass rose.
- Rates render as the same room-price pattern already live in `index.html` (`$120` / `$140` / `$150` "from" prices) — this deliberately keeps prices in HTML per the existing precedent noted in `index.html` line 420. **The separate "What It Costs" section is removed entirely** (C15) — the prices already appear on each room card higher up the page, so the section was pure duplication. Nothing else about pricing changes and no price is added anywhere.
- **Hold Harmless and Cancellation are reproduced in full on this page, never linked to
  `oceanforest.org`.** (Rewritten 2026-08-09, D2 — superseding the original "external link, text not
  captured" decision.) Both texts are legal, verbatim, and go in as two expandable sections at the foot
  of the page, beside the rates, closed by default, using the same expand-in-place pattern the rest of
  the page uses.

## 3. Contracts

### Hero
- Slug: `lodging`
- Eyebrow: `Accommodations`
- `h1`: `Ten Rooms, One Remote Mile of Beach`
- Sub: `Rustic, private, and steps from the Pacific. Choose the room that fits how you travel.`

### Nature note, directly under the hero, framed not apologised for
> This is one of the most thriving ecosystems on the planet. Rooms are bugproof, but life gets in. That is the place working exactly as it should. Expect to meet insects. It is part of being here, not a defect in your room.

(Rewritten 2026-08-09 — the "accommodations line" that used to open this page above the nature note
is removed entirely, C11: `Located plumb in a remote mile of coconut-laddered beach…`. Do not
reintroduce it, in this position or any other.)

### Three room categories, expanded by default, copy source: `index.html` lines 636–685 (the current live V1 copy), verbatim
1. **Beach Bungalows** — "Ideal for couples". Tag copy, bullet list (1 double bed; private balcony overlooking the ocean; en-suite bathroom with natural ventilation; rustic open design, 260 ft² / 24 m²). Price: "From **$120** per night".
2. **Jungle Suites** — "Ideal for families of three". Tag copy, bullet list (1 double bed + 1 single bed; large balcony with partial ocean view; hardwood floors, 430 ft² / 40 m²; en-suite bathroom with hot water). Price: "From **$140** per night".
3. **Family Bungalows** — "Ideal for families up to 4 guests". Tag copy, bullet list (1 double + 2 single beds; private terrace overlooking garden; generous layout, 540 ft² / 50 m²; en-suite bathroom with fans). Price: "From **$150** per night".
Each card's "Book now" CTA points at the same booking URL used everywhere else: `https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3`.

**All three cards start open, photographs and description visible with no click** (rewritten
2026-08-09, C13, superseding the original closed-by-default state — the expand/collapse control
itself is unchanged and still works).

**Each room's photograph is a four-photo gallery, not a single image** (rewritten 2026-08-09, C14 +
D1). Files, already on disk and real, not placeholders (Eli delivered them 2026-08-07):
- Beach Bungalows: `lodging/beach-bungalow-01.jpg`, `-02.webp`, `-03.webp`, `-04.webp`
- Jungle Suites: `lodging/jungle-suite-01.jpg`, `-02.webp`, `-03.webp`, `-04.webp`
- Family Bungalows: `lodging/family-bungalow-01.jpg`, `-02.webp`, `-03.webp`, `-04.webp`

One large photograph plus dots beneath it to jump between the four, **plus a left and right arrow
overlaid on the photograph itself, vertically centred at each edge** (D1): both control forms stay in
sync, both wrap around (right from the last photo goes to the first), both are keyboard reachable, and
the arrows are real `<button>` elements (`aria-label="Previous photo"` / `"Next photo"`) styled as a
semi-transparent dark circle with a light chevron so they read against a photo of any tone. Hide the
arrows on a room with only one photograph (not the case for any of the three today, but the rule
stands).

### Amenity row — five photographs
Same five labels as `index.html` lines 696–716, in the same order: Three meals a day, En-suite private bathrooms, Private balconies, Fresh linens and towels, Mosquito nets. Each slot is a `data-media` frame (`amenities/<slug>.webp`, `data-ratio="1/1"`) using the placeholder pattern, not the existing inline SVG icon markup. The five files are real and already on disk in `media/amenities/`.

### Property map
- `data-media="property/property-map.webp"` — the file already exists at `ocean-forest-website/media/property/property-map.webp` and resolves root-absolute at `/media/property/property-map.webp`.
- Caption, verbatim from `index.html` line 722: `The grounds, drawn by hand — beach bungalows on the sand, jungle suites in the trees, the shala at the center.`
- Do not attempt to redraw, relabel, or fix the compass rose. That is a separate asset job per brief §5.

### Food section — "Nourishing the Soul", verbatim from `index.html` lines 762–767
> Three meals a day, made from what the garden and the sea offer that morning. Fresh fruit juices, medicinal herbs, detox teas. Food that tastes like the place it came from.
>
> No menus. Every meal changes with the tides and the season. Local fishermen, the lodge garden, and the jungle itself supply the kitchen. Come hungry.
>
> Every dish can be tailored to your needs. We accommodate allergies and special diets — gluten-free, vegetarian, and vegan. Share your preferences at least 48 hours before arrival.
Plus the four diet chips (Vegetarian, Vegan, Gluten-free, Omnivore), reusing the exact SVG icon markup from `index.html` lines 743–757.

**The photograph beside this section gets `.media-bleed .media-fade`** (D3, `of-v2-revisions.md` §3.2
for the treatment definition): minimum 60vh, running off the edge of the viewport on its side, fading
into the page where it meets the text — the same look as the home's three blocks, not a boxed frame.

### Policies — Hold Harmless Agreement and Cancellation Policy, reproduced in full
(Rewritten 2026-08-09, D2 — superseding the original "external link to `oceanforest.org`" contract.
**No link to `oceanforest.org` anywhere on this page or site.**) Two expandable sections at the foot of
the page, beside the room prices already shown in each room card, closed by default, using the same
expand-in-place pattern the room cards use.

**Hold Harmless Agreement**, verbatim, retrieved from the source 2026-08-07:

> **HOLD HARMLESS AGREEMENT — For Visiting Ocean Forest Ecolodge Retreat**
>
> *All adult visitors, whether Independent Travelers or participants on Group Retreats, agree to this Hold Harmless Agreement.*
>
> - I assume full responsibility for my experience while visiting Ocean Forest Ecolodge Retreat by registering to visit. I and all minors under my custody visiting with me under my reservation agree to these conditions:
> - I release my hosts, and their associates and facilitators from all actions, claims or demands for damages that may result from my participation in all activities while visiting Ocean Forest Ecolodge Retreat and in the surrounding environment to the extent allowed by applicable law.
> - If I should arrive late, I understand the full investment is to be paid and is not reimbursed.
> - Once I arrive, if I should be dissatisfied or if I should need to depart earlier than my reserved dates, I understand there are no refunds or credit and I will be responsible for all expenses due to my early departure.
> - I release Ocean Forest Ecolodge Retreat, hosts, guides and facilitators, from any claims associated with delays, cancellations or other acts of omission by third parties, including airlines and other transportation companies and adventure groups.
> - I will pay for any and all damages I directly or indirectly cause to property belonging to the Ecolodge or its hosts. I also accept responsibility for minors that are in my care and agree to pay for any damages resulting from their actions.
> - If I choose not to get travel, medical and evacuation insurance to cover the time I am visiting Ocean Forest Ecolodge Retreat, I release my hosts and experience facilitators from any claims that I may incur related to medical and related transportation expenses associated with my visit.
> - I waive any claims related to travel, including illness, injury, theft, or loss of property, emotional distress or death due to social and environmental conditions, government, political and transportation systems or other external conditions beyond the control of the hosts and facilitators and related to my visit at Ocean Forest Ecolodge.
> - This agreement shall be governed by the laws of Costa Rica. Venue for any dispute arising from this agreement shall be in a court of proper jurisdiction in Costa Rica.
>
> *By registering for a visit at Ocean Forest Ecolodge Retreat, I agree to all terms and conditions as listed above.*

**Cancellation Policy**, verbatim, retrieved from the source 2026-08-07:

> **PAYMENT AND CANCELLATION POLICIES**
>
> **Book a Stay Program / Independent Travelers**
>
> - 24 hours after your reservation: 100% of your reservation will be returned.
> - 30 days before your arrival date: 100% refund.
> - 29 days before your arrival date: 80% refund; your 20% deposit will be withheld.
> - If you cannot travel for reasons of health or force majeure, your deposit can be used to reschedule a visit within one year at currently listed rates.

**These are legal texts. Reproduce them exactly.** Do not shorten them, do not rewrite them into the
page's voice, do not fix their grammar, and do not apply the no-dash house rule to them. The only
permitted change is turning the source's `&` into `and` where it appears in a heading.

## 4. Acceptance checks

**Run these over http, not from Finder** (A0 §4) — `python3 -m http.server 8080`, then
`http://localhost:8080/v2/lodging.html`.

1. "Choose your perfect room" sits directly under the nature note, above everything else on the page —
   no accommodations paragraph above it (the `coconut-laddered beach` sentence appears nowhere on this
   page). Exactly three room categories appear, in the order Beach Bungalows, Jungle Suites, Family
   Bungalows, **all three already open on load**, each showing a real four-photo gallery, not a
   placeholder. *(Rewritten 2026-08-09 — the original check accepted closed-by-default cards and a
   single photo; C11, C12, C13, C14.)*
2. Each room gallery has working left/right arrows at both edges of the photograph as well as dots,
   both stay in sync, and both wrap around. *(Rewritten 2026-08-09 to add D1, which the original check
   did not cover.)*
3. The amenity row renders as five real photographs (not placeholders — the files are on disk in
   `media/amenities/`), not icons.
4. The property map shown is the hand-drawn scan (`property-map.webp`), not any digital redraw.
5. The nature note appears directly under the hero, above the room cards, and does not use warning or
   error styling.
6. The food section ("Nourishing the Soul") contains the words "No menus", states the 48-hour notice
   for dietary needs, and its photograph bleeds off the edge of the viewport and fades into the page
   rather than sitting in a hard-edged box. *(Rewritten 2026-08-09 to add D3.)*
7. The Hold Harmless and Cancellation sections open at the foot of the page beside the rates, their
   text is complete and matches Section 3 verbatim, and **no link anywhere on the page points to
   `oceanforest.org`.** *(Rewritten 2026-08-09 — the original check tested for exactly the outbound
   links D2 removed. `grep -rn "oceanforest.org" v2/lodging.html` returns nothing.)*
8. There is no "What It Costs" section anywhere on the page. All three room prices match the figures
   given here exactly ($120, $140, $150), shown only on each room card. *(Rewritten 2026-08-09 to add
   C15, which the original check never mentioned.)*
9. No em dash or en dash appears anywhere in this page's visible copy (this house rule does not apply
   to the two legal policy texts, per D2).

## 5. Out of scope

Redrawing the property map with altitude (separate asset job, brief §5), creating or publishing the
policy texts (Section 3 already has them verbatim), building the SVG maps (that's Arriving, not this
page).

## 6. Parking line

None. Room photographs, amenity photographs, and the two policy texts are all in as of 2026-08-09 —
see the STATUS note above. *(Rewritten 2026-08-09 — the original parking line named room photographs
as the single thing holding launch; that is resolved.)*

## 7. Build prompt

```
Read specs/of-v2-shell.md first and build this page on top of what it defines — reuse shell.css
and shell.js exactly as that spec describes. If ocean-forest-website/v2/shell.css and shell.js do
not exist yet, build them first, following of-v2-shell.md exactly, then build this page.

Read specs/of-v2-lodging.md in full — Section 3 "Contracts" is literal: room copy, bullet lists,
and prices are quoted from ocean-forest-website/index.html and must match exactly, byte for byte.

Build ocean-forest-website/v2/lodging.html: hero, nature note directly beneath it, then "Choose
your perfect room" (three room cards, ALL OPEN BY DEFAULT, each with a four-photo gallery that has
both dots and left/right arrows overlaid on the photo, synced and wrapping, prices and Book now
buttons), the five-photo amenity row (real files, in media/amenities/), the hand-drawn property map
(reuse ocean-forest-website/media/property/property-map.webp directly), the food section
("Nourishing the Soul", with the four diet chips and the .media-bleed .media-fade photo treatment),
the two policy sections (Hold Harmless Agreement and Cancellation Policy, full legal text
reproduced from the spec exactly, no link to oceanforest.org anywhere), and the shell's gallery
section at offset 8. Do NOT build an accommodations-line paragraph and do NOT build a "What It
Costs" section — both are deliberately absent.

Every local reference is root-absolute (/v2/shell.css, /media/lodging/..., /media/amenities/...,
/media/property/...). Never a ../ climb.

Reproduce the two policy texts EXACTLY. Do not shorten, rewrite, restyle, or apply the no-dash
house rule to them.

When done, serve the folder over http (python3 -m http.server 8080) and open
http://localhost:8080/v2/lodging.html. Do NOT test by double-clicking the file — every local
reference is root-absolute and will 404 over file://. Click through all three room galleries (dots
and arrows both) and both policy sections to confirm they work, and confirm the property map image
and all photographs load (they are real files, not placeholders). List the nine acceptance checks
from the spec and state pass/fail for each.
```
