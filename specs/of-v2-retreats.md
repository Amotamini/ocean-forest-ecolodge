STATUS: DRAFT

# A4 — Retreats

## 1. Goal

Carry the existing retreats page onto the V2 shell unchanged, since Eli called it already right.

## 2. Decisions

- Eli, quoted in the brief: "exactly what we have, I think it's perfect, we don't need to change nothing." The only changes on this page are the shared shell (A0's header, footer, nav, theme default) and the hero slot. No copy, no section, no CTA on this page is rewritten, reordered, or removed.
- Built on the A0 shell, as `ocean-forest-website/v2/retreats.html`, hero slug `retreats`, gallery offset `4`.
- Because this spec was written without reading `ocean-forest-website/retreats.html` (out of scope for this brief's research — see brief's opening instruction), the builder reads that file directly for the literal content to carry forward. This spec fixes the shell integration and the hero; it does not fix, quote, or re-describe the page's existing body copy.
- The shared tours-and-logistics component (`shared-sections.js`, `data-shared="tours"` / `data-shared="logistics"`) stays mounted exactly as it is on the current `retreats.html`, if it is mounted there today — carry that mounting forward unchanged.
- If `retreats.html` today has its own hero (video, still, or otherwise), that hero is replaced by the standard A0 hero slot, empty by default, per the shell contract — this is the one deliberate content change on this page, because every V2 page uses the same hero pattern.

## 3. Contracts

### Hero
- Slug: `retreats`
- Eyebrow: `Host Your Retreat`
- `h1`: `A Beachfront Shala for Up to 32 Guests`
- Sub: `You teach. We handle logistics, meals, and the rest of the lodge.`
(These three lines replace whatever hero copy exists on the current `retreats.html`, consistent with the hero-slot decision above. Everything below the hero on the existing page carries forward untouched.)

### Body
Everything currently in `ocean-forest-website/retreats.html`, between its existing header/hero and its existing footer, moves into this page's `<main>` verbatim, re-parented under the A0 shell's header and footer instead of `retreats.html`'s own. If the current page's CSS uses class names already defined in `shell.css` (e.g. `.sec-head`, `.cta`, `.gal`), reuse them directly rather than duplicating rules; if it uses classes not in `shell.css` (page-specific to retreats, like a shala chart), keep them in this page's own `<style>` block exactly as they are today.

### Gallery
Shell-provided, offset `4` — same 8-slot pattern as every other page, sourced from the shared 24-item list in `shell.js`.

## 4. Acceptance checks

1. Every sentence of body copy currently on `ocean-forest-website/retreats.html` appears on `ocean-forest-website/v2/retreats.html`, unedited.
2. The hero on the new page is the standard A0 empty hero slot with the copy given above, not the old page's hero.
3. The header, nav, and footer match the A0 shell exactly, matching every other V2 page.
4. Any shared-sections.js component mounted on the current page (tours, logistics, or both) is still mounted, unchanged, on the new page.
5. The theme defaults to light on this page, same as every other V2 page.
6. The gallery section at the foot shows the offset-4 slice of the shared 24-image list.
7. No new copy has been written anywhere on this page.
8. No em dash or en dash appears anywhere in this page's visible copy (check the carried-forward copy too — fix only dash characters, nothing else, if any are found).

## 5. Out of scope

Any content change beyond the shell and hero swap. If the current `retreats.html` has a bug or an outdated figure, it is carried forward as-is — flag it in your build report, do not fix it silently.

## 6. Parking line

None.

## 7. Build prompt

```
Read specs/of-v2-shell.md first and build this page on top of what it defines — reuse shell.css
and shell.js exactly as that spec describes. If ocean-forest-website/v2/shell.css and shell.js do
not exist yet, build them first, following of-v2-shell.md exactly, then build this page.

Read specs/of-v2-retreats.md, then read ocean-forest-website/retreats.html in full — that file is
your copy source for this page, verbatim. Eli has confirmed the current retreats page needs no
content changes; your only job is to move its body copy onto the A0 shell and swap in the standard
empty hero slot.

Build ocean-forest-website/v2/retreats.html: the standard A0 header, an empty hero slot with the
copy given in the spec, then every section currently in retreats.html's <main> carried forward
unedited, then the standard A0 footer, then the shell's gallery section at offset 4. If
retreats.html mounts the shared tours or logistics component, keep that mounted the same way.

When done, open ocean-forest-website/v2/retreats.html directly from Finder in a browser (no
server) and open the current ocean-forest-website/retreats.html side by side to confirm every
section of body copy matches. List the eight acceptance checks from the spec and state pass/fail
for each. If you find anything in the existing page that looks broken or outdated, name it in your
report without fixing it.
```
