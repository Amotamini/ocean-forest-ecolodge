/* ============================================================================
   Ocean Forest Ecolodge — SHARED SECTIONS
   ----------------------------------------------------------------------------
   Two blocks used identically by index.html (/) and retreats.html (/retreats):

     <div data-shared="tours"></div>       → Ocean / Rainforest tour tabs
     <div data-shared="logistics"></div>   → three-row arrival accordion

   Edit the copy or the numbers ONCE here and both pages change.

   COPY SOURCES (nothing here is invented):
     · Tour names + descriptions ....... source-copy/org-copy.md  PAGE: /activities/
     · Arrival texture ................. source-copy/com-copy.md  PAGE: /ecolodge/
                                         source-copy/org-copy.md  PAGE: /arriving/
     · Arrival prices / hours / seasons  specs/of-main-page.md §3 Contracts
                                         (client-supplied finals, Mehdi 2026-07-30 —
                                         these override every contradicting figure
                                         in com-copy.md)
     · URLs ............................ specs/of-main-page.md §3 "Key URLs (exact)"

   Media: every photo slot uses the labelled-placeholder pattern from the
   codebase — a frame naming the exact file it is waiting for. Drop the file
   into /media with that name and it appears. No code change needed.
   ========================================================================== */

(function () {
  'use strict';

  /* ── EXACT URLS ─────────────────────────────────────────────────────────── */

  var WHATSAPP = 'https://wa.me/50687379416';
  var WETRAVEL = 'https://www.wetravel.com/trips/';

  var TRIP = {
    sirena:      WETRAVEL + 'corcovado-national-park-sirena-station-ocean-forest-ecolodge-75443139',
    sanPedrillo: WETRAVEL + 'corcovado-national-park-san-pedrillo-station-ocean-forest-ecolodge-28113992',
    snorkel:     WETRAVEL + 'cano-island-snorkelling-tour-ocean-forest-ecolodge-69074848',
    diving:      WETRAVEL + 'cano-island-diving-tour-ocean-forest-ecolodge-22781271',
    dolphin:     WETRAVEL + 'dolphin-whales-encounter-ocean-forest-ecolodge-57401510'
  };

  /* ── TOURS ──────────────────────────────────────────────────────────────
     5 Ocean Discovery + 6 Rainforest Discovery, in the spec's order.

     PHOTOGRAPHS (of-v2-revisions.md C16). The slider used to assume four
     photographs per tour and render four labelled placeholders whether or
     not the files existed, so every tour showed an empty frame. It is now
     driven by TOUR_PHOTOS below: the real files the client's own site has,
     one entry per tour. A tour with one photograph shows one photograph and
     no dots. Nothing is padded out with a lookalike to fill a frame; a tour
     with no entry here falls back to the labelled placeholder, which is the
     honest state, not a bug.

     Every file below was pulled from oceanforestecolodge.com by
     fetch-v2-experiences-images.sh and is that tour's own named photograph.
     ---------------------------------------------------------------------- */

  var TOUR_PHOTOS = {
    'cano-island':               ['experiences/tour-cano-island-01.webp'],
    'scuba-diving-cano-island':  ['experiences/tour-scuba-diving-cano-island-01.webp'],
    'snorkeling-cano-island':    ['experiences/tour-snorkeling-cano-island-01.webp'],
    'dolphin-whale-encounters':  ['experiences/tour-dolphin-whale-encounters-01.webp'],
    'surf-tour-rio-claro':       ['experiences/tour-surf-tour-rio-claro-01.webp'],
    'corcovado-national-park':   ['experiences/tour-corcovado-national-park-01.webp'],
    'corcovado-sirena':          ['experiences/tour-corcovado-sirena-01.webp'],
    'corcovado-san-pedrillo':    ['experiences/tour-corcovado-san-pedrillo-01.webp'],
    'goddess-jacuzzi':           ['experiences/tour-goddess-jacuzzi-01.webp'],
    'white-hawk-nature-trail':   ['experiences/tour-white-hawk-nature-trail-01.webp'],
    'rio-claro':                 ['experiences/tour-rio-claro-01.webp']
  };

  var TOURS = {
    ocean: [
      {
        slug: 'cano-island',
        pill: 'Caño Island',
        name: 'The Island, Caño Island',
        meta: '40-minute boat ride',
        body: [
          'Caño Island can be seen right in front of Ocean Forest Ecolodge, from where it can be easily reached by a 40-minute boat ride. The Caño Island, known among the local indigenous Brunka people as “The Floating Butterfly,” is a mysterious and beautiful island that can be seen as if “floating” amidst the pristine royal blue sea directly before the lodge. The island was declared a marine reserve in 1976, it is 790 acres in size and protects an oceanic region spanning an area over 17,000 acres. The vivid blue waters surrounding the island are abundant with oceanic life.',
          'Archeology at Caño Island: The majestic Caño Island was once an important ceremonial center and burial site of the ancient oceanic navigators of the Diquis civilization. Today, remains of rock mortars and one ancient petro-sphere testify the significance of this unique archaeological site. As the trails on the island have been closed by the park service, only snorkeling and scuba diving are currently allowed.'
        ],
        ctas: [
          { label: 'Book snorkeling', href: TRIP.snorkel, kind: 'solid' },
          { label: 'Book diving',     href: TRIP.diving,  kind: 'ghost' }
        ]
      },
      {
        slug: 'scuba-diving-cano-island',
        pill: 'Scuba Diving',
        name: 'Scuba Diving at Caño Island',
        lede: 'The most epic scuba diving near mainland Costa Rica',
        meta: 'Departs at 7:00 AM, returns by 1 PM for lunch · Includes equipment and certified PADI guide · 40 min boat ride',
        body: [
          'Caño Island is considered among the best diving sites along the Costa Rican mainland Pacific coast. Divers will certainly encounter both pelagic (open ocean) and Pacific reef fish during their outings. Many species found at the Caño reef also dwell by the Galapagos Islands, such as dog snapper, barracuda and dolphin fish! In addition, two-meter long white tipped reef sharks are common sighting. Manta rays and lesser-devil rays are often seen leaping from the water. Divers especially enjoy meeting the free-swimming moray eels, which can reach a length of up to two meters! Finally, marine turtles, such as the juvenile Hawksbill sea turtle, feed in the area, and oftentimes accompany divers in their underwater adventures!'
        ],
        ctas: [ { label: 'Book this tour', href: TRIP.diving, kind: 'solid' } ]
      },
      {
        slug: 'snorkeling-cano-island',
        pill: 'Snorkeling',
        name: 'Snorkeling at Caño Island',
        lede: 'The most epic snorkeling near mainland Costa Rica where coral shelves harbor rich oceanic life.',
        meta: 'Departs at 7:30 AM, returns by 1 PM for lunch · Includes equipment and qualified guide · 40 min boat ride',
        body: [
          'At Caño Island you can see many kinds of ocean life, often times dolphins and lesser devil rays can be seen jumping out of the water. Whales too are often seen breaching, during the months of June through December. A snorkeling trip here often reveals many kinds of ocean life, such as big eye jacks flashing their silvery colors. Gorgeous angel fish and purple and green parrot fish are common sighting. Many more fish are seen such as, the crocodile needlefish, puffer and cornet fishes, Moorish idols, and other aquatic animals such as sea turtles, eagle rays, moray eels and white tip sharks. Your skilled naturalist guide will lead you to the best snorkeling locations.'
        ],
        ctas: [ { label: 'Book this tour', href: TRIP.snorkel, kind: 'solid' } ]
      },
      {
        slug: 'dolphin-whale-encounters',
        pill: 'Dolphins & Whales',
        name: 'Dolphin and Whale Encounters',
        lede: 'Get a unique, close up view of these most majestic giants of the sea.',
        meta: 'Departs at 8 AM · Includes lunch · returns between 1 and 2:30PM',
        body: [
          'The waters of the Osa Peninsula are unique, being that two distinct populations of Humpback Whales arrive to breed and raise their calves. From July to September arrive the southern populations, they have white on the underside of their flippers and from October through December arrive the northern population of Humpback whales. The Costa Rican dome, a region located some distance from shore, has been mentioned by National Geographic magazine as one of the most important waters the world-over for whale populations of many species. Whale watching is seasonal, from July to December. Pseudo Orcas and Pilot Whales are full-time residents of these waters. Dolphins such as the Pacific spotted, bottlenose and spinners also call these waters home.'
        ],
        ctas: [ { label: 'Book this tour', href: TRIP.dolphin, kind: 'solid' } ]
      },
      {
        slug: 'surf-tour-rio-claro',
        pill: 'Surf at Rio Claro',
        name: 'Surf Tour at Rio Claro',
        lede: 'A point break in a gorgeous and remote location. Great for experiences and beginning surfers.',
        meta: 'Half day tour · Includes board and instructor',
        body: [
          'A 45-minute walks north of the lodge is the amazing Rio Claro surf break. Here you’ll find a slow yet powerful and well-formed wave, great for all types of surfing. The best times to catch waves here are at mid tides.',
          'The primary rainforest comes down right to the beach next to Rio Claro, and the gorgeous clear green river is perfect for washing off and swimming after the surf. This trip needs to be planned with the tides, this because the waves are best for surfing during the middle tides. This is a half day tour and is possible only when the surf is up!'
        ],
        ctas: [ { label: 'Ask us on WhatsApp', href: WHATSAPP, kind: 'ghost' } ]
      }
    ],

    forest: [
      {
        slug: 'corcovado-national-park',
        pill: 'Corcovado National Park',
        name: 'Corcovado National Park',
        body: [
          'Corcovado is the crown jewel of Costa Rica’s National Parks. Known as well as the “Little Amazon by the Ocean!” Rainforest covered mountains, beautiful rivers, cascading waterfalls, and lagoons, straddling a sparkling Pacific Ocean, are reason why Corcovado is considered by National Geographic to be among the top ten nature destinations on Earth! The National Park protects over 120,000 acres of lowland tropical rainforest, and is surrounded by the Golfo Dulce forest reserve, that is even larger. Home to the mighty “Mother of the Rainforest” herself, the Panthera onca, the elusive, yet ever potent forest master, the spotted jaguar. Not to mention five other species of wild cats, alongside a rare abundance of wildlife, such as troops of white lipped and collared peccaries, all four species of Costa Rican monkeys, such as Howler, White Faced, Spider and Squirrel monkeys.',
          'There are three primary destinations we recommend visiting in Corcovado National Park. These being, Sirena Ranger Station, San Pedrillo Ranger Station and Llorona wilderness area. Each are unique and different in their own way and highlight the diversity of this natural wonder.'
        ],
        ctas: [ { label: 'Ask us on WhatsApp', href: WHATSAPP, kind: 'ghost' } ]
      },
      {
        slug: 'corcovado-sirena',
        pill: 'Sirena Ranger Station',
        name: 'Corcovado National Park, Sirena Ranger Station',
        lede: 'Among the most remote and wildlife filled spots in Costa Rica, accessed only by boat.',
        meta: 'Departs at 6:30 AM back at the lodge by 3:30 PM · 50-minute boat ride, then an epic wildlife observing walk · For 8 or more our own specialized guides will lead the tour',
        body: [
          'Sirena is located between two fertile rivers where multitudes of animals make their home. Here the rainforest is in its full glory, each and every visit to Sirena is unforgettable rainforest and wildlife experience. One frequently encounters tapir, or troops of either of the two Costa Rican species of peccary, or any or all of the four Costa Rican monkey species, and a whole lot more! Sirena is the home to many species of forest cats as well, on several trips we have had the good fortune if encountering the beautiful mountain lion, know locally as the puma or león.',
          'After an early morning breakfast at 6:00 am, we walk to San Josecito beach, and hop a panga for a one-hour boat ride to Sirena. Following the coastline to the south, we experience the majesty of the pristine, lush wildlife. We pass the Llorona waterfall, seen cascading over 100 feet to the beach. Here often pods of Pan-tropical Spotted Dolphins can be seen alongside flocks of ocean birds. Depending on the stamina of the group, we have the option of walking one or two trails. We share a picnic lunch, explore the area, and return.'
        ],
        ctas: [ { label: 'Book this tour', href: TRIP.sirena, kind: 'solid' } ]
      },
      {
        slug: 'corcovado-san-pedrillo',
        pill: 'San Pedrillo',
        name: 'Corcovado National Park, San Pedrillo',
        lede: 'Find here the tallest trees in the new world tropics reaching up over 190 feet!',
        meta: 'Departs at 6:30 AM back at the lodge by 3:30 PM · 20-minute boat ride, then rainforest walk · Walk distance: 5 - 10 km (3 to 6 miles)',
        body: [
          'The towering rainforest along the San Pedrillo waterfall hike, boasts the highest canopy in the Neo tropics, with trees reaching heights over 190 feet. The trail winds down to a large waterfall then follows the creek to the ocean. Depending on the stamina of the group, we have the option of walking one or two trails. The second trail is to the Rio Pargo. The trail passes through beautiful gallery rainforest, where some of the most giant trees in Costa Rica live.',
          'After an early morning breakfast at 6:00 am, we walk to San Josecito beach, and hop on a panga for a 20-minute boat ride to San Pedrillo ranger station. We share a picnic lunch, explore the area. Departure from the park is at 2:30 PM. For those who prefer a shorter boat ride, San Pedrillo is your option.'
        ],
        ctas: [ { label: 'Book this tour', href: TRIP.sanPedrillo, kind: 'solid' } ]
      },
      {
        slug: 'goddess-jacuzzi',
        pill: 'Goddess Jacuzzi',
        name: 'Goddess Jacuzzi',
        lede: 'Water gushes in from all sides, to arrive there the walk isthrough towering rainforest.',
        meta: '9 AM to 4 PM · picnic lunch at the pools · Includes round trip taxi fare',
        body: [
          'This rainforest and waterfall excursion adventures to the most beautiful waterfalls and pools in the Rio Claro headwaters. This destination leads to where clear pure water cascades and gorgeous bubble filled pools abound. Just upstream two gorgeous waterfalls splash into a large swimming hole in the river and are magnificent for the more adventurous who wish to jump off about 15 feet into the pool. You will explore superb primary rainforest along this trail. This secret location is a destination and trail not commonly taken.',
          'We depart after breakfast for an approximate 20-minute walk along the beach to the local school house. A 4 x 4 jeep taxi will then take us to the country village of Los Planes. From Los Planes we continue by foot to trek along paths leading to primary rainforest while we continue to Rio Claro’s Goddess Jacuzzi at the river’s headwaters. We will find a beautiful spot for a picnic lunch and return to the lodge at approximately 4 pm.'
        ],
        ctas: [ { label: 'Ask us on WhatsApp', href: WHATSAPP, kind: 'ghost' } ]
      },

      /* Added per specs/of-v2-experiences.md §3: the .org "At the Lodge" pair
         folded into Rainforest Discovery. Both are un-bookable (WhatsApp CTA).
         Rio Claro deliberately carries the SAME body as White Hawk, reproducing
         the known source-site duplicate-copy bug on /activities/ verbatim rather
         than silently fixing it. Em/en dashes from source removed per the V2
         house rule (no em or en dashes in UI copy). */
      {
        slug: 'white-hawk-nature-trail',
        pill: 'White Hawk Trail',
        name: 'White Hawk Nature Trail',
        meta: '3 to 4 hours · 9 AM to 12:30 PM or 2 to 5:30 PM',
        body: [
          'Winding up behind the ecolodge is an easy to follow trail nature trail. The trail climbs up to breathtaking ocean vistas, as it winds through the permaculture gardens and fruit tree orchards and enters the rainforest. This trail reveals panoramic views of San Josecito Beach, the majestic Pacific Ocean and the mysterious Caño Island, and the ridge top lookout is a great spot to watch the sunset. Bring a flash light for the walk back down! At the top of the hill an ethnobotanical garden has been planted and is being cared for. There is a meditation lodge there and hammocks make an epic place to soak up the deeply nourishing peace found here. Bird watchers will love an early morning walk up the hill, as myriad colorful birds can be seen, such as various species of tanagers, red-legged honeycreeper and other small colorful birds, Ant birds, various species of woodpeckers, jacamar, cuckoo bird, toucans, parrots, scarlet macaws and the elegant white hawk, among so many more. Wildlife that can be seen on this walk are white faced capuchin, howler and spider monkeys, agouti, coati, and often times the elusive tayra. The trail returns down a beautiful rainforest covered valley.'
        ],
        ctas: [ { label: 'Ask us on WhatsApp', href: WHATSAPP, kind: 'ghost' } ]
      },
      {
        slug: 'rio-claro',
        pill: 'Rio Claro',
        name: 'Rio Claro',
        meta: '3 to 4 hours · 9 AM to 12:30 PM or 2 to 5:30 PM',
        body: [
          /* Identical to White Hawk on purpose — the source-site duplicate bug. */
          'Winding up behind the ecolodge is an easy to follow trail nature trail. The trail climbs up to breathtaking ocean vistas, as it winds through the permaculture gardens and fruit tree orchards and enters the rainforest. This trail reveals panoramic views of San Josecito Beach, the majestic Pacific Ocean and the mysterious Caño Island, and the ridge top lookout is a great spot to watch the sunset. Bring a flash light for the walk back down! At the top of the hill an ethnobotanical garden has been planted and is being cared for. There is a meditation lodge there and hammocks make an epic place to soak up the deeply nourishing peace found here. Bird watchers will love an early morning walk up the hill, as myriad colorful birds can be seen, such as various species of tanagers, red-legged honeycreeper and other small colorful birds, Ant birds, various species of woodpeckers, jacamar, cuckoo bird, toucans, parrots, scarlet macaws and the elegant white hawk, among so many more. Wildlife that can be seen on this walk are white faced capuchin, howler and spider monkeys, agouti, coati, and often times the elusive tayra. The trail returns down a beautiful rainforest covered valley.'
        ],
        ctas: [ { label: 'Ask us on WhatsApp', href: WHATSAPP, kind: 'ghost' } ]
      }
    ]
  };

  /* ── LOGISTICS ──────────────────────────────────────────────────────────
     Prices / hours / seasons below are the CLIENT-SUPPLIED FINALS from the
     spec Contracts. Do not "correct" them from com-copy.md — com-copy.md
     contradicts itself ($60 vs $70 taxi, 5h vs 8h bus) and the spec wins.
     ---------------------------------------------------------------------- */

  var LOGISTICS = [
    {
      n: '01',
      walk: '<b>Boat from Sierpe</b> &rarr; you land at San Josecito <b>Beach</b> &rarr; walk <b>SOUTH</b> 20 minutes, ocean on your <b>right</b>.',
      photo: 'experiences/activity-sierpe-mangrove-tour-01.jpg',
      photoNote: 'The Sierpe river and mangroves, on the boat run to San Josecito',
      icon: 'boat',
      title: 'By boat',
      season: 'All seasons',
      seasonKind: 'all',
      recommended: true,
      summary: 'Get to Sierpe: private taxi <b>$70</b> (~6 h from San José) or public bus <b>$20</b> (~7 h). Boat Sierpe → San Josecito beach: <b>$30</b> at 11:30 am or <b>$40</b> at 4:00 pm, about 1.5 hours. Then a 20-minute walk along the beach.',
      body: [
        'Arriving by boat is not only the most affordable and effortless way to reach us year-round, but it’s especially delightful during the green season (May to November). Simply sit back, relax, and let the stunning river and ocean scenery unfold as your journey becomes an unforgettable tour in itself.',
        'Your adventure to Ocean Forest Ecolodge begins with a breathtaking 1.5-hour boat ride from Sierpe, an unforgettable wildlife tour through Central America’s largest mangrove forest. Glide along the tranquil Sierpe River, spot monkeys, caimans, crocodiles, vibrant birds, and more, before the river opens to the Pacific Ocean for a thrilling coastal ride to San Josecito Beach, one of the area’s most stunning shores.',
        'Arrive 30 minutes early to secure your spot. Pack light (a backpack with max 15 kg / 33 lbs), protect electronics in waterproof bags, and wear water sandals for the beach landing. Find Sierpe Dock next to Donde Jorge Restaurant, and always tell the boat operator to drop you at San Josecito Beach for Ocean Forest Ecolodge.'
      ]
    },
    {
      n: '02',
      walk: '<b>Car, taxi or plane</b> &rarr; you are dropped at San Josecito <b>School</b> &rarr; walk <b>NORTH</b> 20 minutes, ocean on your <b>left</b>.',
      photo: 'arriving/arrival-gate.jpg',
      photoNote: 'The road in to San Josecito',
      icon: 'car',
      title: 'By car',
      season: 'Dry season only · Dec to Apr',
      seasonKind: 'dry',
      recommended: false,
      summary: '<b>4×4 required</b>, two shallow river crossings. Park at San Josecito Rural School (secure), then the 20-minute beach walk.',
      body: [
        'A 4×4 vehicle is essential. Rural roads can be unpredictable and may not be accurately shown on Google Maps or Waze.',
        'You will cross two shallow rivers. Always check weather and rainfall, as heavy rain can make crossings impassable.',
        'You can leave your car at San Josecito Rural School (secure parking area). From there, enjoy a picturesque 20-minute walk north along the beach to the lodge. Please share your estimated arrival time so a staff member can meet you and assist with luggage.'
      ]
    },
    {
      n: '03',
      walk: '<b>Car, taxi or plane</b> &rarr; you are dropped at San Josecito <b>School</b> &rarr; walk <b>NORTH</b> 20 minutes, ocean on your <b>left</b>.',
      photo: 'arriving/beach-walk.jpg',
      photoNote: 'The last stretch: the walk along San Josecito Beach',
      icon: 'air',
      title: 'By air',
      season: 'All seasons',
      seasonKind: 'all',
      recommended: false,
      summary: 'Fly San José → Drake Bay (~45 min), then a 4×4 taxi <b>$60</b> per vehicle, ~45 min.',
      body: [
        'We recommend booking with SANSA Airline at least 1 month in advance. Our staff can help booking your flights, request help to eli@oceanforest.org',
        'Send us your itinerary so we can arrange your ground transfer. Drake Bay Airport is rural, and taxis are not readily available on site. Kindly confirm your taxi at least 48 hours before arrival. We will book a 4×4 taxi for you. Payment is made directly to the driver.',
        'From San Josecito Rural School, it’s a scenic 20-minute walk to the lodge. Please share your estimated arrival time so our staff can meet you and assist with luggage.'
      ]
    }
  ];


  /* ── COMPLEMENTARY ACTIVITIES ─────────────────────────────────────────────
     THE single source for the eight activities. They were hand-written inside
     experiences.html until 2026-08-09; Retreats then wanted them too, and the
     choice was to copy the copy or move it. Copying is how two pages drift
     apart, so it moved here. Experiences builds its accordion from this list,
     and Retreats shows it as a third tab beside Rainforest and Ocean
     Discovery. Edit an activity once, both pages change.

     No booking links: these are included with a stay and arranged on arrival,
     which is what `note` says on every one of them. */
  var ACTIVITIES = [
    {
      slug: "botanical-garden",
      name: "Botanical Garden",
      photo: "experiences/activity-botanical-garden-01.jpg",
      photoNote: "The ethnobotanical garden at Ocean Forest Ecolodge",
      note: "Book this one with us when you arrive.",
      body: [
        "Discover our Ethnobotanical Walk, a self-guided journey through Ocean Forest Ecolodge's living classroom of permaculture and rainforest wisdom. Wander lush gardens brimming with rare ancestral plants, learning their medicinal, edible, and sacred uses through captivating stories, myths, and hands-on tasting and preparation. Engage your senses as you smell, touch, and sip herbal infusions, exploring a vibrant collection that also nourishes our kitchen. Reconnect with the profound healing wisdom of the jungle and let nature be your ultimate teacher."
      ]
    },
    {
      slug: "bat-cave",
      name: "Bat Cave",
      photo: "experiences/activity-bat-cave-01.jpg",
      photoNote: "The Bat Cave walk. Neither of the client sites has a photograph of this one",
      note: "Book this one with us when you arrive.",
      body: [
        "Set out from Ocean Forest Ecolodge on a coastal walk to our “Bat Cave”, where, at dusk, thousands of bats stream into the sky, a mesmerizing natural spectacle. Wander past tide pools and coral reefs at low tide, with sweeping views of the rainforest-cloaked peninsula and Caño Island shimmering offshore. Return along the beach as the sun sets and ocean breezes wash over you. Simple, wild, unforgettable. Add the Bat Cave walk to your must-do Osa adventures."
      ]
    },
    {
      slug: "river-walk",
      name: "River Walk",
      photo: "experiences/activity-river-walk-01.webp",
      photoNote: "Rio Claro, where the River Walk ends",
      note: "Book this one with us when you arrive.",
      body: [
        "Follow a wild, breathtaking coastline from Ocean Forest Ecolodge to Río Claro, a jade-green river bordered by towering trees and a pristine beach just 45 minutes away. Pause at the dramatic Blow Hole, then swim in crystal pools, unwind on golden sand, or float in the river's fresh, clear water. Join a gentle canoe or boat ride to explore the jungle-lined river, spot birds and monkeys, and discover hidden waterfalls, perfect for photos and a picnic. Ideal for families with children, Río Claro is pure paradise and an unmissable day adventure."
      ]
    },
    {
      slug: "drake-bay-walking",
      name: "Drake Bay Walking",
      photo: "experiences/activity-drake-bay-walking-01.jpg",
      photoNote: "The coastal walk to Drake Bay. Neither of the client sites has a photograph of this one",
      note: "Book this one with us when you arrive.",
      body: [
        "Embark on a breathtaking 3-hour coastal walk from Ocean Forest Ecolodge to the charming town of Drake Bay, an unforgettable journey through rainforest-cloaked cliffs, hidden coves, and more than ten pristine beaches along the South Pacific coast. Stop for a refreshing swim in Río Claro or a rest under palm shade before reaching Drake Bay, where local cafés, shops, and friendly smiles await. Enjoy lunch and a tropical fruit juice, then return by 4x4 taxi or by boat along the scenic shoreline. A true adventure for nature lovers, this is the most beautiful way to experience the wild soul of the Osa Peninsula."
      ]
    },
    {
      slug: "horse-riding",
      name: "Horse Riding",
      photo: "experiences/activity-horse-riding-01.webp",
      photoNote: "Horseback riding near Corcovado",
      note: "Book this one with us when you arrive.",
      body: [
        "Saddle up for our Half-Day Horseback Adventure, an unforgettable way to experience the wild beauty surrounding Corcovado National Park. Guided by expert local horsemen and matched with well-trained horses, riders of all levels follow scenic coastal trails, venture along Río Claro's jungle paths, and traverse countryside vistas with chances to spot birds, monkeys, and lush rainforest life. Pause for a refreshing swim in a crystal-clear river before a picturesque return to the lodge."
      ]
    },
    {
      slug: "night-tour",
      name: "Night Tour",
      photo: "experiences/activity-night-tour-01.webp",
      photoNote: "The rainforest after dark on the Night Tour",
      note: "Book this one with us when you arrive.",
      body: [
        "Step into the rainforest after dark on our Night Tour, an enchanting two-hour adventure where the jungle comes alive. Follow our naturalist guide along the beach, then slip beneath the canopy to seek glass frogs, colorful tree frogs, curious reptiles, and nocturnal insects as the forest sings around you. Guided, safe, and unforgettable, this immersive experience reveals Corcovado's magic in a whole new light. Book your Night Tour with Ocean Forest Ecolodge and meet the jungle at its most mysterious."
      ]
    },
    {
      slug: "sierpe-mangrove-tour",
      name: "Sierpe Mangrove Tour",
      photo: "experiences/activity-sierpe-mangrove-tour-01.jpg",
      photoNote: "The Sierpe River mangroves",
      note: "Book this one with us when you arrive.",
      body: [
        "Discover the hidden paradise of the Sierpe River mangroves, Central America's largest and most pristine mangrove system, with our trusted local tour operators. This 3-hour guided boat excursion takes you through a breathtaking ecosystem teeming with wildlife. Spot three species of monkeys, sloths, crocodiles, caimans, and over 150 bird species, including scarlet macaws. Our expert bilingual guides know every secret spot, ensuring incredible viewing and photo opportunities from our comfortable, shaded vessel. Ideal for all ages, this tour offers a serene yet exhilarating look into one of Costa Rica's most vital and beautiful natural wonders, a must-do experience from Ocean Forest Ecolodge."
      ]
    },
    {
      slug: "waterfall-hiking",
      name: "Waterfall Hiking",
      photo: "experiences/activity-waterfall-hiking-01.webp",
      photoNote: "Goddess Jacuzzi, one of the two falls on the waterfall hike",
      note: "Book this one with us when you arrive.",
      body: [
        "Discover two hidden gems, Goddess Jacuzzi and Cocoterra Waterfall, on a guided rainforest adventure from Ocean Forest Ecolodge. Travel by 4x4 to the trailhead, then hike through towering primary forest to crystal pools and cascading falls perfect for a refreshing swim; at Río Claro's headwaters, natural “jacuzzis” bubble over smooth rock, and adventurous guests can leap into deep swimming holes. Each waterfall is a separate day trip; our team provides round-trip transport arrangements and a picnic by the pools. Ask our staff for details and let us plan your unforgettable waterfall escape."
      ]
    }
  ];

  /* ── STYLE ──────────────────────────────────────────────────────────────
     Injected once, scoped to .sh-* so it cannot collide with either page.
     Uses the shared CSS custom properties both pages define, with fallbacks
     so the block still renders correctly if a variable is missing.
     ---------------------------------------------------------------------- */

  var CSS = [
    '.sh{--sh-grad:var(--gradient-ocean-lime,linear-gradient(90deg,#3C88A4,#53A871,#DFDF5B));',
    '  --sh-ink:var(--ink,#0e1310);--sh-ink2:var(--ink-2,#141a16);',
    '  --sh-mist:var(--mist,#e8ede4);--sh-white:var(--white,#fafaf8);',
    '  --sh-dim:var(--dim,rgba(232,237,228,.62));--sh-line:var(--hairline,rgba(232,237,228,.14));',
    '  --sh-teal:var(--teal,#2AADA8);--sh-teal-light:var(--teal-light,#3DCFD0);',
    '  --sh-serif:var(--serif,Georgia,serif);--sh-sans:var(--sans,system-ui,sans-serif);',
    '  --sh-mono:var(--mono,monospace);color:var(--sh-mist);font-family:var(--sh-sans)}',

    '.sh-head .sh-eyebrow{font-family:var(--sh-mono);font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;color:var(--sh-teal-light);display:block;margin-bottom:14px}',
    '.sh-head h2{font-family:var(--sh-serif);font-weight:300;line-height:1.1;font-size:clamp(2rem,4.4vw,3.2rem);color:var(--sh-white);margin:0}',
    '.sh-grad-text{background:var(--sh-grad);-webkit-background-clip:text;background-clip:text;color:transparent}',
    '.sh-bar{height:3px;width:72px;background:var(--sh-grad);border:0;margin:22px 0 26px;border-radius:2px}',
    '.sh-lead{max-width:640px;color:var(--sh-dim);font-size:1.02rem;margin:0 0 4px;font-weight:300}',

    /* placeholders — same language as the codebase pattern */
    '.sh-ph{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:20px;text-align:center;',
    '  background:repeating-linear-gradient(45deg,rgba(42,173,168,.06) 0 12px,rgba(42,173,168,.11) 12px 24px);border:1px dashed rgba(42,173,168,.55);border-radius:6px}',
    '.sh-ph-label{font-family:var(--sh-mono);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sh-teal-light)}',
    '.sh-ph-file{font-family:var(--sh-mono);font-size:.72rem;color:var(--sh-mist);word-break:break-all}',
    '.sh-ph-note{font-family:var(--sh-mono);font-size:.58rem;color:var(--sh-dim)}',

    /* tabs */
    '.sh-tabs-wrap{display:flex;justify-content:center}',
    '.sh-ic{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;flex:0 0 auto;border:1px solid var(--sh-line);color:var(--sh-teal-light);margin-right:2px}',
    '.sh-ic svg{width:20px;height:20px}',
    '.sh-tabs{display:inline-flex;border:1px solid var(--sh-line);border-radius:26px;overflow:hidden;margin:8px 0 28px}',
    '.sh-tabs button{border:0;background:none;color:var(--sh-dim);font-family:var(--sh-mono);font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;padding:12px 26px;cursor:pointer}',
    '.sh-tabs button.on{background:var(--sh-grad);color:#0b1210;font-weight:700}',
    /* reviews — Google's own visual language, not the site's. A review card
       has to read as evidence from somewhere else; in Cormorant on a cream
       page it reads as copy we wrote. So: system sans, white card, Google's
       #fbbc04 stars and their four-colour mark. The section HEADING stays in
       the site's voice - it is ours. */
    '.rv-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:34px}',
    '@media (max-width:820px){.rv-grid{grid-template-columns:1fr}}',
    '.rv-card{margin:0;background:#fff;border:1px solid rgba(0,0,0,.09);border-radius:10px;padding:20px 22px 16px;',
    '  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;box-shadow:0 1px 2px rgba(0,0,0,.05)}',
    '.rv-top{display:flex;align-items:center;gap:12px}',
    '.rv-av{width:40px;height:40px;border-radius:50%;flex:0 0 auto;display:grid;place-items:center;',
    '  color:#fff;font-size:1.05rem;font-weight:500;line-height:1}',
    '.rv-who{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}',
    '.rv-who b{font-size:.92rem;font-weight:500;color:#202124;letter-spacing:0}',
    '.rv-meta{font-size:.78rem;color:#70757a;display:flex;align-items:center;gap:4px}',
    '.rv-g{width:13px;height:13px;display:inline-block;vertical-align:-2px}',
    '.rv-stars{display:flex;gap:1px;flex:0 0 auto}',
    '.rv-stars svg{width:15px;height:15px}',
    '.rv-trip{display:inline-block;margin-top:12px;font-size:.75rem;color:#70757a}',
    /* Six lines, then a real button. The full text is always in the DOM. */
    '.rv-text{margin:10px 0 0;font-size:.88rem;line-height:1.62;color:#3c4043;font-style:normal;',
    '  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:6;overflow:hidden}',
    '.rv-card.open .rv-text{-webkit-line-clamp:unset;overflow:visible}',
    '.rv-more{margin-top:8px;background:none;border:0;padding:0;cursor:pointer;font:inherit;',
    '  font-size:.82rem;color:#1a73e8}',
    '.rv-more:hover{text-decoration:underline}',
    '.rv-all{display:inline-flex;align-items:center;gap:8px;margin-top:26px;text-decoration:none;',
    '  font-family:var(--sh-mono);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;',
    '  color:var(--sh-teal-light);border:1px solid var(--sh-line);border-radius:24px;padding:11px 20px}',
    '.rv-all:hover{border-color:var(--sh-teal);color:var(--sh-white)}',
    /* The route photograph opens the shared lightbox, so it has to look like
       it can be opened and take a focus ring from the keyboard. */
    '.sh-acc-shot [data-gallery]{cursor:zoom-in;border-radius:6px;overflow:hidden}',
    '.sh-acc-shot [data-gallery] img{transition:transform .45s ease}',
    '.sh-acc-shot [data-gallery]:hover img{transform:scale(1.04)}',
    '.sh-acc-shot [data-gallery]:focus-visible{outline:2px solid var(--sh-teal);outline-offset:3px}',
    '@media (prefers-reduced-motion:reduce){.sh-acc-shot [data-gallery] img{transition:none}',
    '  .sh-acc-shot [data-gallery]:hover img{transform:none}}',
    '.sh-pills{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:30px}',
    '.sh-pill{border:1px solid var(--sh-line);background:none;color:var(--sh-dim);padding:9px 16px;border-radius:20px;font-size:.82rem;cursor:pointer;font-family:var(--sh-sans);font-weight:300}',
    '.sh-pill:hover{color:var(--sh-white)}',
    '.sh-pill.on{border-color:var(--sh-teal);color:var(--sh-white);background:rgba(42,173,168,.12)}',

    /* tour stage */
    '.sh-stage{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:40px;align-items:start}',
    '.sh-stage>*{min-width:0}',
    '.sh-stage .sh-ph{min-height:340px}',
    '.sh-dots{display:flex;gap:7px;margin-top:12px}',
    '.sh-dots i{width:7px;height:7px;border-radius:50%;background:rgba(232,237,228,.25)}',
    '.sh-dots i.on{background:var(--sh-teal-light)}',
    '.sh-info h3{font-family:var(--sh-serif);font-size:1.9rem;font-weight:300;margin:0 0 10px;color:var(--sh-white)}',
    '.sh-lede{font-family:var(--sh-serif);font-style:italic;font-size:1.15rem;color:var(--sh-mist);margin:0 0 14px}',
    '.sh-meta{font-family:var(--sh-mono);font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;color:var(--sh-teal-light);margin:0 0 16px;line-height:1.8}',
    '.sh-info p.sh-body{color:var(--sh-dim);font-size:.94rem;margin:0 0 14px;font-weight:300;line-height:1.75}',

    /* buttons */
    '.sh-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}',
    '.sh-cta{background:var(--sh-grad);color:#0b1210;font-weight:700;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;font-family:var(--sh-mono);padding:12px 24px;border-radius:24px;border:0;cursor:pointer;text-decoration:none;display:inline-block}',
    '.sh-cta.ghost{background:none;border:1px solid var(--sh-line);color:var(--sh-mist);font-weight:400}',
    '.sh-cta:hover{filter:brightness(1.08)}',
    '.sh-cta.ghost:hover{border-color:var(--sh-teal);color:var(--sh-white)}',

    /* accordion */
    '.sh-acc{border-top:1px solid var(--sh-line);margin-top:34px}',
    '.sh-acc-item{border-bottom:1px solid var(--sh-line)}',
    '.sh-acc-head{width:100%;background:none;border:0;color:var(--sh-mist);display:flex;align-items:center;gap:16px;padding:24px 4px;cursor:pointer;text-align:left;flex-wrap:wrap}',
    '.sh-acc-head .sh-n{font-family:var(--sh-mono);color:var(--sh-teal-light);font-size:.8rem}',
    '.sh-acc-head h3{font-family:var(--sh-serif);font-size:1.5rem;font-weight:400;flex:1;margin:0;color:var(--sh-white)}',
    '.sh-season{font-family:var(--sh-mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;padding:5px 12px;border-radius:14px;border:1px solid rgba(125,179,89,.5);color:#cfe3b8;white-space:nowrap}',
    '.sh-season.dry{border-color:rgba(223,223,91,.5);color:#e9e9a8}',
    '.sh-reco{font-family:var(--sh-mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:#0b1210;background:var(--sh-grad);padding:5px 12px;border-radius:14px;font-weight:700;white-space:nowrap}',
    '.sh-arrow{transition:transform .25s;color:var(--sh-dim)}',
    '.sh-acc-item.open .sh-arrow{transform:rotate(90deg)}',
    '.sh-acc-body{display:none;padding:0 4px 26px;color:var(--sh-dim);font-size:.93rem;max-width:720px;font-weight:300;line-height:1.8}',
    '.sh-acc-item.open .sh-acc-body{display:block}',
    '.sh-acc-body{max-width:none}',
    '.sh-acc-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:40px;align-items:start}',
    '.sh-acc-grid>*{min-width:0}',
    '.sh-acc-grid>div:first-child{max-width:720px}',
    /* The photograph fades on its outer edge, the same soft edge .media-fade */
    /* gives every other photograph on the site, so an opened route reads as  */
    /* part of the same family rather than a boxed thumbnail.                 */
    '.sh-acc-shot [data-media]{border-radius:6px;-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 12%,#000 100%);mask-image:linear-gradient(90deg,transparent 0%,#000 12%,#000 100%)}',
    '@media (max-width:860px){.sh-acc-grid{grid-template-columns:1fr;gap:24px}.sh-acc-shot{order:-1}',
    '  .sh-acc-shot [data-media]{-webkit-mask-image:none;mask-image:none}}',
    /* The direction line: the one sentence somebody actually needs on arrival */
    '.sh-walk{font-family:var(--sh-serif);font-style:italic;font-size:1.08rem;color:var(--sh-mist);line-height:1.6;margin:0 0 14px}',
    '.sh-walk b{font-style:normal;color:var(--sh-white);font-weight:600}',
    '.sh-acc-body p{margin:0 0 12px}',
    '.sh-acc-body b{color:var(--sh-mist);font-weight:500}',
    '.sh-sum{margin:0 0 16px!important;color:var(--sh-mist)}',

    /* light theme — variables come from body.light, these fix the fixed rgba() */
    'body.light .sh-ph{background:repeating-linear-gradient(45deg,rgba(22,112,126,.06) 0 12px,rgba(22,112,126,.12) 12px 24px);border-color:rgba(22,112,126,.5)}',
    'body.light .sh-dots i{background:rgba(20,26,22,.2)}',
    'body.light .sh-season{color:#3f6b2a;border-color:rgba(106,154,58,.5)}',
    'body.light .sh-season.dry{color:#8a7a1a;border-color:rgba(180,160,40,.55)}',
    'body.light .sh-pill.on{background:rgba(42,173,168,.1)}',

    '@media(max-width:820px){',
    '  .sh-stage{grid-template-columns:minmax(0,1fr);gap:26px}',
    '  .sh-tabs{display:flex;width:100%}',
    '  .sh-tabs button{flex:1;padding:12px 10px;font-size:.68rem}',
    '  .sh-acc-head h3{flex:1 1 100%;order:2}',
    '}'
  ].join('\n');

  function injectStyle() {
    if (document.getElementById('shared-sections-css')) return;
    var s = document.createElement('style');
    s.id = 'shared-sections-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ── HELPERS ────────────────────────────────────────────────────────────── */

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* A labelled media placeholder, identical in spirit to the codebase pattern:
     it names the exact file it is waiting for. */
  function phHTML(file, note, minHeight) {
    return '<div class="sh-ph"' + (minHeight ? ' style="min-height:' + minHeight + '"' : '') + '>' +
             '<span class="sh-ph-label">Photo to come</span>' +
             '<span class="sh-ph-file">media/' + esc(file) + '</span>' +
             (note ? '<span class="sh-ph-note">' + esc(note) + '</span>' : '') +
           '</div>';
  }

  function headHTML(eyebrow, titleA, titleB, lead) {
    return '<div class="sh-head">' +
             '<span class="sh-eyebrow">' + esc(eyebrow) + '</span>' +
             '<h2>' + esc(titleA) + (titleB ? ' <span class="sh-grad-text">' + esc(titleB) + '</span>' : '') + '</h2>' +
             '<hr class="sh-bar">' +
             (lead ? '<p class="sh-lead">' + lead + '</p>' : '') +
           '</div>';
  }

  /* ── TOURS BLOCK ────────────────────────────────────────────────────────── */

  /* There is deliberately no per-tab intro copy here. One was added on
     2026-08-11 to rescue the "Immerse yourself in the Osa Peninsula" lead
     from the Experiences section that was being deleted, and Mehdi cut it
     the same day: the tabs and the pills say what the tab is, and a
     paragraph of adjectives above them earns nothing. If a tab ever needs a
     line, it belongs to the tour, not to the component. */

  /* The activities reshaped to look like a tour, so the renderer below does
     not need to know the difference. No ctas: these are included with a stay
     and arranged on arrival. */
  function activitiesAsTours() {
    return ACTIVITIES.map(function (a) {
      return {
        slug: a.slug,
        pill: a.name,
        name: a.name,
        meta: a.note,
        body: a.body,
        ctas: []
      };
    });
  }

  function buildTours(mount) {
    var wantsActivities = mount.getAttribute('data-activities') === 'true';
    if (wantsActivities && !TOURS.activities) TOURS.activities = activitiesAsTours();
    if (wantsActivities) {
      ACTIVITIES.forEach(function (a) {
        if (!TOUR_PHOTOS[a.slug]) TOUR_PHOTOS[a.slug] = [a.photo];
      });
    }
    mount.classList.add('sh', 'sh-tours');
    mount.innerHTML =
      /* Heading — org-copy.md /activities/ H1; eyebrow per Eli's redline notes #14/#21 */
      headHTML('Activities', 'Tours and', 'Adventures') +
      '<div class="sh-tabs-wrap">' +
        '<div class="sh-tabs" role="tablist">' +
          '<button type="button" role="tab" data-world="forest" class="on" aria-selected="true">Rainforest Discovery</button>' +
          '<button type="button" role="tab" data-world="ocean" aria-selected="false">Ocean Discovery</button>' +
          /* A third tab, wherever the page asks for it with
             data-activities="true". Retreats and Experiences both do, as of
             2026-08-11 - Mehdi: "I like the complementary activities
             section, make it the standard everywhere." Experiences used to
             render the same eight as an accordion instead, which meant one
             set of facts wearing two faces. Both pages that mount this
             component now pass the flag, so it could be made always-on; it
             stays a flag because the next page to mount it may well want
             tours only, and taking the choice away is harder to undo. */
          (wantsActivities
            ? '<button type="button" role="tab" data-world="activities" aria-selected="false">Complementary Activities</button>'
            : '') +
        '</div>' +
      '</div>' +
      '<div class="sh-pills" role="tablist"></div>' +
      '<div class="sh-stage">' +
        '<div><div class="sh-slider"></div><div class="sh-dots"></div></div>' +
        '<div class="sh-info"></div>' +
      '</div>';

    var tabs   = mount.querySelectorAll('.sh-tabs button');
    var pills  = mount.querySelector('.sh-pills');
    var slider = mount.querySelector('.sh-slider');
    var dots   = mount.querySelector('.sh-dots');
    var info   = mount.querySelector('.sh-info');

    var world = 'forest';
    var idx = 0;
    var shot = 0;

    /* Pill label = the tour's own name, shortened for the pill row.
       Every label is a substring of the source name — nothing invented. */
    function pillLabel(t) {
      return t.pill || t.name;
    }

    function renderStage() {
      var t = TOURS[world][idx];

      /* One big photo, and dots only when this tour actually has more than
         one. Photographs come from TOUR_PHOTOS; a tour with none keeps the
         labelled placeholder naming the file it is waiting for. */
      var photos = TOUR_PHOTOS[t.slug] || [];
      if (shot >= photos.length) shot = 0;

      if (photos.length) {
        var img = new Image();
        var want = photos[shot];
        /* If the file is not there, fall back to the labelled placeholder
           naming it - the same thing an empty TOUR_PHOTOS entry produces.
           Without this, a listed-but-missing photograph renders as a broken
           image icon, which looks like a fault rather than like something
           the site is waiting for.

           Added 2026-08-11 after exactly that happened. Folding the eight
           activities into this component meant activitiesAsTours() writes a
           TOUR_PHOTOS entry for every one of them, and two - Bat Cave and
           Drake Bay Walking - have no photograph published on either client
           site. The accordion this replaced had its own img.onerror and
           handled it; this renderer did not, so the fallback was lost in the
           move. Now it belongs to the component, so no future tour can lose
           it again. */
        img.onerror = function () {
          if (photos[shot] !== want) return;      // a later click already won
          slider.innerHTML = phHTML(want, t.name + ' · photograph not published yet', '340px');
          slider.removeAttribute('data-gallery');
          slider.style.cursor = '';
        };
        img.src = '/media/' + want;
        img.alt = t.name + (photos.length > 1 ? ' · photo ' + (shot + 1) + ' of ' + photos.length : '');
        img.style.cssText = 'width:100%;min-height:340px;max-height:520px;object-fit:cover;display:block;border-radius:6px';
        slider.innerHTML = '';
        slider.appendChild(img);
        /* Tours get the shared lightbox (Mehdi, 2026-08-09: rooms, tours and
           food). shell.js listens on the document, so setting the attribute
           on a stage that re-renders on every tab change is enough. */
        slider.setAttribute('data-gallery', photos.join(','));
        slider.setAttribute('data-gallery-note', t.name);
        slider.style.cursor = 'zoom-in';
      } else {
        slider.removeAttribute('data-gallery');
        slider.style.cursor = '';
        slider.innerHTML = phHTML('tours/' + t.slug + '-01.jpg', t.name + ' · no photograph on the client sites yet', '340px');
      }

      dots.innerHTML = '';
      if (photos.length > 1) {
        for (var i = 0; i < photos.length; i++) {
          var d = document.createElement('i');
          if (i === shot) d.className = 'on';
          (function (n) {
            d.style.cursor = 'pointer';
            d.addEventListener('click', function () { shot = n; renderStage(); });
          })(i);
          dots.appendChild(d);
        }
      }

      var html = '<h3>' + esc(t.name) + '</h3>';
      if (t.lede) html += '<p class="sh-lede">' + esc(t.lede) + '</p>';
      if (t.meta) html += '<p class="sh-meta">' + esc(t.meta) + '</p>';
      t.body.forEach(function (p) { html += '<p class="sh-body">' + esc(p) + '</p>'; });
      html += '<div class="sh-ctas">';
      t.ctas.forEach(function (c) {
        html += '<a class="sh-cta' + (c.kind === 'ghost' ? ' ghost' : '') + '" href="' + c.href +
                '" target="_blank" rel="noopener">' + esc(c.label) + '</a>';
      });
      html += '</div>';
      info.innerHTML = html;
    }

    function renderPills() {
      pills.innerHTML = '';
      TOURS[world].forEach(function (t, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'sh-pill' + (i === idx ? ' on' : '');
        b.textContent = pillLabel(t);
        b.addEventListener('click', function () { idx = i; shot = 0; renderPills(); renderStage(); });
        pills.appendChild(b);
      });
    }

    Array.prototype.forEach.call(tabs, function (btn) {
      btn.addEventListener('click', function () {
        /* switch in place — never jump the page */
        world = btn.getAttribute('data-world');
        idx = 0; shot = 0;
        Array.prototype.forEach.call(tabs, function (b) {
          var on = b === btn;
          b.classList.toggle('on', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        renderPills();
        renderStage();
      });
    });

    renderPills();
    renderStage();
  }

  /* ── LOGISTICS BLOCK ────────────────────────────────────────────────────── */

  /* Arrival-method icons — Eli note 37. Same 1.5 stroke language as the rest
     of the site, sized by CSS so they inherit the accordion's colour. */
  var ARRIVAL_ICONS = {
    boat: '<path d="M3 18h18l-2.2 3H5.2L3 18z" stroke-linejoin="round"/>' +
          '<path d="M5 18l1.4-6.2h11.2L19 18" stroke-linejoin="round"/>' +
          '<path d="M12 11.8V3l6 4.4-6 1.6" stroke-linejoin="round"/>',
    car:  '<path d="M3 16v-3.2L5.3 7h13.4L21 12.8V16" stroke-linejoin="round"/>' +
          '<path d="M3 16h18v2.4h-3V16M6 18.4V16H3" stroke-linejoin="round"/>' +
          '<path d="M5.6 12.6h12.8" stroke-linecap="round"/>' +
          '<circle cx="7.4" cy="16" r="1.5"/><circle cx="16.6" cy="16" r="1.5"/>',
    air:  '<path d="M2.5 13.6l19-6.6-2.2 5.2-8.6 2.4-3 5.2-1.9.6.6-4.2-3.9-2.6z" stroke-linejoin="round"/>'
  };

  function arrivalIcon(key) {
    if (!ARRIVAL_ICONS[key]) { return ''; }
    return '<span class="sh-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
           'stroke-width="1.5" aria-hidden="true">' + ARRIVAL_ICONS[key] + '</svg></span>';
  }

  function buildLogistics(mount) {
    mount.classList.add('sh', 'sh-logistics');

    var html =
      /* Heading + lead. The lead was a welcome line until 2026-08-09; it is
         now the arrival warning, which is the thing somebody planning a trip
         actually needs before they choose a route. Mehdi's call, and applied
         to BOTH pages that mount this component on purpose - one component,
         one text. The lead is raw HTML rather than escaped so the one bold
         sentence survives; nothing else in it is markup. */
      headHTML('Arriving', 'Your Journey', 'to Paradise',
               'The boat from Sierpe is the safest arrival and you do not need a car here. Driving means a 4x4 and two river crossings, and in rain neither direction can be guaranteed. <b>Every route ends with a 20 minute walk on sand. Pack light, bring a backpack.</b> Porter service exists and suitcases are fine, but nobody should discover this on arrival.') +
      '<div class="sh-acc">';

    LOGISTICS.forEach(function (row, i) {
      html +=
        '<div class="sh-acc-item">' +
          '<button class="sh-acc-head" type="button" aria-expanded="false">' +
            '<span class="sh-n">' + row.n + '</span>' +
            arrivalIcon(row.icon) +
            '<h3>' + esc(row.title) + '</h3>' +
            (row.recommended ? '<span class="sh-reco">Our recommendation</span>' : '') +
            '<span class="sh-season' + (row.seasonKind === 'dry' ? ' dry' : '') + '">' + esc(row.season) + '</span>' +
            '<span class="sh-arrow" aria-hidden="true">›</span>' +
          '</button>' +
          '<div class="sh-acc-body">' +
            '<div class="sh-acc-grid">' +
              '<div>' +
                '<p class="sh-walk">' + row.walk + '</p>' +
                '<p class="sh-sum">' + row.summary + '</p>' +
                row.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
              '</div>' +
              /* The route photograph opens full screen, 2026-08-11, Mehdi:
                 "the photos in the boat, road, air should be expandable to
                 full screen because they're gonna become maps." A map you
                 cannot enlarge is a picture of a map.

                 Its own photograph only, not all three as one set: you
                 opened "By boat" because you want the boat route, and paging
                 sideways into the road map from there would be a surprise.
                 One file means the lightbox shows no arrows and no counter,
                 which is what a single map should look like.

                 role and tabindex because this is a div, same as the gallery
                 tiles - without them it is mouse-only. shell.js listens on
                 the document for both click and Enter/Space, so nothing has
                 to be bound here. */
              (row.photo
                ? '<div class="sh-acc-shot"><div data-media="' + esc(row.photo) +
                  '" data-ratio="4/3" data-note="' + esc(row.photoNote || '') + '"' +
                  ' data-gallery="' + esc(row.photo) + '"' +
                  ' data-gallery-note="' + esc(row.title || '') + '"' +
                  ' data-gallery-start="0"' +
                  ' role="button" tabindex="0"' +
                  ' aria-label="Open the ' + esc(row.title || 'route') + ' photograph full screen"></div></div>'
                : '') +
            '</div>' +
          '</div>' +
        '</div>';
    });

    html += '</div>';
    mount.innerHTML = html;

    /* shell.js paints [data-media] once, at load, before this component has
       injected anything. These hosts are created here, so they have to be
       painted here, using the shell's own helper rather than a second copy
       of it. */
    mount.querySelectorAll('[data-media]').forEach(function (host) {
      if (window.OF && window.OF.paint) {
        window.OF.paint(host,
                        host.getAttribute('data-media'),
                        host.getAttribute('data-note') || '',
                        host.getAttribute('data-ratio') || '4/3');
      }
    });

    /* closed by default — the accordion only opens on click */
    mount.querySelectorAll('.sh-acc-head').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.parentElement;
        var open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* ── FAQ BLOCK ──────────────────────────────────────────────────────────
     Merged 2026-08-11, Mehdi: "Move and merge if possible." There were two
     FAQs: six general questions under "Good to know" on About, and three
     arrival questions under "Arriving, Answered" on Arriving. Nine questions,
     no exact duplicates, but two of them contradicted each other in public -
     see PACK below.

     One list now. Every question carries topics, and a page says how much of
     it it wants:

       <div data-shared="faq"></div>                    all nine
       <div data-shared="faq" data-topic="arrival"></div>  the six about getting here

     Same rule as data-activities on the tour tabs: one component, the page
     decides how much. Adding a question is one entry here and it appears
     everywhere it belongs.

     The answers are raw HTML, not escaped, because several carry links and
     lists. Anything written here is written by us, never by a visitor. */
  var FAQ = [
    { topics: ['arrival'],
      q: 'What is the cheapest way to arrive?',
      a: '<p>Taking the boat from Sierpe is the most affordable and scenic option:</p>' +
         '<ul><li>Morning boat (11:30 a.m.): $30 per person</li>' +
         '<li>Afternoon boat (4:00 p.m.): $40 per person</li></ul>' },

    { topics: ['arrival'],
      q: 'What is the fastest way to arrive?',
      a: '<p>By plane to Drake Bay Airport, then take a 4x4 taxi (about 45 minutes). ' +
         'Let us know and we can arrange the taxi for you.</p>' },

    { topics: ['arrival'],
      q: 'Do I need a car?',
      a: '<p>No. The boat from Sierpe is the safest arrival, and you do not need a car here.</p>' },

    { topics: ['arrival'],
      q: 'What is the difference between San Josecito School and San Josecito Beach?',
      a: '<p>They are the two drop points, one for each family of routes. Arrive by boat from ' +
         'Sierpe, or by the bus and boat combination, and you land at San Josecito Beach, then ' +
         'walk south 20 minutes with the ocean on your right. Arrive by car, taxi or plane, and ' +
         'you are dropped at San Josecito School, then walk north 20 minutes with the ocean on ' +
         'your left.</p>' },

    { topics: ['arrival'],
      q: 'Can someone carry my bags?',
      a: '<p>Yes. Porter service is provided, and a suitcase is fine if that is what you have, ' +
         'though a backpack is best since the last leg of the journey is on foot.</p>' },

    /* PACK - the contradiction, resolved 2026-08-11. About said "Backpacks
       only (max 15 kg per person)". Arriving said "a suitcase is fine if that
       is what you have", and so does the arrival warning on the logistics
       component. Two pages of the same site telling a guest opposite things
       about what to bring. Backpacks are now stated as best rather than
       required, which is what the other two already said and what is
       actually true - porter service exists. If Eli wants suitcases genuinely
       refused, this is the line to change, and the two above change with it. */
    { topics: ['arrival'],
      q: 'What should I pack?',
      a: '<ul><li>A backpack is best, and keep it under about 15 kg per person - the last leg ' +
         'is on foot. A suitcase is fine if that is what you have, and porter service is ' +
         'available.</li>' +
         '<li>Quick-dry clothing and waterproof shoes</li>' +
         '<li>Sunscreen, insect repellent, hat, and sunglasses</li>' +
         '<li>Reusable water bottle</li>' +
         '<li>Raincoat and snorkel gear (optional but useful)</li>' +
         '<li>Flashlight (recommended)</li></ul>' },

    { topics: ['booking'],
      q: 'How do I book rooms?',
      a: '<p>Use <a href="https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3" rel="noopener">this link</a> ' +
         'to choose and reserve your room.</p>' },

    { topics: ['booking'],
      q: 'How do I book tours?',
      a: '<p>Visit the tour descriptions on our <a href="/v2/experiences.html">Experiences</a> ' +
         'page and use the provided links. Full payment is required to confirm your tour dates.</p>' },

    { topics: ['planning'],
      q: 'When is green season and dry season?',
      a: '<p>Green season runs from May to November. Dry season runs from December to April.</p>' }
  ];

  function buildFaq(mount) {
    var topic = mount.getAttribute('data-topic');
    var rows  = topic ? FAQ.filter(function (f) { return f.topics.indexOf(topic) !== -1; }) : FAQ;

    /* Heading is the page's to set, because "Good to know" on the home page
       and "Arriving, Answered" on Arriving are both right for where they sit.
       data-eyebrow / data-title-a / data-title-b, with the home page's
       wording as the default. */
    var eyebrow = mount.getAttribute('data-eyebrow') || 'FAQ';
    var titleA  = mount.getAttribute('data-title-a') || 'Good to';
    var titleB  = mount.getAttribute('data-title-b') || 'know';

    mount.classList.add('sh', 'sh-faq');
    mount.innerHTML =
      headHTML(eyebrow, titleA, titleB) +
      /* The shared .xp expander from shell.css, and data-exclusive="false" so
         a reader can leave several answers open at once - an FAQ is read by
         scanning, not one question at a time. shell.js listens on the
         document, so rows built here are live without any extra wiring. */
      '<div class="xp-list">' +
        rows.map(function (f) {
          return '<div class="xp" data-open="false">' +
                   '<button class="xp-head" type="button" aria-expanded="false">' +
                     '<span class="xp-name">' + esc(f.q) + '</span>' +
                     '<span class="xp-arrow" aria-hidden="true">&rsaquo;</span>' +
                   '</button>' +
                   '<div class="xp-body">' + f.a + '</div>' +
                 '</div>';
        }).join('') +
      '</div>';
  }

  /* ── REVIEWS BLOCK ──────────────────────────────────────────────────────
     Four real Google reviews, added 2026-08-11 from screenshots Mehdi took
     of the lodge's Google page. Until this moment the home page carried a
     dashed frame reading "Guest reviews to come - nothing is quoted until it
     is real", because nothing was.

     TRANSCRIBED VERBATIM. Not tidied, not shortened, not corrected. If a
     guest wrote "aesthetic" as "ascetic", it stays. These are other people's
     words and the moment we improve one of them it becomes marketing copy
     wearing a stranger's name.

     Two of the four were written in English and shown on Google with a
     French translation beneath. The English is the original, so the English
     is what is here.

     ryan mcdowell's review says "walk 15min". The rest of the site says
     twenty minutes, deliberately - see the 20-minute note in the logistics
     lead. His sentence is left alone: it is a quotation, not our copy, and
     editing a guest's estimate to match our own is the one thing a review
     section must never do.

     DATES are stored ISO and rendered as "5 days ago" at page load. Google's
     own widget shows relative dates, and a hard-coded "5 days ago" on a
     static site is a lie by next Tuesday. Store the day, compute the phrase.

     NO OVERALL SCORE OR REVIEW COUNT is shown. We have four screenshots, not
     the lodge's real average or total, and inventing "4.9 from 87 reviews"
     is exactly the kind of number nobody checks and everybody believes. The
     header links to Google instead, where the real figures live. */
  var REVIEWS_URL = 'https://www.google.com/travel/search?q=ocean%20forest%20ecolodge&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C73064764%2C121529350%2C121608706%2C121738283%2C121762713%2C121921501&hl=fr-CR&gl=cr&ssta=1&ts=CAEaRwopEicyJTB4OGZhMzhlZmE0ZjZkNjBiMzoweGJlNjIxYzI4NjBkMDU5MWISGhIUCgcI6g8QCBgTEgcI6g8QCBgVGAIyAhAA&qs=CAEyFENnc0ltN0xCaG9hRmg3Ry1BUkFCOAJCCQkbWdBgKBxivkIJCRtZ0GAoHGK-&ap=ugEHcmV2aWV3cw&ictx=111';

  var REVIEWS = [
    { name: 'Joelle Tabacsko', stars: 5, date: '2026-08-07', trip: 'Vacation · Solo',
      text: 'I’ve been in Costa Rica traveling for close to a year now and I can’t express enough how Ocean Forest Ecolodge is my favorite place yet. Completely away from civilization with only sounds of nature and the waves crashing the shore. The accommodation is extremely cozy, I had no unwanted visitors as I have in many other lodges because the rooms are not open air and they are cleaned/taken care of daily. The screened windows provide wonderful ocean breeze airflow. The lodge’s electricity is solar/renewable which brings me joy to know I am supporting such endeavors. The paths are great and are even pebbled so you don’t fall when they get wet from the rain. In all my time in Costa Rica, the closest I’ve been to monkeys is here. The capuchins will be playing right next to you either in the coconuts, beside the paths, or even on your roof at times. The lodge’s ascetic is beautiful, incredible handmade local wood that looks like it was built yesterday. There’s spaces to do yoga, make music (even instruments around for playing), lots of books to read, hammocks everywhere to relax on, plants to make tea with, & so much more! This is true paradise with so many intentionally planted trees and plants around the lodge and many are containing medicinal properties. The staff is wonderful. They are there for any concern you may have, explain everything thoroughly, and work with a smile on their face. Wifi is great. The food is incredible, I’m still thinking about it haha! I miss it already so much. With the most powerful rainforest behind you and the wondrous ocean in front, you are definitely destined to feel tranquil, close to nature in the ways you want, and most importantly taken care of by the best staff!' },

    { name: 'Kristine Weiss', stars: 5, date: '2026-07-12', trip: 'Vacation · Couple',
      text: 'The location is unbeatable. This is, hands down, my favorite place in Costa Rica. The scenery is stunning. It feels completely isolated in the jungle. We loved walking everywhere along the beach. We had access to everything you could possibly want: beaches, trails, ocean, a large clear river, boat taxis, exciting tours, animals, healthy food, great conversations, no light pollution, and a safe, comfy place to sleep. We saw more animals during our hikes and at Ocean Forest than we did during our trip to Corcovado. The food at Ocean Forest was delicious and we were most grateful that it was fresh and healthy. They went above and beyond to meet our needs during our stay. We are so grateful this place exists and can’t wait to come back.' },

    { name: 'ryan mcdowell', stars: 5, date: '2026-07-22', trip: '',
      text: 'I stayed 2 nights at Ocean Forest and it’s exactly as the name states... It’s literally where the ocean meets the forest. In my 2 days, I was very impressed with the hospitality, food, beds and all of the medicinal plants growing on the property! The beds have mosquito nets to ensure you don’t have a rough night’s sleep. The best part about it all is that you must arrive by boat or park your 4x4 at the end of the beach and walk 15min to the entrance, it truly feels like an escape for every day life! Lastly, they helped me with organizing the tour to Corcovado which was absolutely incredible!' },

    { name: 'Matthew Gentzkow', stars: 5, date: '2026-07-12', trip: '',
      text: 'There is no place like this on earth. Tropical paradise - lush forest and flowers and fruits - monkeys playing outside every morning. One of the most beautiful beaches I’ve ever seen. Far from tourists. The most lovely staff with an attentive welcome that makes you feel like family.' }
  ];

  /* Google's own initial-avatar colours. A name always lands on the same one,
     so a reviewer's circle never changes colour between page loads. */
  var AVATAR_COLOURS = ['#5c6bc0', '#6d4c41', '#00897b', '#c2185b', '#5e35b1', '#00838f'];
  function avatarColour(name) {
    var n = 0;
    for (var i = 0; i < name.length; i++) { n = (n + name.charCodeAt(i)) % 997; }
    return AVATAR_COLOURS[n % AVATAR_COLOURS.length];
  }

  /* "5 days ago" computed at load from the stored ISO date. Deliberately
     coarse - Google's is too, and precision here would be false anyway. */
  function relativeDate(iso) {
    var then = new Date(iso + 'T12:00:00');
    var days = Math.floor((Date.now() - then.getTime()) / 86400000);
    if (isNaN(days) || days < 0) return '';
    if (days === 0)  return 'today';
    if (days === 1)  return 'yesterday';
    if (days < 7)    return days + ' days ago';
    if (days < 14)   return 'a week ago';
    if (days < 31)   return Math.floor(days / 7) + ' weeks ago';
    if (days < 62)   return 'a month ago';
    if (days < 365)  return Math.floor(days / 30) + ' months ago';
    if (days < 730)  return 'a year ago';
    return Math.floor(days / 365) + ' years ago';
  }

  var G_MARK =
    '<svg class="rv-g" viewBox="0 0 48 48" aria-hidden="true">' +
      '<path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 1.9-1.6 4.8-4.5 6.8l-.1.3 6.5 5 .5.1c4.1-3.8 6.6-9.4 6.6-15.5z"/>' +
      '<path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-.3.1-6.7 5.2-.1.3C8 40.8 15.4 46 24 46z"/>' +
      '<path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3.1.7-4.4v-.4l-6.8-5.3-.2.1C2.9 16.9 2 20.3 2 24s.9 7.1 2.5 10.1l7-5.7z"/>' +
      '<path fill="#EA4335" d="M24 10.1c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 3.9 29.9 2 24 2 15.4 2 8 7.2 4.5 13.9l7 5.7c1.8-5.3 6.7-9.5 12.5-9.5z"/>' +
    '</svg>';

  function starsHTML(n) {
    var s = '<span class="rv-stars" aria-label="' + n + ' out of 5">';
    for (var i = 0; i < 5; i++) {
      s += '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="' +
           (i < n ? '#fbbc04' : 'rgba(0,0,0,0.18)') +
           '" d="M12 17.3l-6.2 3.7 1.7-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.8 1.7 7z"/></svg>';
    }
    return s + '</span>';
  }

  function buildReviews(mount) {
    mount.classList.add('sh', 'sh-reviews');
    mount.innerHTML =
      headHTML('Guests', 'What guests', 'say') +
      '<div class="rv-grid">' +
        REVIEWS.map(function (r) {
          return '<figure class="rv-card">' +
                   '<div class="rv-top">' +
                     '<span class="rv-av" style="background:' + avatarColour(r.name) + '">' +
                       esc(r.name.charAt(0).toUpperCase()) +
                     '</span>' +
                     '<span class="rv-who">' +
                       '<b>' + esc(r.name) + '</b>' +
                       '<span class="rv-meta">' + esc(relativeDate(r.date)) + ' on ' + G_MARK + ' Google</span>' +
                     '</span>' +
                     starsHTML(r.stars) +
                   '</div>' +
                   (r.trip ? '<span class="rv-trip">' + esc(r.trip) + '</span>' : '') +
                   /* The text is clamped to six lines and opened by a button
                      rather than truncated in the string, so the whole review
                      is in the page for anyone reading it another way, and
                      nothing is quietly cut off. */
                   '<blockquote class="rv-text">' + esc(r.text) + '</blockquote>' +
                   '<button class="rv-more" type="button" aria-expanded="false">Read more</button>' +
                 '</figure>';
        }).join('') +
      '</div>' +
      '<a class="rv-all" href="' + REVIEWS_URL + '" target="_blank" rel="noopener">' +
        G_MARK + 'Read all reviews on Google' +
        '<span aria-hidden="true">&#8599;</span>' +
      '</a>';

    /* Only offer "Read more" where the text is actually cut off. Matthew's
       review is four lines and a button under it would be a dead control. */
    mount.querySelectorAll('.rv-card').forEach(function (card) {
      var txt = card.querySelector('.rv-text');
      var btn = card.querySelector('.rv-more');
      if (txt.scrollHeight <= txt.clientHeight + 2) { btn.remove(); return; }
      btn.addEventListener('click', function () {
        var open = card.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = open ? 'Read less' : 'Read more';
      });
    });
  }

  /* ── MOUNT ──────────────────────────────────────────────────────────────── */

  /* Published so other pages can build from the same lists these components
     use. One source, however many presentations. */
  window.OF_SHARED = { ACTIVITIES: ACTIVITIES, FAQ: FAQ };

  function mountAll() {
    injectStyle();
    var t = document.querySelectorAll('[data-shared="tours"]');
    var l = document.querySelectorAll('[data-shared="logistics"]');
    var f = document.querySelectorAll('[data-shared="faq"]');
    var r = document.querySelectorAll('[data-shared="reviews"]');
    Array.prototype.forEach.call(t, buildTours);
    Array.prototype.forEach.call(l, buildLogistics);
    Array.prototype.forEach.call(f, buildFaq);
    Array.prototype.forEach.call(r, buildReviews);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
})();
