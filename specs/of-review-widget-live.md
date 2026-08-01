STATUS: DRAFT

# Ocean Forest — Put the Redline review widget live on the two sibling sites

## 1. Goal

Commit and push the seven-line Redline review widget already sitting unsent in Living Bridges and Rainforest Medicine, so both sites can be reviewed in the browser.

## 2. Decisions

- The widget is **inert for ordinary visitors** — its own code comment says "Inert unless the URL carries `?review=TOKEN`". Nothing changes for the public; the review panel only appears for someone holding a review link. That is why this is safe to ship without a design review.
- The change already exists on the laptop and has existed since before 2026-08-01. It was written and never pushed, so it has never been live. This spec sends it, it does not write it.
- Both sites publish from GitHub with no local deploy key. Push is the only action; no `vercel` command is run.
- Both repos have exactly one commit each. This adds a second. No history is rewritten.
- Nothing else in either folder is touched. `git add` names the single file in each repo — never `-A`.
- Independent of `of-deploy-lockdown.md` and `of-client-folder-cleanup.md`. Can run before, after or between them.

## 3. Contracts

### The two repos

| Site | Folder | GitHub |
|---|---|---|
| Living Bridges Foundation | `~/Work/PxN/Clients/Ocean Forest Ecolodge/Living bridges foundation` | `primalbynaturepro-lgtm/living-bridges-foundation` |
| Rainforest Medicine Gatherings | `~/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings` | `primalbynaturepro-lgtm/rainforest-medicine-gatherings` |

### The change, already present in both

The only modified file in each repo is `app/layout.tsx`, carrying exactly this block before the closing `</body>`:

```jsx
{/* Redline client review widget. Inert unless the URL carries ?review=TOKEN. */}
<script
  defer
  src="https://redline-xi-ten.vercel.app/w.js"
  data-redline="<slug>"
  data-redline-name="<display name>"
/>
```

- Living Bridges: `data-redline="living-bridges-foundation"`, `data-redline-name="The Living Bridges Foundation"`
- Rainforest Medicine: `data-redline="rainforest-medicine"`, `data-redline-name="Rainforest Medicine Gatherings"`

### Commands

```bash
cd "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge/Living bridges foundation"
git diff --stat            # must show app/layout.tsx and nothing else
git add app/layout.tsx
git commit -m "Add Redline review widget"
git push origin main

cd "$HOME/Work/PxN/Clients/Ocean Forest Ecolodge/Rainforest Medicine Gatherings"
git diff --stat            # must show app/layout.tsx and nothing else
git add app/layout.tsx
git commit -m "Add Redline review widget"
git push origin main
```

If `git diff --stat` in either folder shows any file other than `app/layout.tsx`, **stop and report**. Do not commit.

If git reports `Unable to create '.git/index.lock'`, delete that one lock file and retry. That is the only file this spec may delete.

## 4. Acceptance checks

1. `git -C "<each folder>" log --oneline | wc -l` prints `2` for both repos.
2. `git -C "<each folder>" status --porcelain` prints nothing for both repos.
3. Vercel → each project → Deployments: a new Production deployment, git-sourced, status **Ready**.
4. In a browser: `living-bridges-foundation.vercel.app` still shows "Living bridges between worlds" and `rainforest-medicine-gatherings.vercel.app` still shows "Experiential ceremonial gatherings for personal, community and planetary renewal", with no visible review panel on either.
5. In each page's source, `redline-xi-ten.vercel.app/w.js` appears exactly once.

## 5. Out of scope

- Anything inside `ocean-forest-website/` or the Ocean Forest Vercel project.
- Any content, copy or design change on either site.
- The Redline app itself at `~/Work/PxN/Redline`.
- Creating or configuring review tokens.

## 6. Parking line

Empty.

## 7. Build prompt

> Execute the spec at `~/Work/PxN/Clients/Ocean Forest Ecolodge/ocean-forest-website/specs/of-review-widget-live.md`. Read it end to end first — it is your only input.
>
> Ground rules: never run any `vercel` command. Never use `git add -A` — name the single file. If `git diff --stat` shows anything other than `app/layout.tsx`, stop and report instead of committing. Do not touch the Ocean Forest website folder.
>
> Finish by running all 5 acceptance checks and reporting each as PASS or FAIL with the actual output. Checks 3 and 4 need a browser — if you cannot open one, print them for Mehdi to run by hand and say so plainly.
