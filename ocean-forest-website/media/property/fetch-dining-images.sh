#!/usr/bin/env bash
# Ocean Forest V2 — dining photographs for the Lodging food slider.
#
# Nine "Restaurantes y salones" photographs from the client's own WordPress
# media library on oceanforestecolodge.com, 1200x800 webp originals. Found via
# /wp-json/wp/v2/media?search=restaurant on 2026-08-09.
#
# Why this is a script and not already done: the build sandbox cannot reach
# that domain (the proxy returns 403 on the image host), so the files have to
# be pulled from a machine that can. Same pattern as fetch-v2-images.sh and
# media/experiences/fetch-experiences-images.sh, which already exist here.
#
# Run it:
#     cd "ocean-forest-website/media/property"
#     bash fetch-dining-images.sh
#
# Safe to re-run: existing files are skipped, nothing is overwritten, nothing
# is renamed or deleted. media/ is additive only (standing rule 3).

set -u
BASE="https://www.oceanforestecolodge.com/wp-content/uploads/2025/11"
DIR="$(cd "$(dirname "$0")" && pwd)"

# Source filename on the client's site  ->  our filename
FILES=(
  "Restaurantes-y-salones-1.webp:dining-01.webp"
  "Restaurantes-y-salones-2.webp:dining-02.webp"
  "Restaurantes-y-salones-3.webp:dining-03.webp"
  "Restaurantes-y-salones-4.webp:dining-04.webp"
  "Restaurantes-y-salones-5.webp:dining-05.webp"
  "Restaurantes-y-salones-6.webp:dining-06.webp"
  "Restaurantes-y-salones-8.webp:dining-07.webp"
  "Restaurantes-y-salones-9.webp:dining-08.webp"
  "Restaurantes-y-salones-10.webp:dining-09.webp"
)

ok=0; skipped=0; failed=0

for pair in "${FILES[@]}"; do
  src="${pair%%:*}"
  dst="${pair##*:}"

  if [ -s "$DIR/$dst" ]; then
    echo "skip    $dst (already here)"
    skipped=$((skipped + 1))
    continue
  fi

  if curl -fsSL --max-time 60 -o "$DIR/$dst.part" "$BASE/$src"; then
    # Only becomes the real filename once the download actually succeeded, so
    # a half-finished file can never be mistaken for a good one.
    mv "$DIR/$dst.part" "$DIR/$dst"
    echo "ok      $dst  ($(du -h "$DIR/$dst" | cut -f1))"
    ok=$((ok + 1))
  else
    rm -f "$DIR/$dst.part"
    echo "FAILED  $dst  <- $BASE/$src"
    failed=$((failed + 1))
  fi
done

echo
echo "$ok downloaded, $skipped already present, $failed failed."
if [ "$failed" -gt 0 ]; then
  echo "Anything that failed will show a labelled placeholder on the page"
  echo "naming the exact file it is waiting for. Nothing else breaks."
fi
