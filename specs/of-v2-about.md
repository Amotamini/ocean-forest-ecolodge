STATUS: SHIPPED 2026-08-05

All 8 acceptance checks passed, verified in a browser by the build thread on 2026-08-05.
Founding-year conflict flagged at build time (the source material also implied a 2002 opening
via an "18 years ago" line in a 2020-dated post), **resolved 2026-08-09: 2003 is correct** (Phase
0 answer E). No page change was needed, since the page already used 2003. Two link forms differ
from the literal Contract wording and were reconciled to
the shell's established, Finder-working convention rather than deploy-time routes: the Tours FAQ
links to `experiences.html` (spec said `/experiences`), and the Jonathon and Blog links point to
`../blog.html`, matching every other v2 page's footer (spec said `/blog`).

**REVISED 2026-08-09.** One correction landed after this spec shipped, recorded only in
`of-v2-revisions.md` (C18): the first photograph after the hero gains the `.media-band .media-fade`
treatment defined for the whole site, rather than sitting in the plain frame this spec originally
described. Folded in below, plus the standing root-absolute asset-path rule. A rebuild from this
document now reproduces the live page rather than reverting it.

# A5 — About

## 1. Goal

Build the new page Eli asked for at the end of the meeting: a whole section that tells a visitor about the place, its story, its people, and its policies.

## 2. Decisions

- Built on the A0 shell, as `ocean-forest-website/v2/about.html`, hero slug `about`, gallery offset `12`.
- Holds, in this order: the story, Jonathon, History, Projects, the Blog, general FAQ, Recommendations, Travel Tips.
- The Arriving-specific FAQ (School vs. Beach, do I need a car, porter service) stays on Arriving (A1). This page's FAQ is the general, site-wide kind — booking, packing at a high level, tour booking, seasons — not arrival logistics.
- "The story" section reuses the existing "We built this place slowly" copy already live in `index.html` (lines 858–863), verbatim — this is the strongest existing About-shaped copy in the codebase and the brief does not ask for it to be replaced.
- "Jonathon" is a new subsection naming Jonathon Miller Weisberger, sourced from the blog byline attributions already visible in source-copy/org-copy.md (lines 110, 120) — those are the only facts about him captured in source copy. No biography exists beyond his name and that he writes the blog on biodiversity, ethnobotany, and rainforest medicine. Do not invent further biographical detail.
- "History" reuses the founding fact already in the codebase's JSON-LD (`index.html` line 38, `foundingDate: 2003`) plus the "18th anniversary" post's founding-date confirmation (source-copy/com-copy.md line 963, "February 19th, 2020, was the inauguration... We received our first guests 18 years ago" — read against a 2020 post date, this backs into a 2002 opening, one year off the JSON-LD's 2003; do not silently pick one, flag the conflict in the build report and use 2003, since that is the figure already live and structured-data-linked across the current site). (Resolved 2026-08-09: Mehdi confirmed 2003 is correct, Phase 0 answer E. The conflict is closed, not just deferred.)
- "Projects" covers the ethnobotanical garden and permaculture design, sourced from `.org/ecolodge/` (source-copy/org-copy.md lines 598–648) and `.org/setting/` (lines 652–700) — the garden, the Turtle Island Labyrinth, and the towering rainforest trees content, condensed, not reproduced in full.
- "The Blog" is a link out to `/blog`, matching the existing footer link in `index.html` line 920, not a reproduction of any blog post content on this page.
- "Recommendations" and "Travel Tips" are ported from `.com/about-us/` (source-copy/com-copy.md lines 809–830), which is the only source that groups these under those exact headings. Where that page's content duplicates What to Pack (already fully covered on Arriving, A1), this page keeps only the higher-level Recommendations content (travel insurance, vaccination, passport/visa, ATMs/money) and does not repeat the packing list.
- General FAQ is the seven-entry `.com/about-us/` FAQ (source-copy/com-copy.md lines 837–884), minus the "How do I to get here?" entry, which duplicates Arriving and is dropped here to avoid two different answers to the same question living on two pages.

## 3. Contracts

### Hero
- Slug: `about`
- Eyebrow: `A Note From the Lodge`
- `h1`: `We Built This Place Slowly`
- Sub: `The story, the people, and the ground it stands on.`

### Section order
1. The story
2. Jonathon
3. History
4. Projects
5. The Blog
6. General FAQ
7. Recommendations
8. Travel Tips
9. Gallery (shell-provided, offset 12)

### The story — verbatim from `index.html` lines 858–863
The full four-paragraph block, starting "A cabin first, then a path, then a garden, then a kitchen..." through "...bamboo and recycled products." Reuse the existing `.about-wrap` / `.about-txt` layout pattern from `index.html` lines 852–867 as the starting structure for this section.

**The first photograph after the hero — `property/shala-exterior.jpg` — gets `.media-band .media-fade`**
(added 2026-08-09, C18, treatment defined in `of-v2-revisions.md` §3.2): full viewport width, minimum
70vh, with the section's heading and intro laid over it behind a scrim, fading at the edges rather than
sitting in a plain rectangular frame. This supersedes any earlier plain `[data-media]`/`.ph` frame this
spec described for that image.

### Jonathon — new subsection, facts-only
> Jonathon Miller Weisberger writes from the lodge on biodiversity, ethnobotany, plant medicine, and the rainforest. His posts are collected on the blog.
Link "the blog" to `/blog` (same as the Blog section below, this is intentionally the same destination).

### History
> Ocean Forest Ecolodge opened in 2003, on a beach with no road. A cabin came first, then a garden, then a kitchen, then the three-storey Lapa Lapa Lodge, built without cutting a single living tree.
(Do not cite "18 years" or a 2020/2002 date pairing anywhere on the page — see Decisions above on the conflict. Build report should flag the discrepancy so it can be resolved with the client later.)

### Projects — condensed from source-copy/org-copy.md lines 598–648
Cover, in prose, not a bulleted feature list: the 15-acre permaculture garden and its ethnobotanical collection, the Turtle Island Labyrinth (dedicated to marine turtle conservation), and the fact that construction used sustainably sourced and reclaimed materials throughout. Two to three short paragraphs, drawing only on facts already stated in the cited source lines — no new claims.

### The Blog
> Field notes from the lodge, on biodiversity, conservation, and life on the Osa Peninsula.
CTA: "Read the blog" → `/blog`

### General FAQ — six entries, source-copy/com-copy.md lines 855–884, verbatim, in this order, dropping the "How do I to get here?" entry per Decisions:
1. **What is the Cheapest Way to Arrive?** — verbatim (line 855–858), even though this duplicates Arriving in part; it's phrased as a booking-decision FAQ, not a logistics walkthrough, so it stays.
2. **What is the Fastest Way to Arrive?** — verbatim (line 860–861).
3. **What should I Pack?** — verbatim bullet list (lines 863–869).
4. **How do I book Rooms?** — verbatim (lines 871–872), including that the source page itself has a dead `[Link]` placeholder; render this page's version with a working link to the same booking URL used everywhere else (`https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3`) rather than reproducing the dead placeholder.
5. **How do I book Tours?** — verbatim intent (lines 876–877), rewritten only enough to remove the source page's placeholder text (`[Link to appropriate site here]`, `You can pay per xxx.`) — replace with a working link to `/experiences` and drop the incomplete payment sentence rather than publishing a placeholder fragment.
6. **When is Green Season and Dry Season?** — verbatim (lines 881–883).

### Recommendations — condensed from source-copy/com-copy.md lines 809–830, three groups:
1. **Before you travel**: passport valid 6+ months past departure, proof of onward travel, travel insurance recommended (Travel Guard, DAN, TravelInsurance.com, Generali), vaccination not required except from specific African/South American countries (yellow fever certificate, issued 10+ days prior).
2. **Arriving in Costa Rica**: allow 2.5 to 3 hours between international arrival at SJO and a domestic flight; San José is subtropical and can be chilly at night.
3. **Money**: Costa Rican Colones and US Dollars both accepted; no ATMs near Ocean Forest, Sierpe, or Drake Bay, bring enough cash; ATMs available in San José, Quepos, Dominical, Palmar Norte; online payments via PayPal.

### Travel Tips
Since the packing list itself lives on Arriving (A1), this section on About is the short version: a single line pointing there, not a duplicate list.
> Full packing list and porter service details are on the Arriving page.
Link "Arriving page" → `arriving.html`.

## 4. Acceptance checks

**Run these over http, not from Finder** (A0 §4) — `python3 -m http.server 8080`, then
`http://localhost:8080/v2/about.html`.

1. All nine sections appear in the order listed above.
2. The story section matches `index.html` lines 858–863 verbatim, and the `shala-exterior.jpg`
   photograph beneath it is full viewport width, its heading laid over it, and fades at the edges
   rather than sitting in a plain rectangular frame. *(Rewritten 2026-08-09 to add C18, which the
   original check did not cover.)*
3. The general FAQ has exactly six entries, in the order given, none of them the "How do I to get here?" duplicate.
4. The "How do I book Rooms?" and "How do I book Tours?" FAQ entries have working links, not the source page's dead `[Link]` / `[Link to appropriate site here]` placeholders.
5. Travel Tips on this page is a single pointer line to Arriving, not a second copy of the packing list.
6. The History section states 2003 as the founding year and does not also assert an 18-years/2020 figure.
7. Jonathon's subsection states only his name and the topics he writes about, no invented biography.
8. No em dash or en dash appears anywhere in this page's visible copy.

## 5. Out of scope

Reproducing any actual blog post content, resolving the 2003 vs. 2002 founding-year conflict (flag it, don't pick a fix beyond using the already-live 2003), a dedicated Recommendations or Travel Tips accordion pattern beyond simple prose sections.

## 6. Parking line

None. The founding-year conflict is a data question for Mehdi/Eli to resolve later, not a blocker to building this page with 2003 as stated.

## 7. Build prompt

```
Read specs/of-v2-shell.md first and build this page on top of what it defines — reuse shell.css
and shell.js exactly as that spec describes. If ocean-forest-website/v2/shell.css and shell.js do
not exist yet, build them first, following of-v2-shell.md exactly, then build this page.

Read specs/of-v2-about.md in full. Section 3 "Contracts" is literal: quoted copy is pulled from
ocean-forest-website/index.html and source-copy/com-copy.md / source-copy/org-copy.md at the line
ranges given, and must match those sources exactly where marked verbatim. Where the spec says
"condensed" or "new," write plainly from only the facts cited, and invent nothing.

Build ocean-forest-website/v2/about.html: hero, the story (verbatim) with its `property/
shala-exterior.jpg` photograph in `.media-band .media-fade` (full viewport width, heading laid over
it, fading at the edges), Jonathon, History (2003, flag the source conflict in your report, do not
resolve it in the copy), Projects, The Blog link, the six-entry general FAQ (with working links
replacing the source page's two dead placeholders), Recommendations, Travel Tips (a single pointer
line to Arriving, not a duplicate packing list), and the shell's gallery section at offset 12.

Every local reference is root-absolute (/v2/shell.css, /media/property/...). Never a ../ climb.

When done, serve the folder over http (python3 -m http.server 8080) and open
http://localhost:8080/v2/about.html. Do NOT test by double-clicking the file — every local
reference is root-absolute and will 404 over file://. Click through all six FAQ entries to confirm
they expand and their links work. List the eight acceptance checks from the spec and state
pass/fail for each, and separately report the founding-year conflict you found in the source
material.
```
