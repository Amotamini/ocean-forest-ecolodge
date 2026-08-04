STATUS: DRAFT

# Rainforest Medicine — Blog migration

## 1. Goal

Move all eight articles off the old WordPress site onto the new one, with their images, so the depth of the work is visible and the site can start earning search traffic.

## 2. Decisions

- All eight posts come across **as they are**. No rewriting today.
- The SEO rewrite is a later pass, and each post carries a note recording the search question it should be rewritten to answer.
- Images are **copied across** and served from this site, not hot-linked to the old server. The old site may come down.
- Original slugs are preserved so existing inbound links keep working.
- Post 5, *The Yagé Complex*, is by **Neil Logan** and was republished with his permission. His byline and a link back to the Microcosms original both appear on the post. This is a permission condition, not a nicety.
- Post 8 is the featured post — it is the one Jonathon pointed at as answering the question people keep asking.
- Splitting the long essays into numbered series is a later pass, not today.
- No paywall, no preview-only posts, no email gate.

## 3. Contracts

Repo root: `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings/`

### 3.1 Content format

Posts live as MDX at `content/blog/<slug>.mdx`, one file each, with frontmatter:

```yaml
---
title: string            # the on-page title from the old site
slug: string             # matches the filename and the old URL's last segment
date: "YYYY-MM-DD"       # from the old permalink
author: string           # "Jonathon Miller Weisberger" unless stated otherwise
originalUrl: string      # the old rainforestmedicine.net permalink
tags: string[]
excerpt: string          # first ~30 words, plain text
featured: boolean        # true only for the-delicate-nature-of-ayahuasca-and-yage
heroImage: string        # "/images/blog/<slug>/hero.jpg", or "" if the post has none
seoQuestion: string      # the search question the later rewrite should answer
rewritten: false         # flipped to true when the SEO pass is done
---
```

### 3.2 The eight posts

Source URLs, dates, slugs and `seoQuestion` values are listed in `source-content/old-site-extract.md` §5. Use that table as the manifest — all eight, no substitutions.

Slugs are the final segment of each old permalink. Two need care:
- Post 8's slug is `the-delicate-nature-of-ayahuasca-and-yage` even though its on-page title reads "The Precarious Nature of Ayahuasca and Yagé". Keep the slug, keep the on-page title.
- Post 2's slug is long and ugly. Keep it anyway — inbound links matter more than tidiness.

Post 5 frontmatter additionally carries:
```yaml
author: "Neil Logan"
republishedFrom: "https://www.microcosmssacredplants.org/uncategorized/the-yage-complex-by-neil-logan/"
republishedNote: "Originally published on Microcosms, A Home to Sacred Plants of the Americas. Republished with permission from the author."
```
and the post template renders `republishedNote` with a link on `republishedFrom` directly beneath the byline.

### 3.3 Fetching the content

The old site is live. Fetch each post from its `originalUrl` and port the body faithfully — headings, paragraph breaks, block quotes, italicised binomials, image placement and captions. Do not reword, do not trim, do not add.

Two known fetch obstacles, both real:
- `/sitemap.xml` and `/wp-json/` are blocked by robots.txt. Do not retry them; the manifest in §5 of the extract file is authoritative and complete.
- The host's robots.txt intermittently times out, which makes fetches fail transiently. Retry with backoff rather than concluding a page is gone.

If a post body cannot be retrieved after honest retries, create the file with frontmatter and an empty body, add it to a `MISSING.md` note in `content/blog/`, and report it. Do not fabricate the body.

### 3.4 Images

For each post, download every image in the body and the hero image to `public/images/blog/<slug>/`, keeping the original filename where it is sane and renaming to `hero.jpg`, `01.jpg`, `02.jpg` and so on where it is not. Rewrite the image references in the MDX to the local paths. Preserve every caption and alt text; where alt text is absent, write a plain factual one from the caption.

Post 5's images are botanical plates with long, specific captions naming species and photographers. Those captions are the value of the images — port them exactly.

### 3.5 Routes

- `app/blog/page.tsx` — the index. Featured post first as a wide card, the rest in a grid, newest first. Each card: title, date, excerpt, hero image if present.
- `app/blog/[slug]/page.tsx` — the post. Title, date, byline, republished note where present, hero image, body. Same Nav and Footer as the homepage. Ends with a link back to the index and an apply button using `applyMailto()` from `lib/apply.ts`.
- Both routes statically generated via `generateStaticParams`.

Add `{ label: "Blog", href: "/blog" }` to `nav` and to the footer links in `lib/content.ts`.

### 3.6 Metadata

Each post page sets `title` to the post title plus " | Rainforest Medicine Gatherings", `description` to the excerpt, and Open Graph image to the hero image where one exists. Add an `Article` JSON-LD block per post with `headline`, `datePublished`, `author` and `image`.

**Do not touch `app/layout.tsx`'s Redline block.** That file carries an uncommitted seven-line addition loading the Redline client-review widget. It is not in git. Leave it exactly as it is; do not reformat, reorder or remove it.

## 4. Acceptance checks

1. `npm run build` completes with no TypeScript or lint errors.
2. `content/blog/` contains exactly eight `.mdx` files, and every one has a non-empty body — or any exception is listed in `content/blog/MISSING.md`.
3. Every post's slug matches the final segment of its original rainforestmedicine.net permalink.
4. `/blog` renders all eight posts, with the ayahuasca-and-yagé post displayed first as the featured card.
5. The Yagé Complex post shows "Neil Logan" as author and a visible link to the Microcosms original.
6. No image on any blog page has a `src` pointing at `rainforestmedicine.net` — every image is served from `/images/blog/`.
7. Every post's frontmatter has a non-empty `seoQuestion` and `rewritten: false`.
8. `/blog/the-delicate-nature-of-ayahuasca-and-yage` returns 200, which satisfies the link from the plants section.

## 5. Out of scope

- Rewriting any post for SEO. Later pass.
- Splitting long essays into numbered series. Later pass.
- Any paywall, preview gate or email capture.
- Comments, categories, tag archive pages, or search.
- The old site's non-post pages: `/perspectives/`, `/pablo-amaringo/`, `/intentions/`, `/about-jonathon-miller-weisberger/`, `/iniitiatives/`.

## 6. Parking line

Empty.

## 7. Build prompt

> Migrate the blog for the Rainforest Medicine Gatherings site.
>
> The project is at `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings/` — a Next.js 15 App Router site in TypeScript and Tailwind, deployed on Vercel.
>
> The spec is at `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/specs/rfm-blog-migration.md`. Read it and implement it exactly. The manifest of all eight posts — titles, URLs, dates, and the search question each should later be rewritten to answer — is in `/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings/source-content/old-site-extract.md` §5.
>
> You are moving a real person's writing. Port each article faithfully: same headings, same paragraphs, same block quotes, same italicised species names, same image placement and captions. Do not reword it, do not trim it, do not improve it, and above all do not write a body you could not fetch — if a post will not load after honest retries, leave the body empty, note it in `content/blog/MISSING.md`, and tell me.
>
> One post is by Neil Logan and is republished with his permission. His byline and a link to the Microcosms original must both appear on it.
>
> Download every image to `public/images/blog/<slug>/` and point the MDX at the local copies — nothing may still be loading from rainforestmedicine.net when you are finished.
>
> Note: `/sitemap.xml` and `/wp-json/` on that domain are blocked by robots.txt, and the host's robots.txt times out intermittently. Retry with backoff; do not conclude a page is gone on the first failure. The sandbox cannot reach npmjs.org or github.com — if you need a package install or a git push, stop and say so.
>
> Run `npm run build` when done and report which acceptance checks pass.
