STATUS: DRAFT

# Ocean Forest — Client Folder Cleanup

## 1. Goal

Leave exactly one Ocean Forest website folder on the laptop, and nothing that could be mistaken for a second one.

## 2. Decisions

- Runs **only after** `of-deploy-lockdown.md` reads `STATUS: SHIPPED`. The site must be publishing from GitHub before anything is deleted.
- Deleted: `Main Website restyled/` — a third, dead copy of the site, already declared abandoned in `specs/of-concierge.md` ("the older concierge in `Main Website restyled/` is abandoned; do not port it").
- Deleted: `Landing Page retreat leaders/` (empty), `_to_delete/` (two empty lock files), `_vercel-bundles/` (73 MB of tarballs — obsolete, both sites are on GitHub and live on Vercel).
- Deleted: the repo-root `vercel.json`. Dead config — Vercel reads the one inside `ocean-forest-website/` because of the Root Directory setting. This file says "publish the retreat-leaders folder", which is empty, and it is actively misleading to anyone reading the folder cold.
- Deleted: `netlify.toml`. Netlify is not used for any project (client decision 2026-08-01); the site it configured no longer exists.
- Deleted: the repo-root `.vercelignore`. `of-deploy-lockdown.md` retires command-line publishing, and `.vercelignore` is only read by command-line publishing. Once that is gone the file governs nothing.
- Deleted: `DEPLOY-TO-VERCEL.md`. Its job is done — both sites it describes are live on Vercel and on GitHub — and it points at `$HOME/Documents/Documents - Zoutal's MacBook Air/…`, a path that no longer exists. `DEPLOYING.md` is the true document now.
- **Kept:** `Living bridges foundation/` and `Rainforest Medicine Gatherings/` (live on Vercel, git-connected, verified 2026-08-01 — do not touch), `Retreat calculator/` (32 KB, the reference calculator `specs/of-retreats-page.md` points at), `knowledge/` (212 MB research library), and every internal document Spec 1 moved up.
- All deletions move to macOS Trash. Nothing is erased.

## 3. Contracts

### Move to Trash, one block

```bash
cd "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge"
mkdir -p "$HOME/.Trash/ocean-forest-cleanup-2026-08"
T="$HOME/.Trash/ocean-forest-cleanup-2026-08"

mv "Main Website restyled"        "$T/"
mv "Landing Page retreat leaders" "$T/"
mv "_to_delete"                   "$T/"
mv "_vercel-bundles"              "$T/"
mv "vercel.json"                  "$T/root-vercel.json"
mv "netlify.toml"                 "$T/root-netlify.toml"
mv ".vercelignore"                "$T/root-vercelignore"
mv "DEPLOY-TO-VERCEL.md"          "$T/"

git add -A
git commit -m "Remove dead site copies and stale deploy config"
git push origin main
```

### Expected client-folder contents afterwards — exactly this, nothing more

```
.env.example   .env.local   .gitattributes   .gitignore
DEPLOYING.md   IDEAS.md
NEEDED-FROM-ELI.md   ocean-forest-redline-backup-2026-07-29.md
design-preview.html   color-palette.css   feedback-tool.js
ocean-forest-retreat-leaders.html
Living bridges foundation/
Rainforest Medicine Gatherings/
Retreat calculator/
knowledge/
source-copy/
specs/
ocean-forest-website/
```

## 4. Acceptance checks

1. Each of these prints "No such file or directory": `Main Website restyled`, `Landing Page retreat leaders`, `_to_delete`, `_vercel-bundles`, `vercel.json`, `netlify.toml`, `.vercelignore`, `DEPLOY-TO-VERCEL.md` — all relative to `~/Work/PxN/Clients/Ocean Forest Ecolodge`.
2. `ls -a "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge"` matches the expected list above, with no extra entries other than `.`, `..`, `.DS_Store`, `.git` and `.cursor` — the last is editor configuration, already git-ignored, and deliberately kept.
3. `du -sh "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge"` reports 445 MB or less (was 543 MB).
4. `grep -rl "The wild edge of" "$HOME/Work" --include=*.html` prints exactly two files: `ocean-forest-website/index.html` and `design-preview.html`, both inside the Ocean Forest client folder.
5. `git -C "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge" status --porcelain` prints nothing.
6. `git -C "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge/Living bridges foundation" remote -v` and the same command for `Rainforest Medicine Gatherings` each still print their own GitHub address, and both folders still contain `app/` and `package.json`.
7. In a browser, hard-refreshed: `ocean-forest-ecolodge.vercel.app` still shows "The wild edge of Costa Rica.", **Retreats** still loads, and the concierge bubble still answers a question.

## 5. Out of scope

- Any published site content, copy or design change.
- The domain and SEO cutover.
- The contents of `knowledge/`.
- Moving `Living bridges foundation/` or `Rainforest Medicine Gatherings/` anywhere — they belong in this folder (client decision 2026-08-01).
- Emptying the Trash. Mehdi does that himself.

## 6. Parking line

Empty.

## 7. Build prompt

> Execute the spec at `~/Work/PxN/Clients/Ocean Forest Ecolodge/specs/of-client-folder-cleanup.md`. Read it end to end before doing anything — it is your only input.
>
> Hard precondition: `~/Work/PxN/Clients/Ocean Forest Ecolodge/specs/of-deploy-lockdown.md` must read `STATUS: SHIPPED` on line 1. If it does not, stop and say so.
>
> Ground rules: never `rm` anything — everything goes to `~/.Trash/ocean-forest-cleanup-2026-08/`. Never run any `vercel` command. Do not open, edit or move anything inside `Living bridges foundation/` or `Rainforest Medicine Gatherings/`. Do not edit site content.
>
> Finish by running all 7 acceptance checks and reporting each as PASS or FAIL with the actual output. Check 7 needs a browser — if you cannot open one, print it for Mehdi to run by hand and say so plainly.
