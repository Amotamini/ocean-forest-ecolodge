#!/usr/bin/env bash
# Pulls the assets we still need off the client's own live WordPress site
# (oceanforestecolodge.com) into this repo. Created 2026-08-03.
#
# The hand-drawn property map is the one Mehdi pointed at — it is now wired into
# index.html at media/property/property-map.webp and the page expects it there.
# The five amenity photos are a bonus: Eli's live site uses them as round icons.
# We render our amenity row with SVG icons instead, but these are here if she
# prefers photos later.
#
# Run:  bash "$(dirname "$0")/fetch-live-images.sh"

set -euo pipefail
cd "$(dirname "$0")"

BASE="https://www.oceanforestecolodge.com/wp-content/uploads"
mkdir -p media/property media/amenities

get () { # get <url> <destination>
  printf '  %-42s ' "$(basename "$2")"
  if curl -fsSL --retry 2 "$1" -o "$2"; then
    printf 'ok  (%s)\n' "$(du -h "$2" | cut -f1 | tr -d ' ')"
  else
    printf 'FAILED\n'
  fi
}

echo "Property map (required by index.html):"
get "$BASE/2025/12/Ecolodge-of.webp" "media/property/property-map.webp"

echo
echo "Amenity photos (optional, not yet wired in):"
get "$BASE/2025/11/Breakfast-served-fresh-each-morning.webp" "media/amenities/meals.webp"
get "$BASE/2025/11/Queen%E2%80%91size-double-bed.webp"       "media/amenities/bed.webp"
get "$BASE/2025/11/Fresh-linens-and-towels.webp"             "media/amenities/linens.webp"
get "$BASE/2025/11/Mosquito-nets.webp"                       "media/amenities/mosquito-nets.webp"
get "$BASE/2025/11/Hand-soap.webp"                           "media/amenities/hand-soap.webp"

echo
echo "Done. The map should now show on the homepage under the room cards."
