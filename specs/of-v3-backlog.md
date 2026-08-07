STATUS: BACKLOG — not a spec, the running list of what V3 carries

# Ocean Forest V3 — backlog

Everything deliberately left out of V2, and why. Started 2026-08-06.

V2's rule was: ship what can be shipped without waiting on anyone. Anything that needed an account,
an asset, a decision or money got written here instead of half-built. Each item says **who owns it**,
because the point of this list is that it can be read out in a client call.

Ideas that are not website work live in `IDEAS.md`. This file is only V3 of the site.

---

## Needs something from Eli

### Featurable, on Eli's own account

**Added 2026-08-06 at Mehdi's request. This is the headline V3 item.**

V2's home carries a labelled placeholder where guest reviews go. It was deliberately left empty
rather than filled with invented quotes.

The plan is [Featurable](https://featurable.com/): free for life, unlimited page views, 15 reviews
per widget, no card. It reads Google reviews and updates itself.

**It must be created on Eli's own Featurable account, not Mehdi's, and connected to Ocean Forest's
own Google Business Profile.** The client wants the widget genuinely linked to their reviews, owned
by them, so that it survives whoever is maintaining the site. A widget living in the agency's
account is a hostage.

What is needed:

1. Eli confirms Ocean Forest's Google Business Profile is claimed and she can log into it.
2. Eli creates the free Featurable account, in the lodge's name, using a lodge email address.
3. She connects the Business Profile and configures one widget.
4. She sends the embed snippet, which is a `<div>` and a `<script>`.
5. It replaces `.hm-reviews-slot` in `v2/index.html`. One edit, and the styling should be tuned to
   the teal so it does not read as a bolted-on third-party box.

Owner: **Eli.** Blocked until she has the account.

### Room photography not yet published

V2 pulls every photograph already public on `oceanforestecolodge.com`. Anything not on that site is
still an empty labelled frame. Those frames name the exact file they are waiting for, so the moment
a photograph arrives it drops in with no code change.

Owner: **Eli.**

### Group Travel CTA

The only piece of copy on Arriving with no source anywhere. Renders as a labelled placeholder.

Owner: **Eli.**

### Helpful Contacts, confirmed

Every phone number and email on Arriving renders with an `(unconfirmed)` marker, because the source
page was last touched in 2018 and those are third parties' personal numbers. The markers come off
one by one as Eli confirms each is still live.

Owner: **Eli.**

### The founding year

Sources disagree: 2003 against 2002. About uses 2003 and flags the conflict rather than silently
choosing.

Owner: **Eli.**

### The newsletter endpoint

The form on the home page is real but wired to nothing. Their existing signup looks like a
WordPress form plugin rather than an email service, which would mean the subscriber list does not
travel with the site. Two things needed: which service they actually use, and the embed code.

If the list turns out to live only inside WordPress, someone has to export and import it. Until
there is an endpoint, the form should be removed rather than left silently swallowing addresses.

Owner: **Eli**, then Mehdi.

---

## Needs Ryan

### Per-page hero cuts

V2 puts the original three minute film back as the hero on all six pages. Ryan's plan is to cut it
into per-page segments of 30 to 45 seconds: accommodations, food, tours, and ideally yoga.

The hero is built so this is one constant in `v2/shell.js`. No page is touched when the cuts arrive.

Owner: **Ryan.**

---

## Needs a decision or money

### The three arrival maps, rebuilt as SVG

Arriving shows one route map at a time, chosen by the visitor. That is only half true until the
maps are SVG, because a JPEG cannot light one route and hide the others. One SVG file would serve
all four route states, size its own labels for a phone, and never go stale.

About a day. Not a commission: the existing `.org` artwork is the reference and proves an
illustrator is not needed. Full reasoning in `IDEAS.md`.

Owner: **Mehdi**, once Arriving has been tested on real visitors.

### The arrival card PDFs

One per route: the last-mile map, the walk direction, the three phone numbers, and the address in
Spanish for a taxi driver. Built for someone at Palmar Norte bus station with no signal.

Until they exist, `Download arrival card` is a live button that does nothing. **It should be a
disabled state, matching the Group Travel placeholder, rather than a dead link.** That small fix
belongs to whichever build touches Arriving next.

Owner: **Mehdi.** Depends on the SVG maps above.

### The property map, redrawn with altitude

Four faults in what exists, and only two of them Eli spotted: Turtle Island Labyrinth vanished from
the digital redraw, Mango is drawn but unlabelled, there is no sense of height so nobody understands
Gabilán Alto is up a hill, and **the compass rose on the hand-drawn original is wrong** — W at the
top, N to the right. The legible hand-drawn scan ships meanwhile. Full detail in `IDEAS.md`.

Owner: **asset job**, unassigned.

---

## The handover

### WordPress conversion

Settled 2026-08-06. The client's team runs WordPress and their developer, who is staying, works in
WordPress. They want to change photos and text themselves without going through Mehdi.

The sequence agreed: finish V2 in HTML, get Eli's approval on the `/v2/` link, then convert to
WordPress as its own separately priced piece of work, then move the domain **once**.

This is not building the site twice. V2 in HTML was the design and the decision work, done in the
cheapest tool for changing things. Converting a finished, approved design into a WordPress theme is
implementation, and it is a fraction of the work of designing inside a page builder.

**Consequence for the domain: do not point the A record at Vercel now.** Moving it to Vercel and
then to WordPress means two changes to a live business's address instead of one. Their developer
holds the record until the WordPress version is ready.

Owner: **Mehdi**, pending Q42.

### Before any handover

Whatever the destination, these come out or get decided first:

- **The Redline review widget.** `w.js` points at Mehdi's Redline. It does not belong on a site somebody else owns.
- **The concierge.** `concierge.js` and `/api/concierge` are Mehdi's, not the client's.
- **The frozen versions.** Every version lives in Redline's archive, so handing over the live site never loses the history.
