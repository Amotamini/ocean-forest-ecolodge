STATUS: DRAFT

# Ocean Forest V2 — revisions, round two

Eight changes from Mehdi's review of 7 August, after the first revision round landed.

One of them, **D4**, has now been asked for three times and delivered wrong twice. Section 3.4
describes it in more detail than anything else here, because the fault has been the same both
times: the photograph keeps being put inside the expanding panel, and it does not belong there.

## 1. Goal

Close the eight items from the second review, and give Eli a way to change retreat prices herself
without touching the website.

## 2. Decisions

- **The policies are hosted by us, never linked to the old site.** Both texts are reproduced verbatim in 3.2 and go in as expandable sections at the foot of Lodging. Confirmed Q53. A separate page would be one more click at the exact moment somebody is deciding whether to book.
- **Retreats reuses the room photographs already in `media/lodging/`.** Confirmed Q54. No new files, and Retreats and Lodging can never show different rooms.
- **Light becomes the only theme. The toggle is removed.** Confirmed Q55. This does not reverse the 5 August decision, it completes it: light was already the default and dark was the option nobody asked for.
- **The dark CSS rules are left in place but made unreachable**, marked with a comment block for a later cleanup. Ripping every `body.light` conditional out of a stylesheet this size in the same pass as eight other changes is how something quietly breaks.
- **Retreat prices move to a published Google Sheet.** Mehdi builds the sheet and hands it to Eli finished. Confirmed Q56.
- **The calculator always falls back to its built-in prices** if the sheet cannot be read. A calculator that shows nothing is worse than one showing slightly old numbers.
- The standing rules in `of-v2-brief.md` section 2 apply. Absolute paths on `v2/index.html`. V2 never shares a file with V1. `media/` is additive only.

## 3. Contracts

### 3.1 D1 — arrows on the room galleries, `v2/lodging.html`

The room galleries built in the last round have dots. Add a left and a right arrow overlaid on the
photograph itself, vertically centred, one at each edge, in the classic pattern.

- Arrows and dots both work and stay in sync.
- Wraps around: right from the last photograph goes to the first.
- Real `<button>` elements with `aria-label="Previous photo"` and `"Next photo"`, keyboard reachable.
- Visible against both a light and a dark photograph: a semi-transparent dark circle with a light chevron, not a bare chevron.
- Hidden when a room has only one photograph.

### 3.2 D2 — the two policies, `v2/lodging.html`

Two expandable sections at the foot of the page, beside the rates, using the same expand-in-place
pattern the rest of the site uses. Closed by default. **No link to `oceanforest.org` anywhere.**

**Hold Harmless Agreement.** Verbatim, retrieved from the source 7 August 2026:

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

**Cancellation Policy.** Verbatim, retrieved from the source 7 August 2026:

> **PAYMENT AND CANCELLATION POLICIES**
>
> **Book a Stay Program / Independent Travelers**
>
> - 24 hours after your reservation: 100% of your reservation will be returned.
> - 30 days before your arrival date: 100% refund.
> - 29 days before your arrival date: 80% refund; your 20% deposit will be withheld.
> - If you cannot travel for reasons of health or force majeure, your deposit can be used to reschedule a visit within one year at currently listed rates.

**These are legal texts. Reproduce them exactly.** Do not shorten them, do not rewrite them into
the site's voice, do not fix their grammar, and do not apply the no-dash house rule to them. The
only permitted change is turning the source's `&` into `and` where it appears in a heading.

### 3.3 D3 — "Nourishing the soul", `v2/lodging.html`

The photograph beside this section becomes `.media-bleed .media-fade` from the treatments added in
the last round, matching the home's three blocks. Larger: minimum 60vh, running off the edge of the
viewport on its side, fading where it meets the text.

### 3.4 D4 — the Experiences accordion, `v2/experiences.html`

**Read this whole section before writing anything.** This has been asked for three times.

**What is wrong now.** The photograph is inside the expanding panel, so each activity's picture
appears underneath its own text when opened. That is not the reference and never was.

**What the reference actually does** — `oceanforestecolodge.com/experiences-tours/`:

The section is **two columns side by side**, roughly equal width.

- **Left column:** a vertical stack of full-width bars, one per activity, showing only its name.
- **Right column:** **one single large photograph**, roughly the full height of the section, which **lives outside the accordion entirely and never moves.**

When you click a bar, the bar expands downward in place to reveal that activity's text, and
**the photograph in the right column changes to that activity's photograph.** Clicking a different
bar collapses the first, expands the second, and swaps the photograph again.

**The photograph is a fixed frame whose contents change. It is not part of any panel.**

Behaviour:

- One panel open at a time. Never two.
- Opening a second closes the first.
- Clicking an open bar closes it. When nothing is open, the right column shows the first activity's photograph rather than going blank.
- Nothing open on page load. The photograph still shows the first activity.
- The photograph swaps with a short cross-fade, suppressed under `prefers-reduced-motion`.

Narrow windows: the two columns stack, photograph above the bar stack, and the photograph still
swaps on selection. It does **not** move inside the panels at any width.

Take the **pattern only**. The green-to-blue gradient bars belong to the old site. Use V2's teal,
V2's radius system, V2's type.

Activities in this order, copy verbatim from the `.com` page: Botanical Garden, Bat Cave, River
Walk, Drake Bay Walking, Horse Riding, Night Tour, Sierpe Mangrove Tour, Waterfall Hiking.

Bat Cave and Drake Bay Walking still have no photograph published anywhere. When either is
selected the right column shows a labelled placeholder naming the file it wants, exactly as
elsewhere on the site. Do not substitute another activity's photograph.

Markup: `<button aria-expanded>` plus a panel, not `<details>`, because one-open-at-a-time needs
managed state. Keyboard reachable. No scroll listeners.

### 3.5 D5 — the Retreats hero, `v2/retreats.html`

The first photograph becomes `media/property/shala-exterior.jpg`, which is Ryan's
`Gallery_04_DSC00775.jpg`, already on disk.

Cinematic, matching the home: `.media-band .media-fade`, full viewport width, minimum 70vh, with
the existing heading and intro laid **over** it behind a scrim rather than sitting beneath it.

### 3.6 D6 — Retreats accommodations, `v2/retreats.html`

The accommodation entries on Retreats currently have no photographs. Each gains one **behind its
text** — the photograph as the background of the card, text laid over it with a scrim for
legibility. Not a photograph beside text, not above it. Behind it.

Files, already on disk, no downloads:

| Entry | File |
|---|---|
| Beach Bungalows | `lodging/beach-bungalow-01.jpg` |
| Jungle Suites | `lodging/jungle-suite-01.jpg` |
| Quadruple Bungalow, Family Bungalows | `lodging/family-bungalow-01.jpg` |
| Lapa Lapa Rooms | `property/shala-exterior.jpg` |
| Garden Bungalow | `lodging/family-bungalow-02.webp` |

Contrast is the risk. Every card needs a scrim dark enough that the text passes WCAG AA against
the photograph behind it, checked at the lightest part of each image, not the average.

### 3.7 D7 — one theme, `v2/shell.js`, `v2/shell.css`, all six pages

- Remove the theme toggle button from the header on every page.
- Remove the `of-theme` localStorage read and write, and the `paintTheme` toggle handler.
- The `light` class is applied to `<body>` unconditionally in the markup, so the page is never briefly the wrong colour before script runs.
- Remove `☾` and `☀` and every string, label and `aria-label` belonging to the toggle.
- **Leave the dark CSS rules in place.** Wrap them in a comment block reading `Dark theme, unreachable since 2026-08-07. Kept for one cleanup pass; delete when confident.` Doing eight changes and a stylesheet gutting in the same build is how something breaks quietly.

Anyone who previously chose dark now sees light. That is intended.

### 3.8 D8 — retreat prices from a Google Sheet

**The file:** `Retreat calculator/retreat calculator.html`. Prices are hard-coded at lines 589 to
602 as `DEFAULT_ROOMS`, and the existing edit mode saves nowhere, so edits vanish on reload.

**The sheet.** `Retreat calculator/retreat-prices.csv` in this repo is the seed, already written
with today's twelve rooms. Mehdi imports it into Google Sheets, publishes it, and hands Eli the
finished thing. Column headers are exact and are a contract:

```
room,location,beds,max_guests,high_season_7n,green_season_7n
```

**How the calculator uses it:**

1. A single constant near the top of the file: `const PRICE_SHEET_URL = '...';` holding the
   published CSV address. One line to change if the sheet ever moves.
2. On load, `fetch` that URL.
3. Parse the CSV. Split on newlines, split on commas, first row is headers, match by header name
   rather than by column position so a reordered sheet still works.
4. A row is used only if `room` is non-empty and both prices parse as numbers. Bad rows are skipped
   and counted, never guessed at.
5. If the fetch fails, times out after 5 seconds, returns nothing usable, or yields zero valid
   rows, **fall back silently to `DEFAULT_ROOMS`.** Log to the console, show the visitor nothing.
6. `DEFAULT_ROOMS` stays in the file exactly as it is. It is the fallback, not dead code.
7. Everything downstream is unchanged: the per-night division by seven, edit mode, sorting, totals.

**Two constraints worth knowing before you write it:**

- Google caches a published CSV for a few minutes. A price change appears within about five minutes, not instantly. Do not build a cache-buster to fight this; it is fine and it protects the sheet from load.
- `fetch` from a page opened as `file://` will usually be blocked. **The calculator must be served over http to read the sheet.** Locally that means `python3 -m http.server`. This is worth a one-line comment at the top of the file so whoever opens it next is not baffled.

### 3.9 Unchanged

Everything above `ocean-forest-website/v2/`. Every file in `media/` — this build adds nothing and
changes nothing there. `arriving.html` and `about.html` unless the toggle removal in D7 touches
their headers. All page copy except the additions in D2. No new npm dependencies, no build step.

## 4. Acceptance checks

Checks 1 to 6 need a browser and are Mehdi's, on `http://localhost:8080/v2/`. Checks 7 and 8 are
the build thread's.

1. *(Mehdi)* Room galleries on Lodging have working arrows at both edges of the photograph as well as dots, they stay in sync, and they wrap.
2. *(Mehdi)* The Hold Harmless and Cancellation sections open at the foot of Lodging, are complete, and no link anywhere on the site points to `oceanforest.org`.
3. *(Mehdi)* "Nourishing the soul" bleeds off the edge and fades into the page, matching the home blocks.
4. *(Mehdi)* **On Experiences: the photograph is in its own column on the right, at full section height. Clicking a different activity changes that photograph and closes the previous panel. The photograph never appears inside a panel, at any window width.**
5. *(Mehdi)* Retreats opens with the shala photograph, full width, heading laid over it. Each accommodation card has its photograph behind the text and the text is readable.
6. *(Mehdi)* No theme toggle on any page. Every page loads light and stays light, including after a hard reload with a `dark` value still in localStorage.
7. *(build thread)* `grep -rn "of-theme\|themeBtn" v2/` returns nothing outside the commented-out dark block. `grep -rn "oceanforest.org" v2/` returns nothing.
8. *(build thread)* With the network unreachable, the calculator still renders all twelve rooms from `DEFAULT_ROOMS` and logs the failure rather than showing an error. `grep -c "DEFAULT_ROOMS" "Retreat calculator/retreat calculator.html"` is at least 3.

## 5. Out of scope

- Creating or publishing the Google Sheet. Mehdi does that and supplies the URL.
- Deleting the dark CSS. Later cleanup pass.
- The SVG maps, image compression, Featurable, the newsletter wiring, the arrival card PDFs.
- Bat Cave and Drake Bay Walking photographs. Neither exists anywhere.
- No commit, no push, no deploy. Mehdi reviews on localhost.

## 6. Parking line

- `PRICE_SHEET_URL` cannot be filled until Mehdi publishes the sheet. Until then, leave it as an empty string, which makes the fetch fail and the fallback engage. That is the correct behaviour and check 8 verifies it.

## 7. Build prompt

```
Read specs/of-v2-revisions-2.md. That spec is your ONLY input, plus specs/of-v2-brief.md
section 2 for the standing rules. Read nothing else.

This is a REVISION build. Change only what section 3 lists. Do not redesign anything not
named, do not improve anything you were not asked to improve, do not rewrite any copy.

READ SECTION 3.4 TWICE BEFORE TOUCHING THE EXPERIENCES PAGE. That change has been asked
for three times and built wrong twice, the same way both times: the photograph keeps
being placed inside the expanding panel. It does not go there. It lives in a SEPARATE
COLUMN on the right, at full section height, outside the accordion, and its contents swap
when a different activity is selected. If after reading 3.4 you are unsure what the layout
should be, STOP and ask rather than guessing. A fourth wrong version is worse than a
question.

Section 3.2 contains two legal texts. Reproduce them EXACTLY. Do not shorten, rewrite,
restyle or apply the no-dash house rule to them.

Files you may edit: the six HTML files in ocean-forest-website/v2/, v2/shell.css,
v2/shell.js, and "Retreat calculator/retreat calculator.html". Touch nothing else. Nothing
above ocean-forest-website/v2/ may be edited, and you add nothing to media/ in this build.

Standing rules, restated because they have each broken this site already:
  1. Every local reference in v2/index.html must be root-absolute. Relative paths make the
     home render with no stylesheet at all. Broken twice.
  2. V2 never shares a file with V1.
  3. media/ is additive only.

For D8, leave PRICE_SHEET_URL as an empty string. Mehdi has not published the sheet yet,
and an empty URL correctly triggers the fallback, which is what check 8 tests.

House rules: no language switcher, no em-dashes or en-dashes in UI copy you write (this
does NOT apply to the two legal texts), no new npm dependencies, no build step, no scroll
listeners, prefers-reduced-motion respected.

Run checks 7 and 8 yourself with evidence. Report checks 1 to 6 as "deferred to Mehdi".
Do NOT commit, do NOT push, do NOT deploy. When you finish, list every change against its
D-number.
```
