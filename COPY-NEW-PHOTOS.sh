#!/bin/bash
# Brings your two Downloads folders into the site and renames them.
#
#   bash "/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/COPY-NEW-PHOTOS.sh"
#
# Claude can read those folders but cannot run shell commands against them,
# so the copy is yours. Everything is already wired to these exact filenames —
# the moment they land, the placeholders disappear on their own.
#
# DELETE THIS FILE AFTERWARDS.

set -e
SITE="/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/ocean-forest-website"

mkdir -p "$SITE/media/food"

# ── The 8 food photographs ──────────────────────────────────────────────────
cd "/Users/mehdi/Downloads/OF Food"
i=1
for f in *.jpg *.JPG *.jpeg *.png; do
  [ -e "$f" ] || continue
  cp "$f" "$SITE/media/food/$(printf 'food-%02d.jpg' $i)"
  i=$((i+1))
done
echo "Food photographs copied: $((i-1))"

# ── The 4 horse riding photographs ──────────────────────────────────────────
# activity-horse-riding-01.webp already exists, so these start at 02.
cd "/Users/mehdi/Downloads/Horse riding"
i=2
for f in *.jpg *.JPG *.jpeg *.png; do
  [ -e "$f" ] || continue
  cp "$f" "$SITE/media/experiences/$(printf 'activity-horse-riding-%02d.jpg' $i)"
  i=$((i+1))
done
echo "Horse riding photographs copied: $((i-2))"

echo
echo "Now in the site:"
ls -1 "$SITE/media/food/"
ls -1 "$SITE/media/experiences/" | grep horse-riding

cat <<'NOTE'

These are full-size camera files. They work, but they are heavy for a web
page. Ask Claude to resize them to 1600px and convert to .webp when you next
have a moment — that is a one-line job and it makes the pages noticeably
faster on a phone in Costa Rica.
NOTE
