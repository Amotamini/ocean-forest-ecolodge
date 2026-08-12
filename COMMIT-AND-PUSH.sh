#!/bin/bash
# V2 replaces V1 at the root. Run once:
#
#   bash "/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/COMMIT-AND-PUSH.sh"
#
# The new pages are already written to the root — Claude can create and
# overwrite files in the mounted folder but cannot delete them, so the
# removals below are the part it could not do itself.
#
# It also fixes the message on 6c02b44, which went out labelled as a copy of
# the commit before it. The code in it was right; the description was not,
# and the description is what Scott reads.
#
# DELETE THIS FILE AFTERWARDS. It is scaffolding, not site.

set -e
cd "/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge"

rm -f .git/index.lock .git/HEAD.lock .git/refs/heads/main.lock
rm -f .git/objects/maintenance.lock

# ── 1. Fix the wrong commit message on the last push ────────────────────────
git commit --amend -F - <<'MSG'
Align the room buttons, take Eli's name off the site, open the route photos

The three Book now buttons on a row of room cards sat at three different
heights, because each sat directly under its own list and one card's
"En-suite bathroom with natural ventilation" wrapped to a second line. The
card is a flex column now and the button is pushed to the floor of it, so
they land on one line however long the copy above them runs.

The site no longer names Eli anywhere a visitor can see: "WhatsApp us",
"Email us", "Talk to us". Her address stays as the mailto - it is the real
inbox.

The three arrival photographs open full screen in the shared lightbox,
because they are about to be replaced by maps and a map you cannot enlarge
is a picture of a map.
MSG

git push --force-with-lease origin main

# ── 2. Remove V1 and the dead files ─────────────────────────────────────────
cd "/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/ocean-forest-website"

# The old v2/ folder. Its contents now live at the root.
rm -rf v2

# V1's own shared script. The root now holds V2's.
# (index.html, retreats.html and blog.html were overwritten in place, so
#  there is nothing to delete for those three.)
rm -f shared-sections.js.v1 2>/dev/null || true

# The AI concierge — V1's, unused by V2. Mehdi's call, 2026-08-11.
rm -f concierge.js concierge-knowledge.md
rm -rf api

# Dev leftovers that were being deployed to the public site.
rm -f gateway.html.bak
rm -f fetch-live-images.sh fetch-v2-images.sh
rm -f .DS_Store

echo
echo "Root now holds:"
ls -1 *.html

# ── 3. Commit the move ──────────────────────────────────────────────────────
cd "/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge"
git add -A
git commit -F - <<'MSG'
V2 replaces V1 at the root of the site

Mehdi, 2026-08-11: "it shouldn't have V2 in the address, it should fully
replace the V1."

The seven pages, shell.css, shell.js and shared-sections.js move out of v2/
and to the root, and all 80 /v2/ references in them are rewritten. The home
page, Retreats and Blog overwrite their V1 counterparts; Arriving, Lodging,
Experiences and About are new URLs that did not exist before.

V1 is deleted rather than archived. It survives in git history and as a
frozen, clickable capture in Redline, and leaving a second copy live would
have meant Google indexing the same lodge twice and Eli editing the wrong
index.html. One site, no way to pick the wrong one.

The AI concierge goes with it - V2 never referenced it.

vercel.json redirects /v2 and /v2/* permanently to the new addresses, so
every link already sent to anybody keeps working. shell.js strips the same
prefix when deciding which nav item is current, because the local review
server has no redirects and people will keep typing /v2/ for weeks.

retreat-host-kit.html stays: the Retreats page links to it. stay.html and
gateway.html stay; both are one-line redirects to /.

Also updated so they do not lie: CLAUDE.md's rule about never editing V1
(there is no V1), Redline's capture config (it pointed at three V1 pages,
and would have captured V2 over the frozen v1), and two items in
Last-little-things.md that were finished today - the film link and the
guest reviews.
MSG

git push origin main

echo
echo "Done."
git log --oneline -3
