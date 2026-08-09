STATUS: SHIPPED 2026-08-05

All 8 acceptance checks passed, verified in a browser by the build thread on 2026-08-05.
One reconciliation was needed where the spec conflicts with itself: the source copy quoted in
Section 3 carries em dashes, en dashes and non-breaking hyphens, but check 8 forbids em/en dashes
on this page (the V2 house rule). Words are reproduced verbatim; only dash characters were
normalized (em/en dash to a comma or period, non-breaking hyphen to a plain hyphen). This also
removed the em dash from the shared tours photo-placeholder caption ("Name - photo 1 of 4"),
a one-character fix in shared-sections.js that improves index.html and retreats.html identically.
White Hawk and Rio Claro both carry the White Hawk body (org-copy line 337), identical to each
other per check 5, reproducing the source-site duplication rather than fixing it.

**REVISED 2026-08-09.** This page's most-repeated correction landed after this spec shipped: **D4**,
`of-v2-revisions-2.md` §3.4, which rebuilds the Complementary Activities section from bars-that-open-
with-photo-inside into two columns, the photograph in its own fixed column on the right, outside the
accordion, swapping contents on selection. It was asked for three times and built wrong twice the
same way, so it gets the fullest rewrite of anything below — read it twice before touching this page.
Also folded in: C16 (every empty placeholder filled from the client's own sites, real photographs now
in `media/experiences/`) and C17 (superseded by D4, kept here only as history). **This spec's original
instruction to load `../shared-sections.js` is also corrected** — that path resolves to the stale
34,757-byte app-root copy with four Rainforest Discovery tours and no photographs; the live page loads
its own `shared-sections.js` from inside `v2/` (40,525 bytes, six tours, `TOUR_PHOTOS`). Following the
original instruction silently loses two tours and every tour photograph. A rebuild from this document
now reproduces the live page rather than reverting it.

# A3 — Experiences

## 1. Goal

Give the three tour groups, Rainforest Discovery, Ocean Discovery, and Complementary Activities, one page each expanding in place, with Complementary Activities in the expandable-bar pattern from `.com`.

## 2. Decisions

- Built on the A0 shell, as `ocean-forest-website/v2/experiences.html`, hero slug `experiences`, gallery offset `16`.
- Three groups, in this order: Rainforest Discovery, Ocean Discovery, Complementary Activities.
- Rainforest Discovery folds the `.org` "At the Lodge" group into it — White Hawk Nature Trail and Rio Claro join the existing Rainforest Discovery tours already live in `shared-sections.js`.
- Rainforest Discovery and Ocean Discovery reuse the existing tab-plus-stage pattern already built in
  `shared-sections.js`'s `buildTours()` function, not a rebuild — this page mounts
  `<div data-shared="tours"></div>` and loads **`shared-sections.js`, V2's own copy inside `v2/`, not
  `../shared-sections.js`.** (Rewritten 2026-08-09 — the original `../shared-sections.js` instruction
  points at the stale app-root copy, 34,757 bytes, four Rainforest Discovery tours, no photographs.
  V2's own copy is 40,525 bytes, six tours, and carries `TOUR_PHOTOS`. Following the original
  instruction silently loses White Hawk, Rio Claro, and every tour photograph. This is also the
  standing rule: V2 never shares a file with V1, `of-v2-revisions.md` §2.)
- Complementary Activities is new markup, not reused from `shared-sections.js`, since nothing there
  covers it. **It is rebuilt as two columns, not a single stack of bars whose photo sits inside the
  opened panel** (rewritten 2026-08-09, D4 — superseding the original single-column contract below,
  which was built wrong twice on this exact point). See "Complementary Activities" in Section 3 for the
  full layout.
- Eight Complementary Activities, in this order (brief §6): Botanical Garden, Bat Cave, River Walk, Drake Bay Walking, Horse Riding, Night Tour, Sierpe Mangrove Tour, Waterfall Hiking.
- The line "Where the silence of the jungle speaks loudest" is kept, placed as a section-break line between Ocean Discovery and Complementary Activities, matching its position on `.com` (source-copy/com-copy.md line 604).
- **Every empty placeholder on this page is filled from the client's own sites** (C16,
  `of-v2-revisions.md` §3.6): real photographs now live in `media/experiences/`, fetched from
  `oceanforestecolodge.com` / `oceanforest.org` via their open WordPress media endpoint. Bat Cave and
  Drake Bay Walking are the two exceptions — neither has a photograph published anywhere, and each
  keeps a labelled placeholder naming the missing file rather than borrowing another activity's photo.

## 3. Contracts

### Hero
- Slug: `experiences`
- Eyebrow: `Tours & Adventures`
- `h1`: `Where the Silence of the Jungle Speaks Loudest`
- Sub: `Rainforest trails, ocean crossings, and everything in between. Every tour departs from the lodge.`

### Section order
1. Rainforest Discovery + Ocean Discovery (shared tabs component, `<div data-shared="tours"></div>`, loading `shared-sections.js` — V2's own copy in `v2/`, not `../shared-sections.js`)
2. "Where the silence of the jungle speaks loudest" break line
3. Complementary Activities (two columns: eight expandable bars left, one fixed swapping photograph right — see Section 3 below)
4. Gallery (shell-provided, offset 16)

### White Hawk Nature Trail and Rio Claro — added into `TOURS.forest` in `shared-sections.js`, appended after the existing four Rainforest Discovery entries (Corcovado National Park, Sirena, San Pedrillo, Goddess Jacuzzi), copy verbatim from source-copy/org-copy.md:
- **White Hawk Nature Trail** (lines 335–337): pill `White Hawk Trail`, meta `3 to 4 hours · 9 AM–12:30 PM or 2–5:30 PM`, body paragraph verbatim starting "Winding up behind the ecolodge...".
- **Rio Claro** — use the org-copy `/activities/` "Rio Claro – River and Rainforest Fun" entry (lines 147–153), which is a verbatim duplicate of White Hawk's body copy on the source site itself (flagged as a site bug in source-copy/org-copy.md line 133). Reproduce it as-is, duplicate copy and all — do not silently rewrite it, since the brief does not authorize new copy here. Pill: `Rio Claro`, same meta and body as White Hawk.
Both get a ghost CTA "Ask us on WhatsApp" → `https://wa.me/50687379416`, matching the pattern already used for un-bookable tours like Surf Tour at Rio Claro (`shared-sections.js` line 106).

### Complementary Activities — two columns, photograph fixed on the right, outside the accordion
(Rewritten 2026-08-09, D4, `of-v2-revisions-2.md` §3.4 — **read that section twice before touching
this page; it has been asked for three times and built wrong the same way twice, the photograph placed
inside the expanding panel.**)

The section is two columns side by side, roughly equal width:
- **Left column:** a vertical stack of full-width bars, one per activity, showing only its name —
  eight bars, in this exact order, copy verbatim from source-copy/com-copy.md lines 616–638:
  1. **Botanical Garden** — body: "Discover our Ethnobotanical Walk — a self-guided journey through Ocean Forest Ecolodge's living classroom of permaculture and rainforest wisdom. Wander lush gardens brimming with rare ancestral plants, learning their medicinal, edible, and sacred uses through captivating stories, myths, and hands-on tasting and preparation. Engage your senses as you smell, touch, and sip herbal infusions, exploring a vibrant collection that also nourishes our kitchen. Reconnect with the profound healing wisdom of the jungle and let nature be your ultimate teacher."
  2. **Bat Cave** — body verbatim from com-copy.md line 620.
  3. **River Walk** — body verbatim from com-copy.md line 622.
  4. **Drake Bay Walking** — body verbatim from com-copy.md line 625.
  5. **Horse Riding** — body verbatim from com-copy.md line 628.
  6. **Night Tour** — body verbatim from com-copy.md line 631.
  7. **Sierpe Mangrove Tour** — body verbatim from com-copy.md line 634.
  8. **Waterfall Hiking** — body verbatim from com-copy.md line 637.
- **Right column (`.ea-stage`):** **one single large photograph**, roughly the full height of the
  section, which **lives outside the accordion entirely and never moves.** It is a fixed frame whose
  contents change; it is not part of any bar's panel, at any window width.

Clicking a bar expands it downward in place to reveal that activity's text (each bar's open state also
shows the plain line `Book this one with us when you arrive.` — no booking link on any of the eight,
matching source-copy/com-copy.md line 119, "book on arrival") **and the photograph in `.ea-stage`
changes to that activity's photograph**, with a short cross-fade, suppressed under
`prefers-reduced-motion`. Clicking a different bar collapses the first, expands the second, and swaps
the photograph again. Clicking an open bar closes it; when nothing is open, the right column keeps
showing the first activity's photograph rather than going blank. Nothing is open on page load, but the
photograph still shows the first activity (Botanical Garden) from the start.

Photograph files, real and on disk in `media/experiences/` (C16): `activity-botanical-garden-01.jpg`,
`activity-river-walk-01.webp`, `activity-horse-riding-01.webp`, `activity-night-tour-01.webp`,
`activity-sierpe-mangrove-tour-01.jpg`, `activity-waterfall-hiking-01.webp`. **Bat Cave and Drake Bay
Walking have no photograph published anywhere** — when either is selected, `.ea-stage` shows a
labelled placeholder naming the missing file, exactly as elsewhere on the site. Do not substitute
another activity's photograph for either.

Narrow windows: the two columns stack, photograph above the bar stack, and the photograph still swaps
on selection. It does **not** move inside the panels at any width.

Markup: `<button aria-expanded>` plus a panel, not `<details>`, because one-open-at-a-time needs
managed state. Keyboard reachable. No scroll listeners.

### Bar markup pattern (new, page-scoped CSS class prefix `.ea-` to avoid colliding with `shared-sections.js`'s `.sh-` classes)
(Rewritten 2026-08-09 for D4 — each bar now carries `data-photo` and `data-photo-note` so the script
knows what to swap into `.ea-stage`, and the fixed photograph frame sits after the bar list, outside
it, in the same section wrapper.)
```html
<div class="ea-bar" data-open="false" data-photo="experiences/activity-botanical-garden-01.jpg" data-photo-note="The ethnobotanical garden at Ocean Forest Ecolodge">
  <button class="ea-bar-head" type="button" aria-expanded="false">
    <span class="ea-bar-name">Botanical Garden</span>
    <span class="ea-arrow" aria-hidden="true">›</span>
  </button>
  <div class="ea-bar-body">
    <p>[body copy]</p>
    <p class="ea-bar-note">Book this one with us when you arrive.</p>
  </div>
</div>
<!-- ...seven more .ea-bar entries... -->

<!-- The fixed photo frame. Outside the bar stack, one per section, never
     inside a panel. A small inline script fills and swaps it on bar click. -->
<div class="ea-stage">
  <div class="ea-stage-inner" id="eaStage" aria-live="polite"></div>
</div>
```
**One bar open at a time, never two — this is exclusive, not "opens in place" with no limit.**
(Rewritten 2026-08-09 — the original spec left exclusivity as the implementer's choice; D4 requires it,
since only one photograph can be on stage at once.) Closed by default; nothing open on page load, but
`.ea-stage` still shows Botanical Garden's photograph from the start.

## 4. Acceptance checks

**Run these over http, not from Finder** (A0 §4) — `python3 -m http.server 8080`, then
`http://localhost:8080/v2/experiences.html`.

1. Rainforest Discovery shows six tours (the original four plus White Hawk and Rio Claro), Ocean Discovery shows five, from `v2/shared-sections.js` — **not** the app-root `../shared-sections.js`, which has only four Rainforest Discovery tours and no photographs. *(Rewritten 2026-08-09 to name the correct file; see the STATUS note above.)*
2. Complementary Activities shows exactly eight bars, in the order given above, none with a green-to-blue gradient.
3. **On Experiences: the photograph is in its own column on the right, at full section height. Clicking a different activity changes that photograph and closes the previous panel. The photograph never appears inside a panel, at any window width.** Only one bar is open at a time; clicking an open bar closes it and the stage keeps showing the last activity's photo, not a blank frame; nothing is open on load but the stage still shows Botanical Garden. *(Rewritten 2026-08-09 for D4 — this is the check that matters most on this page. The original check only required "opens in place with no page navigation," which the two wrong builds both technically passed.)*
4. The line "Where the silence of the jungle speaks loudest" appears once, between the tabs component and Complementary Activities.
5. White Hawk Nature Trail and Rio Claro's body copy are identical to each other, matching the known source-site duplication rather than silently fixed.
6. Both new Rainforest Discovery entries carry the WhatsApp CTA, not a WeTravel booking link.
7. `v2/shared-sections.js` is edited once, in place. **This is V2's own copy and does not touch the
   app-root `shared-sections.js`** that V1's root `index.html` and root `retreats.html` load.
   *(Rewritten 2026-08-09 — the original check claimed this edit "also appears identically on `index.html`
   and `retreats.html`," which was true only before V2 got its own copy of the file. It no longer is;
   V2 never shares a file with V1, per the standing rule.)*
8. Every activity bar's photograph is real, sourced from `media/experiences/`, except Bat Cave and
   Drake Bay Walking, which show a labelled placeholder naming the missing file rather than an
   invented or borrowed photo. *(Added 2026-08-09 for C16.)*
9. No em dash or en dash appears anywhere in this page's visible copy.

## 5. Out of scope

Sourcing real per-activity prices where the source copy has none, photography for the tours (as opposed to the eight complementary activities, C16 covers those), rewriting the White Hawk / Rio Claro duplicate-copy bug, sourcing Bat Cave and Drake Bay Walking photographs (neither exists anywhere, per C16's own search).

## 6. Parking line

None. Everything this page needs, including the activity photographs, exists as of 2026-08-09.

## 7. Build prompt

```
Read specs/of-v2-shell.md first and build this page on top of what it defines — reuse shell.css
and shell.js exactly as that spec describes. If ocean-forest-website/v2/shell.css and shell.js do
not exist yet, build them first, following of-v2-shell.md exactly, then build this page.

Read specs/of-v2-experiences.md in full and ocean-forest-website/v2/shared-sections.js — V2's OWN
COPY, inside v2/ — for the existing tours component you are extending. Do NOT read or edit
ocean-forest-website/shared-sections.js at the repo root; that is V1's file, shared by V1's
index.html and retreats.html, and V2 never shares a file with V1. Section 3 "Contracts" is
literal: activity copy is quoted from source-copy/com-copy.md and source-copy/org-copy.md and
must match exactly, byte for byte, including the known White Hawk / Rio Claro duplicate-copy bug —
reproduce it, do not fix it.

Edit ocean-forest-website/v2/shared-sections.js to add White Hawk Nature Trail and Rio Claro to
the TOURS.forest array (this change will also appear on v2/retreats.html, which mounts the same
component from the same file — that is intended).

READ SECTION 3's "Complementary Activities" TWICE BEFORE WRITING ANY CODE FOR IT. This has been
asked for three times and built wrong twice, the same way both times: the photograph placed
inside the expanding panel. It does not go there. Build TWO COLUMNS: a left column of eight
exclusive-open bars, and a right column (.ea-stage) with ONE photograph, outside the accordion,
at full section height, that swaps contents when a different bar is selected and never moves
inside a panel at any width. If after reading it twice you are unsure of the layout, STOP and ask
rather than guessing — a fourth wrong version is worse than a question.

Build ocean-forest-website/v2/experiences.html: hero, the shared tours component
(<div data-shared="tours"></div>, loading shell.js and shared-sections.js as same-directory
references — both are v2/'s own files), the "Where the silence of the jungle speaks loudest"
line, the two-column Complementary Activities pattern described above (new page-scoped CSS,
prefix ea-, not reusing the sh- classes; real photographs from media/experiences/ for six of the
eight activities, a labelled placeholder for Bat Cave and Drake Bay Walking), and the shell's
gallery section at offset 16.

Every local reference is root-absolute (/v2/shell.css, /media/experiences/...). Never a ../ climb.

When done, serve the folder over http (python3 -m http.server 8080) and open
http://localhost:8080/v2/experiences.html. Do NOT test by double-clicking the file — every local
reference is root-absolute and will 404 over file://. Confirm the tabs switch between Rainforest
and Ocean Discovery, White Hawk and Rio Claro appear in the Rainforest tab, and clicking each of
the eight Complementary Activities bars closes any other open bar and swaps the right-column
photograph, at both a wide and a narrow window width. List the nine acceptance checks from the
spec and state pass/fail for each.
```
