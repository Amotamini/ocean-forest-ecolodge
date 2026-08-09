STATUS: DRAFT

# Ocean Forest V2 — revisions

Eighteen changes from Mehdi's review of 2026-08-07, plus one rebuild: **the home is rebuilt from
V1's home, not patched.**

## Why the home is rebuilt rather than patched

V2's home was written by a thread instructed to "summarise from the five built pages." V1's
`index.html` was not in that thread's reading list, so it wrote a new home instead of evolving the
one that already worked. That instruction was the error, and this spec corrects it.

V1's home is better in specific, nameable ways: the eyebrow line locating the lodge, the video
playing behind, the two path boxes sitting **on** the hero as translucent panels rather than as
white cards below the fold, and the monthly-rates line. All of it is restored.

**Rule for this build: start from `ocean-forest-website/index.html` and change only what is listed
here.** Do not redesign anything not named below.

## 1. Goal

Bring V2 back to what was actually agreed: V1's home treatment with V2's copy, and eighteen
specific corrections across the other five pages.

## 2. Decisions

- **The home's hero is V1's hero, verbatim in structure, with V2's words.** Confirmed by Mehdi, Q47.
- **Rates disappear from Lodging's "What It Costs" section entirely.** The prices already appear higher up the page, so the section is duplication. Confirmed by Mehdi, Q48. Nothing else about pricing changes.
- **Room galleries use the four photographs per room type already downloaded.** No new photography needed. Confirmed by Mehdi, Q49.
- **`Gallery_01`, the group walking on the sand, stays** on "What Happens When You Land." It is the one photograph that makes the twenty minute walk look easy. Confirmed by Mehdi, Q50.
- **Three photo treatments, used deliberately rather than uniformly.** Bleed-to-edge for paired content, full-bleed band for single moments, soft inner fade on both. Detailed in 3.2.
- **Arriving's maps are built by us as SVG, not commissioned and not interactive.** Every coordinate is public. Reasoning in 3.4. **Not in this build** — this spec only removes the broken pieces and leaves the slots clean.
- **The standing rules in `of-v2-brief.md` section 2 apply and have bitten this project three times.** Absolute paths on `v2/index.html`. V2 never shares a file with V1. `media/` is additive only. Test the deployed URL, not the local file.

## 3. Contracts

### 3.1 The home — `v2/index.html`

**Source of truth for the hero: `ocean-forest-website/index.html`, the `<div class="hero">` block
and every CSS rule it depends on.** Read it, port it, do not reinvent it. It is open at the top of
that file and runs to `</div>` before `<main>`.

Port these, structurally unchanged: `.hero`, `.hero-still`, `.hero-video` with its iframe,
`.hero-scrim`, `.hero-inner`, `.fork`, `.fork-grid`, `.path`, `.path-kicker`, `.path-title`,
`.path-desc`, `.path-arrow`, `.fork-extra`. Their CSS goes into `v2/shell.css` or the page's own
style block, whichever matches how V2 already organises itself. **Do not copy V1's CSS wholesale**;
take only the rules these classes need.

**What changes from V1:**

| | V1 | V2 keeps |
|---|---|---|
| Eyebrow | `Drake Bay · Osa Peninsula · Costa Rica · Since 2003` | **restored exactly** |
| `<h1>` | "Your Beachfront Ecolodge at the Edge of *Corcovado National Park*" | **V2's**: `Your beachfront ecolodge at the edge of Corcovado National Park.` |
| Sub | the long four-sentence paragraph | **V2's**: `The most biodiverse place on Earth. No roads. No crowds. Just jungle.` |
| Stay box | "I want to stay" / 10 rooms surrounded by… | **V2's**: kicker `I WANT TO STAY`, title `Ten rooms on a remote mile of beach.`, desc `Choose how you travel. Beach bungalows, jungle suites, and family bungalows, all steps from the Pacific.`, arrow `See the rooms` |
| Retreat box | "I want to lead the retreat they'll never forget." | **V2's**: kicker `I WANT TO LEAD A RETREAT`, title `You bring your program. We handle everything else.`, desc `Exclusive use for groups up to 32, a beachfront yoga shala, and a team that runs the logistics.`, arrow `Plan a retreat` |
| `.fork-extra` | `Staying longer? Ask us about monthly rates.` → `mailto:eli@oceanforest.org?subject=Monthly%20stay%20enquiry` | **restored exactly, link and all** |
| Stay box target | the booking engine directly | **`/v2/lodging.html`** — V2 has a Lodging page and the box says "See the rooms" |
| Retreat box target | `/retreats` | **`/v2/retreats.html`** |

`.fork-label` reading `Why Ocean Forest Ecolodge?` is **dropped**. V2's boxes carry their own
kickers and the label is redundant.

**WATCH THE FULL FILM** stays, placed between the sub-headline and the fork, smaller than it is now
so it does not compete with the boxes. If it crowds the hero at 1280px wide, move it below the fork
rather than deleting it.

**Everything below the hero stays as V2 has it**: the room cards, the three blocks, reviews,
gallery, newsletter. Only the three blocks change, per 3.2.

**Every local reference on this page must be root-absolute.** `/v2/shell.css`, `/v2/shell.js`,
`/v2/lodging.html`, `/images/logo-white.png`. This has been broken and re-broken twice. See the
standing rules in the brief.

### 3.2 The three photo treatments

Three named treatments. Add them to `v2/shell.css` as reusable classes so the same look can be
applied later without reinventing it.

**`.media-bleed`** — the photograph runs off one edge of the viewport, text occupies the remaining
column, and consecutive uses alternate sides. No visible rectangle on the outer edge. Implemented
with a grid whose image column extends past the wrapper using `margin-inline-start: calc(50% - 50vw)`
or its end equivalent. Minimum image height 60vh on desktop; stacks to full width above the text on
narrow windows.

**`.media-band`** — the photograph spans the full viewport width, edge to edge, with text laid over
it and a scrim behind the text for legibility. Minimum 70vh. On narrow windows the text sits below
the image rather than over it.

**`.media-fade`** — a modifier for both. The edge where the photograph meets text fades into the
page background using a `mask-image` linear gradient, roughly 12% of the image width. **This is the
rule that actually removes the "box" feeling** and it goes on every photograph both treatments touch.

Where each is used:

| Change | Where | Treatment |
|---|---|---|
| **C4** | Home, the three blocks: cuisine, tours, retreats | `.media-bleed .media-fade`, alternating sides down the page |
| **C7** | Arriving, "What Happens When You Land" | `.media-band .media-fade` |
| **C18** | About, first photo after the hero | `.media-band .media-fade` |

`prefers-reduced-motion` is respected: no parallax, no `background-attachment: fixed`, no scroll
listeners. These are layout treatments, not motion.

### 3.3 Arriving — `v2/arriving.html`

- **C5.** Hero image becomes `media/hero/hero-wide.jpg`, which is `Hero_DSC00779.jpg`, already on disk at 2048×857 and cut for a hero band.
- **C6.** Delete the `arriving/arrival-gate.jpg` block entirely, **and close the vertical gap it leaves above "Four Routes, One Beach"**. Do not leave an empty section wrapper behind. `media/arriving/arrival-gate.jpg` stays on disk, unused.
- **C7.** "What Happens When You Land" keeps `arriving/beach-walk.jpg` and gains `.media-band .media-fade`.
- **C8.** Who To Call:
  - **Sansa Airlines** — the label becomes `Sansa Airlines, the airline between Drake Bay and San José`. Numbers unchanged, `(unconfirmed)` markers unchanged.
  - **Drake Bay Taxi** — the whole entry is removed.
  - **Tracopa Bus Lines** — gains `https://www.tracopacr.com/` as a link on the name.
- **C9.** Remove the entire "Traveling as a group?" block, including its heading, its "Copy for this section is still being written" line and the `[Group Travel CTA - Eli]` placeholder. Close the gap.

### 3.4 Arriving's maps — recorded, not built here

Not in this build. Recorded so the decision is not lost.

The three maps are built by us as **hand-drawn SVG, deliberately non-interactive**. Nothing is
needed from Eli and nothing from Google. Every coordinate is public: San José, Palmar Sur, Palmar
Norte, Sierpe, Drake Bay, Corcovado, and the lodge at `8.6957, -83.675`, which is already in the
site's own footer link.

Non-interactive on purpose: these maps answer one question each in about three seconds, and an
interactive map invites exploring, which is the opposite of *this is simple, do not worry.* It also
fails completely on the connection this page exists to reassure people about. SVG is additionally
the only format where one file can light the chosen route and hide the others.

This build leaves `arriving/map-region.jpg` exactly as it is.

### 3.5 Lodging — `v2/lodging.html`

- **C11.** Remove the paragraph beginning `Located plumb in a remote mile of coconut-laddered beach…` in full.
- **C12.** Move the whole "Choose your perfect room" section so it sits **directly beneath the nature warning**, above everything else on the page.
- **C13.** All three room types render **expanded by default**, photographs visible with no click. The expand and collapse control stays and still works; only the starting state changes.
- **C14.** Each room gets a clickable gallery rather than one photograph. Files are already on disk:
  - Beach Bungalows: `lodging/beach-bungalow-01.jpg`, `-02.webp`, `-03.webp`, `-04.webp`
  - Jungle Suites: `lodging/jungle-suite-01.jpg`, `-02.webp`, `-03.webp`, `-04.webp`
  - Family Bungalows: `lodging/family-bungalow-01.jpg`, `-02.webp`, `-03.webp`, `-04.webp`

  Reuse the existing per-tour photo-slider pattern in `shared-sections.js` rather than inventing a
  second one: one large photograph, dots or arrows beneath, click to change. Keyboard reachable,
  and `prefers-reduced-motion` respected.
- **C15.** Remove the "What It Costs" section entirely. Confirmed by Mehdi: the prices already appear higher up the page. Nothing else about pricing changes and no price is added anywhere.

### 3.6 Experiences — `v2/experiences.html`

- **C16.** Every empty placeholder on this page is filled from `oceanforestecolodge.com` and `oceanforest.org`. **Nothing is left hanging empty.** You have network access. The WordPress REST endpoint `https://www.oceanforestecolodge.com/wp-json/wp/v2/media?per_page=100&search=<term>` is open and returns `source_url` for every match, which is the fastest route to the lazy-loaded images. Store under `media/experiences/`. If a tour genuinely has no photograph anywhere, it keeps a labelled placeholder and is named in your closing report.

- **C17.** **"Activities that awaken the wild soul" is rebuilt as the accordion from `oceanforestecolodge.com/experiences-tours/`.** This has been asked for repeatedly and not delivered.

  The pattern, exactly:
  - A vertical stack of full-width bars, one per activity, each showing only the activity name.
  - Click a bar and it expands in place to reveal its description and its photograph.
  - **Click another and the first collapses.** One open at a time, never two.
  - Clicking an open bar closes it, leaving none open.
  - None open on load.

  Take the **pattern only**. The green-to-blue gradient belongs to the old site; use V2's teal and
  V2's radius system.

  Activities, in this order: Botanical Garden, Bat Cave, River Walk, Drake Bay Walking, Horse
  Riding, Night Tour, Sierpe Mangrove Tour, Waterfall Hiking. Copy comes verbatim from the `.com`
  page.

  Built with `<button aria-expanded>` and a panel, not `<details>`, because one-open-at-a-time needs
  the state managed. Keyboard reachable. No scroll listeners.

### 3.7 About — `v2/about.html`

- **C18.** The first photograph after the hero, currently `property/shala-exterior.jpg`, gains `.media-band .media-fade` and the full-bleed treatment from 3.2.

### 3.8 Unchanged

Everything in `ocean-forest-website/` above `v2/`. Every file in `media/` — this build adds
Experiences photographs and touches nothing else. `retreats.html`. Every spec. `vercel.json`. All
page copy except the specific removals listed above. No new npm dependencies, no build step.

## 4. Acceptance checks

Checks 1 to 7 need a browser and are Mehdi's, run against `http://localhost:8080/v2/`. Check 8 is
the build thread's.

1. *(Mehdi)* The home hero shows the eyebrow `Drake Bay · Osa Peninsula · Costa Rica · Since 2003`, the video playing behind it, both path boxes sitting **on** the hero as translucent panels, and `Staying longer? Ask us about monthly rates.` beneath them. The boxes carry V2's wording, not V1's.
2. *(Mehdi)* The three home blocks alternate sides, run off the edge of the window, and have no visible rectangle edge against the text.
3. *(Mehdi)* Arriving opens with `hero-wide.jpg`. The arrival-gate photo is gone with no gap left above "Four Routes, One Beach". "Traveling as a group?" is gone entirely. "What Happens When You Land" is full width with the beach-walk photo.
4. *(Mehdi)* Who To Call: Sansa is described as the Drake Bay to San José airline, Drake Bay Taxi is absent, Tracopa's name links to its site.
5. *(Mehdi)* On Lodging, "Choose your perfect room" sits directly under the warning, all three room types are already open, each shows a gallery of four photographs you can click through, the coconut-laddered paragraph is gone and "What It Costs" is gone.
6. *(Mehdi)* On Experiences, clicking an activity bar opens it; clicking a second closes the first. Never two open at once. None open on load. No empty placeholder anywhere on the page.
7. *(Mehdi)* About's first photograph is full width and fades into the page rather than ending at a hard edge.
8. *(build thread)* `grep -o -E '(src\|href)="[^"/#][^"]*"' v2/index.html | grep -v -E 'https?:|mailto:|tel:'` returns nothing, proving every local reference on the home is absolute. `git status --porcelain` shows no change to any file above `ocean-forest-website/v2/` other than additions under `media/`. `grep -rn "addEventListener('scroll'" v2/` returns nothing.

## 5. Out of scope

- Building the SVG maps. Recorded in 3.4, built later.
- Image compression. `media/` is 52MB and needs a pass, separately.
- Featurable, the newsletter endpoint, the arrival card PDFs.
- Retreats page. No changes requested.
- Anything above `ocean-forest-website/v2/`.
- No commit, no push, no deploy. Mehdi reviews on localhost first.

## 6. Parking line

Empty.

## 7. Build prompt

```
Read specs/of-v2-revisions.md. That spec is your ONLY input, plus the two files it tells
you to read: ocean-forest-website/index.html (V1, for the hero you are porting) and
specs/of-v2-brief.md section 2 (the standing rules). Read nothing else.

This is a REVISION build. Change only what section 3 lists. Do not redesign anything not
named there, do not improve anything you were not asked to improve, and do not
"summarise" or rewrite any copy. A previous build on this project rewrote the home from
scratch when it should have evolved the existing one, and that is the single thing this
spec exists to undo.

Section 3.1 is the important one: the home's hero is PORTED from V1's index.html, keeping
its structure and CSS classes, with V2's words substituted per the table. Read V1's hero
block first and work from it. Do not write a new hero.

Files you may edit: the six HTML files in ocean-forest-website/v2/, v2/shell.css,
v2/shell.js. You may ADD image files under ocean-forest-website/media/. Touch nothing
else. NOTHING above ocean-forest-website/v2/ may be edited - V1 is live and a V2 build
has already leaked into it once on this project.

Three standing rules that have each broken this site already, restated because they will
not be obvious from the code:
  1. Every local reference in v2/index.html must be root-absolute (/v2/shell.css,
     /v2/lodging.html, /images/logo-white.png). Relative paths make the home render with
     NO stylesheet, because vercel.json sets trailingSlash:false. Broken twice already.
  2. V2 never shares a file with V1. v2/ has its own shared-sections.js copy.
  3. media/ is additive only. Never rename, move or delete a file already there.

You have network access and need it for C16: fill every empty placeholder on the
Experiences page from the client's own sites. The WordPress REST endpoint at
/wp-json/wp/v2/media?per_page=100&search=<term> on oceanforestecolodge.com is open and is
the fastest way to the lazy-loaded images. If something genuinely has no photograph
anywhere, leave a labelled placeholder and name it in your report. Do NOT substitute a
similar image to fill a frame.

C17 has been asked for several times and not delivered. Read 3.6 twice. One panel open at
a time, none open on load, opening a second closes the first. The pattern comes from
oceanforestecolodge.com/experiences-tours/, the styling does not.

House rules: light default theme, no language switcher, no em-dashes or en-dashes in UI
copy you write, no new npm dependencies, no build step, no scroll listeners,
prefers-reduced-motion respected.

Run check 8 yourself and report it with evidence. Checks 1 to 7 need a browser and are
Mehdi's - report them as "deferred to Mehdi". Do NOT commit, do NOT push, do NOT deploy.
Mehdi reviews on localhost first. When you finish, list every change you made against its
C-number so he can check them off.
```
