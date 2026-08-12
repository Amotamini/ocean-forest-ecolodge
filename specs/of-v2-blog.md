STATUS: DRAFT
BRAINSTORM: local_501be47b-0f07-4412-a308-5abfc0f4b632 · 2026-08-11 · "Ocean Forest V2 final pass and handover"

> Saved here rather than `~/Work/specs/` because that folder is outside the
> connected working folder, and because every other Ocean Forest spec already
> lives in this one. Move it if the flat-specs rule matters more.

# Ocean Forest — a blog Eli can publish to by talking to Claude

## 1. Goal

Eli pastes text and drops photos into a Claude conversation, says "make this a blog post", and after one Push in GitHub Desktop the post is live and looks like the rest of the site.

## 2. Decisions

- **One HTML file per post**, at `v2/blog/<slug>.html`. Real URLs Google can index and Eli can send to someone.
- **The index moves to `v2/blog/index.html`.** The stub at `v2/blog.html` is deleted. Reason: Vercel runs `cleanUrls: true`, so `blog.html` and a `blog/` folder would both claim the URL `/v2/blog`. A folder with an index inside it has no such collision.
- **`v2/posts.js` is the manifest** — one small entry per post. `index.html` builds the card list from it. Same pattern as `ACTIVITIES` and `FAQ` in `shared-sections.js`, already proven on this site.
- **Photos live at `media/blog/<slug>/`.** One folder per post, so deleting a post is deleting a folder.
- **Claude resizes every photo to max 1600px on the long edge and converts to `.webp` before saving.** Eli will drop 5MB phone photos; ten of those makes the page unusable and she would never know why.
- **The blog uses `shell.css` and `shell.js`.** No second design system, no page-level colours.
- **`index.html` ships with `noindex` while it is empty**, and the publishing recipe removes that line as part of publishing post one. Not something anyone has to remember.
- **No byline.** Date only — Mehdi's call. Nothing to maintain.
- **Reachable from the About dropdown only**, not as its own top-level nav item.
- **The recipe lives in `CLAUDE.md`**, so Eli's Claude follows identical steps every time and cannot invent a layout. The plain-English version goes in `EDITING-YOUR-WEBSITE.md`.
- **One template that reads well at 200 words and at 2000.** The brief is long posts with photos, but a short one must not look broken.
- **Add, edit and delete are all covered by the recipe**, not just add.

## 3. Contracts

### Files the build creates or changes

| Path | What |
|---|---|
| `v2/blog/index.html` | The blog index. Header mount, footer, `shell.css`, `shell.js`, `posts.js`. One card per post from `POSTS`, newest first. Empty state when `POSTS` is empty. |
| `v2/blog/_template.html` | The post template Claude copies. Leading underscore so it sorts to the top and reads as "not a post". |
| `v2/posts.js` | The manifest. Defines `var POSTS = [...]` and publishes `window.OF_POSTS = POSTS`. |
| `v2/shell.css` | Add a `.bl-*` block: post cards on the index, article layout on a post page. Nothing else in the file changes. |
| `v2/shell.js` | In `NAV`, change the Blog child's `href` from `/v2/blog.html` to `/v2/blog/`. In `stem()`, treat any path starting `/v2/blog` as matching the About item so the dropdown reads as current on blog pages. |
| `v2/blog.html` | **Delete.** It is the placeholder stub written 2026-08-11 to stop the new nav link 404ing. |
| `ocean-forest-website/CLAUDE.md` | Add a section "Publishing a blog post" — add, edit, delete. |
| `ocean-forest-website/EDITING-YOUR-WEBSITE.md` | The same three in Eli's language, no jargon. |
| Every page's footer | The "From the lodge" link is `/v2/blog.html` today. Change to `/v2/blog/`. Once per page, 8 pages. |

### `POSTS` entry shape — exact

```js
{
  slug:      'howler-monkeys-at-dawn',  // lowercase, hyphens, no accents; = the filename
  title:     'Howler Monkeys at Dawn',
  date:      '2026-08-11',              // ISO. Sorting and display both read this.
  cover:     'blog/howler-monkeys-at-dawn/01.webp',  // path under /media/, no leading slash
  coverNote: 'A howler monkey in the canopy above the shala',  // alt text, required
  summary:   'One paragraph, about 25 words, shown on the card.'
}
```

Newest first is computed from `date`, never from array order — Claude must not have to insert in the right place.

### Post page — exact

- Lives at `v2/blog/<slug>.html`, `<slug>` byte-identical to `POSTS[n].slug`.
- Loads `/v2/shell.css`, mounts the header with `<div data-shell="header"></div>`, loads `/v2/shell.js`. Same footer markup as every other page.
- Body measure caps at 68ch. Photos may break wider than the text column.
- Allowed blocks inside the article, and nothing else: paragraph, subheading (`h2`), photo with caption, pull quote, bulleted list.
- Photos use the shell's `data-media` host, so a missing file shows the labelled placeholder rather than a broken image.
- **No hex colours and no `<style>` block.** All appearance comes from `shell.css`.

### Photo handling — exact

- Source: whatever Eli drops into the conversation.
- Output: `media/blog/<slug>/01.webp`, `02.webp`, … in the order she gave them.
- Max 1600px on the long edge, quality 82, EXIF stripped.
- `01.webp` is the cover unless she says otherwise.

### Publishing recipe — the steps `CLAUDE.md` must specify

1. Derive `<slug>` from the title.
2. Create `media/blog/<slug>/`, resize and convert every photo into it.
3. Copy `v2/blog/_template.html` to `v2/blog/<slug>.html` and fill it.
4. Prepend one entry to `POSTS` in `v2/posts.js`.
5. If `v2/blog/index.html` still contains the `noindex` meta tag, delete that line.
6. Append one line to `CHANGES.md` saying what was published and when.

Editing a post is steps 3 and 4 on files that already exist. Deleting is the entry, the file and the photo folder — all three, or the site keeps a card pointing at nothing.

## 4. Acceptance checks

1. `v2/blog/index.html` exists; `v2/blog.html` does not.
2. `node --check v2/posts.js` passes, and loading `/v2/blog/` leaves `window.OF_POSTS` defined as an array.
3. With `POSTS` empty, `/v2/blog/` shows the empty state, and `grep -c noindex v2/blog/index.html` returns 1.
4. Run the recipe end to end on one sample post with three photos. Afterwards: `v2/blog/<slug>.html` exists, `POSTS[0].slug` equals `<slug>`, `grep -c noindex v2/blog/index.html` returns 0, `/v2/blog/` shows a card linking to the post, and `/v2/blog/<slug>` returns HTTP 200.
5. Every file in `media/blog/<slug>/` ends `.webp` and reports a long edge of 1600px or less.
6. `grep -cE '#[0-9a-fA-F]{6}|<style' v2/blog/<slug>.html` returns 0.
7. `grep -rc 'href="/v2/blog.html"' v2/` returns 0 across every page.
8. `CLAUDE.md` contains a "Publishing a blog post" section covering add, edit and delete, and `EDITING-YOUR-WEBSITE.md` contains the same three written without the words slug, manifest, commit or repository.

## 5. Out of scope

- The V1 blog at the site root, `ocean-forest-website/blog.html`. V2 replaces V1 at handover; it is not being migrated or redirected here.
- Categories, tags, search, pagination, comments, RSS. Add them when there are enough posts to need them.
- The newsletter endpoint on the home page, still unwired.
- Rainforest Medicine and Living Bridges. Different codebases, different rules.

## 6. Parking line

Empty.

## 7. Build prompt

```
Build the Ocean Forest blog. The spec is the only input:

  "~/Work/PxN/Clients/Ocean Forest Ecolodge/specs/of-v2-blog.md"

Read it in full, then read ocean-forest-website/CLAUDE.md before you change
anything in that repo.

The site is hand-written static HTML with no build step, deployed on Vercel
from GitHub with cleanUrls: true and trailingSlash: false. shell.css and
shell.js own every cross-page component; do not create a second design
system, and do not put colours or a <style> block in a blog page.

Work through the acceptance checks in section 4 and do not report finished
until every one passes — including check 4, which requires you to actually
run the publishing recipe on a sample post rather than describe it. Delete
the sample post afterwards using the delete steps you wrote, which also
proves those work.

Keep a journal as you go. After each step you finish or fail, append one line to
~/Work/Tools/build-log/of-v2-blog.md in this shape:

  <YYYY-MM-DD HH:MM> · <step n of m> · DONE|FAILED|WAITING · <one plain sentence>

Use WAITING when you need something from Mehdi, and say in the sentence exactly what
you need. Create the file if it is not there. Append only — never rewrite it.

Before you finish, update ~/Work/INDEX.md to match anything you created, moved,
renamed or archived in ~/Work. Then run: bash ~/Work/Tools/scripts/index-check.sh
and fix what it names.
```
