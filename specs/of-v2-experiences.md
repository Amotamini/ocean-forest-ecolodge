STATUS: DRAFT

# A3 — Experiences

## 1. Goal

Give the three tour groups, Rainforest Discovery, Ocean Discovery, and Complementary Activities, one page each expanding in place, with Complementary Activities in the expandable-bar pattern from `.com`.

## 2. Decisions

- Built on the A0 shell, as `ocean-forest-website/v2/experiences.html`, hero slug `experiences`, gallery offset `16`.
- Three groups, in this order: Rainforest Discovery, Ocean Discovery, Complementary Activities.
- Rainforest Discovery folds the `.org` "At the Lodge" group into it — White Hawk Nature Trail and Rio Claro join the existing Rainforest Discovery tours already live in `shared-sections.js`.
- Rainforest Discovery and Ocean Discovery reuse the existing tab-plus-stage pattern already built in `shared-sections.js`'s `buildTours()` function, not a rebuild — this page mounts `<div data-shared="tours"></div>` exactly as `index.html` does at line 774, after loading `../shared-sections.js`.
- Complementary Activities is new markup, not reused from `shared-sections.js`, since nothing there covers it. It uses the expandable-bar pattern from `.com`'s Complementary Activities accordion (source-copy/com-copy.md lines 609–638): one bar per activity, name and no price on the bar (source copy carries no per-activity price for these eight), detail inside, opens in place. The pattern only — not the green-to-blue gradient, which belongs to the old `.com` design and is not part of this palette.
- Eight Complementary Activities, in this order (brief §6): Botanical Garden, Bat Cave, River Walk, Drake Bay Walking, Horse Riding, Night Tour, Sierpe Mangrove Tour, Waterfall Hiking.
- The line "Where the silence of the jungle speaks loudest" is kept, placed as a section-break line between Ocean Discovery and Complementary Activities, matching its position on `.com` (source-copy/com-copy.md line 604).

## 3. Contracts

### Hero
- Slug: `experiences`
- Eyebrow: `Tours & Adventures`
- `h1`: `Where the Silence of the Jungle Speaks Loudest`
- Sub: `Rainforest trails, ocean crossings, and everything in between. Every tour departs from the lodge.`

### Section order
1. Rainforest Discovery + Ocean Discovery (shared tabs component, `<div data-shared="tours"></div>`)
2. "Where the silence of the jungle speaks loudest" break line
3. Complementary Activities (eight expandable bars)
4. Gallery (shell-provided, offset 16)

### White Hawk Nature Trail and Rio Claro — added into `TOURS.forest` in `shared-sections.js`, appended after the existing four Rainforest Discovery entries (Corcovado National Park, Sirena, San Pedrillo, Goddess Jacuzzi), copy verbatim from source-copy/org-copy.md:
- **White Hawk Nature Trail** (lines 335–337): pill `White Hawk Trail`, meta `3 to 4 hours · 9 AM–12:30 PM or 2–5:30 PM`, body paragraph verbatim starting "Winding up behind the ecolodge...".
- **Rio Claro** — use the org-copy `/activities/` "Rio Claro – River and Rainforest Fun" entry (lines 147–153), which is a verbatim duplicate of White Hawk's body copy on the source site itself (flagged as a site bug in source-copy/org-copy.md line 133). Reproduce it as-is, duplicate copy and all — do not silently rewrite it, since the brief does not authorize new copy here. Pill: `Rio Claro`, same meta and body as White Hawk.
Both get a ghost CTA "Ask us on WhatsApp" → `https://wa.me/50687379416`, matching the pattern already used for un-bookable tours like Surf Tour at Rio Claro (`shared-sections.js` line 106).

### Complementary Activities — eight bars, in this exact order, copy verbatim from source-copy/com-copy.md lines 616–638
1. **Botanical Garden** — body: "Discover our Ethnobotanical Walk — a self-guided journey through Ocean Forest Ecolodge's living classroom of permaculture and rainforest wisdom. Wander lush gardens brimming with rare ancestral plants, learning their medicinal, edible, and sacred uses through captivating stories, myths, and hands-on tasting and preparation. Engage your senses as you smell, touch, and sip herbal infusions, exploring a vibrant collection that also nourishes our kitchen. Reconnect with the profound healing wisdom of the jungle and let nature be your ultimate teacher."
2. **Bat Cave** — body verbatim from com-copy.md line 620.
3. **River Walk** — body verbatim from com-copy.md line 622.
4. **Drake Bay Walking** — body verbatim from com-copy.md line 625.
5. **Horse Riding** — body verbatim from com-copy.md line 628.
6. **Night Tour** — body verbatim from com-copy.md line 631.
7. **Sierpe Mangrove Tour** — body verbatim from com-copy.md line 634.
8. **Waterfall Hiking** — body verbatim from com-copy.md line 637.
No booking link on any of the eight — matches source-copy/com-copy.md line 119: "book on arrival". Each bar's open state instead shows the plain line: `Book this one with us when you arrive.`

### Bar markup pattern (new, page-scoped CSS class prefix `.ea-` to avoid colliding with `shared-sections.js`'s `.sh-` classes)
```html
<div class="ea-bar" data-open="false">
  <button class="ea-bar-head" type="button" aria-expanded="false">
    <span class="ea-bar-name">Botanical Garden</span>
    <span class="ea-arrow" aria-hidden="true">›</span>
  </button>
  <div class="ea-bar-body">
    <p>[body copy]</p>
    <p class="ea-bar-note">Book this one with us when you arrive.</p>
  </div>
</div>
```
Closed by default, opens on click, one bar open at a time or many open at once — implementer's choice, since the brief specifies only "opens in place," not exclusivity.

## 4. Acceptance checks

1. Rainforest Discovery shows six tours (the original four plus White Hawk and Rio Claro), Ocean Discovery shows five, unchanged from `shared-sections.js` today.
2. Complementary Activities shows exactly eight bars, in the order given above, none with a green-to-blue gradient.
3. Every Complementary Activities bar opens in place with no page navigation and no booking link.
4. The line "Where the silence of the jungle speaks loudest" appears once, between the tabs component and Complementary Activities.
5. White Hawk Nature Trail and Rio Claro's body copy are identical to each other, matching the known source-site duplication rather than silently fixed.
6. Both new Rainforest Discovery entries carry the WhatsApp CTA, not a WeTravel booking link.
7. `shared-sections.js` is edited once, in place, so this change also appears identically anywhere else that mounts `data-shared="tours"` (currently `index.html` and `retreats.html`).
8. No em dash or en dash appears anywhere in this page's visible copy.

## 5. Out of scope

Sourcing real per-activity prices where the source copy has none, photography for any of the eleven tours or eight activities, rewriting the White Hawk / Rio Claro duplicate-copy bug.

## 6. Parking line

None. Everything this page needs already exists in source copy.

## 7. Build prompt

```
Read specs/of-v2-shell.md first and build this page on top of what it defines — reuse shell.css
and shell.js exactly as that spec describes. If ocean-forest-website/v2/shell.css and shell.js do
not exist yet, build them first, following of-v2-shell.md exactly, then build this page.

Read specs/of-v2-experiences.md in full and ocean-forest-website/shared-sections.js for the
existing tours component you are extending. Section 3 "Contracts" is literal: activity copy is
quoted from source-copy/com-copy.md and source-copy/org-copy.md and must match exactly, byte for
byte, including the known White Hawk / Rio Claro duplicate-copy bug — reproduce it, do not fix it.

Edit ocean-forest-website/shared-sections.js to add White Hawk Nature Trail and Rio Claro to the
TOURS.forest array (this change will also appear on the existing index.html and retreats.html —
that is intended, per the spec).

Build ocean-forest-website/v2/experiences.html: hero, the shared tours component
(<div data-shared="tours"></div>, loading ../shared-sections.js), the "Where the silence of the
jungle speaks loudest" line, the eight-bar Complementary Activities pattern (new page-scoped CSS,
prefix ea-, not reusing the sh- classes), and the shell's gallery section at offset 16.

When done, open ocean-forest-website/v2/experiences.html directly from Finder in a browser (no
server) and confirm the tabs switch between Rainforest and Ocean Discovery, White Hawk and Rio
Claro appear in the Rainforest tab, and all eight Complementary Activities bars open and close
correctly. List the eight acceptance checks from the spec and state pass/fail for each.
```
