# oceanforestecolodge.com — verbatim copy

Captured 2026-07-29 via Claude in Chrome (site blocks cloud fetching). Live site redirects to `https://www.oceanforestecolodge.com/`.
Text below is verbatim, including typos, duplicate blocks and placeholder text. Where the same block appears twice in the DOM (mobile + desktop variants of a section) both are noted.

---

## NAV

Main menu (identical on every page, rendered twice in the DOM — mobile + desktop):

| label | URL |
|---|---|
| (logo) | https://oceanforestecolodge.com/ |
| Arriving | https://oceanforestecolodge.com/ecolodge/ |
| Arriving › How to get here | https://oceanforestecolodge.com/ecolodge/#Howtogethere |
| Arriving › Boat Transfer from Sierpe | https://oceanforestecolodge.com/ecolodge/#BoatTransferfromSierpe |
| Arriving › Dry Season only | https://oceanforestecolodge.com/ecolodge/#DrySeasononly |
| Arriving › (4th empty item) | https://oceanforestecolodge.com/ecolodge/#DrySeasononly |
| Rooms | https://oceanforestecolodge.com/accommodations/ |
| Rooms › Beach Bungalows | https://oceanforestecolodge.com/accommodations/#BeachBungalows |
| Rooms › Jungle Suites | https://oceanforestecolodge.com/accommodations/#JungleSuites |
| Rooms › Family Bungalows | https://oceanforestecolodge.com/accommodations/#FamilyBungalows |
| Rooms › Yoga Retreats | https://oceanforestecolodge.com/accommodations/#YogaRetreats |
| Tours | https://oceanforestecolodge.com/experiences-tours/ |
| Tours › Rainforest Discovery | https://oceanforestecolodge.com/experiences-tours/#RainforestDiscovery |
| Tours › Ocean Discovery | https://oceanforestecolodge.com/experiences-tours/#OceanDiscovery |
| Tours › Complementary Activities | https://oceanforestecolodge.com/experiences-tours/#ComplementaryActivities |
| Dining | https://oceanforestecolodge.com/food-and-experiences/ |
| Yoga | https://oceanforestecolodge.com/yoga/ |
| Stories | # (NO LINK — dead menu) |
| Stories › Rainforest Ocean Setting | (not a link — plain text) |
| Stories › Biodiversity Conservation | (not a link — plain text) |
| Stories › Cultural Education | (not a link — plain text) |
| Contact | https://oceanforestecolodge.com/about-us/ |
| Contact › Contact us | https://oceanforestecolodge.com/about-us/#connectwithus |
| Contact › Travel Tips | https://oceanforestecolodge.com/about-us/#traveltips |
| Contact › Recomendations | https://oceanforestecolodge.com/about-us/#recomendations |
| Contact › FAQ | https://oceanforestecolodge.com/about-us/#fqs |
| Contact › Cancelation Policy | https://oceanforestecolodge.com/about-us/#cancelation |

Language switcher (all `href="#"`, non-functional): English / English / French / German / Portuguese / Spanish

### FOOTER (every page)

Tagline: `An oceanfront rainforest sanctuary on Costa Rica’s Osa Peninsula.`
(On /blog/ the tagline is instead: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`)

| label | URL |
|---|---|
| Ecolodge | https://oceanforestecolodge.com/ecolodge/ |
| How To Get Here | https://oceanforestecolodge.com/ecolodge/#Howtogethere |
| All Seasons | https://oceanforestecolodge.com/ecolodge/#BoatTransferfromSierpe |
| Dry Season | https://oceanforestecolodge.com/ecolodge/#DrySeasononly |
| Dining | https://oceanforestecolodge.com/ecolodge/#Dining |
| Accommodations | https://oceanforestecolodge.com/accommodations/ |
| Beach Bungalows | https://oceanforestecolodge.com/accommodations/#BeachBungalows |
| Jungle Suites | https://oceanforestecolodge.com/accommodations/#JungleSuites |
| Family Bungalows | https://oceanforestecolodge.com/accommodations/#FamilyBungalows |
| Yoga Retreats | https://oceanforestecolodge.com/accommodations/#YogaRetreats |
| Experiences/Tours | https://oceanforestecolodge.com/experiences-tours/ |
| Rainforest Discovery | https://oceanforestecolodge.com/experiences-tours/#RainforestDiscovery |
| Ocean Discovery | https://oceanforestecolodge.com/experiences-tours/#OceanDiscovery |
| Complementary Activities | https://oceanforestecolodge.com/experiences-tours/#ComplementaryActivities |
| Facebook | https://www.facebook.com/oceanforestecolodge/ |
| Instagram | https://www.instagram.com/ocean_forest_ecolodge/ |
| YouTube | https://www.youtube.com/channel/UChLj_xFXVDo1PURQB8rWaRg |

FOOTER LABEL INCONSISTENCIES (verbatim, they differ per page):
- `/`, `/ecolodge/`, `/accommodations/`, `/yoga/`, `/about-us/` → `Dining` + `Accommodations`
- `/food-and-experiences/`, `/2026/03/23/sunsets-supreme/`, `/2026/03/31/feb-19th-18th-anniversary-2/`, `/2026/03/31/the-rainforest-ocean-setting/`, `/home/` → `Dinning` + `Accomodations`
- `/rainforest-ocean-setting/` → `Dining` + `Accomodations`
- `/2025/12/12/conservation-adventures…/` → `Dining` + `Accomodations`

---

## BOOKING LINKS

### Rooms / lodging — ALL room "Book Now" buttons point to the SAME single URL
Every one of these buttons resolves to:
`https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3`

| button / room | URL |
|---|---|
| Home — hero slide "Pajaro" → Book Now | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| Home — hero slide "Tortuga-Playa" → Book Now | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| Home — Beach Bungalows → Book Now (x2 in DOM) | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| Home — Jungle Suites → Book Now | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| Home — Family Bungalows → Book Now (x2 in DOM) | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| Home — "Choose Your Perfect Room" → Choose Your Room | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| Accommodations — Beach Bungalows → Book Now | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| Accommodations — Jungle Suites → Book Now | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| Accommodations — Family Bungalows → Book Now | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| Accommodations — Choose Your Room | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| /ecolodge/ — Book Now (banner) | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| /ecolodge/ — View More | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| /experiences-tours/ — Check It Out | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| /food-and-experiences/ — Book Now | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| /food-and-experiences/ — Check It Out | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| /yoga/ — Book Now | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| /rainforest-ocean-setting/ — Book Now | (same booking URL, banner reused from /yoga/) |
| /about-us/ — Book Now (x4 on page) | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |
| /about-us/ — Check It Out | https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3 |

NOTE: there are NO per-room-type booking URLs anywhere on the site. One generic SecureBookings room-rate URL serves all three marketed room types.

### Tours — each has its own WeTravel URL

| tour | Book Now URL |
|---|---|
| Corcovado National Park Sirena Station | https://www.wetravel.com/trips/corcovado-national-park-sirena-station-ocean-forest-ecolodge-75443139 |
| Corcovado National Park San Pedrillo Station | https://www.wetravel.com/trips/corcovado-national-park-san-pedrillo-station-ocean-forest-ecolodge-28113992 |
| Caño Island Snorkeling | https://www.wetravel.com/trips/cano-island-snorkelling-tour-ocean-forest-ecolodge-69074848 |
| Caño Island Diving | https://www.wetravel.com/trips/cano-island-diving-tour-ocean-forest-ecolodge-22781271 |
| Dolphins & Whales | https://www.wetravel.com/trips/dolphin-whales-encounter-ocean-forest-ecolodge-57401510 |
| Rainforest Discovery section header "Book Now" | https://www.wetravel.com/trips/corcovado-national-park-sirena-station-ocean-forest-ecolodge-75443139 |
| Ocean Discovery section header "Book Now" | https://www.wetravel.com/trips/cano-island-snorkelling-tour-ocean-forest-ecolodge-69074848 |

Complementary Activities (Botanical Garden, Bat Cave, River Walk, Drake Bay Walking, Horse Riding, Night Tour, Sierpe Mangrove Tour, Waterfall Hiking) have **no** booking links — copy says book on arrival.

### Transfers / other outbound links

| label | URL |
|---|---|
| /ecolodge/ — "Reserve Your Boat Transfer" (boat Sierpe → San Josecito) | https://www.wetravel.com/trips/boat-from-sierpe-to-san-josecito-beach-ocean-forest-ecolodge-92104116 |
| /ecolodge/ — raw URL printed as body text in "The boat" (first/mobile copy) | https://www.wetravel.com/trips/boat-from-sierpe-to-san-josecito-beach-ocean-forest-ecolodge-92104116 |
| /about-us/ FAQ — "click this link" | https://www.wetravel.com/trips/boat-from-sierpe-to-san-josecito-beach-ocean-forest-ecolodge-92104116 |
| /ecolodge/ — "San Josecito Rural School" (map) | https://maps.app.goo.gl/34sQPv43R8bUP1H66 |
| /yoga/ — "Reserve" (WhatsApp) | https://wa.me/50687379416 |
| /about-us/ — "+ 506 8737 9416" (WhatsApp) | https://wa.me/50687379416 |
| /about-us/ — "visit@oceanforest.org eli@oceanforest.org" | mailto:eli@oceanforest.org |
| /ecolodge/ — "eli@oceanforest.org" | **mailto:maito>eli@oceanforest.org**  ← BROKEN href (typo `maito>` instead of `mailto:`) |
| /about-us/ — "Visa Requirements by Country" | https://www.visitcostarica.com/planning-your-trip/entry-requirements |
| /about-us/ — "Yellow Fever Vaccine Requirements" | **https://abacus.ai/help/howTo/chatllm** ← WRONG LINK (points to an AI tool help page) |

---

## PAGE: https://oceanforestecolodge.com/ (title: "Home-SC - Ocean Forest Ecolodge")

Section order in DOM: hero banner "Accommodations" → 3 room cards → "Choose Your Perfect Room" CTA → 3-up promo slider (Cuisine / Experiences / Yoga) → photo carousel (30 images) → hero slider (Pajaro / Tortuga-Playa) → Google reviews widget → newsletter → footer.
NOTE: the visible/rendered page shows only the hero slider + newsletter + footer; the room-card and promo sections are present in the DOM but hidden. Copy captured from the DOM.

### (hero banner, image alt "ocean forest banner")
Accommodations

Your Portal to a Timeless Nature Experience - Where the mighty Rainforest meets the sparkling Pacific Ocean

Book Now

### Beach Bungalows
Ideal for couples

Cozy Room with Ocean View

1 comfortable double bed
Fully furnished, with relaxing hammocks
Spacious area: 260 ft² / 24 m²
Private bathroom with natural ventilation
Private balcony overlooking the ocean
Rustic, natural design surrounded by lush tropical vegetation

Book Now

### Jungle Suites
Ideal for families of three

Spacious Bungalow Room with Nature Views

1 comfortable double bed and 1 single bed
Fully furnished, with cozy hammocks for relaxation
430 ft² / 40 m² of spacious comfort
Private bathroom with hot water
Large balcony with a partial ocean view
Part of a charming bungalow house
Frequently visited by colorful birds and local wildlife

Book Now

### Family Bungalows
Ideal for families up to 4 guests

Family Bungalow Surrounded by Nature

1 double bed and 2 single beds — ideal for families or groups
Fully furnished, with inviting hammocks to unwind
Spacious 540 ft² / 45 m² layout for extra comfort
Private bathroom and cooling fans for a pleasant stay
Private terrace overlooking lush garden views
Often visited by colorful birds and local wildlife

Book Now

### Choose Your Perfect Room
Drift to sleep with the rhythm of the Pacific and wake to a symphony of birdsong.
At Ocean Forest Ecolodge, nature is your constant companion — rainforest at your doorstep, the ocean just steps away.

Choose Your Room

### (3-up promo slider — appears twice in DOM, "Slide 1" labels then repeated with "More info")
Wholesome Cuisine
Eat, nourish and taste.
More Info   [→ https://oceanforestecolodge.com/food-and-experiences/]

Wild Experiences
Explore Nature’s Wonders
More Info   [→ https://oceanforestecolodge.com/experiences-tours/]

Yoga Retreats
Flow with Prana
More Info   [→ https://oceanforestecolodge.com/yoga/]

(second rendering uses "More info" lowercase i)

### (hero slider — slide 1, note label "Pajaro")
COSTA RICA
The Osa Peninsula Awaits You

Experience it from your balcony. A unique experience.

Book Now
STAY IN TOUCH
(Facebook / Instagram / YouTube icons)

### (hero slider — slide 2, note label "Tortuga-Playa")
COSTA RICA
The Ocean Calls You

Endless blue, right outside. Relax to the sounds of gentle waves.

Book Now
STAY IN TOUCH
(Facebook / Instagram / YouTube icons)

### (Trustindex Google reviews widget)
EXCELLENT
Based on 121 reviews
Posted on Google

The Chtib & Zhang Show
Trustindex verifies that the original source of the review is Google. You’re coming here for the peace, the fabulous beach view and the food they cook here is absolutely amazing. The chefs there know how to make quality dishes.

Posted on Google
B Q
Trustindex verifies that the original source of the review is Google. Fabulous location with welcoming staff, great food, and stunning rooms. Perfect place to slow down and take in the beauty of the Osa.

Posted on Google
Philipp R
Trustindex verifies that the original source of the review is Google. Ein wunderschöner Ort mitten in der Natur, mit herzlichen Angestellten, sehr gutem Essen, großartigen Ausflugsmöglichkeiten, und einer sehr bemühten Managerin. Wer ein Luxus-Resort mit allen Annehmlichkeiten erwartet ist hier fehl am Platz, aber dafür bekommt man etwas Vieles, das Resorts nicht liefern: Authentizität, Ruhe, Nähe zur Natur und echte Gastfreundschaft. Für uns war es eines der Highlights auf der Osa-Halbinsel – und wir würden wiederkommen.

Posted on Google
amanda Stewart
Trustindex verifies that the original source of the review is Google. This is an amazing place to stay. Words cannot describe how beautiful the trees and the forest are on this property. Everyday we woke up to see monkeys in the tree in front of our cabin. There were toucans, howler monkeys, spider monkeys, luminous blue butterflies. There is a beautiful yoga studio, hammocks and a fabulous covered outdoor eating space. The staff are so lovely and accommodating and were so helpful with arranging tours and transportation . The entire space is on three acres but so much of the grounds are beautiful trees and jungle. It was an incredible place to visit. If you are looking to connect with nature and detach from a busy lifestyle this is a beautiful space to visit.

Posted on Google
Graham Dennis
Trustindex verifies that the original source of the review is Google. Our first visit here, and we'll definitely come back. Eli organised taxis and transport of luggage.
The lodge is a 20 minute walk down the beach, very quiet and peacefull except for the birds and howler monkeys! A short trail up the hill to a viewpoint was excellent for birds and whales were seen from the top looking down on the ocean.
The staff and volunteers were so helpful, providing everything we needed, the six nights we spent here were wonderful.

Posted on Google
Veronica Ligon
Trustindex verifies that the original source of the review is Google. Our family of 4 stayed here for 5 nights and it was our best vacation ever. It was the perfect balance between natural and luxurious. We woke every day to the sounds of monkeys and macaws, were served delicious whole-ingredient breakfasts and then wore ourselves out hiking in the jungle or playing on the beach. After another amazing freshly cooked meal, we lounged in hammocks and napped to the sounds of the ocean and animals. Then we played on the beach and watched the sunset before another amazing home-cooked meal. We highly recommend Ocean Forest Ecolodge. The casitas are simple and everything you need - clean beds, mosquito nets, clean bathrooms and a cold shower, hammocks and porches! The food is incredible home-cooked meals and lots of fresh juice. The people were all so kind and caring and the natural area is truly paradise. Thank you Elizabeth and everyone else for the best possible start to our year!

Posted on Google
Guayusa Tea House
Trustindex verifies that the original source of the review is Google. I have been to Ocean Forest Ecolodge 4 times since the first time I visited about 20 years ago. The reason I have returned is because of the transformation of body, mind and spirit that is always delivered.
From the moment that you arrive you will feel the invigorating power of the jungle and wildlife surrounding you. The space is something imagined out of a mystical fairytale. Ocean waves crash on pure white sand beaches just meters from stilted lodges where you sleep to the music of the tide, macaws, tucans and other mysterious sounds of deep jungle nighttime life.
Paths will lead you deeper into the property to explore the blossoming and fragrant jungle plants. It always seems to me that all the paths lead me to what they call the LapaLapa Lodge. This is a 3 story masterpiece of architecture built out of locally reclaimed hardwoods. This is a great place to unwind, relaxing in a hammock on the bottom level or do yoga on the spacious open studio space in the second level. An almost hidden staircase leads to the 3rd level.. meditation tower as I like to call it. From here the ocean breeze will cool you on a hot afternoon as you gaze out over the jungle canopy and ocean horizon as the sun sets.
Additional paths will lead to the main dining area where locally harvested fresh fruit juices and traditional cuisine of the land and sea are offered. They have everything you would ever want or need despite the feeling that you are literally In the middle of nowhere!
Up the hill behind the dining area are additional cabins that are more quite than the ones closer to the ocean. These structures have an almost treehouse feeling as you sit on your porch nestled into the canopy of the trees watching monkeys swing through the branches and listen to various jungle birds call out to each other.
Life can be challenging these days with the pace of life and constant noise surrounding us much of the time. Coming to this place is a complete cleansing and reset for the heart and mind. You will return to your life with a renewed peace and vitality in your being. For this reason alone I will return again and strongly urge you to visit and personally experience what I am sharing with you. You will not be disappointed. I have traveled thoroughly throuout Costa Rica and central america..this place is not to be missed!!

Posted on Google
Fabio Labriola
Trustindex verifies that the original source of the review is Google. We stayed at Ocean Forest Ecolodge as a family with two children. We had a fantastic time. The hotel manager, Elisabeth, and her team were incredibly kind to us. And the lodge's location is simply sensational. Exotic wildlife everywhere: monkeys, parrots, turtles. From here, you can take the most beautiful excursions in Cocovado National Park. There were also wonderful snorkeling trips where we saw sharks and turtles. We'll definitely be back someday!

Posted on Google
Ajantha Senarathna
Trustindex verifies that the original source of the review is Google. Ocean Forest Ecolodge Retreat provides an immersive jungle and river experience. Guests enjoy fresh, locally sourced meals, and the lodge offers eco-friendly cabins with basic but comfortable facilities. Nature is the main attraction here, with abundant wildlife, river access, and jungle trails. Safety is ensured with guided excursions, and visitors should be prepared for rainforest weather with appropriate clothing and rain gear.

### Sign up for our newsletter to receive our news, deals and special offers
News
Fields marked with an * are required
Name *
Email Address *
Submit
If you are a human seeing this field, please leave it empty.

---

## PAGE: https://oceanforestecolodge.com/accommodations/ (title: "Accommodations - Ocean Forest Ecolodge")

Section order: H1 banner → "ACCOMODATIONS" intro → "Choose the Perfect Room" intro + What's-included row → 3 marketed room types (3-column, tab-style: names, then "Ideal for…" row, then Book Now, then spec lists) → "Choose Your Perfect Room" CTA → accordion (4 items) → newsletter → footer.

### Corcovado National Park   [H1 — banner overlay]

### ACCOMODATIONS   [H2 — note misspelling]
Choose the perfect room for your stay

### Choose the Perfect Room   [H2]
rainforest at your doorstep, the ocean just steps away

Drift to sleep with the rhythm of the Pacific and wake to a symphony of birdsong. At Ocean Forest Ecolodge, nature is your constant companion — rainforest at your doorstep, the ocean just steps away.

Intimate by design: 10 spacious rooms near the beach, hosting up to 30 guests for a serene, uncrowded experience.

Comfort in the wild: All rooms include en‑suite private bathrooms and private balconies with inspiring views of the ocean, rainforest, or our ethnobotanical gardens.

#### What’s included with your stay:   [H4]
Breakfast, served fresh each morning
Queen‑size double bed
Fresh linens and towels
Mosquito nets
Hand soap

### THE 3 MARKETED ROOM TYPES

DOM order note: the three room NAMES appear first as a row of H1s, then the three "Ideal for…" H2s as a row, then a "Book Now" button, then the three spec blocks in order.

Row 1 (H1s):  Beach Bungalows | Jungle Suites | Family Bungalows
Row 2 (H2s):  Ideal for couples | Ideal for families of three | Ideal for families up to 4 guests
Book Now

#### Beach Bungalows
Cozy Room with Ocean View

1 comfortable double bed
Fully furnished, with relaxing hammocks
Spacious area: 260 ft² / 24 m²
Private bathroom with natural ventilation
Private balcony overlooking the ocean
Rustic, natural design surrounded by lush tropical vegetation

(gallery: 9 images, "Beach Bungalow (1)"–"Beach Bungalow (9)")
Book Now → https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3

#### Jungle Suites
Spacious Bungalow Room with Nature Views

1 comfortable double bed and 1 single bed
Fully furnished, with cozy hammocks for relaxation
430 ft² / 40 m² of spacious comfort
Private bathroom with hot water
Large balcony with a partial ocean view
Part of a charming bungalow house
Frequently visited by colorful birds and local wildlife

(gallery: 12 images, "Jungle Suites (1)"–"Jungle Suites (11)" + "Jungle Suites of (5)–(10) compri")
Book Now → https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3

#### Family Bungalows
Family Bungalow Surrounded by Nature

1 double bed and 2 single beds — ideal for families or groups
Fully furnished, with inviting hammocks to unwind
Spacious 540 ft² / 45 m² layout for extra comfort
Private bathroom and cooling fans for a pleasant stay
Private terrace overlooking lush garden views
Often visited by colorful birds and local wildlife

(gallery: 4 images, "Family Bungalows (1)"–"Family Bungalows (4)")
Book Now → https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3

### Choose Your Perfect Room   [H2]
Choose Your Room   [button → booking URL]

Drift to sleep with the rhythm of the Pacific and wake to a symphony of birdsong.
At Ocean Forest Ecolodge, nature is your constant companion .

(NOTE verbatim: this second version of the line ends with a space then a period — the "— rainforest at your doorstep, the ocean just steps away" clause is missing here.)

### ACCORDION — actual unit types (ElementsKit accordion, 4 collapsed items)

DOM: `div.elementskit-accordion.accoedion-primary` (class misspelled "accoedion"), all items `collapsed` by default. This accordion is yoga-retreat oriented copy but contains the real unit inventory.

#### Accordion item 1 — Why Stay With Us
Exclusive natural setting: pristine beachfront, lush rainforest, abundant wildlife
Boutique capacity: up to 32 guests in bungalows and suites
Chef-prepared meals: three daily meals with coffee/tea
Seamless logistics: on-site support for planning and transfers

#### Accordion item 2 — Practice Spaces
Three‑level pagoda (Yoga Shala): cool, airy, and fully equipped with props
Dharma Hall: 1,600+ ft² / 148 m² of elegant, tiled space — ideal for yoga, movement, talks, and ceremonies

#### Accordion item 3 — Accommodations
Beach Bungalows (3): ocean view, private bath, 2 guests each
Jungle Suites (4): balcony, private bath, 3 – 4 guests
Quadruple Bungalow (1): 1 double + 2 singles
Lapa Lapa Rooms (2): 2 connected rooms, 1 bath, up to 5 — perfect for facilitators
Garden Bungalow (1): cozy option for 1 – 2 guests

#### Accordion item 4 — Enrich Your Retreat
Corcovado National Park (Sirena or San Pedrillo)
Caño Island snorkeling or diving
Horseback riding, massages, waterfall/river hikes, and night walks

### Sign up for our newsletter to receive our news, deals and special offers
News
Fields marked with an * are required
Name *
Email Address *
If you are a human seeing this field, please leave it empty.

INTERNAL INCONSISTENCY: intro says "10 spacious rooms … up to 30 guests"; accordion says "up to 32 guests" and lists 3+4+1+2+1 = 11 units.

---

## PAGE: https://oceanforestecolodge.com/ecolodge/ (title: "Ecolodge - Ocean Forest Ecolodge") — nav label "Arriving"

Section order: banner → "How to get here" → ALL SEASONS block (appears TWICE, mobile + desktop variants with DIFFERENT numbers) → "Dry Season only (December - April)" → Book Now → "Choose Your Perfect Room" → "Dining" section → newsletter → footer.

### Wellness retreats Corcovado   [H2 — banner]
A sacred space between jungle and sea to renew your energy, quiet the mind, and awaken the spirit.

### How to get here   [H3]
Your Journey to Paradise

Ocean Forest Ecolodge is your secluded haven on the Osa Peninsula, bordering Corcovado National Park. Getting here is an integral part of your Costa Rican adventure!

All Seasons: Take a beautiful boat trip from Sierpe, arriving at San Josecito Beach (-1.5 hour ride). From there, it’s a delightful 15-minute walk to the lodge.

Dry Season (Dec-Apr): For those traveling during the dry season, you can drive to San Josecito Rural School and leave your car in the secure parking area next to the school. From there, it’s a scenic 15-minute walk to the lodge.

Important: The roads are unpaved and require a 4×4 vehicle to cross two shallow rivers.

Alternatively you can take a plane to Drake Bay Airport and we can arrange a 4×4 taxi for $70 per vehicle, one way (~45 minutes). Just let us know.

We’ll ensure your journey is smooth and memorable. Let us know your travel dates, and we’ll recommend the best option!

### ALL SEASONS  — FIRST COPY IN DOM (tab labels rendered as SPANs: "Sierpe By car", "By Bus & Shuttle", "The boat")
The Easiest Way to Arrive: Scenic Boat Transfer

Arriving by boat is not only the most affordable and effortless way to reach us year-round, but it’s especially delightful during the green season (May to November). Simply sit back, relax, and let the stunning river and ocean scenery unfold as your journey becomes an unforgettable tour in itself.

#### Sierpe By car
Sierpe is your convenient access point! Drive from San José (250 - 5 hrs), Quepos (120 km - 3 hrs), Uvita (60 km - 2.5 hrs), or Palmar Norte (30 mins) directly to Donde Jorge Restaurant. Here, you'll find secure, 24-hour parking right next to the boat dock, ensuring a worry-free transition to your next adventure.

#### By Bus & Shuttle
For a budget-friendly journey from San José, take the Tracopa public bus departing at 8:00 AM. This approximately 8-hour ride is perfectly timed to connect with our afternoon boat transfer from Sierpe. Prefer a more direct route? We can also arrange a comfortable shuttle service directly to Sierpe for your convenience. Just let us know your needs!

#### The boat
Your adventure to Ocean Forest Ecolodge begins with a breathtaking 1.5-hour boat ride from Sierpe—an unforgettable wildlife tour through Central America's largest mangrove forest. Glide along the tranquil Sierpe River, spotting monkeys, caimans, crocodiles, vibrant birds, and more, before the river opens to the Pacific Ocean for a thrilling coastal ride to San Josecito Beach, one of the area's most stunning shores. Public boats depart at 11:30 AM ($30 USD) and 4:00 PM ($40 USD)—arrive 30 minutes early to secure your spot. Pack light in a backpack (max 15 kg), protect electronics in waterproof bags, and wear water sandals for the beach landing. Find Sierpe Dock next to Donde Jorge Restaurant, and always tell the boat operator to drop you at San Josecito Beach for Ocean Forest Ecolodge. This is the most scenic, affordable, and exhilarating way to reach paradise. Click here to book your boat transfer and let the magic begin!

https://www.wetravel.com/trips/boat-from-sierpe-to-san-josecito-beach-ocean-forest-ecolodge-92104116

(NOTE verbatim: the raw URL above is printed as visible body text/link label on the page.)

### ALL SEASONS  — SECOND COPY IN DOM (H3 tabs: "Sierpe By Car", "By Bus & Shuttle", "The Boat") — DIFFERENT NUMBERS
The Easiest Way to Arrive: Scenic Boat Transfer

Arriving by boat is not only the most affordable and effortless way to reach us year-round, but it’s especially delightful during the green season (May to November). Simply sit back, relax, and let the stunning river and ocean scenery unfold as your journey becomes an unforgettable tour in itself.

#### Sierpe By Car
Sierpe is your convenient access point! Drive from San José (280 km – 5 hrs), Quepos (120 km – 3 hrs), Uvita (60 km – 2 hrs), or Palmar Norte (15 km – 30 mins) directly to Donde Jorge Restaurant. Here, you’ll find secure, 24-hour parking right next to the boat dock, ensuring a worry-free transition to your next adventure.

#### By Bus & Shuttle
For a budget-friendly journey from San José, take the Tracopa public bus departing at 8:00 AM. This approximately 5-hour ride is perfectly timed to connect with our afternoon boat transfer from Sierpe. Prefer a more direct route? We can also arrange a comfortable shuttle service directly to Sierpe for your convenience. Just let us know your needs!

#### The Boat
Your adventure to Ocean Forest Ecolodge begins with a breathtaking 1.5-hour boat ride from Sierpe — an unforgettable wildlife tour through Central America’s largest mangrove forest. Glide along the tranquil Sierpe River, spot monkeys, caimans, crocodiles, vibrant birds, and more, before the river opens to the Pacific Ocean for a thrilling coastal ride to San Josecito Beach, one of the area’s most stunning shores. Public boats depart at 11:30 AM ($30 USD) and 4:00 PM ($40 USD) — arrive 30 minutes early to secure your spot. Pack light (a backpack with max 15 kg / 33 lbs), protect electronics in waterproof bags, and wear water sandals for the beach landing. Find Sierpe Dock next to Donde Jorge Restaurant, and always tell the boat operator to drop you at San Josecito Beach for Ocean Forest Ecolodge. This is the most scenic, affordable, and exhilarating way to reach paradise. Click here to book your boat transfer and let the magic begin!

Reserve Your Boat Transfer   [→ https://www.wetravel.com/trips/boat-from-sierpe-to-san-josecito-beach-ocean-forest-ecolodge-92104116]

CONFLICT (verbatim, both on page): bus ride is "approximately 8-hour" in copy 1 and "approximately 5-hour" in copy 2; San José distance "250 - 5 hrs" vs "280 km – 5 hrs"; Uvita "2.5 hrs" vs "2 hrs".

### Dry Season only (December - April)   [H3]
Best Conditions for a Smooth and Safe Journey

#### By Car from San José / Uvita   [H4]
Your journey to Ocean Forest Ecolodge is part of the adventure — and the reward is extraordinary. For a smooth and safe arrival, please note:

A 4×4 vehicle is essential. Rural roads can be unpredictable and may not be accurately shown on Google Maps or Waze.

Recommended Route
– From San José, take the scenic coastal highway via Uvita toward Drake Bay ( 370 km – 8 hrs).
– From Drake Bay set your destination to San Josecito Rural School (13 km – 40 minutes ). You will cross two shallow rivers. Always check weather and rainfall, as heavy rain can make crossings impassable.

Parking and Final Walk
– You can leave your car at San Josecito Rural School (secure parking area).
– From there, enjoy a picturesque 15-minute walk north along the beach to the lodge.
– Please share your estimated arrival time so a staff member can meet you and assist with luggage.

This route is available only during the dry season (December to April). Embrace the journey — the path to Ocean Forest Ecolodge is as memorable as the paradise that awaits.

("San Josecito Rural School" links to https://maps.app.goo.gl/34sQPv43R8bUP1H66)

#### By Plane from Drake Bay Airport   [H4]
Flying is a convenient way to reach us. Please follow these guidelines for a smooth arrival:

Book Your Flight
– We recommend booking with SANSA Airline at least 1 month in advance. Our staff can help booking your flights, request help to eli@oceanforest.org

Share Your Flight Details
– Send us your itinerary so we can arrange your ground transfer. Drake Bay Airport is rural, and taxis are not readily available on site. Kindly confirm your taxi at least 48 hours before arrival.

Taxi Arrangement
– We will book a 4×4 taxi for you. Payment is made directly to the driver: $60 USD per car (one way).
– Transfer time: approximately 40 minutes from Drake Bay Airport to San Josecito Rural School (our designated drop-off and parking point).

Final Walk to the Lodge
– From San Josecito Rural School, it’s a scenic 15-minute walk to the lodge.
– Please share your estimated arrival time so our staff can meet you and assist with luggage.

Your journey is part of the experience — simple, safe, and absolutely worth it once you arrive in paradise.

(NOTE: the eli@oceanforest.org link href is broken — `mailto:maito>eli@oceanforest.org`)
(NOTE: taxi price conflicts across the site — $70 per vehicle in "How to get here" and FAQ, $60 USD per car here.)

Book Now

### Choose Your Perfect Room   [H2]
Drift to sleep with the rhythm of the Pacific and wake to a symphony of birdsong.
At Ocean Forest Ecolodge, nature is your constant companion — rainforest at your doorstep, the ocean just steps away.

View More

### Dining   [H2 — anchor #Dining]
Ocean-Inspired Dining at Ocean Forest Ecolodge

#### Thoughtfully Crafted, Locally Rooted
Our menus celebrate the flavors of the Osa Peninsula with ingredients sourced from our ethnobotanical gardens, nearby seas, and trusted local farmers. Expect vibrant, seasonal cuisine that reflects our region’s culinary heritage.

#### The Setting: Nature at Your Table
Enjoy breakfast, lunch, and dinner in our open-air dining room—surrounded by rainforest, sea breezes, and the songs of macaws and toucans. It’s an immersive dining experience where wildlife and nature set the scene.

#### Signature Flavors of the Rainforest
Our Costa Rican–inspired dishes are fresh, light, and refined—prepared with organic produce, garden herbs, and sustainably harvested seafood. We cook with intention, heart, and a deep respect for place.

#### Our Ingredients, Our Commitment
Fresh, local, and organic whenever possible
Sustainably caught local fish only
Our menu is a testament to responsibly sourced, high-quality ingredients

#### Made for You
Every dish can be tailored to your needs. We carefully accommodate allergies and special diets, including gluten-free, vegetarian, and vegan options.

#### Help Us Prepare the Best for You
Due to our remote location and seasonally driven menus:
Please share your dietary preferences at least 48 hours before arrival via the check-in form.
Daily menus are designed around what’s freshest and available each day.
Last-minute special requests may require up to one week’s notice and are fulfilled based on availability.

### Sign up for our newsletter to receive our news, deals and special offers
News
Fields marked with an * are required
Name *
Email Address *
If you are a human seeing this field, please leave it empty.

---

## PAGE: https://oceanforestecolodge.com/experiences-tours/ (title: "Experiences/Tours - Ocean Forest Ecolodge") — nav label "Tours"

Section order: Rainforest Discovery (2 tours) → Ocean Discovery (3 tours) → "Where the silence of the jungle speaks loudest" CTA → Complementary Activities (8-item accordion) → closing line → newsletter → footer.

### Rainforest Discovery   [H2 — anchor #RainforestDiscovery]
Discover the living heart of the rainforest

Book Now   [→ https://www.wetravel.com/trips/corcovado-national-park-sirena-station-ocean-forest-ecolodge-75443139]

#### Corcovado National Park Sirena Station   [H3]
Explore one of the wildest places on Earth on Costa Rica’s remote Osa Peninsula, home to nearly 3% of the planet’s biodiversity. At Sirena — the heart of the park — you’ll enjoy exceptional wildlife sightings, from scarlet macaws and monkeys to tapirs, caimans, and sometimes elusive big cats.

The tour includes a 1.5-hour round-trip boat transfer, guided exploration with an ICT-certified naturalist, a telescope for wildlife observation, park entrance fees, and a wholesome rainforest lunch.

Book Now   [→ https://www.wetravel.com/trips/corcovado-national-park-sirena-station-ocean-forest-ecolodge-75443139]

#### Corcovado National Park San Pedrillo Station   [H3 — rendered on two lines: "Corcovado National Park" / "San Pedrillo Station"]
Discover Corcovado’s coastal and rainforest trails at San Pedrillo Station, where wildlife thrives and crowds are minimal.

Spot scarlet macaws, monkeys, and tapirs, wander floral-lined paths, cross jungle rivers, and cool off at a hidden waterfall.

The tour includes a 40-minute round-trip boat transfer, park entrance, guidance from an ICT-certified naturalist with a telescope, and immersive hikes along rainforest and coastal trails with opportunities for wildlife viewing and waterfall swimming.

Book Now   [→ https://www.wetravel.com/trips/corcovado-national-park-san-pedrillo-station-ocean-forest-ecolodge-28113992]

### Ocean Discovery   [H2 — anchor #OceanDiscovery]
Book Now   [→ https://www.wetravel.com/trips/cano-island-snorkelling-tour-ocean-forest-ecolodge-69074848]

#### Caño Island Snorkeling   [H3]
Explore one of Costa Rica’s most celebrated marine reserves on this unforgettable Caño Island snorkeling adventure. Swim in crystal-clear waters above vibrant coral reefs teeming with sea turtles, manta rays, and tropical fish. Seasonal sightings may include dolphins and migrating humpback whales.

The tour includes a scenic 1-hour boat transfer, snorkeling at protected reef sites, professional guide and equipment, high chances of marine wildlife encounters, and time to relax on pristine, untouched beaches.

Book Now   [→ https://www.wetravel.com/trips/cano-island-snorkelling-tour-ocean-forest-ecolodge-69074848]

#### Caño Island Diving   [H3]
Dive Caño Island with our trusted local PADI‑certified operator and experience one of Costa Rica’s most spectacular underwater adventures. Whether you’re a beginner doing your first discovery dive or an experienced diver with many logged dives, our divemaster will guide you safely, provide all the gear you need, and help you feel relaxed and confident in the water.

Glide through crystal‑clear seas above vibrant reefs teeming with manta rays, sea turtles (green, olive ridley, hawksbill), longtail stingrays, white‑tipped reef sharks, barracuda, and tuna — plus seasonal encounters with dolphins and migrating humpback whales. Between dives, unwind on pristine beaches and soak in sweeping island views.

Spots are limited — book your Caño Island diving excursion with Ocean Forest Ecolodge and make your Costa Rica dive trip truly unforgettable.

Book Now   [→ https://www.wetravel.com/trips/cano-island-diving-tour-ocean-forest-ecolodge-22781271]

#### Dolphins & Whales   [H3]
Enjoy a full-day dolphin and whale watching adventure, listening to whales sing through hydrophones and watching dolphins play in their natural environment. Seasonal humpback whales visit from both hemispheres — July–September from the south and October–January from the north — alongside local marine species. Tours may include snorkeling when conditions allow.

Departing from San Josecito Beach, the experience includes a vegetarian lunch, snacks, and refreshments, offering one of Costa Rica’s most unforgettable marine encounters.

Book Now   [→ https://www.wetravel.com/trips/dolphin-whales-encounter-ocean-forest-ecolodge-57401510]

### Where the silence of the jungle speaks loudest   [H2]
The mystery of the jungle awaits you. Check availability and reserve your place on this intimate expedition.

Check It Out   [→ https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3]

### Complementary Activities   [H2 — anchor #ComplementaryActivities]
Activities that awaken the wild soul

Immerse yourself in the Osa Peninsula, the most biodiverse place on Earth. From the ancient wisdom of the Botanical Garden to the nighttime magic of our Night Tour, every experience is a portal to pure nature. Discover hidden waterfalls, ride horses along pristine beaches, and witness the mesmerizing flight of bats.

Your epic adventure in the heart of Costa Rica begins here.

#### Botanical Garden
Discover our Ethnobotanical Walk — a self-guided journey through Ocean Forest Ecolodge's living classroom of permaculture and rainforest wisdom. Wander lush gardens brimming with rare ancestral plants, learning their medicinal, edible, and sacred uses through captivating stories, myths, and hands-on tasting and preparation. Engage your senses as you smell, touch, and sip herbal infusions, exploring a vibrant collection that also nourishes our kitchen. Reconnect with the profound healing wisdom of the jungle and let nature be your ultimate teacher.

#### Bat Cave
Set out from Ocean Forest Ecolodge on a coastal walk to our “Bat Cave”, where, at dusk, thousands of bats stream into the sky — a mesmerizing natural spectacle. Wander past tide pools and coral reefs at low tide, with sweeping views of the rainforest‑cloaked peninsula and Caño Island shimmering offshore. Return along the beach as the sun sets and ocean breezes wash over you. Simple, wild, unforgettable — add the Bat Cave walk to your must‑do Osa adventures.

#### River Walk
Follow a wild, breathtaking coastline from Ocean Forest Ecolodge to Río Claro — a jade‑green river bordered by towering trees and a pristine beach just 45 minutes away. Pause at the dramatic Blow Hole, then swim in crystal pools, unwind on golden sand, or float in the river’s fresh, clear water. Join a gentle canoe or boat ride to explore the jungle-lined river, spot birds and monkeys, and discover hidden waterfalls — perfect for photos and a picnic. Ideal for families with children, Río Claro is pure paradise and an unmissable day adventure.

#### Drake Bay Walking
Embark on a breathtaking 3-hour coastal walk from Ocean Forest Ecolodge to the charming town of Drake Bay — an unforgettable journey through rainforest-cloaked cliffs, hidden coves, and more than ten pristine beaches along the South Pacific coast. Stop for a refreshing swim in Río Claro or a rest under palm shade before reaching Drake Bay, where local cafés, shops, and friendly smiles await. Enjoy lunch and a tropical fruit juice, then return by 4x4 taxi or by boat along the scenic shoreline. A true adventure for nature lovers — this is the most beautiful way to experience the wild soul of the Osa Peninsula.

#### Horse Riding
Saddle up for our Half‑Day Horseback Adventure — an unforgettable way to experience the wild beauty surrounding Corcovado National Park. Guided by expert local horsemen and matched with well‑trained horses, riders of all levels follow scenic coastal trails, venture along Río Claro’s jungle paths, and traverse countryside vistas with chances to spot birds, monkeys, and lush rainforest life. Pause for a refreshing swim in a crystal‑clear river before a picturesque return to the lodge.

#### Night Tour
Step into the rainforest after dark on our Night Tour — an enchanting two-hour adventure where the jungle comes alive. Follow our naturalist guide along the beach, then slip beneath the canopy to seek glass frogs, colorful tree frogs, curious reptiles, and nocturnal insects as the forest sings around you. Guided, safe, and unforgettable, this immersive experience reveals Corcovado’s magic in a whole new light. Book your Night Tour with Ocean Forest Ecolodge and meet the jungle at its most mysterious.

#### Sierpe Mangrove Tour
Discover the hidden paradise of the Sierpe River mangroves, Central America's largest and most pristine mangrove system, with our trusted local tour operators. This 3-hour guided boat excursion takes you through a breathtaking ecosystem teeming with wildlife — spot three species of monkeys, sloths, crocodiles, caimans, and over 150 bird species, including scarlet macaws. Our expert bilingual guides know every secret spot, ensuring incredible viewing and photo opportunities from our comfortable, shaded vessel. Ideal for all ages, this tour offers a serene yet exhilarating look into one of Costa Rica’s most vital and beautiful natural wonders — a must-do experience from Ocean Forest Ecolodge.

#### Waterfall Hiking
Discover two hidden gems — Goddess Jacuzzi and Cocoterra Waterfall — on a guided rainforest adventure from Ocean Forest Ecolodge. Travel by 4x4 to the trailhead, then hike through towering primary forest to crystal pools and cascading falls perfect for a refreshing swim; at Río Claro’s headwaters, natural “jacuzzis” bubble over smooth rock, and adventurous guests can leap into deep swimming holes. Each waterfall is a separate day trip; our team provides round‑trip transport arrangements and a picnic by the pools. Ask our staff for details and let us plan your unforgettable waterfall escape.

### (closing line)
What’s your next adventure? Explore the Sierpe mangroves, take a dip in the Río Claro, or join a horseback riding tour.
Book your unforgettable experience with our team upon arrival.

### Sign up for our newsletter to receive our news, deals and special offers
News
Fields marked with an * are required
Name *
Email Address *
If you are a human seeing this field, please leave it empty.

---

## PAGE: https://oceanforestecolodge.com/food-and-experiences/ (title: "Food and Experiences - Ocean Forest Ecolodge") — nav label "Dining"

### Food and Experiences   [H1 — banner]
Wholesome Cuisine
Fresh, Natural and Local

Book Now

### Food and Experiences   [H2]
Ocean Forest Ecolodge

### Nourishing the Soul   [H2]
Farm ‑ to ‑ Table Cuisine in the Heart of the Jungle

Our cuisine is an invitation to slow down, savor, and feel truly at home. Each dish is made with fresh, locally sourced ingredients — many harvested from our own tropical gardens at the peak of their flavor. Enjoy three balanced, wholesome meals a day in our open‑air dining room, surrounded by rainforest, sea breezes, and the songs of macaws and toucans. Alongside every meal, we serve vibrant natural fruit juices, and throughout the day you can help yourself to filtered water, coffee, and a selection of teas.

Every bite connects you with the land, the culture, and the gentle rhythm of life in Costa Rica.

#### Vegetarian
Our vegetarian cuisine is colorful, generous, and deeply satisfying. We combine legumes, seeds, fresh vegetables, whole grains, and tropical fruits to create plates that are as beautiful as they are nourishing, offering complete plant‑based protein, rich flavor, and the comforting feeling of a home ‑ cooked dish.

#### Vegan
For our vegan guests, we craft inventive, fully plant ‑ based menus that prove you can eat compassionately and indulgently at the same time. From hearty bowls and vibrant salads to slow‑cooked stews and bright sauces, every recipe is free of animal products, leaving you energized, light, and fully satisfied.

#### Gluten ‑ Free
If you prefer or need to avoid gluten, you'll find plenty of delicious options created with care. We highlight naturally gluten‑free ingredients like rice, roots, beans, vegetables, and fruits, and can adapt many of our dishes on request while preserving rich flavor and variety.

#### Omnivores
Omnivores enjoy the best of both worlds: abundant plant‑based sides paired with sustainably caught local seafood, free‑range meats, and eggs. Our focus is on real, honest food — prepared simply, seasoned with local flavors, and served in portions that leave you happily satisfied, never heavy.

### Your Dining Experience
To ensure we prepare the best for you, please share your dietary preferences at least 48 hours before arrival via the check-in form. Our daily menus are seasonally driven, designed around what’s freshest and available, and guests enjoy homemade meals crafted to nourish body and soul.

Your table is set — naturally.

### Where the silence of the jungle speaks loudest   [H2]
The mystery of the jungle awaits you. Check availability and reserve your place on this intimate expedition.

Check It Out

### Sign up for our newsletter to receive our news, deals and special offers
News
Fields marked with an * are required
Name *
Email Address *
If you are a human seeing this field, please leave it empty.

---

## PAGE: https://oceanforestecolodge.com/yoga/ (title: "Yoga - Ocean Forest Ecolodge")

### YOGA   [H2 — banner]
Book Now

### YOGA RETREATS   [H2]
Ocean Forest Ecolodge

### Where the Jungle Meets the Sea   [H2]
Host Your Transformational Yoga Retreat

Invite your community to practice in one of the most pristine and inspiring settings on Earth. Ocean Forest Ecolodge is an intimate, boutique eco‑lodge nestled between lush rainforest and untouched beachfront — designed for yoga teachers who want to offer their students more than just a retreat, but a true transformation.

With seamless logistics, chef‑prepared meals, exclusive natural surroundings, and dedicated practice spaces, hosting your retreat here is effortless, and the experience is unforgettable.

#### Exclusive Natural Setting
Your students will practice surrounded by pristine beachfront, vibrant rainforest, and abundant wildlife — morning yoga to the call of howler monkeys, sunset meditations by the ocean, and evenings under a canopy of stars. This is nature at its most powerful, and your retreat at its most inspiring, enriched by unforgettable excursions such as exploring Corcovado National Park (Sirena or San Pedrillo stations), snorkeling or diving in the crystal‑clear waters of Caño Island, and enjoying horseback riding, massages, waterfall hikes, river walks, and night tours.

#### Designed to Inspire Practice
At the ecolodge’s center, a three-story pagoda-style Yoga shala overlooks the jungle and ocean. The ground-floor Dharma Hall (1,600 ft² / 150 m²) offers naturally cool space for gatherings and workshops, while at mid level your hardwood Yoga floor (1,076 ft² / 100 m²) is complete with yoga props — endearingly called “foot candy,” crowned by an observatory cupola — prana filled — panoramic views and ocean breezes.

#### Guest Capacity
We host up to 32 guests in comfortable bungalows and suites with private baths and ocean or jungle views. Retreat facilitators enjoy dedicated rooms beside the Yoga Shala, designed to support leadership. Every stay is restful, connected, and thoughtfully cared for.

#### Comprehensive Support
Our experienced on-site team manages planning, transportation, scheduling, and daily logistics, so you can focus fully on your students. We provide three nourishing meals daily with fresh, locally sourced ingredients, plus coffee, tea, and spring water throughout the day.

#### A Natural Home for Your Retreat
Immersed in mother nature’s embrace, nourished by the ocean, and elevated by the rainforest, Ocean Forest Ecolodge provides everything you need to host a well-supported, transformative yoga retreat — A place where your students can reconnect, realign, and renew body, mind, and spirit.

Let’s Bring Your Retreat Vision to Life! Let us know your group size, practice and dietary needs, and we’ll take care of the rest. Contact us for availability, rates, and flexible payment options. We’ll support you every step of the way — from planning to arrival and homewards travel.

HOST A RETREAT
Let’s bring your retreat vision to life!

### Your Yoga Retreat in Costa Rica   [H2]
An Oceanfront Rainforest Sanctuary — Unforgettable by Nature

Reserve   [→ https://wa.me/50687379416]

### Sign up for our newsletter to receive our news, deals and special offers
News
Fields marked with an * are required
Name *
Email Address *
If you are a human seeing this field, please leave it empty.

NOTE: Dharma Hall size differs from the /accommodations/ accordion — here "1,600 ft² / 150 m²", there "1,600+ ft² / 148 m²".

---

## PAGE: https://oceanforestecolodge.com/about-us/ (title: "About Us - Ocean Forest Ecolodge") — nav label "Contact"

Section order: banner → Connect With Us → Travel Tips (What to Pack, 4-item accordion) → Recomendations (3-item accordion) → "Where the silence…" CTA → Frequently Asked Questions (7-item accordion) → Cancellation Policy → newsletter → footer.

### Ocean Forest Ecolodge   [H1 — banner]

### ABOUT US   [H2]
Choose the perfect room for your stay

Book Now

### Connect With Us   [H2 — anchor #connectwithus]
Ocean Forest Ecolodge

Rincón de San Josecito, Drake Bay, Provincia de Puntarenas, Costa Rica   [H3]

+ 506 8737 9416   [H4 → https://wa.me/50687379416]

visit@oceanforest.org eli@oceanforest.org   [H4 → mailto:eli@oceanforest.org]

#### What’s included with your stay:   [H4]
Breakfast, served fresh each morning

(NOTE: on this page the "What's included" list is truncated to the single "Breakfast" line — the remaining items present on /accommodations/ are missing here.)

### Travel Tips   [H2 — anchor #traveltips]
Book Now

#### What to Pack   [H3]
Prepare for a tropical escape! Pack light and smart for your journey to the Osa Peninsula.

##### Climate & Seasons
Experience tropical warmth year-round on the Osa Peninsula!
Temperatures: Days average mid-90s°F (34°C), nights mid-70s°F (22-23°C), with humidity between 68-90%.
Dry Season (Dec-Apr): Enjoy abundant sunshine, with March and April being the warmest months.
Green Season (May-Nov): Embrace lush landscapes and refreshing rains, with September and October seeing the highest rainfall.
For detailed weather, visit: Weather for the Osa Peninsula and Climate in Costa Rica.

(NOTE: "Weather for the Osa Peninsula" and "Climate in Costa Rica" are NOT hyperlinked — plain text only.)

##### Essentials
Luggage: We highly recommend backpacks (max 15 kg / 33 lbs) over suitcases, as your final stretch to the lodge is a scenic walk. Note: Local flights have a 11 kg / 25 lbs limit; consider leaving extra gear in San José.
Essentials: Headlamp/flashlight, sunhat, beach towel, flip-flops, reef-safe sunscreen, bug repellent, day pack, reusable water bottle, bathing suit, lightweight quick-dry clothing, biodegradable toiletries, and sturdy hiking shoes.
Rain Gear (May-Nov): A portable umbrella or lightweight rain jacket is advisable during the green season.
Get ready to immerse yourself in nature!

##### Optional Items
Sunglasses, water shoes, lightweight windbreaker, camera/binoculars, snorkel gear, journal.

##### Porter Service
The final leg of your journey is a picturesque 15-minute walk along either San Josecito Beach or Rincón Beach. Embrace this beautiful stroll by packing light with a backpack!
For your convenience, porter service is available upon request via your reservation form. We can arrange horseback or motorized quad transfers for your luggage, ensuring a smooth and effortless arrival.
Your adventure begins the moment you set off — inform us if you need any assistance, and we'll ensure your arrival is as smooth and unforgettable as your stay!

Book Now

### Recomendations   [H2 — anchor #recomendations — note misspelling]
#### Travel Tips & On-Route Information for Ocean Forest Ecolodge   [H3]
Prepare for a seamless journey to your remote paradise!

##### Before You Travel
Passport & Return Ticket: Ensure your passport is valid for at least 6 months beyond your departure. Proof of onward travel (flight/land ticket) is required. Check Visa Requirements by Country for specific needs.
Travel Insurance: Highly recommended for trip cancellations and medical emergencies. Check with your airline, credit card provider, or recommended providers like Travel Guard, DAN, TravelInsurance.com, or Generali.
Vaccinations: No mandatory vaccinations for Costa Rica, unless arriving from specific African or South American countries (Yellow Fever certificate required 10 days prior to entry). See Yellow Fever Vaccine Requirements for details.

("Visa Requirements by Country" → https://www.visitcostarica.com/planning-your-trip/entry-requirements)
("Yellow Fever Vaccine Requirements" → https://abacus.ai/help/howTo/chatllm  ← WRONG LINK)

##### Arriving in Costa Rica (SJO Airport)
Connecting Flights: Allow 2.5-3 hours between international arrival (SJO) and your domestic flight to Drake Bay. Walk left from the International Terminal to reach the Domestic Terminal (approx. 10 mins); free luggage carts are available.
San José: San José is subtropical and can be chilly at night; pack a light sweater.

##### Money & ATMs
Costa Rican Colones and US Dollars are accepted.
Crucial: There are NO ATMs near Ocean Forest, Sierpe, or Drake Bay. Bring sufficient cash for transfers and local expenses. ATMs are available in San José and larger towns like Quepos, Dominical, and Palmar Norte.
At Ocean Forest Ecolodge, you can pay for services online via PayPal.

Book Now

### Where the silence of the jungle speaks loudest   [H2]
The mystery of the jungle awaits you. Check availability and reserve your place on this intimate expedition.

Check It Out

### Frequently Asked Questions   [H2 — anchor #fqs]

#### How do I to get here?
You have multiple options depending on the season.

All Seasons
By Boat (Recommended)
Travel to Sierpe and take either the morning boat (11:30 a.m.) or the afternoon boat (4:00 p.m.) to San Josecito Beach (~ 1,5 hours). From there, it’s a 15-minute walk along the beach to the lodge.
If you need assistance booking the boat, let us know or click this link.

Dry Season (December - April)
Drive to San Josecito Rural School [Link to location here] and leave your car in the secure parking area. From there, it's a 15-minute walk to the lodge.
Important: The roads are unpaved and require a 4x4 vehicle to cross two shallow rivers.
Alternatively you can take a plane to Drake Bay Airport and we can arrange a 4x4 taxi for $70 per vehicle, one way (~45 minutes). Just let us know.

("click this link" → https://www.wetravel.com/trips/boat-from-sierpe-to-san-josecito-beach-ocean-forest-ecolodge-92104116)
(PLACEHOLDER left in live copy, verbatim: `[Link to location here]`)

#### What is the Cheapest Way to Arrive?
Taking the boat from Sierpe is the most affordable and scenic option:
Morning boat (11:30 a.m.): $30 per person
Afternoon boat (4:00 p.m.): $40 per person

#### What is the Fastest Way to Arrive?
By plane to Drake Bay Airport, then take a 4x4 taxi (~45 minutes) - let us know and we can arrange the taxi for you.

#### What should I Pack?
Backpacks only (max 15 kg per person)
Quick-dry clothing and waterproof shoes
Sunscreen, insect repellent, hat, and sunglasses
Reusable water bottle
Raincoat and snorkel gear (optional but useful)
Flashlight (recommended)

#### How do I book Rooms?
Use this link to choose and reserve your room: [Link]

(PLACEHOLDER left in live copy, verbatim: `[Link]` — no href at all)

#### How do I book Tours?
Visit the tour descriptions [Link to appropriate site here] and use the provided links. Full payment is required to confirm your tour dates. You can pay per xxx.

(PLACEHOLDERS left in live copy, verbatim: `[Link to appropriate site here]` and `You can pay per xxx.`)

#### When is Green Season and Dry Season?
Green Season is from May–November
Dry Season is from December–April

### Cancellation Policy   [H2 — anchor #cancelation]
Payment & Cancellation Policies for Independent Travelers:
30+ Days Before Arrival: 100% refund.
29 Days Before Arrival: 80% refund (20% deposit withheld).
7 Days Before Arrival: 50% of total booking charged.
Within 48 Hours (No-Show): Full payment charged.

Rescheduling:
If you cannot travel due to health or force majeure, your deposit can be applied to a rescheduled visit within one year, at current rates.

NON REFUNDABLE RATES
Full payment is due at booking, and this rate is final — no refunds or changes are permitted.

### Sign up for our newsletter to receive our news, deals and special offers
News
Fields marked with an * are required
Name *
Email Address *
If you are a human seeing this field, please leave it empty.

---

## PAGE: https://oceanforestecolodge.com/rainforest-ocean-setting/ (title: "Rainforest Ocean Setting - Ocean Forest Ecolodge")

Thin stub — reuses the Yoga banner and the Yoga closing CTA. Full content:

### YOGA
Book Now

### Rainforest Ocean Setting
Ocean Forest Ecolodge

### Your Yoga Retreat in Costa Rica
An Oceanfront Rainforest Sanctuary — Unforgettable by Nature

Reserve

### Sign up for our newsletter to receive our news, deals and special offers

(Footer here reads `Dining` + `Accomodations`.)

---

## PAGE: https://oceanforestecolodge.com/2026/03/31/the-rainforest-ocean-setting/ (post, title "The Rainforest Ocean Setting")

### ..at Ocean Forest Ecolodge, is a nature lovers paradise!
The Osa Peninsula, located on the Southern Pacific Coast of Costa Rica, is a world premier rainforest destination nominated as, “the most biologically intense places on earth,” by National Geographic.

Where the Rainforest meets the Sparkling Pacific Ocean
On the westernmost cove of the Osa Peninsula

Ocean Forest Ecolodge is a nature lovers paradise! Located just south of Drake Bay on the westernmost cove of the Osa Peninsula and within walking distance of Corcovado National Park. The region is home of one of the great stands of Central American Tropical Rainforests, where a people friendly wilderness coast and paradise beaches borders a sparkling and pristine Pacific Ocean. Breathtaking, untouched scenery, secluded paradise beaches, and abundant wildlife living freely among the lush primary rainforest and the diverse unspoiled freshwater and marine ecosystems is what you’ll find here.

For those who adore the great outdoors

Ocean Forest Ecolodge shares a remote one and a quarter mile-long coconut laden paradise beach, that is home to Costa Rica’s must abundant Scarlet Macaw population as well as a marine turtle nesting sanctuary. The ecolodge campus, the rainforest, the beach and the ocean setting is place for people who adore the great outdoors and wish to bask in and discover this magnificence.

A people friendly wilderness beach
Black Throated Trogon at Ocean Forest Ecolodge (Photo JSMW)
Where whales and dolphins play and sing!

These blessed waters are among the richest on earth for whale and dolphin diversity. Humpback whales come to give birth here and rear their cubs. Between August ~ October arrive the Southern Humpback whales, then from October ~ December arrive the Northern Humpbacks. During these months one can listen to their calls while swimming in the waters as their songs travel for hundreds of miles through the ocean, an auditorium of the Cetaceans. Many species of dolphins here too play and sing!

Humpback mother and cub near the Caño Island Oceanic Reserve (JSMW)
An endangered Pacific Green Sea Turtle on San Josecito Beach (Photo JSMW)
A Birds Eye View of Ocean Forest Ecolodge

(Italic lines above are image captions, in DOM order.)

---

## PAGE: https://oceanforestecolodge.com/2026/03/31/feb-19th-18th-anniversary-2/ (post, title "Feb 19th – 18th Anniversary")

### Beyond the Sunset
Even though a few weeks have past since Ocean Forest Ecolodge’s 18th anniversary, that was this Feb 19th, it’s never to late, to share some glimpses into her timeless beauty! The entire project is simply an act of devotion. Creating a space where people can be renewed through an intimate experience with the newness of nature. For us this is profoundly beautiful. And the lodge is so much more than an ecotourism and retreat destination, it is the hub of many amazing adventures in the universal culture of service, and the continuation of virtuous unfolding. Ecotourism, Permaculture, Ethnobotany, Environmental Education, Marine Turtle Conservation, and so much more!

Ocean Forest’s Beach front is Original Pura Vida

This February 19th, 2020, was the inauguration of the beautiful, now known as Ocean Forest Ecolodge, the dragon baby! We received our first guests 18 years ago, oh my goddess! And everything about the place is more beautiful than ever!

A Nature Sanctuary at the pulsating heart of the Osa
Tucan in the Acai (Euterpe sp.) palm

At Ocean Forest Ecolodge ~ Let Mother Nature do her work
Let the clean blue ocean and the sand between your toes refresh you!
Let the towering trees and coconut palm groves inspire you!
Let the songs of Macaws, Toucans and Howler Monkeys enliven you!
Let experiencing nature in harmony revive you!
Let the whole place renew you!

Sunsets Supreme
Your Ecolodge Retreat at the Pulsating Heart of Nature
Fleischmann’s glass tree frog seen in the White Hawk Nature Trail

Everything about the place is just getting better and better! Our rooms have been upgraded and the main lodge, the Lapa Lapa Lodge offers a wonderful space for retreats: Yoga retreats, Tropical nature discovery adventures, and/or family reunions.

The Yoga Shala in the Lapa Lapa lodge
Our beach front cabins offer an unequaled Costa Rican escape
The Coco Solo Ocean View Cabin, plumb on the beach!
We are situated on Rincón de San Josecito beach, south of Drake Bay
Ocean Forest Ecolodge – Where the majestic Rainforest meets the Sparkling Pacific Ocean

We look forward to seeing you here! Pura Vida!

---

## PAGE: https://oceanforestecolodge.com/2026/03/23/sunsets-supreme/ (post, title "Sunsets Supreme")

### Beyond the Sunset
A great pleasure of visiting Ocean Forest Ecolodge are the sunsets supreme. Let pictures speak for themselves alongside a poem called “Beyond the Sunset” by Catrina Heart. Followed by Ocean Forest Ecolodge’s emblematic poem. Let the golden light of the sun fill each cell in your body! In~Joy!

Stairway to heaven

Beyond The Sunset by Catrina Heart

Radiance ruptured the firmament elsewhere
Blessing the unruffled western seas and oceans
A delightful emblem of stairway to heaven
As the shade of darkness creeping everywhere

The magnificent face of twilight

Along the magnificent face of twilight
Where the sun is pulling along the drapes of night
Lazily burying its luster, spreading the shroud of dusk
Emotions framed my eyes, captured my nostalgic vibes

Sometimes we are blessed with a Golden sky

I see fine reflections of me arousing all certainty
Like sky’s mirage, nature of beauty to the sea
My blue almond eyes are on fire,
Feeling wet as pearls budding on one side

Vista from Sunset lookout at Ocean Forest Ecolodge

I witness the velvet haze in crimson shower, red-hot
As it meets the cold zephyr shivering my veins
Twilight is creeping struggling for gold
I see myself beyond the sunset where my future unfolds

The velvet haze in crimson shower

O what a splendor, what beauty it paints does in its image
Beyond the sun, beyond the sky there are sands of time
I’m dreaming of bright tomorrow on the depths of the ocean
Half-journeyed, half-forgotten looms the vision in my mind

Sunset over Caño Island

Twilight shall soon shake hands with dawn
Where fresh morning dews shall bless all leaves
Spreading balms of spring fragrance, so sweet
An insignia of bright morrow on the glorious break of dawn

Rays of inspiration

At Ocean Forest Ecolodge ~ Let Mother Nature do her work
Let the clean blue ocean and the sand between your toes refresh you!
Let the towering trees and coconut palm groves inspire you!
Let the songs of Macaws, Toucans and Howler Monkeys enliven you!
Let experiencing nature in harmony revive you!
Let the whole place renew you!

Gotta love those rosy skies

Go! Beyond the devouring twilight,
Time shall say the ruins of yester nights
Sojourn to rest……… O dear sunset on the mist of sea
Shall I stride where winds will take my feet

Od dear sunset on the mist of the sea…

Yet………shall I build pillars
Imprinting goodwill on clouds and trees
Go! Bravely beyond sunset O dear
Go! Not worrying darkness on fields

(Post byline, visible on /home/ listing: "Posted on March 23, 2026March 31, 2026 by Andres" — "Posted in Biodiversity Conservation")

---

## PAGE: https://oceanforestecolodge.com/2025/12/12/conservation-adventures-at-the-epicenter-of-botanical-diversity/ (post)

Title: Conservation Adventures at the Epicenter of Botanical Diversity…

In the early 90’s I met Casimiro Mamallacta Mamallacta, a wholehearted Kichwa elder and traditional adept from the outskirts of Archidona. I wrote about Taita Casimiro and some of the experiences shared and learned from this happy camper in chapter 8, “Eyebrows of the Andes,” in my book Rainforest Medicine – Preserving Indigenous Science and Biological Diversity in the Upper Amazon. Between the years 1990-1994 we focused our efforts, in a way much like placing a magnifying glass in the sun to concentrate a beam of energy, into an inspired focus, capable of ensuring the ecological integrity of a place of great environmental and culture importance. Cordillera Napo-Galeras, not just an isolated limestone massif rising up from the lowland Amazon 80 kilometers east of the Andes. Not just a place rich in endemic species at the epicenter of botanical diversity. Yet as well a place enshrouded in profound ancestral belief among the region’s Indigenous peoples; most particularly among the community wisdom keepers, as a holy site with mythic connotations attesting to the veracity of the great deluge, while endorsing premonitions of yet another apocalypse.

### (sidebar on this page — old theme layout)
Recent Posts
The Rainforest Ocean Setting
Feb 19th – 18th Anniversary
Sunsets Supreme

Categories
Biodiversity Conservation
Clothing
Cocktails
Cultural Education
Derivative
Drinks
Health
Mixtures
Rainforest Ocean Setting
Relax
Uncategorized
Vacation
Yoga

---

## PAGE: https://oceanforestecolodge.com/home/ (title "Home - Ocean Forest Ecolodge")

Not the real homepage — it is a blog-post listing. Currently renders the "SUNSETS SUPREME" post in full (headings uppercased by CSS), with byline `Posted on March 23, 2026March 31, 2026 by Andres` and footer `Posted in Biodiversity Conservation`. Copy identical to /2026/03/23/sunsets-supreme/ above.

---

## SITEMAP

- https://www.oceanforestecolodge.com/sitemaps.xml (both /sitemap.xml and /sitemap_index.xml redirect here) → 3 child sitemaps
- page-sitemap1.xml — 14 URLs: `/`, `/accommodations/`, `/about-us/`, `/experiences-tours/`, `/ecolodge/`, `/food-and-experiences/`, `/yoga/`, `/rainforest-ocean-setting/`, `/home/`, `/about/`, `/contact/`, `/services/`, `/blog/`, `/sample-page/`
- post-sitemap1.xml — 10 URLs: `/`, `/2026/03/23/sunsets-supreme/`, `/2026/03/31/feb-19th-18th-anniversary-2/`, `/2026/03/31/the-rainforest-ocean-setting/`, `/2025/12/12/conservation-adventures-at-the-epicenter-of-botanical-diversity/`, `/2025/10/30/drinks-of-innovation/`, `/2025/10/30/garments-you-like/`, `/2025/10/30/grooming-your-mind/`, `/2025/10/30/taste-of-comfort/`, `/2025/10/30/hello-world/`
- category-sitemap1.xml (not opened)

### Leftover theme-demo pages — DO NOT REBUILD (placeholder/lorem ipsum, not real copy)

- **https://oceanforestecolodge.com/contact/** — PopularFX demo: "Offices Near me / AUSTIN / 1, My Address, My Street, New York City, NY, USA / contact@domain.com / 8082812021" ×3 (AUSTIN, BOSTON, NEW YORK), "Write Us a Message", "SEND MESSAGE", "Proudly powered by WordPress | PopularFX Theme". No site nav/footer. **The real contact page is /about-us/.**
- **https://oceanforestecolodge.com/about/** — "01 - About Us / BEST PLACES TO ENJOY / DESTINATION TO VISIT" + lorem ipsum, fake trip prices (Venice $859, Paris $559, South Africa $959, San Francisco $359), fake testimonials (Aaron Finch, Lily Cornwell, Litzy Dorms).
- **https://oceanforestecolodge.com/services/** — "01 - Services / WHAT WE OFFER" + lorem ipsum service cards (Delicious Food, Game Room, Airport Taxi, Spa Salon, Breakfast) and lorem room names (PERSONAL PLACE, CLASSIC STAY, ROYAL STAY, CONVENIENT DROVE, OPEN ROOM, OUTDOOR CONDO).
- **https://oceanforestecolodge.com/blog/** — reachable but returned no text content (empty template). Footer tagline is lorem ipsum.
- `/sample-page/`, `/2025/10/30/drinks-of-innovation/`, `/2025/10/30/garments-you-like/`, `/2025/10/30/grooming-your-mind/`, `/2025/10/30/taste-of-comfort/`, `/2025/10/30/hello-world/` — WordPress/theme demo content, NOT VISITED (identified as demo from sitemap dates + the demo categories list).

### Pages requested but not present on the site
- `/arriving/` → does not exist; the "Arriving" nav item points to `/ecolodge/`
- `/tours/` → does not exist; nav "Tours" points to `/experiences-tours/`
- `/dining/` → does not exist; nav "Dining" points to `/food-and-experiences/`
- `/stories/` → does not exist; nav "Stories" is `href="#"` (dead) and its three submenu items are plain text, not links. The nearest real content is the 4 posts above.

---

## SITE-WIDE COOKIE BANNER (CookieAdmin plugin boilerplate, appears on every page — not site copy)

We respect your privacy
Cookies help us improve your experience, deliver personalized content, and analyze traffic. You can choose which cookies to allow by clicking Customize. Click Accept All to consent or Reject All to decline non-essential cookies.
Customize | Reject All | Accept All | Powered by

Personalize Your Cookie Preferences
We use cookies to ensure smooth navigation and enable essential site functions. You can view detailed information about each cookie category below.
Cookies marked as Necessary are stored in your browser because they are essential for basic site functionality. These cookies do not require your consent under GDPR.
We also use third-party cookies to analyze site usage, remember your preferences, and deliver relevant content and ads. These will only be activated with your consent. You can choose to enable or disable these cookies, but please note that turning off some types may affect your browsing experience.
Necessary Cookies — Always Active — Necessary cookies enable essential site features like secure log-ins and consent preference adjustments. They do not store personal data.
Functional Cookies — Functional cookies support features like content sharing on social media, collecting feedback, and enabling third-party tools.
Analytical Cookies — Analytical cookies track visitor interactions, providing insights on metrics like visitor count, bounce rate, and traffic sources.
Advertisement Cookies — Advertisement cookies deliver personalized ads based on your previous visits and analyze the effectiveness of ad campaigns.
Unclassified Cookies — Unclassified cookies are cookies that we are in the process of classifying, together with the providers of individual cookies.
Reject All | Save Preferences | Accept All

Also site-wide: `Scroll to Top`, and a `Re-consent` floating button.
