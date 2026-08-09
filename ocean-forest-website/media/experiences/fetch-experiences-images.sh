#!/usr/bin/env bash
# Fills the Experiences page's empty photo slots from the client's own sites,
# per specs/of-v2-revisions.md C16. Additive only: every destination filename
# below is new, nothing already in media/ is renamed, moved or overwritten.
#
# Sources, and nothing else:
#   .com  https://www.oceanforestecolodge.com
#   .org  https://www.oceanforest.org
#
# Every mapping below is the SAME SUBJECT as the slot it fills. Where the
# client has no photograph of a subject anywhere, the slot is left empty on
# purpose and the page keeps its labelled placeholder. No lookalike is ever
# substituted to make a frame look full.
#
# Run:  bash ocean-forest-website/media/experiences/fetch-experiences-images.sh

set -euo pipefail
cd "$(dirname "$0")/../.."

COM="https://www.oceanforestecolodge.com/wp-content/uploads"
ORG="https://www.oceanforest.org/wp-content/uploads"

mkdir -p media/experiences

ok_count=0
fail_count=0
failed_slots=()

get () { # get <url> <destination>
  printf '  %-46s ' "$(basename "$2")"
  if curl -fsSL --retry 2 "$1" -o "$2"; then
    printf 'ok  (%s)\n' "$(du -h "$2" | cut -f1 | tr -d ' ')"
    ok_count=$((ok_count + 1))
  else
    printf 'FAILED\n'
    rm -f "$2"
    fail_count=$((fail_count + 1))
    failed_slots+=("$2  <-  $1")
  fi
}

echo "Rainforest Discovery tours (.com, one named photograph each):"
get "$COM/2025/12/Corcovado-National-Park.webp"                          "media/experiences/tour-corcovado-national-park-01.webp"
get "$COM/2025/12/Corcovado-National-Park-%E2%80%93-Sirena-Ranger-Station.webp" "media/experiences/tour-corcovado-sirena-01.webp"
get "$COM/2025/12/Corcovado-National-Park-%E2%80%93-San-Pedrillo.webp"   "media/experiences/tour-corcovado-san-pedrillo-01.webp"
get "$COM/2025/12/Goddess-Jacuzzi.webp"                                  "media/experiences/tour-goddess-jacuzzi-01.webp"
get "$COM/2025/12/White-Hawk-Nature-Trail.webp"                          "media/experiences/tour-white-hawk-nature-trail-01.webp"
get "$COM/2025/12/Rio-Claro-%E2%80%93-River-and-Rainforest-Fun.webp"     "media/experiences/tour-rio-claro-01.webp"

echo
echo "Ocean Discovery tours (.com, one named photograph each):"
get "$COM/2025/12/Cano-Island.webp"                 "media/experiences/tour-cano-island-01.webp"
get "$COM/2025/12/Scuba-Diving-at-Cano-Island.webp" "media/experiences/tour-scuba-diving-cano-island-01.webp"
get "$COM/2025/12/Snorkeling-at-Cano-Island.webp"   "media/experiences/tour-snorkeling-cano-island-01.webp"
get "$COM/2025/12/Dolphin-and-Whale-Encounters.webp" "media/experiences/tour-dolphin-whale-encounters-01.webp"
get "$COM/2025/12/Surf-Tour-at-Rio-Claro.webp"      "media/experiences/tour-surf-tour-rio-claro-01.webp"

echo
echo "Complementary Activities (.com and .org, subject-matched):"
# Botanical Garden — the copy describes the Ethnobotanical Walk; .org's photo
# of that garden is the subject itself.
get "$ORG/2018/11/Ethnonbotanical-garden.jpg"    "media/experiences/activity-botanical-garden-01.jpg"
# River Walk — the copy is the walk to Rio Claro; .com's Rio Claro photo.
get "$COM/2025/12/Rio-Claro-%E2%80%93-River-and-Rainforest-Fun.webp" "media/experiences/activity-river-walk-01.webp"
get "$COM/2025/12/Horseback-Riding.webp"         "media/experiences/activity-horse-riding-01.webp"
get "$COM/2025/12/Night-Tour.webp"               "media/experiences/activity-night-tour-01.webp"
# Sierpe Mangrove Tour — .org's photograph of the Sierpe mangrove.
get "$ORG/2022/11/2.-Sierpe-manglar.jpg"         "media/experiences/activity-sierpe-mangrove-tour-01.jpg"
# Waterfall Hiking — the copy names Goddess Jacuzzi as one of its two falls.
get "$COM/2025/12/Goddess-Jacuzzi.webp"          "media/experiences/activity-waterfall-hiking-01.webp"

echo
echo "Not fetched, deliberately — neither site has a photograph of these:"
echo "  Bat Cave           (searched .com and .org media libraries: no match)"
echo "  Drake Bay Walking  (searched .com and .org media libraries: no match)"
echo "  Both keep their labelled placeholder on the page."

echo
echo "======================================================================"
echo "Done. $ok_count file(s) downloaded, $fail_count failed."
if [ "$fail_count" -gt 0 ]; then
  echo
  echo "Slots still unfilled:"
  for slot in "${failed_slots[@]}"; do
    echo "  - $slot"
  done
fi
