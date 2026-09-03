# Ocean Forest Ecolodge

This repository holds the Ocean Forest Ecolodge website, the retreat price calculator, and the
written record behind both — every decision, every spec, and everything still outstanding.

**New here? Open `START-HERE.md` first.** Part 1 is written for Jonas in plain language. Part 2 is
for a developer.

**Then open `waiting-on/`.** It says what is still blocked and on whom. It is the fastest way to
know where the project actually stands.

## What is in here

| Path | What it is |
|---|---|
| `ocean-forest-website/` | The main site. **This is what Vercel deploys** — its Root Directory setting must be exactly this folder |
| `Retreat calculator/` | The retreat price calculator. Standalone, but its prices must stay in step with the Retreats page |
| `specs/` | One document per page, each ending in numbered checks describing what "done" means. Verified against the live code on 2026-08-09 |
| `source-copy/` | The original `.com` and `.org` copy, kept out of the deployed folder on purpose |
| `audits/` | Dated review passes and the feedback backup. History, not instructions |
| `waiting-on/` | What is blocked and on whom, plus the questions sent and the answers that came back |
| `photo-originals/` | Full-resolution originals. The web-sized copies live in `ocean-forest-website/media/` |

Root documents worth knowing:

| File | What it is |
|---|---|
| `FIRST-DAY.md` | The handover itself: what moved, what it costs, what to do this week. Read once, then delete |
| `START-HERE.md` | The front door. Part 1 for Jonas, Part 2 for a developer |
| `DEPLOYING.md` | How the site goes live, and the one command never to run |
| `Last-little-things.md` | What is still outstanding, with who owes what |
| `WHAT-WE-AGREED.md` | Every decision made about the site, in plain language, with dates |
| `IDEAS.md` | Real ideas that surfaced during the work but were not part of the build |

## Two rules that matter

**Nothing private goes inside `ocean-forest-website/`.** Everything in that folder becomes a public
web address. Specs, notes and source copy live one level up, which is why they sit here rather
than in the build.

**Point Claude at this folder, not at `ocean-forest-website/`.** A price lives in more than one
place — the Retreats page inside the website, and the calculator outside it. Connected one level
in, a price change half succeeds and says nothing.

## Related sites, not in this repository

**Rainforest Medicine Gatherings** is its own repository and its own Vercel project. It is a
Next.js site, built differently, with its own `CLAUDE.md` and `CHANGES.md`.

---

**Handover, 2026-09-03.** This project passed from Eli to Jonas. The code, the hosting and the
accounts moved with it — see the accounts table in `START-HERE.md`. Documents in `specs/`,
`audits/` and `waiting-on/` still name Eli throughout, because she was the client when those
decisions were made. That is correct history and was deliberately left as written.
