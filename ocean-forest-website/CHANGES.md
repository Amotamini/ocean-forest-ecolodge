# Change log

Every edit made to this website, newest at the top.

**Claude adds a line here automatically each time it changes something.** Nobody has to remember to
write it. If Scott ever needs to work out what happened and when, this is the first place he looks,
and the full technical record sits behind it in the repository's own history.

Format: date, who asked, what changed, which page.

---

## 2026-08-13 · Mehdi · Which folder to open, and no more Google Sheet

Two things that would have caught Eli out.

**Which folder to open in Claude.** Nothing told her. It has to be the whole Ocean Forest folder,
the one GitHub Desktop shows her, not the website folder inside it, because the retreat price
calculator sits alongside the website rather than in it. Open the narrower one and a price change
would half succeed in silence. This is now said in both guides, and Claude checks it can reach the
calculator before touching any price and explains itself plainly if it cannot.

**The Google Sheet is gone.** The standalone retreat calculator carried a note saying Eli edits
prices in a Google Sheet and the page reads it. That sheet was never set up, the address for it
was empty from the day it was written, and the prices in the file are what has been running the
calculator all along. It contradicted the way prices are really changed, which is by saying so to
Claude, so the note and the unused machinery behind it are removed. No price changed, and the
calculator was checked afterwards: it opens, lists all twelve units, and adds up correctly.

Files: EDITING-YOUR-WEBSITE.md, CLAUDE.md, ../START-HERE.md,
../Retreat calculator/retreat calculator.html

## 2026-08-13 · Mehdi · Blog posts open again

A blog card was pointing at an address the local preview server cannot serve, so a post could be
written and listed but never opened to check before publishing. The card now points at the post
file itself, which the live site still shows at the tidy short address. Nothing visible changed.

File: blog/index.html

## 2026-08-13 · Mehdi · First blog post published

"See~diii: a 9th dimensional goddess protects the Osa Peninsula" is now live at
/blog/seediii-goddess-of-the-osa. It is Jonathon's account, brought across from the old
oceanforest.org site where it was published on 12 April 2021, and it keeps that date.

The blog index no longer carries the line that told Google to ignore it. That line was
there only while the blog was empty and it comes off with the first post, as planned.

Its photograph is the lodge's own wide shot of the Pacific off San Josecito. The two
photographs of the stone spheres from the original article could not be copied across
automatically. The markup for both is already written into the post and commented out,
and media/blog/seediii-goddess-of-the-osa/README.txt says exactly what is needed.

Files: blog/seediii-goddess-of-the-osa.html (new), posts.js, blog/index.html,
media/blog/seediii-goddess-of-the-osa/

## 2026-08-13 · Eli · Ten rooms, settled

The lodge has ten bookable guest rooms. Twelve units exist on the property, and two of them,
Lapa Lapa West and East beside the shala, are facilitator space rather than rooms sold to guests.
This is Eli's own answer and it is final.

Four documents said eleven. All four traced back to one note written on 2026-08-09 that was not
hers, and it had been copied from file to file since. They now say ten, each with a line saying
where the wrong number came from, so nobody re-opens it in a year.

On the Retreats page the three accommodation cards added up to twelve, because the Gardens and
stream card counted five by including Lapa Lapa West and East. It now reads three, so the cards
total ten and agree with the line above them. No other visible wording changed anywhere: every
page already said ten and every page was right. The retreat calculator still lists all twelve
units, which is correct, because it allocates beds for a retreat rather than selling rooms.

Files: `retreats.html`, `CLAUDE.md`, `HANDOVER.md`, `../WHAT-WE-AGREED.md`,
`../waiting-on/NEEDED-FROM-ELI.md`, `../waiting-on/QUESTIONS-FOR-ELI-2026-08-04.md`,
`../specs/of-v2-retreats.md`.

---

## 2026-08-13 · Mehdi · The blog is real, and the guides were repaired

The blog is no longer a placeholder. It lives at `/blog/`, each post gets its own web address
that can be sent to somebody, and the list of what appears there is `posts.js`. The old
placeholder page `blog.html` was removed, and every footer link on the site now points at
`/blog/` instead. No post has been published yet, so the blog shows its waiting message.

`CLAUDE.md` gained the four recipes: publishing a post, editing or removing one, changing a
price, and taking a photograph off a page. It no longer refuses to change the retreat
calculator's prices. `EDITING-YOUR-WEBSITE.md` was rewritten to cover blogging, prices and
undoing, in plain language. `HANDOVER.md` and `START-HERE.md` were describing a two-site layout
that ended on 2026-08-11 and have been corrected.

Files: `blog/index.html`, `blog/_template.html`, `posts.js`, `shell.css`, `shell.js`,
`media/blog/`, `CLAUDE.md`, `EDITING-YOUR-WEBSITE.md`, `HANDOVER.md`, `../START-HERE.md`, and
the footer link in all six root pages.

---

## 2026-08-09 · Mehdi · Handover

Website handed over to Eli. Editing with Claude set up. This log starts here.

Everything before this date is in the repository history and in `specs/`.
