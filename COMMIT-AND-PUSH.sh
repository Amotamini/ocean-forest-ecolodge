#!/bin/bash
# Run this once from Terminal, then delete this file.
#
#   bash "/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge/COMMIT-AND-PUSH.sh"
#
# Why it exists: the sandbox Claude runs in can create files inside the repo
# but cannot delete git's lock file, and cannot reach github.com through the
# proxy. So the big commit (143f90d) is already made and waiting; this script
# clears the stale lock, commits the one fix that came after it, and pushes
# both.

set -e
cd "/Users/mehdi/Work/PxN/Clients/Ocean Forest Ecolodge"

# Both of them. The first version of this script only cleared index.lock and
# git then failed on HEAD.lock instead. The sandbox can create files in .git
# but not delete them, so every lock it leaves behind has to be cleared here.
rm -f .git/index.lock .git/HEAD.lock .git/objects/maintenance.lock
rm -f .git/refs/heads/main.lock

git add -A
git commit -F - <<'MSG'
Restore the missing-photograph fallback in the tour browser

Two of the eight complementary activities - Bat Cave and Drake Bay Walking -
have no photograph published on either client site. The accordion that used
to render them on Experiences carried its own img.onerror and showed the
labelled placeholder naming the file it wanted.

Folding the activities into the shared tour browser lost that: the browser's
renderStage had no error handler, so a listed-but-missing file rendered as a
broken image icon on both Experiences and Retreats. It looked like a fault
rather than like something the site is waiting for.

The fallback now belongs to the component, so no future tour can lose it.
MSG

git push origin main

echo
echo "Done. Both commits are on GitHub:"
git log --oneline -3
