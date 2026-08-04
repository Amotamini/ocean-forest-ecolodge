This folder is the largest client engagement PxN runs — the Ocean Forest Ecolodge site plus three related builds, their shared knowledge base, and everything currently blocked on the client.

Eli and Jonathon are the two people on the client side. Eli is also customer #1 for
`/DOG/Sanctuary/`, so work here and work there touch the same business.

## The four builds

| Path | What it is |
|---|---|
| `ocean-forest-website/` | The main site. **This is what Vercel deploys** |
| `Rainforest Medicine Gatherings/` | Next.js, GitHub-backed. Its specs are prefixed `rfm-` |
| `Living bridges foundation/` | Next.js. Its `out/` and `public/images/` hold near-duplicate image sets |
| `Retreat calculator/` | Standalone |

`Rainforest Medicine Gatherings/` and `/PxN/Workshop/rainforest-medicine/` are **different
work, not duplicates** — that was settled in `work-restructure.md` §2 and it is easy to
get wrong. Both survive on purpose.

## Everything else

| Path | What it is |
|---|---|
| `waiting-on/` | **Blocked on the client.** What is needed from Eli and from Jonathon, and the questions sent to them. Look here first to know what is stalled and on whom |
| `audits/` | Dated review passes and the Redline feedback backup. History, not instructions |
| `specs/` | Client-scoped specs, prefixed `of-` (the ecolodge) and `rfm-` (the gatherings) |
| `knowledge/` | Captured material — `START-HERE.md`, the build brief, the capture method, the playbook. Has its own git repo |
| `source-copy/` | The `.com` and `.org` copy, kept out of the deployed folder on purpose |
| `DEPLOYING.md` | How the site goes live. Push to `main` on `primalbynaturepro-lgtm/Ocean-forest` — the only way |
| `IDEAS.md` | Things that surfaced during the work and are real, but are not the build in front of us |

**Nothing private goes inside `ocean-forest-website/`.** Everything in that folder becomes
a public web address. Specs, notes and source copy live one level up, which is why they
sit here rather than in the build. `DEPLOYING.md` states this and it is worth honouring.

One unresolved item carried over from `work-restructure.md` §5: the two Ocean Forest sites
share Vercel project `prj_oSmMFTzSa6oqmCDyAac7K4wD4vfX`.
