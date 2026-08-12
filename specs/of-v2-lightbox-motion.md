STATUS: DRAFT
BRAINSTORM: local_501be47b-0f07-4412-a308-5abfc0f4b632 · 2026-08-11 · "Ocean Forest V2 final pass and handover"

# Ocean Forest — swipeable full-screen photographs, everywhere

## 1. Goal

Open any photograph on the site full screen, swipe left and right through the set with two fingers or a thumb, in a continuous loop, with motion that feels like the Photos app rather than like a web page.

## 2. Decisions

- **One component does all of it.** `shell.js` already builds exactly one lightbox for the whole site and every opener reaches it through `data-gallery`. Room cards, all three tour tabs, the food slider and the gallery strips all go through it. Change the component, not the pages. Do not add a second lightbox for the gallery.
- **The `<img>` becomes a track.** Today the lightbox is one `<img>` whose `src` is swapped. Nothing can animate between two `src` values, so this is the change that makes everything else possible: a horizontal strip of slides moved with `transform: translate3d()`.
- **Infinite in both directions.** Clone the last photograph before the first and the first after the last. When the track settles on a clone, jump to the real one with the transition disabled. Invisible, and it is the standard solution.
- **Two-finger trackpad is not touch.** On a Mac it arrives as `wheel` with `deltaX`, in a long stream of small deltas — not as a pointer gesture. It needs its own handler, or one flick advances four photographs.
- **Snap on velocity, not only distance.** A short fast flick must advance; a long slow drag that stops halfway must fall back. Distance-only snapping is what makes a carousel feel like a web page.
- **Click the photograph to close.** Mehdi: "click expand, click again close." Today only the backdrop closes and clicking the photograph does nothing. A drag must not count as a click.
- **The gallery strips become openable.** They are plain `[data-media]` tiles with no `data-gallery` today, so they do nothing when clicked. Clicking the fifth tile must open on the fifth photograph, which needs a new `data-gallery-start`.
- **A gallery tile browses the eight photographs on that page**, not all 22 in `GALLERY`. What you can see is what you can swipe.
- **Nothing about the openers changes.** No page markup changes except the gallery host gaining attributes, which `shell.js` writes itself.
- **`prefers-reduced-motion` turns the animation off, not the feature.** Photographs still change; they cut instead of slide.

## 3. Contracts

### Files

| Path | What |
|---|---|
| `v2/shell.js` | Rewrite the `LIGHTBOX` section. Add `data-gallery-start` support to the delegated opener. In the `GALLERY ROTATION` section, give the host and each tile the attributes below. |
| `v2/shell.css` | Replace the `.lb-img` rule with the track and slide rules. Everything else in the `.lb` block stays. |

No HTML file changes. No new files.

### DOM the lightbox builds

```html
<div class="lb" role="dialog" aria-modal="true" hidden>
  <span class="lb-title"></span>
  <div class="lb-stage">          <!-- overflow hidden, full viewport -->
    <div class="lb-track">        <!-- transform: translate3d(-Npx,0,0) -->
      <figure class="lb-slide"><img></figure>   <!-- clone of last -->
      <figure class="lb-slide"><img></figure>   <!-- 1..n real -->
      <figure class="lb-slide"><img></figure>   <!-- clone of first -->
    </div>
  </div>
  <button class="lb-btn lb-prev">…</button>
  <button class="lb-btn lb-next">…</button>
  <button class="lb-btn lb-close">…</button>
  <span class="lb-count"></span>
</div>
```

- One slide is exactly the stage width. Track width is `(n + 2) * stageWidth`.
- Slides hold the photograph with `object-fit: contain`, so a portrait and a landscape both fit without cropping.
- On open the track sits at index 1 (the first real photograph) with the transition disabled.
- A single-photograph set builds no clones and disables every gesture, the arrows and the counter.

### Motion constants

```
SLIDE_MS      = 420
EASING        = cubic-bezier(0.22, 0.61, 0.36, 1)
DISTANCE_SNAP = 0.22   /* fraction of stage width that commits a drag */
VELOCITY_SNAP = 0.45   /* px per ms that commits regardless of distance */
WHEEL_LOCK_MS = 320    /* ignore further wheel deltas after a commit */
WHEEL_TRIGGER = 40     /* accumulated deltaX that commits one step */
```

### The four inputs, all landing on `goTo(index, animate)`

1. **Pointer drag** — `pointerdown` on the stage, `setPointerCapture`, transition off, track follows the finger 1:1. On `pointerup`, commit if distance > `DISTANCE_SNAP` **or** velocity > `VELOCITY_SNAP`, otherwise return. Velocity is measured over the last ~100ms, not the whole gesture.
2. **Wheel** — accumulate `deltaX` while `Math.abs(deltaX) > Math.abs(deltaY)`; at `WHEEL_TRIGGER`, step once and ignore further deltas for `WHEEL_LOCK_MS`. `preventDefault` so the page behind does not scroll sideways.
3. **Arrows and keyboard** — unchanged behaviour, now animated. Left, Right, Escape.
4. **Click to close** — on `pointerup`, if the pointer moved less than 8px total and the target is inside the stage, close.

### The loop

After a transition ends on a clone, set the track to the matching real slide with the transition disabled and force a reflow before re-enabling. `lb-count` always shows the real index, never the clone.

### Neighbours

When settling on index *i*, set `src` on *i−1* and *i+1* if not already set. A swipe must never land on a blank frame. Slides beyond the neighbours stay `src`-less until reached.

### Gallery strips

In the `GALLERY ROTATION` block, after the eight tiles are built:

- the host gets `data-gallery="<the eight filenames, comma-separated>"`
- each tile gets `data-gallery-start="<its 0-based index>"` and `cursor: zoom-in`

The delegated opener reads `data-gallery` from the nearest ancestor carrying it and `data-gallery-start` from the clicked element, so a tile inside the host opens the host's set at the tile's index. Openers with no `data-gallery-start` still open at 0, so every existing opener is untouched.

## 4. Acceptance checks

1. On `/v2/lodging.html`, clicking a room card opens full screen; dragging the photograph left with the mouse moves it 1:1 under the cursor, and releasing past a fifth of the width settles on the next photograph.
2. From the last photograph of any set, one more step forward shows the first with no visible jump, backwards seam included. Verified on a 4-photograph set and on the 10-photograph food slider.
3. A two-finger horizontal trackpad flick advances exactly one photograph, not two or more. A vertical two-finger scroll does nothing.
4. Clicking the photograph closes the lightbox; a drag of more than 8px that ends on the photograph does not.
5. On `/v2/index.html`, clicking the fifth gallery tile opens full screen showing the fifth photograph, and the counter reads `5 of 8`.
6. A set of one photograph shows no arrows, no counter, and neither drag nor wheel changes anything.
7. With `prefers-reduced-motion: reduce` set in the browser, photographs still change on every input and no transform transition runs.
8. `node --check v2/shell.js` passes, and every page still loads with no console error: index, arriving, lodging, experiences, retreats, about, blog.

## 5. Out of scope

- The `.sl` inline sliders on the page itself (the food slider's own arrows). Only the full-screen lightbox gets motion.
- Pinch to zoom inside the lightbox.
- Captions per photograph. `lb-title` stays one label for the whole set.
- Any change to `shared-sections.js`.

## 6. Parking line

Empty.

## 7. Build prompt

```
Add swipe motion to the Ocean Forest lightbox. The spec is the only input:

  "~/Work/PxN/Clients/Ocean Forest Ecolodge/specs/of-v2-lightbox-motion.md"

Read it in full, then read ocean-forest-website/CLAUDE.md before changing
anything in that repo.

The site is hand-written static HTML with no build step. shell.css and
shell.js own every cross-page component. There is exactly one lightbox on
the site and every gallery reaches it through data-gallery — do not create a
second one, and do not add lightbox code to any page.

Run the site with:
  cd "ocean-forest-website" && python3 serve.py 8081

Work through the acceptance checks in section 4 and do not report finished
until every one passes. Checks 1 to 6 are gestures — you must actually
perform them in a browser and observe the result. Reading the code and
concluding it should work is not passing them. Check 2 in particular fails
silently: a badly built loop looks correct until you cross the seam.

Keep a journal as you go. After each step you finish or fail, append one line to
~/Work/Tools/build-log/of-v2-lightbox-motion.md in this shape:

  <YYYY-MM-DD HH:MM> · <step n of m> · DONE|FAILED|WAITING · <one plain sentence>

Use WAITING when you need something from Mehdi, and say in the sentence exactly what
you need. Create the file if it is not there. Append only — never rewrite it.

Before you finish, update ~/Work/INDEX.md to match anything you created, moved,
renamed or archived in ~/Work. Then run: bash ~/Work/Tools/scripts/index-check.sh
and fix what it names.
```
