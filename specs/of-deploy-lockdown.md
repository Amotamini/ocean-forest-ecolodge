STATUS: DRAFT

# Ocean Forest — Deploy Lockdown

Revised 2026-08-01 after a readiness check. Changes: preconditions added as Step 0; `netlify.toml`, `DEPLOY-TO-VERCEL.md` and the root `vercel.json` now handled; Step 4 split into two commits; Step 5 split into two phases; Fallback says what to run on a red build; acceptance checks 7 and 8 merged to make room for a new check 8.

## 1. Goal

Make pushing to GitHub the only way the live site can change, with no private document published and no deploy key left anywhere on the laptop.

## 2. Decisions

- The live site is `ocean-forest-website/`. It is the only Ocean Forest source that ships to Vercel project `ocean-forest-ecolodge`.
- Publishing becomes: commit and push to `primalbynaturepro-lgtm/Ocean-forest`, branch `main`. Command-line publishing (`vercel deploy`, `vercel --prod`, `vercel link`) is retired.
- **No Vercel setting is changed.** Root Directory stays `ocean-forest-website` — which is exactly why the repo path must match it character for character.
- **This spec runs on Mehdi's laptop.** It needs the real `~/.Trash` and it needs the internet. A builder that cannot reach both stops at Step 0 and says so — it does not start Step 1 and find out halfway through. A cloud session reached through a folder bridge cannot do this: the bridge shell has no network and only `~/Work` is mounted.
- **Internal documents move out of the published folder, up one level into the client folder.** Standing rule: specs and working notes live in the project folder, never inside the folder that gets published. Reason: `.vercelignore` is only honoured for command-line publishing. Under GitHub publishing every file in the published folder becomes a public web address and gets indexed by Google.
- The GitHub repo `primalbynaturepro-lgtm/Ocean-forest` is **private** (verified 2026-08-01: unauthenticated request returns 404). Internal documents are safe inside the repo; they are only unsafe inside the published folder.
- **Vercel only. Netlify is not used for any project** (client decision 2026-08-01 — both Netlify sites were deleted deliberately). No `netlify.toml` is created or kept.
- **The retreat-leaders landing page is retired, not destroyed.** Verified 2026-08-01: `Landing Page retreat leaders/` is empty on disk while git still tracks eight files there, and it left three configs behind — the root `netlify.toml`, the root `vercel.json` (both publish that empty folder) and `DEPLOY-TO-VERCEL.md`. The eight deletions are committed, `ocean-forest-retreat-leaders.html` is archived inside `Landing Page retreat leaders/`, and the three configs go to Trash. The folder is at the client root, not inside the published folder, so it never becomes a public address.
- **The root `vercel.json` comes out in Step 5, not Step 1.** It is the only leftover that Vercel could conceivably read during a build. It is removed once a git-triggered deployment has proved green, so there is a known-good deployment to roll back to. `netlify.toml` and `DEPLOY-TO-VERCEL.md` carry no such risk and go in Step 1.
- `Retreat calculator/` and `Landing Page retreat leaders/` belong to this repo and are committed (client decision 2026-08-01). `IDEAS.md` is committed with them.
- Folder B (`~/Work/PxN/Workshop/ocean-forest-ecolodge/`) is deleted outright. Nothing is salvaged. Verified 2026-08-01: B published to Production on 2026-07-25 at 16:26 (build log: `next build`, Next.js 15.5.21, 4 pages, static export).
- All deletions move to macOS Trash, never `rm -rf`. Mehdi empties the Trash himself once the checks pass.
- `Living bridges foundation/` and `Rainforest Medicine Gatherings/` stay where they are and are excluded from this repo. Verified 2026-08-01: both are already live on Vercel, git-connected, with no local deploy key — the exact arrangement this spec creates for Ocean Forest. Do not touch them.
- The Anthropic API key is not touched.
- **No site content changes.** Not one character of published HTML, CSS, JS or copy.

## 3. Contracts

### Paths — macOS, exact, spaces included

| What | Path |
|---|---|
| Repo root / client folder | `~/Work/PxN/Clients/Ocean Forest Ecolodge` |
| Published folder | `~/Work/PxN/Clients/Ocean Forest Ecolodge/ocean-forest-website` |
| Deploy key to remove | `~/Work/PxN/Clients/Ocean Forest Ecolodge/.vercel` |
| Folder to delete | `~/Work/PxN/Workshop/ocean-forest-ecolodge` |
| Trash landing folder | `~/.Trash/ocean-forest-lockdown-2026-08` |

### Vercel — read-only, do not modify

- Project `ocean-forest-ecolodge` · `prj_oSmMFTzSa6oqmCDyAac7K4wD4vfX` · `team_zZ4Fa6jnrXqJ74ewRSmOL8v4`
- Root Directory: `ocean-forest-website`
- Git: `primalbynaturepro-lgtm/Ocean-forest`, production branch `main`
- Only address: `ocean-forest-ecolodge.vercel.app` (no custom domain)

### Step 0 — preconditions, run before anything else

```bash
[ -d "$HOME/.Trash" ] && echo "trash OK" \
  || echo "FAIL: ~/.Trash not reachable — this is not the laptop, stop here"
git ls-remote https://github.com/primalbynaturepro-lgtm/Ocean-forest.git >/dev/null 2>&1 \
  && echo "network OK" \
  || echo "FAIL: cannot reach GitHub — stop here"
[ -d "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge/.git" ] && echo "repo OK" \
  || echo "FAIL: repo not found"
```

Any `FAIL` means stop. Report which line failed and change nothing.

### Step 1 — move internal documents out of the published folder

```bash
cd "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge"
mkdir -p "$HOME/.Trash/ocean-forest-lockdown-2026-08"
T="$HOME/.Trash/ocean-forest-lockdown-2026-08"

# up one level — kept, just no longer published
mv ocean-forest-website/specs                                   ./specs
mv ocean-forest-website/source-copy                             ./source-copy
mv ocean-forest-website/NEEDED-FROM-ELI.md                      ./NEEDED-FROM-ELI.md
mv ocean-forest-website/ocean-forest-redline-backup-2026-07-29.md ./ocean-forest-redline-backup-2026-07-29.md
mv ocean-forest-website/design-preview.html                     ./design-preview.html
mv ocean-forest-website/color-palette.css                       ./color-palette.css
mv ocean-forest-website/feedback-tool.js                        ./feedback-tool.js

# the retired landing page, archived in the folder named after it
mv ocean-forest-website/ocean-forest-retreat-leaders.html \
   "./Landing Page retreat leaders/ocean-forest-retreat-leaders.html"

# to Trash — superseded
mv ocean-forest-website/_verify                                 "$T/"
mv ocean-forest-website/_to_delete_vercelignore_tmp             "$T/"
mv ocean-forest-website/.vercelignore                           "$T/site-vercelignore"
mv "ocean-forest-website/Ocean Forest - Landing page Retreat leaders" "$T/empty-landing-folder"

# to Trash — retired publishing configs. Neither can affect a Vercel build:
# Vercel never reads netlify.toml, and DEPLOY-TO-VERCEL.md is prose.
mv netlify.toml                                                 "$T/netlify.toml"
mv DEPLOY-TO-VERCEL.md                                          "$T/DEPLOY-TO-VERCEL.md"
```

`color-palette.css` and `feedback-tool.js` are referenced by zero published pages (verified 2026-08-01, grep count 0 in both `index.html` and `retreats.html`). `ocean-forest-retreat-leaders.html` is the superseded 17 June landing page; `retreats.html` replaces it.

**The hidden files in the published folder stay exactly where they are.** `ocean-forest-website/` also contains `.env.local`, `.claude/`, `.cursor/` and `.DS_Store`. They are not moved and not trashed. Every one of them is matched by the ignore rules in Step 2, so git never tracks them, nothing pushes them, and nothing publishes them. Do not touch them and do not stop to ask about them.

### Step 2 — `.gitignore` at the repo root, replace the file entirely

Write this before either commit in Step 4. It has to be on disk first — `git add -A` against the old ignore list sweeps in the 212 MB `knowledge/` library and both sibling sites.

```
# secrets and machine noise
.DS_Store
.env
.env*
.env.local
.env*.local
.vercel
.netlify
.cursor/
.claude/
node_modules/

# separate projects living in this folder, each with its own repo and Vercel project
Living bridges foundation/
Rainforest Medicine Gatherings/

# dead copy, removed by of-client-folder-cleanup.md
Main Website restyled/

# research library, not website source (212 MB)
knowledge/

# scratch
_to_delete/
_vercel-bundles/
```

### Step 3 — create `DEPLOYING.md` at the repo root, exact content

```markdown
# How the Ocean Forest website goes live

Push to `main` on github.com/primalbynaturepro-lgtm/Ocean-forest. That is the only way.

Vercel builds from the folder `ocean-forest-website/`. Everything in that folder becomes a
public web address, so nothing private goes in it — specs, notes and source copy live one
level up, in this folder.

Do NOT run `vercel deploy`, `vercel --prod`, or `vercel link` here or anywhere else.
There is no `.vercel` folder on this machine on purpose. On 2026-07-25 a stray copy of that
key published an unfinished rebuild over the live site. Do not recreate it.

Vercel only. This project does not use Netlify.
```

### Step 4 — two commits, one push

Order matters. Step 2's `.gitignore` must already be on disk. The housekeeping commit stages named paths only — never `-A` — so the lockdown commit's message stays true to what it did.

```bash
cd "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge"

# Commit 1 — housekeeping already pending before today.
# Records the eight files that left "Landing Page retreat leaders" and the one
# archived page that replaced them.
git add -A "Landing Page retreat leaders"
git add "Retreat calculator" IDEAS.md
git commit -m "Retire the superseded retreat-leaders landing page; add the retreat calculator and the ideas log"

# Commit 2 — the lockdown itself.
git rm -r --cached "Main Website restyled" >/dev/null 2>&1 || true
git add -A
git commit -m "Track the live site source; move internal docs out of the published folder"

git push origin main
```

### Step 5 — wait, verify, then remove the keys

Watch Vercel → Deployments until a new Production deployment with a **git commit icon** goes green. Confirm the live site answers. **Only then:**

```bash
# 5a — the deploy keys
mv "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge/.vercel" "$HOME/.Trash/ocean-forest-lockdown-2026-08/ocean-forest-vercel-key"
mv "$HOME/Work/PxN/Workshop/ocean-forest-ecolodge"        "$HOME/.Trash/ocean-forest-lockdown-2026-08/ocean-forest-ecolodge-REBUILD-B"
```

```bash
# 5b — the last retreat-leaders leftover. Held back until now on purpose: it is a
# build config, and it only comes out once a git deployment has proved green and
# there is a known-good build to roll back to. This is a second push and a second build.
cd "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge"
mv vercel.json "$HOME/.Trash/ocean-forest-lockdown-2026-08/root-vercel-json"
git add -A
git commit -m "Remove the retired retreat-leaders build config from the repo root"
git push origin main
```

Wait for that second Production deployment to go green before running the acceptance checks. If it goes red, the Fallback applies to it too.

### Fallback — if a GitHub build goes red or the live site breaks

Every GitHub-triggered build on this project before today failed, because the repo did not contain `ocean-forest-website/`. It does now, so it should pass. If it does not:

1. **Do not run any `vercel` command.** The live site is still serving the last good deployment; nothing is broken yet.
2. In Vercel → Deployments, find the most recent **Ready** Production deployment dated before today, open its `…` menu and choose **Promote to Production** (or **Instant Rollback**). The site returns to exactly what it was.
3. Open the failed deployment and copy its full build log.
4. Run acceptance checks 1 and 2 only. State plainly that checks 3 to 6 cannot be judged without a green build, and that 7 and 8 cannot pass because Step 5 was deliberately not run.
5. **Stop. Report the log, the two check results, and stop.** Do not remove the `.vercel` key, do not delete folder B, do not remove the root `vercel.json`, do not improvise. The key stays until a git publish succeeds.

If the red build is the **second** one (Step 5b), the `.vercel` key and folder B are already in the Trash. Do not restore them. Roll back in Vercel, report, and stop.

## 4. Acceptance checks

1. `ls "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge/ocean-forest-website"` prints exactly these fourteen names and nothing else: `api`, `concierge-knowledge.md`, `concierge.js`, `gateway.html`, `images`, `index.html`, `media`, `package-lock.json`, `package.json`, `retreat-host-kit.html`, `retreats.html`, `shared-sections.js`, `stay.html`, `vercel.json`.
2. `git -C "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge" status --porcelain` prints nothing at all.
3. Vercel → Deployments: the newest Production deployment shows a **git commit icon** (not a terminal icon) and status **Ready**.
4. In a browser, hard-refreshed: `ocean-forest-ecolodge.vercel.app` shows "The wild edge of Costa Rica.", and clicking **Retreats** in the nav loads a page headlined "Everything goes smoothly if you choose us."
5. In a browser: the concierge bubble at bottom-right opens, and the question "What time is check-in?" returns a written answer, not an error message.
6. In a browser: `ocean-forest-ecolodge.vercel.app/NEEDED-FROM-ELI.md` returns 404, and `ocean-forest-ecolodge.vercel.app/specs/of-main-page.md` returns 404.
7. `find "$HOME/Work" -path "*/.vercel/project.json" -exec grep -l prj_oSmMFTzSa6oqmCDyAac7K4wD4vfX {} \;` prints nothing, **and** `ls "$HOME/Work/PxN/Workshop/ocean-forest-ecolodge"` prints "No such file or directory".
8. `ls "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge"` shows no `netlify.toml`, no `vercel.json` and no `DEPLOY-TO-VERCEL.md`, and does show `DEPLOYING.md`.

## 5. Out of scope

- Any change to published site content, copy, design or images.
- The `oceanforestecolodge.com` / `oceanforest.org` domain and SEO cutover.
- Rotating the Anthropic API key.
- Vercel's "include files outside the root directory" toggle and the Production Overrides warning.
- `concierge-knowledge.md` being publicly readable — it is lodge information written for guests, and the concierge needs it.
- Deleting the dead folders — that is `of-client-folder-cleanup.md`.
- `Living bridges foundation/` and `Rainforest Medicine Gatherings/` — already correctly set up, not touched.
- The root `.vercelignore`. Inert once command-line publishing is retired, hidden from `ls`, and removing it earns nothing. Leave it.

## 6. Parking line

Empty.

## 7. Build prompt

> Execute the spec at `~/Work/PxN/Clients/Ocean Forest Ecolodge/ocean-forest-website/specs/of-deploy-lockdown.md`. Read it end to end before doing anything — it is your only input. Note that Step 1 moves the `specs/` folder up one level, so after Step 1 the spec lives at `~/Work/PxN/Clients/Ocean Forest Ecolodge/specs/of-deploy-lockdown.md`.
>
> Ground rules: never `rm` anything — everything goes to `~/.Trash/ocean-forest-lockdown-2026-08/`. Never run any `vercel` command, in any folder, for any reason. Do not edit a single character of published site content.
>
> Run Step 0 first. If any precondition prints FAIL, stop immediately and report which one — do not start Step 1.
>
> Then run Steps 1 to 4 in order. Then **stop** and wait for the Vercel build to go green and the live site to answer. Only then run Step 5a, then 5b, and wait for the second build to go green too. If either build goes red or the site breaks, follow the Fallback section exactly and stop there.
>
> Finish by running all 8 acceptance checks and reporting each as PASS or FAIL with the actual output. Checks 3, 4, 5 and 6 need a browser — if you cannot open one, print them as a numbered list for Mehdi to run by hand and say so plainly.
