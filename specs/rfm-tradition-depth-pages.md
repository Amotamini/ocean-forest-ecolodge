STATUS: DRAFT

# Rainforest Medicine — Tradition, preparation and talks

## 1. Goal

Give the site the depth behind the offer: correct botany, the preparation protocol published openly, and one place to find everything Jonathon has recorded.

## 2. Decisions

- Yagé-ocó is published as *Diplopterys longialata* (Huambisa type), with *Diplopterys cabrerana* named on the page as the name it is commonly published under and frequently conflated with.
- "var. huambisa" is dropped. Huambisa is a people and a trade name, not a validly published botanical variety.
- Seven misspelled binomials on the old site are corrected.
- The common name is spelled **chacruna** throughout, with "also written chakruna" noted once.
- The ayahuasca-versus-yagé distinction does not get a homepage section. It is a blog post, and the plants section links to it.
- The dieta protocol is **public**, not gated behind acceptance. It is a trust asset.
- The dieta appears twice: a short block on the homepage, and the complete document at `/preparation`. Nothing in the full document is cut, softened or summarised — it contains real medical contraindications.
- The talks page is its own page, linked from the nav and the footer.
- Podcasts and webinars stay long-form. No apology for length, no "short version" framing.
- The YouTube playlist currently sits on someone else's channel and is linked as-is, with permission.
- *The Yagé Drinker* PDF is free on their server and gets linked next to the book.

## 3. Contracts

Repo root: `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings/`
All copy in `lib/content.ts`. Depends on `specs/rfm-events-first-homepage.md` having landed first (it introduces `site.yageDrinkerPdf`, `site.spotifyShow`, `site.youtubePlaylist`).

### 3.1 `lib/content.ts` — replace `plants.list`

```ts
export const plants = {
  eyebrow: "The Plants",
  heading: "Sacred wisdom medicine plants",
  body: [
    "At the centre of the tradition is yagé — also known as ayahuasca — a rainforest vine, prepared together with the leaves of a companion plant. The brew is made on site in a remote jungle setting, in strict obedience to the ancestral methods passed down to the Siekopai people of the upper Amazon.",
    "Around it grows a whole garden the elders tend and know by name. Flower baths, incense cleansing and renewal ceremonies are carried out according to traditional ways — each plant kept and used as it has been for countless generations.",
  ],
  list: [
    { name: "Yagé · Ayahuasca", latin: "Banisteriopsis caapi", note: "“The vine of the soul.” Heirloom variety Sëñoyagé, the yellow yagé." },
    { name: "Yagé-ocó · Yají", latin: "Diplopterys longialata", note: "The leaf prepared with the vine — the Huambisa type. Commonly published as Diplopterys cabrerana; the two are closely similar and are frequently conflated." },
    { name: "Chacruna", latin: "Psychotria viridis", note: "Also written chakruna, and known in Kichwa as amiruka panga." },
    { name: "Achiote · Bonzá", latin: "Bixa orellana", note: "Seed of adornment and ceremony." },
    { name: "Wengaka · Piton · Cantsë", latin: "Grias neuberthii", note: "For healing, renewal and spiritual alignment." },
    { name: "Sanango", latin: "Tabernaemontana sananho", note: "A plant of the elders' garden." },
    { name: "Chiricguayusa · Ujajaí", latin: "Brunfelsia grandiflora", note: "For healing and spiritual alignment." },
    { name: "Waisamama · Guayusa", latin: "Ilex guayusa", note: "A dawn tea of the eastern forests." },
    { name: "Nuni · Piripiri", latin: "Cyperus spp.", note: "Dunduma (Yiyó'nuní) and Chikuru piripiri (Watí'nuni), sacred sedges of the upper Amazon." },
    { name: "Copal · Soho", latin: "Dacryodes peruviana", note: "Fragrant resin for cleansing smoke." },
    { name: "Guapinol", latin: "Hymenaea courbaril", note: "Of the elders' garden." },
    { name: "Carpenter's bush · Oco maña", latin: "Justicia pectoralis", note: "Of the elders' garden." },
    { name: "Holy Basil", latin: "Ocimum tenuiflorum", note: "Of the elders' garden." },
  ],
  footnote:
    "People often ask what the difference is between ayahuasca and yagé. It is a real question with a long answer.",
  footnoteLinkLabel: "Read: The Precarious Nature of Ayahuasca and Yagé",
  footnoteHref: "/blog/the-delicate-nature-of-ayahuasca-and-yage",
};
```

The strings `Diplopterys cabrerana` as a standalone identification, `Brunflesia`, `Dacryoydes`, `nueberthii`, `Hymenea`, `sanaho` and `Ocimum sanctum` must not survive anywhere in the repo. `Diplopterys cabrerana` may appear **only** inside the `Yagé-ocó` note above, as the conflated name.

### 3.2 `lib/content.ts` — new `dieta` (the short homepage block)

```ts
export const dieta = {
  eyebrow: "Preparation",
  heading: "The dieta",
  body: [
    "Preparation is not a formality. It begins two weeks before you arrive and it is what makes the work possible.",
    "In the fortnight before a gathering you set aside alcohol, aged cheese, refined sugar, fried, fermented, processed and canned food, chilli, garlic and onion, pork and processed meat, and all dairy. Nine days before, a short list of herbs and supplements goes too. On the day itself you fast.",
    "Some prescription medications and some medical conditions are not compatible with these ceremonies at all — several of them seriously. We ask about them in the application, and the complete protocol is published here in full so you can read it before you decide.",
  ],
  cta: "Read the full preparation protocol",
  href: "/preparation",
};
```

Rendered by a new `components/site/Dieta.tsx`, section `id="preparation"`, placed in `app/page.tsx` directly after `Plants`.

### 3.3 New page — `app/preparation/page.tsx`

Static page at `/preparation`. Content is the complete dieta protocol, ported verbatim in substance from `source-content/old-site-extract.md` §4, under these headings in this order:

1. Sexual activity — before, and after
2. Fasting on the day of ceremony
3. Food to avoid — 14 days before
4. Herbs and supplements to avoid — 9 days before
5. Medications — absolutely prohibited, 2+ months
6. Drugs — fatal risk, disqualifying
7. Medical contraindications (menstruation and ejaculation, pregnancy, children, asthma, diabetes, epilepsy, heart and cardiovascular, hypothyroidism, liver and kidney)
8. During ceremony — the five guidelines
9. After — the morning, and integration
10. General conduct during the dieta period
11. Facilitator discretion

Every named drug, every named food, every timeframe and every condition in §4 must appear. The page carries the same Nav and Footer as the homepage, and ends with an apply button using `applyMailto()` from `lib/apply.ts`.

Metadata: title "Preparation — the dieta | Rainforest Medicine Gatherings", description drawn from the first body line.

### 3.4 New page — `app/talks/page.tsx`

Static page at `/talks`, and a new `talks` export in `lib/content.ts`:

```ts
export const talks = {
  eyebrow: "Listen",
  heading: "Talks, webinars and conversations",
  body: [
    "Jonathon has been in conversation about these traditions for thirty years. The recordings are long on purpose — this is not material that compresses.",
  ],
  channels: [
    { label: "Rainforest Medicine Stories", platform: "Spotify", href: site.spotifyShow, note: "The webinar series and conversations." },
    { label: "Interviews and talks", platform: "YouTube", href: site.youtubePlaylist, note: "A playlist gathered by Oahu Holistic Medicine, shared with permission." },
  ],
  books: [
    { label: "Rainforest Medicine — the book", href: site.amazonUrl, note: "Preserving Indigenous Science and Biodiversity in the Upper Amazon." },
    { label: "The Yagé Drinker — free PDF", href: site.yageDrinkerPdf, note: "The autobiography of a Secoya shaman. Free to read." },
  ],
};
```

Add `{ label: "Talks", href: "/talks" }` to the footer links in `lib/content.ts`, and to `nav`.

### 3.5 `components/site/Book.tsx`

Add a secondary link beneath the existing Amazon button: *The Yagé Drinker* — free PDF, pointing at `site.yageDrinkerPdf`, opening in a new tab.

### 3.6 Route note

`nav` entries are currently in-page anchors (`#gathering`). `/talks` and `/preparation` are real routes. `components/site/Nav.tsx` must handle both — anchor links scroll, path links navigate. When on `/talks` or `/preparation`, anchor links must point at `/#gathering` rather than `#gathering` so they still work.

**Do not touch `app/layout.tsx`'s Redline block.** That file carries an uncommitted seven-line addition loading the Redline client-review widget. It is not in git. Leave it exactly as it is; do not reformat, reorder or remove it.

## 4. Acceptance checks

1. `npm run build` completes with no TypeScript or lint errors, and `/preparation` and `/talks` both appear in the build output as routes.
2. Grepping the repo returns zero matches for `Brunflesia`, `Dacryoydes`, `nueberthii`, `Hymenea`, `sanaho`, `Ocimum sanctum`, and `var. huambisa`.
3. The plants section names Yagé-ocó as *Diplopterys longialata* and, in the same entry, names *Diplopterys cabrerana* as the conflated name. `Diplopterys cabrerana` appears nowhere else in the repo.
4. `/preparation` contains all of: "Zoloft", "St. John's wort", "aged cheese", "pacemaker", "epilepsy", "hypoglycaemic", "14 days", "9 days", "two months" (or "2+ months").
5. The homepage has a Preparation section that links to `/preparation`.
6. `/talks` links to both the Spotify show URL and the YouTube playlist URL, and to both books including the free Yagé Drinker PDF.
7. From `/talks`, clicking a nav item that points at a homepage section navigates to the homepage and scrolls to that section.
8. The plants section links to the ayahuasca-versus-yagé article.

## 5. Out of scope

- The events block, hero and apply flow — `specs/rfm-events-first-homepage.md`.
- The blog itself — `specs/rfm-blog-migration.md`. Check 8 links to a route that spec creates; until it lands, that link 404s, which is expected.
- Uploading the webinars to Jonathon's own YouTube channel and building a new playlist.
- The Amaringo art gallery and any art sales.
- Rewriting the tradition copy already on the site — only the botany and the new sections change.

## 6. Parking line

Empty.

## 7. Build prompt

> Build the tradition, preparation and talks work for the Rainforest Medicine Gatherings site.
>
> The project is at `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings/` — a Next.js 15 App Router site in TypeScript and Tailwind, deployed on Vercel.
>
> The spec is at `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/specs/rfm-tradition-depth-pages.md`. Read it and implement it exactly. Section 3 gives you literal file paths, exact TypeScript shapes and exact copy — use them verbatim. Section 4 is the definition of done.
>
> The full source material is in `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings/source-content/old-site-extract.md`. Section 4 of that file is the dieta protocol and it is a safety document: every named drug, food, timeframe and medical condition in it must survive onto the `/preparation` page. Do not condense it, do not soften it, do not drop items to make it read better. If you find yourself summarising it, stop.
>
> Section 2 of that file explains a botanical naming decision that took real work to settle. Follow it exactly — do not "correct" *Diplopterys longialata* back to *cabrerana* because a source you find online says otherwise.
>
> Invent nothing about the medicine, the tradition or the plants. All copy lives in `lib/content.ts`; never hard-code prose into a component.
>
> The sandbox cannot reach npmjs.org or github.com. If you need a package install or a git push, stop and say so.
>
> Run `npm run build` when done and report which acceptance checks pass.
