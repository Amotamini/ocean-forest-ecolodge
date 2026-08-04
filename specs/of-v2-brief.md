STATUS: BRIEF — not a spec, the input to seven of them

# Ocean Forest V2 — settled brief

Everything decided in the BIS session of 2026-08-04, which followed Mehdi's meeting with Eli the
same day. This file exists so the thread that writes specs A0 to A6 does not have to ask Mehdi
anything, and does not have to read a four hour conversation to find out what was agreed.

Nothing in here is open. Everything in here was decided. Where something is still missing, it says
so and says whose it is.

---

## 1. The shape

Five pages plus a home. The home is written **last** and is derived from the pages.

| | Page | Route |
|---|---|---|
| A1 | Arriving | `/arriving` |
| A2 | Lodging | `/lodging` |
| A3 | Experiences | `/experiences` |
| A4 | Retreats | `/retreats` |
| A5 | About | `/about` |
| A6 | Home | `/` |

A0 is the shell every page sits in.

**Menu is those five, in that order.** Gallery is **not** a menu item; it is a section at the foot
of every page. About **is** a menu item, added at the end of the meeting.

### The argument this settles

Eli wants separate pages. Mehdi wants one scroll. The resolution is not a compromise, it is an
order of operations:

- **Pages are built first, complete, with everything on them.** The person who wants to read gets everything.
- **The home is then summarised from the pages.** The person who wants to scan gets a tease, and never has to open a page to understand what is offered.
- **Copy is written once.** The home does not restate the pages in different words. It shortens them. If the two ever disagree, the page is right.

Everywhere a visitor might have to click through to read something, it **expands in place**
instead. Rooms, tours, activities, FAQ. Nobody loses their place, and nobody on a weak connection
pays for a page load to read a paragraph.

---

## 2. Global decisions

- **Light is the default theme.** The site already has both. `index.html` currently reads `paintTheme(saved === 'light')`, which defaults to dark. It becomes `paintTheme(saved !== 'dark')`. The toggle stays, the `of-theme` localStorage key stays, anyone who has already chosen dark keeps dark.
- **The light palette gets an audit.** It has never been the landing theme, so it has never really been looked at.
- **No built-in translation and no language switcher.** Browser translate covers French and German. This was raised and settled.
- **Every page opens with a hero slot** that accepts a video or a still. It is built empty and takes Ryan's footage whenever it exists, with no code change. Same labelled-placeholder pattern the codebase already uses.
- **Gallery sits at the foot of every page**, and rotates.
- **`stay.html`, `gateway.html` and `retreat-host-kit.html` are not part of V2.** The first two are meta-refresh redirect stubs; the third is a standalone slide deck.
- **Nothing private goes inside `ocean-forest-website/`.** Everything in that folder becomes a public web address. This brief, the specs and the source copy live one level up, which is why they are here.

---

## 3. Sources

Three sites are in play and it is easy to cite the wrong one.

| Source | What it holds that V2 needs |
|---|---|
| `oceanforest.org/arriving/` | **The richest arrival content anywhere.** Departing section, Helpful Contacts with numbers, What to Pack, driving directions, the Sierpe and Drake Bay route detail, the Spanish address, and the paragraph explaining that San Josecito School and San Josecito Beach are two different places. Also **the three arrival maps.** |
| `oceanforest.org/activities/` | Tour copy: At the Lodge, Ocean Discovery, Rainforest Discovery, Complimentary Activities |
| `oceanforest.org/lodging/` | Room descriptions, the hand-drawn property map, rates, hold harmless, cancellation |
| `oceanforestecolodge.com/experiences-tours/` | The expandable-bar pattern for Complementary Activities, and the activity list |
| `oceanforestecolodge.com/accommodations/` | The digital redraw of the property map, and the amenity icon row |
| `ocean-forest-ecolodge.vercel.app` | The current V1 build. Its design system, its dining copy and its logistics accordion are good and carry forward |
| `source-copy/` in this repo | The `.com` and `.org` copy already captured to disk. **Read this before fetching anything** |

Two live URLs given by Mehdi directly:

- Hold harmless: `https://www.oceanforest.org/hold-harmless/`
- Cancellation: `https://www.oceanforest.org/cancellation/`

Both belong at the foot of **Lodging**, beside the rates.

---

## 4. Arriving (A1)

The weakest page on the current site and the one that costs bookings. Eli: *"a lot of people are
saying, oh that is so far, I'm not going."*

### The maps

Today three maps sit side by side. That is three questions asked at once with no order, and two of
the three are irrelevant to any given reader with nothing saying which two. The left one is also a
**broken Google embed**, tiled with "For development purposes only" watermarks, meaning an
unlicensed key. It is not carried over.

Replace with three layers, each answering exactly one question, in the order a traveller asks it:

**Layer 1 — where is this place?** One map, always visible, no choice needed. Costa Rica with San
José, Palmar Sur, Drake Bay and the lodge. Static. No zoom, no Google.

**Layer 2 — how do I get there?** Begins as **no map at all**. Four route cards. The visitor picks
one. *Only then* does a map appear, showing **their route lit and the others gone**. The artwork is
the illustrated regional map from `.org/arriving/` (Palmar Sur, Palmar Norte, Sierpe Town, Sierpe
River, Drake Bay Airport, Corcovado, the lodge, dashed route lines).

**Layer 3 — what happens when I land?** Always shown, bottom of the page, every route, because
every route ends the same way.

**Maps ship as the existing `.org` artwork now.** A rebuild as SVG is a separate later spec, and
the reason for it is not polish: a JPEG cannot light one route and hide the others, so Layer 2 is
only partly true until the SVG exists.

### The sentence comes before the map

The most repeated confusion is which drop-off point and which direction to walk. A map is a poor
way to say that. This goes **on the route card, above any map**:

> **Boat from Sierpe** → you land at San Josecito **Beach** → walk **SOUTH** 20 minutes, ocean on your **right**.
>
> **Car, taxi or plane** → you are dropped at San Josecito **School** → walk **NORTH** 20 minutes, ocean on your **left**.

`.org` already explains at length that the School and the Beach are two different places. Keep that
paragraph. It is the single most useful thing on that page.

### The four routes

Carried from Eli's design, which is good:

1. **Boat from Sierpe** — all year, recommended. Donde Jorge Restaurant. Departs 11:30 (USD 30) or 16:00 (USD 40). Arrive 30 min early, 15 kg limit. 90 minutes through the mangroves and out to the Pacific. Lands at San Josecito Beach, walk south.
2. **Bus + Boat** — all year, budget. Tracopa from San José, get off at Palmar Norte, taxi to Sierpe, connect with the afternoon boat.
3. **Drive to San Josecito** — dry season only, Dec to Apr. 4x4 required, two river crossings. Roughly 370 km. Park at the rural school. Walk north.
4. **Fly to Drake Bay** — dry season only. Sansa from San José, book a month ahead, 4x4 taxi transfer, dropped at the school. Walk north.

### The warning, above the routes

Not defensive, and not buried. Before any route is chosen:

- The boat from Sierpe is the safest arrival and you do not need a car here.
- Driving means a 4x4 and two river crossings, and in rain neither direction can be guaranteed.
- **Every route ends with a 20 minute walk on sand. Pack light, bring a backpack.** Porter service exists and suitcases are fine, but nobody should discover this on arrival.

### The downloadable

**Not four maps. One arrival card PDF per route.** What someone actually needs offline at a bus
station is the last-mile map, the walk direction, the phone numbers, and the address in Spanish for
a taxi driver. The address exists, verbatim, on `.org`:

> Finca Guaria de Osa, 800 metros al norte de la Escuela de San Josecito, Playa Rincón de San Josecito, código postal 60502, Provincia de Puntarenas, Cantón de Osa, Costa Rica

### The five "FALTA" items — three of them already exist

Eli's AI marked five things missing on Arriving. Three are written in full on `.org/arriving/` and
are ported, not commissioned:

| Item | Status |
|---|---|
| Departing section | **Exists.** The "To Sierpe: 6am breakfast, 6:30 walk, boat 6:50, Sierpe 8:00" block |
| Helpful Contacts | **Exists.** Donde Jorge, Sansa, Trans Alvarez, Eric Campos, Tracopa, Delfin Vargas, Franklin Araya |
| Travel Tips / What to Pack | **Exists.** Full list, plus the 25 lb flight limit and backfront-not-suitcase notes |
| Downloadable per route | Becomes the arrival card PDF above |
| Group Travel CTA | **Missing everywhere. Eli writes it.** The only Arriving item with no source |

**Before the Helpful Contacts are republished, Eli confirms every number is still live.** That page
was last touched in 2018 and those are other people's personal WhatsApp numbers. Sending a guest to
a dead number at a bus station is worse than giving them nothing.

### One contradiction, resolved

`.org` says walk south from the Beach is *"about 15-20 minutes"* and *"800 meters"*; north from the
School is 15 minutes. The newer copy says 15 for both. **V2 says 20 for both.** Decided deliberately:
this is the number that turns into *"they said 15, it took 25, and I was carrying a suitcase."*

---

## 5. Lodging (A2)

- Hero, then the accommodations line Mehdi liked: *"located plumb in a remote mile of coconut-laddered beach."*
- Three room categories: **Beach Bungalows** (couples), **Jungle Suites** (families of 3), **Family Bungalows** (up to 4). Each expands in place. The home shows these three; the full room list lives here.
- Amenity row **as images, not icons.** Eli was explicit that she dislikes the icons and likes the five photographs.
- The property map. See below.
- **Food lives here, not on its own page.**
- Rates, hold harmless, cancellation, all at the foot.
- **A nature note near the top**, framed not apologised for: this is one of the most thriving ecosystems on the planet, rooms are bugproof but life gets in, you will meet insects, and that is the place working as it should. This exists to stop a surprise becoming a complaint.

### Food — the reframe

There is **no menu.** Three meals a day, made from scratch, food of the day, allergies and diets
declared 48 hours ahead. Vegetarian, vegan and gluten-free accommodated. The weakness becomes the
signature: you sit down and food arrives, and nobody has to choose. The current Vercel build
already carries this wording and it is good.

### The property map

Two versions exist. The **hand-drawn scan is the legible one** and goes up as-is for now. The
digital redraw on `.com` is prettier and its labels are unreadable at display size.

Redrawing it is **its own asset job, not part of A2.** When it happens, four things are wrong with
what exists:

1. Turtle Island Labyrinth has vanished from the digital redraw.
2. Mango is drawn but unlabelled.
3. There is no sense of **altitude**, so nobody understands that Gabilán Alto is up the hill. Eli wants a second view showing height, because guests choose rooms by how close to the ocean they are.
4. **The compass rose on the hand-drawn original is wrong.** It reads W at the top and N to the right. Anyone orienting by it is 90 degrees out.

---

## 6. Experiences (A3)

Three groups, each expanding in place:

1. **Rainforest Discovery** — exists on the current build. The `.org` "At the Lodge" group (White Hawk Nature Trail, Rio Claro) folds into this one.
2. **Ocean Discovery** — exists on the current build.
3. **Complementary Activities** — new. Botanical Garden, Bat Cave, River Walk, Drake Bay Walking, Horse Riding, Night Tour, Sierpe Mangrove Tour, Waterfall Hiking.

Complementary Activities uses the **expandable-bar pattern** from `.com` — one bar per activity,
opens in place, name and price on the bar, detail inside. The pattern only. Not the green-to-blue
gradient, which belongs to the old design.

Keep the line Eli likes: *"Where the silence of the jungle speaks loudest."*

---

## 7. Retreats (A4)

Eli: *"exactly what we have, I think it's perfect, we don't need to change nothing."*

Hero of the yoga shala, the chart, the explanation. The only change is the shared shell and the
hero slot. This is the smallest of the seven.

---

## 8. About (A5)

New page, added at the end of the meeting. Mehdi: *"it should definitely be a whole section page
people can click. It tells me about your place."*

Holds: the story, Jonathon, History, Projects, the Blog, FAQ, Recommendations, Travel Tips.

The Arriving-specific FAQ stays on Arriving. The general FAQ lives here.

---

## 9. Home (A6)

Written last, from the finished pages.

In order: hero with 30 seconds of Ryan's video, clickable through to the full film on YouTube. The
two boxes ("I want to stay" / "I want to lead a retreat"), kept but with **less text** — they
currently crowd the video. Then the three room cards, photo-led, hovering to swap photos, expanding
to detail. Then food, tours and retreats as three visual blocks. Then reviews. Then the gallery.
Then the newsletter.

The hero headline compresses to roughly:

> Your beachfront ecolodge at the edge of Corcovado National Park.
> The most biodiverse place on Earth. No roads. No crowds. Just jungle.

Everything below that on the current hero can go.

---

## 10. Still blocked, and on whom

| Item | Who | Blocks |
|---|---|---|
| Room photographs | Eli | A2 and A6. Still zero. Still the single thing holding launch |
| Ryan's 3 minute video, cut into per-page segments | Ryan | Nothing. Hero slots are built empty and take it later |
| Group Travel CTA copy | Eli | One block on A1 |
| Confirming the Helpful Contacts numbers | Eli | Publishing that section of A1 |
| Property map redraw with altitude | Asset job | Nothing. The hand-drawn scan ships meanwhile |

None of these block starting. All seven specs can be written and six can be built while the
photographs are outstanding.

---

## 11. The seven specs

Written in this order, built in this order.

| | Spec | Covers |
|---|---|---|
| A0 | `of-v2-shell.md` | Five-page nav, header, footer, gallery section, hero slot component, light default, light palette audit |
| A1 | `of-v2-arriving.md` | Everything in section 4 |
| A2 | `of-v2-lodging.md` | Everything in section 5 |
| A3 | `of-v2-experiences.md` | Everything in section 6 |
| A4 | `of-v2-retreats.md` | Everything in section 7 |
| A5 | `of-v2-about.md` | Everything in section 8 |
| A6 | `of-v2-home.md` | Everything in section 9. **Written only after A1 to A5 are built** |

Each is one independently shippable page with at most eight acceptance checks.

## 12. How Mehdi wants to work on these

He cannot read code and does not want to. **Every build turn must end with an HTML file he can
open from the Finder and look at.** No deploy, no dev server, no localhost required for him to see
the work. This is a hard requirement on every A spec's build prompt, not a nicety.

The pattern already exists in this repo: `design-preview.html`.
