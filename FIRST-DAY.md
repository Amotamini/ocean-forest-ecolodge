# Jonas — read this once, then delete it

This is the only document that expires. It covers the handover itself: what moved, what it costs,
and the six things to do in your first week. Everything ongoing lives in `START-HERE.md`.

Handed over 3 September 2026 by Mehdi, PxN Productions.

---

## What you now own

**Two websites**, both finished and both working:

- **Ocean Forest Ecolodge** — seven pages, one of which is the blog. This repository.
- **Rainforest Medicine Gatherings** — its own repository, built differently. Its `CLAUDE.md`
  explains it.

**And the accounts they run on.** GitHub holds the code and every version of it ever saved. Vercel
puts it on the internet. Both are now in your name.

**Neither site is live at its real address yet.** They are published and working at temporary
addresses ending `.vercel.app`. Pointing `oceanforestecolodge.com` at it is the last step, and it
is not done — see below.

---

## Six things to do

**1. Accept the two GitHub emails.** One per repository. Until you click both, the code is not
actually yours.

**2. Set up Vercel.** Sign up at vercel.com using **Continue with GitHub** — not a separate
password. Then Add New → Project → pick `ocean-forest-ecolodge` → and this part matters:

> **Root Directory must be set to `ocean-forest-website`.**

Get that one setting wrong and the site builds empty. Everything else can stay on its default.

**3. Put a card on Vercel.** $20/month. Vercel's free tier does not allow business websites, and
this is a business website. It was previously being carried on PxN's account; it is yours now.

**4. Install GitHub Desktop** and sign in. Clone both repositories to your computer. This is the
app with the Push button — it is how a change you make actually reaches the internet.

**5. Install Claude** and point it at the Ocean Forest folder — the whole folder, not the website
folder inside it. `START-HERE.md` explains why that distinction matters.

**6. Read `START-HERE.md`, Part 1.** Twenty minutes. It is the actual manual.

---

## What to say to Claude

Claude is where the work happens. There are no commands to learn — you talk to it in normal
English. But you will get far better results by being specific about three things: **which page**,
**what it says now**, and **what you want instead**.

**Your very first message, copied exactly:**

> I've just taken over this project. Read START-HERE.md and ocean-forest-website/CLAUDE.md, then
> tell me in plain English what this site is, what I'm allowed to change myself, and what I'm not.

That one message gets Claude to teach you the project rather than you having to learn it first.

**Then, the things you'll actually want:**

Change some words —

> On the Lodging page, change "Choose Your Perfect Room" to "Find Your Room". Show me the change
> before you make it.

Add a photograph — drag the picture straight into the conversation, then —

> Use this as the main photo at the top of the Experiences page.

Change a price —

> The jungle suite is now $150 a night. Change it everywhere it appears, and list every place you
> changed it.

*Always ask for the list.* A price lives in more than one file, and the list is how you know it
reached all of them.

Publish a blog post —

> I want to publish a blog post about the turtle nesting season. Ask me whatever you need to know,
> then write it and show me before publishing.

Take a photograph off a page —

> Take the second photo off the Retreats page. Don't delete the file itself.

When you're not sure you're allowed —

> Is this something I can do myself, or does it need a developer?

Claude has been given the rules in writing and will refuse anything structural. **A refusal is it
working properly, not failing you.**

**Two habits, from day one**

**Make it show you before it writes.** Add "show me the change before you make it" to every
request until you trust it. It costs one extra message and saves you reverting.

**One thing at a time.** Six changes in a single message is how a mistake gets buried in the
middle. Ask for one, look at it, then ask for the next.

**If something looks broken**

> Something looks wrong on the Arriving page. Don't try to fix it — tell me how to revert my last
> change.

Reverting is four clicks in GitHub Desktop and it always works. Patching on top of a problem is
what turns one minute into an afternoon.

---

## Three things nobody has answered yet

These block your launch, and none of them is a technical problem. They need a person to find out.

**Who holds the domain?** `oceanforestecolodge.com` is registered somewhere, renews on some date,
from someone's card. Nobody confirmed which during the handover. **If it lapses, the website
disappears** — that is the most common way small sites die. Find out who holds it, get it into your
name, and set a calendar reminder for the renewal.

**What were the old site's addresses?** Every page currently live on `oceanforest.org` needs its
new address written down before you switch the domain over. Skip this and every existing link
breaks on launch day, along with your Google rankings.

**Are the phone numbers still right?** The Arriving page carries transport contacts last verified
in **2018**, and they are marked "unconfirmed" on the page for that reason. They belong to other
people. Call them before you publish, or take them off.

The full list of what is outstanding, with who owes what, is in `Last-little-things.md`.

---

## What not to do

**Never run `vercel deploy`, `vercel --prod`, or `vercel link`.** On 25 July 2026 a stray copy of a
publishing key pushed an unfinished rebuild over the live site. Publishing happens one way only:
Commit and Push in GitHub Desktop.

**Never rename or delete a photograph that is already on the site.** Something is probably using
it, and you cannot see every reference from the page in front of you. Adding new ones is always
safe.

**Do not fix a broken page by editing it.** Revert it instead — four clicks in GitHub Desktop,
explained in `START-HERE.md`. Trying to patch on top of a problem is what turns a one-minute fix
into an afternoon.

---

## About the older documents

`specs/`, `audits/` and `waiting-on/` name **Eli** throughout, and the change logs record edits in
her name. That is correct — she was the client when those decisions were made, and rewriting
history would have made the record useless. Read them as "the client decided this, on this date".

Everything written as a live instruction — `START-HERE.md`, both `CLAUDE.md` files,
`EDITING-YOUR-WEBSITE.md`, `HANDOVER.md`, `DEPLOYING.md` — has been updated and now means you.

---

## Support

There is no developer on retainer and no ongoing arrangement with PxN. The site is built to be run
by you, with Claude, without anybody technical in the room. When something genuinely needs a
developer, `ocean-forest-website/HANDOVER.md` is the map you hand them — it is written for someone
who has never seen this project.
