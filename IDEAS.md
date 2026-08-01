# Ocean Forest — Ideas

Things that surfaced while working on Ocean Forest and are real, but are not the build in front of us.

## 2026-08-01

**Domain and SEO cutover.** The site declares `https://www.oceanforest.org/` as its official address 28 times — canonical tags, Open Graph tags and structured data on both pages — while `oceanforestecolodge.com` is the address it is meant to move to, and `.org` still serves the old "Your Portal to a Timeless Nature Experience" site. Eli's email `eli@oceanforest.org` stays as it is. Needs its own spec covering: which domain points at the Vercel project, what redirects from what, and every canonical/OG/schema reference updated in one pass so Google is told once, cleanly. Do not start this until `of-deploy-lockdown.md` has shipped.

**A `/Work`-wide audit.** The two problems found here — a deploy key sitting in more than one folder, and private documents living inside the published folder — are habits, not one-offs, so they are probably repeated across DOG, Apps and the other PxN clients. A read-only audit prompt was written on 2026-08-01. Whatever it finds becomes its own set of specs.

**Redline review widget is uncommitted on two sites.** `Living bridges foundation/app/layout.tsx` and `Rainforest Medicine Gatherings/app/layout.tsx` each carry an uncommitted seven-line addition loading the Redline client-review widget. Because both sites publish from GitHub, the widget is **not** live on either. Decide whether it should be, then commit and push, or discard.

**~~`concierge-knowledge.md` exists twice.~~ Closed 2026-08-01** — the two copies were byte-identical (17,902 bytes). `api/concierge.js` searches `../concierge-knowledge.md` first, so the **root** copy is the live one and the `api/` copy was dead. Deleting the `api/` copy is folded into `of-deploy-lockdown.md`, Step 1.
