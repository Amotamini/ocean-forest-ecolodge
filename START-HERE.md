# Start here

Everything about the Ocean Forest Ecolodge website, in one place.

**Part 1 is for Jonas.** It is written in plain language and assumes you know nothing about
websites. **Part 2 is for a developer.** Jonas does not need to read it.

Handed over 2026-08-09 by Mehdi, PxN Productions.
Repaired 2026-08-13: the addresses in Part 2 described a layout the site left behind on
2026-08-11, and the blog and undoing were missing from Part 1.
**Reissued 2026-09-03: the project passed from Eli to Jonas. Ownership of the code, the hosting
and the accounts moved with it. Every instruction below is now addressed to Jonas.**

---

# Part 1 — For Jonas

## The short version

You own this website completely. You can change any words and any photograph yourself, using
Claude, and see it live a minute later. Anything about how the site *looks* — layout, colours,
adding whole new sections — needs a developer.

Everything you do is recorded automatically, in plain English, so if anything ever goes wrong a
developer can see exactly what happened and put it back.

---

## What you can change, and what needs a developer

| You | A developer |
|---|---|
| Any words on any page | Layout and spacing |
| Any photograph, including taking one off a page | Colours and fonts |
| Prices and descriptions | Adding or removing a section |
| Filling in a "photo to come" box | Anything that mentions code |
| The blog: writing a post, changing one, taking one down | |
| Undoing your own last change | |

**Why the split?** The site is built so one change updates several pages at once. Change how a room
is displayed and it changes on the home page, the Lodging page and the Retreats page together. That
is what keeps it consistent — and it is also why a change in the wrong place goes wrong in six
places instead of one.

Claude has been given this same rule in writing. It will tell you when something needs a developer.

---

## Making a change

**1. Open Claude on the whole Ocean Forest folder.**

Point it at the folder called Ocean Forest Ecolodge, the same one GitHub Desktop shows you. Not the
website folder inside it. Things live alongside the website as well as in it, the retreat price
calculator above all, and Claude cannot change what it cannot see. Point it somewhere narrower and
a price change will quietly only half happen, with no warning.

**2. Say what you want, in normal English.**

> On the Lodging page, change "Choose Your Perfect Room" to "Find Your Room".

> Use `media/gallery/beach-sunset.jpg` as the big photo at the top of the Experiences page.

**3. Claude tells you what it is about to do.** It will say which page, what the text says now, and
what it will say afterwards. **Read it. Then say yes.**

**4. Publish it.** Open GitHub Desktop. You will see your change listed. Type a short note, press
**Commit**, then press **Push**.

**5. Wait about a minute.** The live site updates itself.

That is the whole process. There is no step six.

---

## Changing a photograph

**Drag the picture into the conversation and say where it goes.**

> [drag the photo in] Use this as the big photo at the top of the Experiences page.

Claude does the rest: picks the right folder, renames the file properly, converts it if your phone
saved it in a format the web cannot show, resizes it if it is enormous, and puts it on the page.
It tells you the filename it chose.

You never touch a folder. Photos straight off a phone are fine.

**A dashed box saying "Photo to come" is not a fault.** It is the site telling you it is waiting for
a picture in that spot. Drag one in and say "use this for that box".

**Never ask for a photo already on the site to be renamed or deleted** — something else is probably
using it. Adding new ones is always safe.

---

## The record of everything you do

Two records, kept automatically. You do not have to do anything to maintain them.

**`CHANGES.md`** — a plain-English list, newest at the top. Every edit gets one line: the date, who
asked, what changed and on which page. You can open it and read it like a diary.

**The repository history** — the full technical record behind it. A developer reads this one.

**This is the safety net.** If anything looks wrong, you do not need to explain what you did or
remember when. The history is complete and anyone technical can read it.

---

## If something goes wrong

**Put it back yourself. It takes four clicks and you do not need anybody.**

1. Open **GitHub Desktop**.
2. Click **History** at the top left. Everything ever changed is listed there, newest at the top.
3. Right-click the change at the top and choose **Revert changes in commit**.
4. Press **Push**.

About a minute later the site is back exactly as it was. Undoing is itself just another change, so
if you undo the wrong one you can undo that too.

**Do not try to fix it by editing.** That is not caution for its own sake, attempting a fix on top
of a problem is what turns a one-minute revert into an afternoon. Revert first, then decide.

If reverting does not put it right, that is the point to bring in a developer. Tell them which page
looks wrong and point them at Part 2 of this document. They will have everything they need.

**Nothing you do can be permanently lost.** Every version of this site is kept forever. The worst
possible outcome of any change you make is one revert. Experiment freely.

---

## Things the site is deliberately waiting for

These are **not faults**, and please do not fill them with invented content. Each is waiting on
something real. The full list, with who owes what, is in `Last-little-things.md`.

- **The newsletter signup does not work yet** — a mailing service needs choosing first
- **"Watch the full film" goes nowhere** — it needs the real video link
- **Guest reviews is an empty box** — no review has been made up; it needs your Google Business login
- **The yoga shala 360° video** has not been delivered
- **Some phone numbers on the Arriving page say "unconfirmed"** — last checked 2018, need a call

---

## Who to contact

| What | Who |
|---|---|
| Words and photographs | You, with Claude |
| Anything that looks broken | Revert it first (above), then a developer |
| Layout, colours, new sections | A developer |
| Hosting, domain, billing | You — see the accounts list below |

---

## Your accounts

**Everything below is in your own name.** That is the whole point of the handover: nothing is
stranded with anyone else, and nobody has to be chased for a password.

| Service | What it does | Whose account | Cost |
|---|---|---|---|
| **Claude** | How you edit the site | Yours | Your subscription |
| **GitHub** | Stores the site and its full history | Yours (`Amotamini`) | Free |
| **Vercel** | Puts the site on the internet | Yours | **$20/month — see below** |
| **Domain + DNS** | Owns oceanforestecolodge.com | **Unconfirmed — find out who holds this** | Renews yearly |

Also yours, not part of editing: the **Secure Bookings** booking engine, and your **Google Business
Profile** once the reviews section is connected.

**On the Vercel cost.** Vercel's free tier does not permit commercial use, and this is a business
website. The Pro plan is $20 per month. It was previously being carried on PxN's account; it is now
on yours.

**Two things to settle before launch day:**

- **Find out who holds the domain.** `oceanforestecolodge.com` is not yet pointed at this site, and
  nobody has confirmed which account it renews from. If it lapses the website disappears, and that
  is the single most common way small sites die. Set a calendar reminder once you know.
- **Get the redirect list from the old site.** Every page live on `oceanforest.org` needs its
  new-site address recorded before the domain switches, or existing links and Google rankings break
  on the day you go live.

---

# Part 2 — For a developer

## What this is

Seven-page static site, hand-written HTML, no framework and no build step. It sits in
`ocean-forest-website/`. Deployed on Vercel from GitHub; push to `main` and it goes live.

Six of the pages are files at the root: `index.html`, `arriving.html`, `lodging.html`,
`experiences.html`, `retreats.html`, `about.html`. The seventh is the blog, which is a folder:
`blog/index.html` lists the posts and each post is its own file at `blog/<slug>.html`, read at
`/blog/`. What appears on the blog is decided by `posts.js` at the root, one entry per post.

Serve it locally with `python3 serve.py` from `ocean-forest-website/`. That script disables caching
deliberately — plain `python3 -m http.server` will serve you stale files and cost you an hour
before you notice.

**Vercel's Root Directory for this project must be `ocean-forest-website`.** The repository root is
one level above it and holds specs, notes and source copy that must never be published.

## The one thing to understand before you change anything

**Everything shared lives in `shell.css` and `shell.js`.** One definition of the room card,
the photo slider, the lightbox, the expanding row, the figure, the buttons. A change there reaches
every page.

This was consolidated on 2026-08-09 from a mess of duplicates — four sliders, five expanders, two
lightboxes, three room cards. The full component contract, with the reasoning, is in
`specs/of-v2-shell.md`. **Read that section before adding anything.** If a pattern exists, use
it. If it does not, add it to the shell — not to a page.

`ocean-forest-website/HANDOVER.md` is the deeper technical document: the three rules that have broken this project
before, how the media placeholder system works, and what is still outstanding. Read it once.

## Standing rules that have each broken this site already

1. **Every local reference must be root-absolute** — `/shell.css`, `/media/x.jpg`,
   `/media/blog/<slug>/hero.webp`. Never relative, never `../`. Vercel serves clean URLs with
   `trailingSlash: false`, so a relative path resolves wrong in production while looking fine
   locally. This has broken the site three separate times.
2. **A shared file changes every page at once.** `shell.css`, `shell.js` and `shared-sections.js`
   hold one definition each of the header, the menu, the room card, the tours and the arrival
   routes. There is no page-level copy of any of it. A change made because one page needs it lands
   on all seven.
3. **`media/` is additive only.** Never rename, move or delete a file already there.

## Jonas's editing setup

**He connects Claude to the client folder, not to `ocean-forest-website/`.** That is where the
git repository begins, so it is what GitHub Desktop shows him, and it is the only scope from which
a price change can reach every place a price lives: `retreats.html` inside the website, and both
`Retreat calculator/retreat calculator.html` and `Retreat calculator/retreat-prices.csv` outside
it. Connected one level in, a price change half succeeds and says nothing.

He edits with Claude, constrained by `ocean-forest-website/CLAUDE.md`. That file tells Claude to
change words, photographs, prices and the blog only, to refuse anything structural and route it to
a developer, to confirm before writing, and to append a line to `CHANGES.md` after every edit. It
also holds the four recipes he will need more than once: publish a post, edit or remove a post,
change a price, take a photograph off a page.

`ocean-forest-website/EDITING-YOUR-WEBSITE.md` is the same ground in his language, with no
filenames in it at all. That is deliberate, so do not add one.

**He can revert his own last change** from GitHub Desktop's History pane. He has been told to do
that before asking anyone, so a report reaching you means reverting did not fix it.

**If you change the architecture, update `CLAUDE.md` too.** It names specific files as
off-limits. Out of date, it stops protecting anything.

`CHANGES.md` is your first stop when he reports a problem: plain-English list of what changed and
when, newest first. The git log behind it has the detail.

## Specs

`specs/` holds one document per page, each ending in numbered acceptance checks describing what
"done" looks like. They were verified against the live code on 2026-08-09 and are accurate.

**A correction is not finished until it is written back into the spec it corrects.** This project
has already had a fix applied, silently reverted by a later build that only read the spec, then
reapplied. Do not repeat it.

**The specs are a historical record as well as a contract.** They name Eli throughout, because she
was the client when the decisions were made. Those names are correct history and were deliberately
not rewritten during the 2026-09-03 handover. Read them as "the client decided this on that date".

## Still outstanding

See `Last-little-things.md` — five items, each with a named owner. None is a bug.
