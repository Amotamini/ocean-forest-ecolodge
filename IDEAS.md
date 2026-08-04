# Ocean Forest — Ideas

Things that surfaced while working on Ocean Forest and are real, but are not the build in front of us.

## 2026-08-02 — Rainforest Medicine

**Amaringo art sales.** Don Pablo Amaringo's paintings become a page on the Rainforest Medicine site (not a separate website) where reprints can be bought. Blocked on Jonathon opening a DeviantArt account and getting the hi-res scans from his friend. He has permission to sell reprints. He also owes a better scan of the book cover than the low-quality one currently in use.

**The subscription / community tier.** Eli's third revenue leg, alongside book sales and retreats: a paying community that gets a discount on gatherings plus material nobody else sees. Her framing — Jonathon is full of stories, and the point is to build a digital library of his knowledge before it is lost. This is the largest unbuilt idea in the project and deserves its own brainstorm, not a bolt-on.

**Blog preview paywall.** Show a paragraph of each long article, put the rest behind the community membership. Raised by Eli. Sits inside the subscription idea above; do not build it separately, and note it conflicts with using the blog to earn search traffic.

**Move the webinars onto Jonathon's own YouTube channel.** The playlist the site links today belongs to Dave Santander / Oahu Holistic Medicine. Jonathon has webinar recordings sitting in Google Drive. Uploading them to the Rainforest Medicine Council channel and building his own playlist means the site links to something he controls.

**Blog SEO rewrite pass.** All eight posts migrate as-is under `rfm-blog-migration.md`. The later pass: research what people actually type into search, then rewrite each post to answer one of those questions, and split the long essays into numbered series so readers come back for part two. Every migrated post carries a `seoQuestion` field recording what it should be rewritten toward.

**Old-site pages left behind.** `/perspectives/`, `/pablo-amaringo/`, `/intentions/`, `/about-jonathon-miller-weisberger/`, `/iniitiatives/`. Deliberately not migrated. Worth a second look once the selling page is working.

**guariadeosa.com is hijacked.** Stock photos, fabricated testimonials, and a gambling affiliate link, sitting on a domain associated with the venue. Not a website task — a domain recovery task for the client, and urgent. Flagged, unresolved.

**rainforestmedicine.net's Programs page still advertises April 2019.** Whoever keeps that site alive should take it down or point it at the new build. The client controls the domain and says they will update it eventually.

## 2026-08-01

**Domain and SEO cutover.** The site declares `https://www.oceanforest.org/` as its official address 28 times — canonical tags, Open Graph tags and structured data on both pages — while `oceanforestecolodge.com` is the address it is meant to move to, and `.org` still serves the old "Your Portal to a Timeless Nature Experience" site. Eli's email `eli@oceanforest.org` stays as it is. Needs its own spec covering: which domain points at the Vercel project, what redirects from what, and every canonical/OG/schema reference updated in one pass so Google is told once, cleanly. Do not start this until `of-deploy-lockdown.md` has shipped.

**A `/Work`-wide audit.** The two problems found here — a deploy key sitting in more than one folder, and private documents living inside the published folder — are habits, not one-offs, so they are probably repeated across DOG, Apps and the other PxN clients. A read-only audit prompt was written on 2026-08-01. Whatever it finds becomes its own set of specs.

**~~Redline review widget is uncommitted on two sites.~~ Half closed 2026-08-02** — for **Rainforest Medicine** it is committed and live: a “PxN Productions DOG” session pushed `4d3e2e7 Update layout.tsx` straight to GitHub on 2026-08-01, adding the exact same six-line script tag (`data-redline="rainforest-medicine"`). Mehdi's local clone did not know, which is what rejected his 2026-08-02 push; resolved with `git merge origin/main -X ours`. **Still open for `Living bridges foundation/app/layout.tsx`** — decide, then commit and push or discard. Also worth noting: that repo has a second author pushing to it directly, so a local clone can go stale without warning.

**~~`concierge-knowledge.md` exists twice.~~ Closed 2026-08-01** — the two copies were byte-identical (17,902 bytes). `api/concierge.js` searches `ocean-forest-website/concierge-knowledge.md` first, so the **root** copy is the live one and the `api/` copy was dead. Deleting the `api/` copy is folded into `of-deploy-lockdown.md`, Step 1.

---

## 2026-08-04

Surfaced during the BIS session that followed Mehdi's meeting with Eli. Real, not this build.
The build itself is `specs/of-v2-brief.md` and the seven specs it lists.

### Rebuild the three arrival maps as SVG

The `.org` illustrated maps are good artwork and ship as-is in V2. But the arrival page's whole
design rests on showing **one route lit and the others gone** once the visitor has picked how they
are travelling, and a JPEG cannot do that. One SVG file can serve all four route states, size its
own labels for a phone, and never go stale.

Roughly a day. Not a commission — the `.org` artwork is the reference and proves an illustrator is
not needed. Do it once Arriving is live and the shape has been tested on real visitors.

### The arrival card PDF

One per route. Not a map: the last-mile map, the walk direction, the three phone numbers, and the
address in Spanish for a taxi driver. Built for someone standing at Palmar Norte bus station with
no signal.

The Spanish address already exists on `.org`: *Finca Guaria de Osa, 800 metros al norte de la
Escuela de San Josecito, Playa Rincón de San Josecito, código postal 60502, Provincia de
Puntarenas, Cantón de Osa, Costa Rica.*

Deferred because four PDFs need the SVG maps above to be worth generating.

### Property map redraw, with altitude

Four things wrong with what exists today, and only two of them Eli spotted:

1. Turtle Island Labyrinth vanished from the digital redraw on `.com`.
2. Mango is drawn but unlabelled.
3. No sense of **height**. Guests choose rooms by how close to the ocean they are, and nothing on
   the map says Gabilán Alto is up a hill. Eli wants a second view, a side elevation rather than a
   plan, showing ocean at the bottom and the rooms stepping up.
4. **The compass rose on the hand-drawn original is wrong** — W at the top, N to the right. Anyone
   orienting by it is 90 degrees out. Nobody has noticed this in years.

The hand-drawn scan is the legible one and ships meanwhile. This is an asset job, not a build task.

### The broken Google embed

`oceanforest.org/arriving/` has been serving a Google Maps embed tiled with "For development
purposes only" watermarks for an unknown length of time, meaning an unlicensed or expired key.
It is not carried into V2. Worth telling Eli it is broken on the old site too, since that site is
still live and still gets traffic.

### Reconciling the walk time

`.org` says 15-20 minutes south from the beach and 15 north from the school. The newer copy says 15
for both. V2 says 20 for both, deliberately. Somebody should actually walk it with a stopwatch and
a suitcase, and then every source should say the same number.
