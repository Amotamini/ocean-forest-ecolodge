# Editing your website

Written for Jonas. You do not need to know anything about code to use this.

---

## What you can change yourself

**Any words on the site.** Headings, paragraphs, room descriptions, the questions and answers.

**Any photograph.** Swap one for another, fill a slot that is waiting for a picture, or take one
off a page.

**Any price.**

**The blog.** Write a post, change a post, take a post down.

That is the list. Everything else, meaning where things sit on the page, colours, fonts, adding or
removing a whole section, needs a developer. There is a good reason for that, further down.

---

## The two things you open

1. **Claude.** Where you say what you want changed. It does the work.
2. **GitHub Desktop.** A small app with a Push button. This is what makes a change go live.

Both are set up once. After that you never open anything else.

### The folder you point Claude at

**Point Claude at the whole Ocean Forest folder, the one called Ocean Forest Ecolodge.** It is the
same folder GitHub Desktop shows you, so if the two ever look different, you are in the wrong one.

The website sits in a folder inside that one, and it is tempting to point Claude straight at the
website instead. Do not. Some things live alongside the website rather than inside it, the retreat
price calculator most of all. Point Claude at the website folder alone and a price change will
quietly only half happen: the website will say the new number and the calculator will still say the
old one, and nothing will warn you.

If you are ever unsure, ask Claude "can you see the retreat calculator?" before asking for a price
change. It will tell you.

---

## Changing some words

Open Claude, point it at the Ocean Forest folder as above, and just say what you want:

> On the Lodging page, change "Choose Your Perfect Room" to "Find Your Room".

> On the About page, the second paragraph says we were founded in 2003. Make it say the lodge has
> been running for over twenty years instead.

Claude will tell you what it is about to change and what it will say afterwards. **Read that, then
say yes.**

---

## Changing a photograph

**Drag the picture straight into the conversation and say where you want it.**

> [drag the photo in] Use this as the big photo at the top of the Experiences page.

That is the whole thing. Claude works out where it belongs, names it properly, converts it if your
phone saved it in a format the web cannot show, makes it the right size, and puts it on the page.

You do not need to find a folder, rename anything, or know what a file format is. Photographs
straight off a phone or a camera are fine, and bigger is better than smaller.

**A dashed box saying "Photo to come" is not a fault.** It is the site telling you it is waiting
for a picture in that spot. Drag one in and say "use this for that box".

---

## Taking a photograph off a page

Say which page and which picture:

> On the Experiences page, take the photograph of the waterfall off. Nothing in its place.

Claude changes the page so the picture is no longer shown. **The picture itself is never deleted.**
It stays exactly where it is, because another page may well be using it too, and because you may
want it back next month. Nothing is ever thrown away here.

If you want a different picture instead of the old one, do not ask for the old one to be removed
first. Just drag the new one in and say "use this instead". That is one step rather than two.

---

## Changing a price

Say the new number and which price you mean:

> Put the beach bungalow up from $120 a night to $130.

> Put Coco Solo's high season week up from $1,250 to $1,300.

**There are two different kinds of price on this site, and Claude will ask you which one you mean
before it changes anything.** They are:

- **The nightly rates.** The "from $120 a night" kind, on the Home page and the Lodging page.
- **The retreat week rates.** The price of one named room for seven nights, which the retreat
  calculator adds up.

They are not connected, and changing one does not change the other.

Each price is written down in more than one place, because more than one page quotes it. Claude
will show you **every place the number appears** and change them all at once, or not at all. A
price changed in only some places is worse than a price not changed, because the site would then
quote two different numbers and nobody could tell which was real.

---

## Writing a blog post

Say what the post is called, when it should be dated, and then write it or paste it in:

> New blog post, called "The turtles of San Josecito", dated today. Here is what it says.
> [paste or type the piece]

Then drag in any photographs you want in it, saying which goes at the top and where the others sit.

Claude does everything else: it makes the post, gives it its own web address that you can send to
somebody, resizes the photographs so the page stays quick to open, and adds the post to the top of
the blog list so it appears the moment you publish.

**Photographs first, then the words.** If you send both together it is faster still.

**To change a post that is already up**, say which one and what to change. It works exactly like
changing words on any other page.

**To take a post down**, say so:

> Take the turtles post off the blog.

It disappears from the blog immediately. The writing and the photographs are kept, so if you change
your mind you can say "put the turtles post back" and it returns exactly as it was.

---

## Making it go live

Nothing you do in Claude is on the internet until you do this.

1. Open **GitHub Desktop**.
2. You will see your changes listed on the left.
3. Type a short note in the box, "new beach photo" is plenty.
4. Press **Commit**, then press **Push**.
5. Wait about a minute. The live site updates itself.

---

## Undoing your last change

**You can put the site back yourself, and you do not need to ask anybody.**

1. Open **GitHub Desktop**.
2. Click **History** at the top left. This is the list of everything that has ever been changed,
   newest at the top.
3. Right-click the top one, the change you just made.
4. Choose **Revert changes in commit**.
5. Press **Push**.

About a minute later the site is back exactly as it was. Undoing is itself just another change, so
if you undo the wrong thing you can undo that too.

**Nothing you do can be permanently lost.** Every version of this site is kept forever. This is
worth remembering, because it means you can experiment without fear.

If reverting does not put it right, that is the point to bring in a developer. Tell them which page looks
wrong, and point them at START-HERE.md. They will have everything they need.

---

## Why some things need a developer

The site is built so that one change can update several pages at once. Change the way a room is
shown, and it changes on the Home page, the Lodging page and the Retreats page together.

That is deliberate and it is what keeps the site consistent. It also means a change in the wrong
place goes wrong in six places instead of one. So the rule is simple:

**Words, pictures, prices and the blog: you. Anything about how it looks or how it is laid out:
a developer.**

Claude has been given the same rule in writing and will tell you when something is a developer's job rather
than yours.

---

## Things the site is deliberately waiting for

These are not faults. Please do not fill them with made-up content:

- **The newsletter signup does not work yet.** It needs a mailing service to be chosen first.
- **"Watch the full film" goes nowhere.** It needs the real video link.
- **The guest reviews section is an empty box.** No review has been invented. It needs your Google
  Business login to connect properly.
- **The yoga shala video** has not been delivered yet.
- **Some phone numbers on the Arriving page say "unconfirmed".** They were last checked in 2018 and
  need a call to verify.

The full list, and who owes what, is in the note called Last little things, alongside this one.
