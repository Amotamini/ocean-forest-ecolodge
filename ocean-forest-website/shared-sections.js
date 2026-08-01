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
     5 Ocean Discovery + 4 Rainforest Discovery, in the spec's order.
     `slug` drives the placeholder filenames: media/tours/<slug>-01.jpg …-04.jpg
     ---------------------------------------------------------------------- */

  var TOURS = {
    ocean: [
      {
        slug: 'cano-island',
        pill: 'Caño Island',
        name: 'The Island – Caño Island',
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
          'The waters of the Osa Peninsula are unique, being that two distinct populations of Humpback Whales arrive to breed and raise their calves. From July – Sept arrive the southern populations, they have white on the underside of their flippers and from October through December arrive the northern population of Humpback whales. The Costa Rican dome, a region located some distance from shore, has been mentioned by National Geographic magazine as one of the most important waters the world-over for whale populations of many species. Whale watching is seasonal, from July to December. Pseudo Orcas and Pilot Whales are full-time residents of these waters. Dolphins such as the Pacific spotted, bottlenose and spinners also call these waters home.'
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
        name: 'Corcovado National Park – Sirena Ranger Station',
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
        name: 'Corcovado National Park – San Pedrillo',
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
      title: 'By boat',
      season: 'All seasons',
      seasonKind: 'all',
      recommended: true,
      summary: 'Get to Sierpe: private taxi <b>$70</b> (~6 h from San José) or public bus <b>$20</b> (~7 h). Boat Sierpe → San Josecito beach: <b>$30</b> at 11:30 am or <b>$40</b> at 4:00 pm, about 1.5 hours. Then a 15-minute walk along the beach.',
      body: [
        'Arriving by boat is not only the most affordable and effortless way to reach us year-round, but it’s especially delightful during the green season (May to November). Simply sit back, relax, and let the stunning river and ocean scenery unfold as your journey becomes an unforgettable tour in itself.',
        'Your adventure to Ocean Forest Ecolodge begins with a breathtaking 1.5-hour boat ride from Sierpe — an unforgettable wildlife tour through Central America’s largest mangrove forest. Glide along the tranquil Sierpe River, spot monkeys, caimans, crocodiles, vibrant birds, and more, before the river opens to the Pacific Ocean for a thrilling coastal ride to San Josecito Beach, one of the area’s most stunning shores.',
        'Arrive 30 minutes early to secure your spot. Pack light (a backpack with max 15 kg / 33 lbs), protect electronics in waterproof bags, and wear water sandals for the beach landing. Find Sierpe Dock next to Donde Jorge Restaurant, and always tell the boat operator to drop you at San Josecito Beach for Ocean Forest Ecolodge.'
      ]
    },
    {
      n: '02',
      title: 'By car',
      season: 'Dry season only · Dec–Apr',
      seasonKind: 'dry',
      recommended: false,
      summary: '<b>4×4 required</b>, two shallow river crossings. Park at San Josecito Rural School (secure), then the 15-minute beach walk.',
      body: [
        'A 4×4 vehicle is essential. Rural roads can be unpredictable and may not be accurately shown on Google Maps or Waze.',
        'You will cross two shallow rivers. Always check weather and rainfall, as heavy rain can make crossings impassable.',
        'You can leave your car at San Josecito Rural School (secure parking area). From there, enjoy a picturesque 15-minute walk north along the beach to the lodge. Please share your estimated arrival time so a staff member can meet you and assist with luggage.'
      ]
    },
    {
      n: '03',
      title: 'By air',
      season: 'All seasons',
      seasonKind: 'all',
      recommended: false,
      summary: 'Fly San José → Drake Bay (~45 min), then a 4×4 taxi <b>$70</b> per vehicle, ~45 min.',
      body: [
        'We recommend booking with SANSA Airline at least 1 month in advance. Our staff can help booking your flights, request help to eli@oceanforest.org',
        'Send us your itinerary so we can arrange your ground transfer. Drake Bay Airport is rural, and taxis are not readily available on site. Kindly confirm your taxi at least 48 hours before arrival. We will book a 4×4 taxi for you. Payment is made directly to the driver.',
        'From San Josecito Rural School, it’s a scenic 15-minute walk to the lodge. Please share your estimated arrival time so our staff can meet you and assist with luggage.'
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
    '.sh-tabs{display:inline-flex;border:1px solid var(--sh-line);border-radius:26px;overflow:hidden;margin:8px 0 28px}',
    '.sh-tabs button{border:0;background:none;color:var(--sh-dim);font-family:var(--sh-mono);font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;padding:12px 26px;cursor:pointer}',
    '.sh-tabs button.on{background:var(--sh-grad);color:#0b1210;font-weight:700}',
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
             (lead ? '<p class="sh-lead">' + esc(lead) + '</p>' : '') +
           '</div>';
  }

  /* ── TOURS BLOCK ────────────────────────────────────────────────────────── */

  function buildTours(mount) {
    mount.classList.add('sh', 'sh-tours');
    mount.innerHTML =
      /* Heading — org-copy.md /activities/ H1; eyebrow per Eli's redline notes #14/#21 */
      headHTML('Activities', 'Rainforest and Ocean Discovery', 'Tours and Adventures') +
      '<div class="sh-tabs" role="tablist">' +
        '<button type="button" role="tab" data-world="ocean" class="on" aria-selected="true">Ocean Discovery</button>' +
        '<button type="button" role="tab" data-world="forest" aria-selected="false">Rainforest Discovery</button>' +
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

    var world = 'ocean';
    var idx = 0;
    var shot = 0;

    /* Pill label = the tour's own name, shortened for the pill row.
       Every label is a substring of the source name — nothing invented. */
    function pillLabel(t) {
      return t.pill || t.name;
    }

    function renderStage() {
      var t = TOURS[world][idx];

      /* one big photo + a per-tour photo slider (placeholders until photos exist) */
      var file = 'tours/' + t.slug + '-0' + (shot + 1) + '.jpg';
      slider.innerHTML = phHTML(file, t.name + ' — photo ' + (shot + 1) + ' of 4', '340px');

      dots.innerHTML = '';
      for (var i = 0; i < 4; i++) {
        var d = document.createElement('i');
        if (i === shot) d.className = 'on';
        (function (n) {
          d.style.cursor = 'pointer';
          d.addEventListener('click', function () { shot = n; renderStage(); });
        })(i);
        dots.appendChild(d);
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

  function buildLogistics(mount) {
    mount.classList.add('sh', 'sh-logistics');

    var html =
      /* Heading + lead — com-copy.md /ecolodge/ "How to get here" */
      headHTML('Arriving', 'Your Journey', 'to Paradise',
               'Ocean Forest Ecolodge is your secluded haven on the Osa Peninsula, bordering Corcovado National Park. Getting here is an integral part of your Costa Rican adventure!') +
      '<div class="sh-acc">';

    LOGISTICS.forEach(function (row, i) {
      html +=
        '<div class="sh-acc-item">' +
          '<button class="sh-acc-head" type="button" aria-expanded="false">' +
            '<span class="sh-n">' + row.n + '</span>' +
            '<h3>' + esc(row.title) + '</h3>' +
            (row.recommended ? '<span class="sh-reco">Our recommendation</span>' : '') +
            '<span class="sh-season' + (row.seasonKind === 'dry' ? ' dry' : '') + '">' + esc(row.season) + '</span>' +
            '<span class="sh-arrow" aria-hidden="true">›</span>' +
          '</button>' +
          '<div class="sh-acc-body">' +
            '<p class="sh-sum">' + row.summary + '</p>' +
            row.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
          '</div>' +
        '</div>';
    });

    html += '</div>';
    mount.innerHTML = html;

    /* closed by default — the accordion only opens on click */
    mount.querySelectorAll('.sh-acc-head').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.parentElement;
        var open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* ── MOUNT ──────────────────────────────────────────────────────────────── */

  function mountAll() {
    injectStyle();
    var t = document.querySelectorAll('[data-shared="tours"]');
    var l = document.querySelectorAll('[data-shared="logistics"]');
    Array.prototype.forEach.call(t, buildTours);
    Array.prototype.forEach.call(l, buildLogistics);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
})();
