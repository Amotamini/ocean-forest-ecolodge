# Jonas — start here

**This document is yours and it is not going anywhere.** It lives in the project folder
permanently, alongside the website. Take as long as you like with it. Once you are set up you
simply will not need it any more — everything ongoing is in `START-HERE.md`.

The handover, in order. Nothing here needs any technical knowledge. Follow it top to bottom.

Handed over 3 September 2026 by Mehdi, PxN Productions.

---

## What you are getting

- **Two finished websites** — Ocean Forest Ecolodge, and Rainforest Medicine Gatherings.
- **Neither is live at its real address yet.** Both work, but at temporary addresses ending
  `.vercel.app`. Pointing `oceanforestecolodge.com` at it is the last step and it is not done.
- **Four accounts**, all in your name. Nothing is left behind with anybody else.

---

## Step 1 — GitHub (5 minutes)

*GitHub is where the website's files are stored, along with every version of them ever saved. It is
your undo button for the whole site.*

- Check your email for **two invitations from GitHub**.
- Open each one and click the button to accept.
- Until you accept both, the websites are not actually yours.

---

## Step 2 — GitHub Desktop (10 minutes)

*This is a small app that copies the website onto your computer, and sends your changes back. It
is the only app with a "publish" button.*

> **You do not need to learn Git, and you do not need to install it.** If you land on
> `git-scm.com`, or on a tutorial about the command line, close it — that is for programmers and
> you will never open it. GitHub Desktop is the whole of it: three buttons, and this document tells
> you which three.

- Go to **desktop.github.com** and download it. Install it.
- Open it. Choose **Sign in to GitHub.com** and sign in with the account from Step 1.
- In the menu bar: **File → Clone repository**.
- Click the **GitHub.com** tab. You will see a list of your projects.
- Choose **ocean-forest-ecolodge**. Note the folder it says it will save to. Click **Clone**.
- Wait — it is about 150MB, so give it a minute.
- Do the same again for **rainforest-medicine**.

You now have the websites on your computer. You will not need to open these folders by hand.

---

## Step 3 — Vercel (10 minutes)

*Vercel is what puts the website on the internet. It watches GitHub, and every time you publish a
change it updates the live site by itself.*

- Go to **vercel.com** and click **Sign Up**.
- Choose **Continue with GitHub** — do not create a separate password. Approve the access it asks
  for.
- Add a card. **It is $20 a month.** Vercel's free option is not allowed for business websites, and
  this is a business website. PxN was carrying this cost; it is yours now.
- Click **Add New** → **Project**.
- Find **ocean-forest-ecolodge** in the list and click **Import**.
- You will land on a settings page before it publishes anything. **One setting on this page
  matters. Do not skip it:**
  - Find the line that says **Root Directory**. Next to it is an **Edit** button.
  - Click **Edit**. A list of folders appears.
  - Choose the folder called **ocean-forest-website**. Click **Continue**.
  - *Why:* the website itself sits in a folder inside the project, alongside notes and records that
    must never go on the internet. This setting tells Vercel which folder is the actual website.
    Leave it on the default and your site publishes as a blank page.
- Leave every other setting exactly as it is. Click **Deploy**.
- Wait about a minute. It will give you an address ending `.vercel.app`. Open it. That is your
  site.

---

## Step 4 — Claude (5 minutes)

*Claude is where you actually change the website. You type what you want in plain English.*

- Install Claude and sign in.
- Start a new chat and choose a folder to work in. **Choose the folder called
  `Ocean Forest Ecolodge`** — the whole folder, not the `ocean-forest-website` folder inside it.
  - *Why:* prices appear in the website and in the retreat calculator, which sits outside it.
    Choose the inner folder and a price change will only half happen, silently.

**Then send it exactly this, as your first message:**

> I've just taken over this project. Read START-HERE.md and ocean-forest-website/CLAUDE.md, then
> tell me in plain English what this site is, what I'm allowed to change myself, and what I'm not.

That makes Claude teach you the project, instead of you having to learn it first.

---

## How to ask Claude for things

Be specific about three things: **which page**, **what it says now**, **what you want instead**.

- **Change some words**
  > On the Lodging page, change "Choose Your Perfect Room" to "Find Your Room". Show me the change
  > before you make it.

- **Add a photograph** — drag the picture into the chat, then:
  > Use this as the main photo at the top of the Experiences page.

- **Change a price**
  > The jungle suite is now $150 a night. Change it everywhere it appears, and list every place you
  > changed it.

  Always ask for the list. That is how you know it reached every file.

- **Write a blog post**
  > I want to publish a blog post about the turtle nesting season. Ask me whatever you need to
  > know, then write it and show me before publishing.

- **Take a photograph off a page**
  > Take the second photo off the Retreats page. Don't delete the file itself.

- **When you are not sure you are allowed**
  > Is this something I can do myself, or does it need a developer?

Claude has the rules in writing and will refuse anything structural. **A refusal means it is
working properly.**

---

## How a change actually goes live

Claude changing a file does not put it on the internet. Two more clicks:

- Open **GitHub Desktop**. Your change is listed there.
- Type a short note in the box at the bottom left. Click **Commit to main**.
- Click **Push origin** at the top.
- Wait about a minute. The live site updates itself.

That is the whole thing. There is no step four.

---

## Two habits worth having from day one

- **Make Claude show you before it writes.** Add *"show me the change before you make it"* to every
  request until you trust it.
- **One thing at a time.** Six changes in one message is how a mistake gets buried in the middle.

---

## If something looks wrong

**Do not try to fix it.** Put it back instead — it takes four clicks and works every time.

- Open **GitHub Desktop**.
- Click **History**, top left. Everything ever changed is listed, newest first.
- Right-click the top entry → **Revert changes in commit**.
- Click **Push origin**.

A minute later the site is exactly as it was. Undoing is itself just another change, so if you undo
the wrong thing you can undo that too. **Nothing you do can be permanently lost.**

If reverting does not fix it, that is the point to bring in a developer. Give them
`ocean-forest-website/HANDOVER.md` — it is written for someone who has never seen this project.

---

## Three things nobody has answered yet

These block your launch. None is technical — each needs someone to find out.

- **Who holds the domain?** `oceanforestecolodge.com` is registered somewhere, renews on some date,
  from someone's card. Nobody confirmed which. **If it lapses the website disappears** — that is
  the most common way small sites die. Find out, get it in your name, set a calendar reminder.
- **What were the old site's addresses?** Every page currently on `oceanforest.org` needs its new
  address written down *before* the domain switches. Skip it and every existing link breaks on
  launch day, along with your Google search results.
- **Are the phone numbers still right?** The Arriving page carries transport contacts last checked
  in **2018**, marked "unconfirmed" on the page for that reason. They are other people's numbers.
  Call them before you publish, or take them off.

The full list, with who owes what, is in `Last-little-things.md`.

---

## Three things never to do

- **Never type `vercel deploy`, `vercel --prod` or `vercel link`.** On 25 July 2026 a stray
  publishing key pushed an unfinished rebuild over the live site. Publishing happens one way only:
  Commit and Push in GitHub Desktop.
- **Never rename or delete a photograph already on the site.** Something is probably using it and
  you cannot see every place from the page in front of you. Adding new ones is always safe.
- **Never fix a broken page by editing it.** Revert instead.

---

## Two things worth knowing

**The older documents say "Eli".** The folders `specs/`, `audits/` and `waiting-on/`, and the
change logs, name her throughout. That is correct — she was the client when those decisions were
made, and rewriting history would have made the record useless. Read them as "the client decided
this, on this date". Everything written as an instruction to *you* has been updated.

**There is no developer on retainer.** No ongoing arrangement with PxN. The site is built to be run
by you, with Claude, with nobody technical in the room.
