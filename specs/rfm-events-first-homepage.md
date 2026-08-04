STATUS: SHIPPED 2026-08-02

# Rainforest Medicine — Events-first homepage

## 1. Goal

Turn the Rainforest Medicine Gatherings homepage from a page that describes a tradition into a page that sells the two upcoming gatherings.

## 2. Decisions

- The site's single job is to fill the two 2027 gatherings. Everything else is depth behind that.
- Prices go on the page. $2,700 and $999, printed, not "contact us for pricing."
- Two gatherings only. There is no third, and the past July 2026 gathering is deleted.
- 12 places per gathering, stated on each card.
- What's included stays as visible placeholder text until Jonathon supplies it — placeholders are better than invented content on a page about medicine.
- Booking is an email application today. No payment, no Stripe, no form service.
- The application email is pre-filled with the health screening questions, because the dieta protocol makes several conditions disqualifying and finding that out after someone has committed is worse for everyone.
- Minimum age to participate is 18.
- Every line telling the visitor there is no schedule, no checkout, no roster and no tickets is deleted. They actively tell people to leave.
- The site is named "Rainforest Medicine Gatherings" everywhere. "Rainforest Medicine Council Gatherings" is retired.
- Elder attendance is NOT stated as guaranteed, because it is not guaranteed.
- Testimonials get a real section with placeholder cards. Mehdi has written ones to drop in.
- `/teachers/` from the old site becomes a section on this page, not its own page.
- The hero takes venue footage when it exists; until then it keeps the current still and the video field stays empty.
- The Teachers section shows **six** people from the old `/teachers/` page, not all thirty — the rest are the ecolodge's yoga and bodywork teachers and would bury the gathering team. Bios are the old page's own words. Framed as who carries this work, never as a confirmed line-up for the 2027 dates. Decided 2026-08-02, after the first build shipped it empty on a mistaken claim that the source page had no profiles.
- Written for someone who has never heard of Jonathon. His existing audience is the second reader, not the first.

## 3. Contracts

Repo root: `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings/`
Stack: Next.js 15 App Router, TypeScript, Tailwind. Deployed on Vercel and Netlify.
All copy lives in `lib/content.ts`. Components read from it and contain no hard-coded prose.
Images are already local under `public/images/processed/` and are loaded through `components/ui/Photo.tsx` by `name`.

### 3.1 `lib/content.ts` — replace `site`

```ts
export const site = {
  name: "Rainforest Medicine Gatherings",
  fullName: "Rainforest Medicine Gatherings",
  email: "info@rainforestmedicine.net",
  location: "Ocean Forest Ecolodge · Osa Peninsula, Costa Rica",
  amazonUrl: "https://www.amazon.com/Rainforest-Medicine-Preserving-Indigenous-Biodiversity/dp/158394608X",
  yageDrinkerPdf: "https://rainforestmedicine.net/wp-content/uploads/2018/11/The-Yage-Drinker.pdf",
  conservationUrl: "https://www.4biodiversity.org/",
  guayusaUrl: "https://www.guayusatea.com/",
  spotifyShow: "https://open.spotify.com/show/3pDptpM8S7ZlBFNgG7qjRY",
  youtubePlaylist: "https://www.youtube.com/playlist?list=PLF8zIucJH_rqJ-H0XS0OxLmbRV8uLJn2x",
  heroVideoSrc: "", // empty = still image fallback. Set to an /videos/*.mp4 path when Ryan's film lands.
};
```

The string "Rainforest Medicine Council Gatherings" must not appear anywhere in the repo after this change, including `app/layout.tsx` metadata and the JSON-LD in `app/page.tsx`.

### 3.2 `lib/content.ts` — replace `hero`

```ts
export const hero = {
  eyebrow: "The Upper Amazon · Osa Peninsula, Costa Rica",
  title: "Rainforest Medicine Gatherings",
  subtitle:
    "Experiential ceremonial gatherings for personal, community and planetary renewal — held in the living plant-medicine traditions of the upper Amazon.",
  nextLabel: "Next gathering",
  nextLine: "The Celestial Summer of the Cicadas · January 24 – 31, 2027 · Osa Peninsula, Costa Rica",
  cta: "Reserve your place",
  ctaHref: "#upcoming",
  ctaSecondary: "See both gatherings",
};
```

`components/site/Hero.tsx`: the existing "Begin a conversation" button becomes the `cta`, and its `href` becomes `hero.ctaHref` (an in-page anchor, not a mailto). `nextLabel` + `nextLine` render as a single line directly beneath `subtitle`, above the button.

### 3.3 `lib/content.ts` — replace `gatherings`

```ts
export type Gathering = {
  id: string;
  title: string;
  dates: string;
  place: string;
  price: string;
  places: string;
  includes: string[];
  note?: string;
};

export const gatherings = {
  eyebrow: "Upcoming Gatherings",
  heading: "Two gatherings in 2027",
  intro:
    "Each gathering is limited to twelve people. Participation is by application — write to us and we will take you through the preparation.",
  upcoming: [
    {
      id: "cicadas-2027",
      title: "The Celestial Summer of the Cicadas",
      dates: "January 24 – 31, 2027",
      place: "Ocean Forest Ecolodge · Osa Peninsula, Costa Rica",
      price: "$2,700",
      places: "12 places",
      includes: [
        "PLACEHOLDER — what this includes, to be supplied by Jonathon",
        "PLACEHOLDER — accommodation, meals, ceremonies, transfers?",
        "PLACEHOLDER — what is not included",
      ],
    },
    {
      id: "cocoterra-2027",
      title: "Cocoterra Rainforest Camping",
      dates: "February 2 – 7, 2027",
      place: "Osa Peninsula, Costa Rica",
      price: "$999",
      places: "12 places",
      includes: [
        "PLACEHOLDER — what this includes, to be supplied by Jonathon",
        "PLACEHOLDER — camping, meals, ceremonies?",
        "PLACEHOLDER — what is not included",
      ],
    },
  ] as Gathering[],
  cta: "Apply for this gathering",
};
```

Placeholder strings must be visually marked in the UI (dashed border or muted italic) so nobody mistakes them for finished copy.

### 3.4 `lib/content.ts` — new `apply`

```ts
export const apply = {
  eyebrow: "Taking Part",
  heading: "How to join",
  steps: [
    { n: "01", title: "Write to us", text: "Send the application below. Tell us who you are and what is calling you." },
    { n: "02", title: "A conversation", text: "We speak with you directly. This is a mutual decision, not a checkout." },
    { n: "03", title: "Your place is held", text: "Once accepted, we confirm your place and send the full preparation." },
    { n: "04", title: "The dieta begins", text: "Preparation starts two weeks before you arrive. We walk it with you." },
  ],
  ageNote: "Participants must be 18 or over.",
  healthNote:
    "Some medical conditions and medications are not compatible with these ceremonies. The application asks about them, and the full preparation protocol is published openly on this site.",
  cta: "Send an application",
};
```

### 3.5 The application mailto

One shared helper, `lib/apply.ts`, used by every apply button on the site:

```ts
import { site } from "./content";

export function applyMailto(gatheringTitle?: string) {
  const subject = gatheringTitle
    ? `Application — ${gatheringTitle}`
    : "Application — Rainforest Medicine Gathering";
  const body = [
    "Please answer as fully as you can. Everything here is held in confidence.",
    "",
    "Full name:",
    "Age (participants must be 18 or over):",
    "Country / city:",
    "Which gathering: " + (gatheringTitle ?? ""),
    "",
    "What is calling you to this gathering:",
    "Previous experience with plant medicine, if any:",
    "",
    "— Health —",
    "Any heart condition, high blood pressure, or a pacemaker:",
    "Diabetes:",
    "Epilepsy or seizures, in you or an immediate family member:",
    "Liver or kidney condition:",
    "Asthma, and which inhaler:",
    "Thyroid condition, and which medication:",
    "Are you pregnant, or could you be:",
    "",
    "— Medication —",
    "All prescription medication you are currently taking:",
    "Antidepressants or SSRIs, now or in the last two months:",
    "Any recreational drug use in the last two months:",
    "Herbs or supplements you take regularly:",
    "",
    "Anything else we should know:",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

Each gathering card's button calls `applyMailto(g.title)`. The Apply section's button calls `applyMailto()`.

### 3.6 New components

- `components/site/Upcoming.tsx` — replaces the event-card half of the current `Gatherings.tsx`. Section `id="upcoming"`. Renders `gatherings.eyebrow`, `heading`, `intro`, then a card per `gatherings.upcoming` entry showing, in order: `dates`, `title`, `place`, `price`, `places`, the `includes` list, and an apply button. Reuse the existing card styling in `Gatherings.tsx` (rounded-sm, `border-gold/20`, `bg-night-800/60`, `Reveal` wrapper) so it matches the rest of the site.
- `components/site/Apply.tsx` — section `id="apply"`. Renders `apply.steps` as a numbered four-step row, then `ageNote`, `healthNote`, the CTA using `applyMailto()`, and `site.email` beneath it.
- `components/site/Teachers.tsx` — section `id="teachers"`, fed by a new `teachers` export in `lib/content.ts` (heading, intro, and an array of `{ name, role, bio }`). Content is ported from https://rainforestmedicine.net/teachers/ — fetch it during the build and port faithfully; invent nothing.
- `components/site/Testimonials.tsx` — section `id="testimonials"`, fed by a new `testimonials` export: an array of `{ quote, name, gathering }`. Ship with **three placeholder entries** clearly marked as placeholders.

`components/site/Gatherings.tsx` is deleted; its contact block is superseded by `Apply.tsx`.

### 3.7 Copy to delete

Remove these strings from `lib/content.ts` entirely:
- `gathering.note` — "There are no tickets and no public roster. Participation begins with a conversation…"
- the old `gatherings.contactBody` — "There's no checkout and no public schedule. Every gathering starts with a conversation…"
- the old `gatherings.contactHeading` and `gatherings.cta` ("Write to us")

Grep the whole repo afterwards for: `no tickets`, `no public roster`, `no checkout`, `no public schedule`. Zero matches.

### 3.8 Section order — `app/page.tsx`

```
Nav
Hero
Upcoming          ← new, id="upcoming"
Invitation
Gathering
Setting           ← moved up from below Plants
Lineage
Plants
Teachers          ← new
Founder           ← moved up from the end
Book
Testimonials      ← new
Intentions
Conservation
Apply             ← new, id="apply"
Footer
```

### 3.9 Nav — `lib/content.ts`

```ts
export const nav = [
  { label: "Upcoming", href: "#upcoming" },
  { label: "The Gathering", href: "#gathering" },
  { label: "The Tradition", href: "#lineage" },
  { label: "The Setting", href: "#setting" },
  { label: "The Book", href: "#book" },
];
```

The nav's standing button keeps its current styling; its label becomes "Apply" and its href `#apply`.

### 3.10 JSON-LD — `app/page.tsx`

Add an `Event` object per gathering alongside the existing `Organization`, each with `name`, `startDate` (`2027-01-24`, `2027-02-02`), `endDate` (`2027-01-31`, `2027-02-07`), `location` (Ocean Forest Ecolodge, Osa Peninsula, CR), `offers.price` (`2700`, `999`), `offers.priceCurrency` `USD`, and `eventAttendanceMode` offline. Update `Organization.name` to the new site name.

**Do not touch `app/layout.tsx`'s Redline block.** That file carries an uncommitted seven-line addition loading the Redline client-review widget. It is not in git. Leave it exactly as it is; do not reformat, reorder or remove it.

## 4. Acceptance checks

1. `npm run build` completes with no TypeScript or lint errors.
2. The first section below the hero on the homepage is `#upcoming`, and it renders exactly two gathering cards.
3. Each card displays its price ($2,700 / $999), "12 places", its dates, and an apply button — verified by text search of the rendered page.
4. The hero shows the line "Next gathering" followed by the Celestial Summer of the Cicadas dates, and its primary button links to `#upcoming`.
5. Grepping the repo for `no tickets`, `no public roster`, `no checkout`, `no public schedule`, and `Rainforest Medicine Council Gatherings` returns zero matches.
6. Clicking any apply button opens a mail composer addressed to info@rainforestmedicine.net with a body containing the lines "Epilepsy or seizures", "Antidepressants or SSRIs" and "Age (participants must be 18 or over)".
7. The page renders a Teachers section and a Testimonials section, and every unfilled placeholder is visually marked as a placeholder.
8. No date in 2026 and no reference to a July gathering appears anywhere on the homepage.

## 5. Out of scope

- Payments, deposits, Stripe, and any form service. Email only.
- The blog — `specs/rfm-blog-migration.md`.
- The plants list, the dieta pages and the talks page — `specs/rfm-tradition-depth-pages.md`.
- Art sales and the Amaringo gallery.
- Any subscription or membership tier.
- Spanish or any second language.
- Pointing the rainforestmedicine.net domain at this site.
- Ryan's films — the hero video field ships empty.

## 6. Parking line

Empty.

## 7. Build prompt

> Build the events-first homepage for the Rainforest Medicine Gatherings site.
>
> The project is at `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings/` — a Next.js 15 App Router site in TypeScript and Tailwind, deployed on Vercel.
>
> The spec is at `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/specs/rfm-events-first-homepage.md`. Read it and implement it exactly. Section 3 gives you the literal file paths, the exact TypeScript shapes and the exact copy — use them verbatim rather than paraphrasing. Section 4 is the definition of done; do not report finished until every check passes.
>
> Background you may need is in `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings/source-content/old-site-extract.md`.
>
> Two rules that override your instincts. First: all copy lives in `lib/content.ts` — never hard-code prose into a component. Second: where the spec says PLACEHOLDER, ship the placeholder text and make it visibly a placeholder. Do not invent what a retreat includes, do not invent a testimonial, and do not invent anything about the medicine or the tradition. This is a real client's real site about plant medicine, and invented content is worse than an obvious gap.
>
> The sandbox cannot reach npmjs.org or github.com. If you need a package install or a git push, stop and say so rather than retrying.
>
> Run `npm run build` when you are done and report which acceptance checks pass.
