#!/usr/bin/env bash
# Pulls the V2 placeholder images off the client's own live sites into this
# repo, per specs/of-v2-assets.md. Modelled on fetch-live-images.sh.
#
# oceanforestecolodge.com (.com) is the source for everything except the
# regional arrival map, which only exists on oceanforest.org (.org).
#
# Run:  bash "$(dirname "$0")/fetch-v2-images.sh"

set -euo pipefail
cd "$(dirname "$0")"

COM="https://www.oceanforestecolodge.com/wp-content/uploads"
COM_API="https://www.oceanforestecolodge.com/wp-json/wp/v2/media"
ORG="https://www.oceanforest.org/wp-content/uploads"

mkdir -p media/lodging media/gallery media/experiences media/retreats media/property media/arriving

ok_count=0
fail_count=0
failed_slots=()

get () { # get <url> <destination>
  printf '  %-42s ' "$(basename "$2")"
  if curl -fsSL --retry 2 "$1" -o "$2"; then
    printf 'ok  (%s)\n' "$(du -h "$2" | cut -f1 | tr -d ' ')"
    ok_count=$((ok_count + 1))
  else
    printf 'FAILED\n'
    fail_count=$((fail_count + 1))
    failed_slots+=("$2  <-  $1")
  fi
}

echo "Beach Bungalows (4):"
get "$COM/2025/11/Beach-Bungalow-Coco-Solo-1-1.webp" "media/lodging/beach-bungalow-01.webp"
get "$COM/2025/11/Beach-Bungalow-Coco-Solo-2-1.webp" "media/lodging/beach-bungalow-02.webp"
get "$COM/2025/11/Beach-Bungalow-Coco-Solo-3.webp"   "media/lodging/beach-bungalow-03.webp"
get "$COM/2025/11/Beach-Bungalow-Coco-Solo-5-1.webp" "media/lodging/beach-bungalow-04.webp"

echo
echo "Family Bungalows (4):"
get "$COM/2025/12/Family-Bungalows-1.webp" "media/lodging/family-bungalow-01.webp"
get "$COM/2025/12/Family-Bungalows-2.webp" "media/lodging/family-bungalow-02.webp"
get "$COM/2025/12/Family-Bungalows-3.webp" "media/lodging/family-bungalow-03.webp"
get "$COM/2025/12/Family-Bungalows-4.webp" "media/lodging/family-bungalow-04.webp"

echo
echo "Jungle Suites (4, found via /accommodations/ carousel, highest-numbered first):"
get "$COM/2025/12/Jungle-Suites-11.webp" "media/lodging/jungle-suite-01.webp"
get "$COM/2025/12/Jungle-Suites-10.webp" "media/lodging/jungle-suite-02.webp"
get "$COM/2025/12/Jungle-Suites-9.webp"  "media/lodging/jungle-suite-03.webp"
get "$COM/2025/12/Jungle-Suites-8.webp"  "media/lodging/jungle-suite-04.webp"

echo
echo "Open-air dining, long table (found via /ecolodge/, 'Restaurantes y salones' set):"
get "$COM/2025/11/Restaurantes-y-salones-9.webp" "media/property/kitchen-table.webp"

echo
echo "Yoga shala exterior (found via /yoga/; same shot used for both slots):"
get "$COM/2025/12/4-1.png" "media/retreats/retreat-teaser.webp"
get "$COM/2025/12/4-1.png" "media/property/shala-exterior.webp"

echo
echo "Tours hero (found via /experiences-tours/):"
get "$COM/2025/11/activities-ocean-forest.webp" "media/experiences/tours-teaser.webp"

echo
echo "Regional arrival map (.org only, .com does not have this):"
get "$ORG/2020/04/Sierpe-and-Drake-Bay-min.png" "media/arriving/map-region.jpg"

echo
echo "Gallery (up to 22, discovered live via the WordPress media search API"
echo "since the on-disk filenames are not sequential):"

gallery_pairs="$(curl -fsSL --retry 2 "$COM_API?per_page=100&search=Ocean+Forest+Ecolodge" 2>/dev/null \
  | grep -o '"source_url":"[^"]*"' \
  | sed -E 's/"source_url":"//; s/"$//; s@\\/@/@g' \
  | grep -E '/Ocean-Forest-Ecolodge-[0-9]+[^/]*\.(webp|jpg|png)$' \
  | while IFS= read -r url; do
      num="$(echo "$url" | grep -oE 'Ocean-Forest-Ecolodge-[0-9]+' | grep -oE '[0-9]+$')"
      echo "$num $url"
    done \
  | sort -n -k1,1 -u || true)"

for i in $(seq 1 22); do
  dest="media/gallery/gallery-$(printf '%02d' "$i").webp"
  url="$(echo "$gallery_pairs" | awk -v n="$i" '$1 == n { print $2; exit }')"
  if [ -n "$url" ]; then
    get "$url" "$dest"
  else
    printf '  %-42s ' "$(basename "$dest")"
    printf 'FAILED (not found in media search)\n'
    fail_count=$((fail_count + 1))
    failed_slots+=("$dest  <-  no match in media search for slot $i")
  fi
done

echo
echo "======================================================================"
echo "Done. $ok_count file(s) downloaded, $fail_count failed."
if [ "$fail_count" -gt 0 ]; then
  echo
  echo "Slots still unfilled (send this list to Eli):"
  for slot in "${failed_slots[@]}"; do
    echo "  - $slot"
  done
else
  echo "Every slot filled."
fi
