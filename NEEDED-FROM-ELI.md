# What we need from Eli before this can go live

Six things block launch. Everything else is built.

---

## 1. All-inclusive room rates (blocking)

The site prices rooms the same way Booking.com does: one all-inclusive rate per room per night, three meals and drinks folded in, nothing added at checkout. Confirmed via Booking.com's own listing, their rate is already full board (all three meals, plus tea, coffee and cacao all day), so this page now matches that structure exactly rather than itemizing a separate meal charge.

The numbers currently on the stays page are placeholders, derived from the retreat calculator's per-person, seven-night rates and roughly halved to approximate a per-room nightly figure. Not confirmed.

Needed, per room, for both seasons, all-inclusive:

| Room | All-inclusive, high season | All-inclusive, green season |
|---|---|---|
| Coco Solo | | |
| Palmiche | | |
| Naranjo | | |
| Mango | | |
| Solo Bueno North | | |
| Solo Bueno South | | |
| White Hawk Top | | |
| White Hawk Bottom | | |
| Cachimbo Top | | |
| Cachimbo Bottom | | |

Ideally these match whatever is already listed on Booking.com for the same room and season. That's what makes the "book direct, same price, extra perks" promise on this page true rather than aspirational.

Also worth confirming: is there a minimum stay for nightly guests?

Where to change it: `stay.html`, the `ROOMS` array near the top of the script block. Clearly marked. Nothing else needs touching.

---

## 2. How many rooms are there, actually (blocking)

Three sources, three answers.

- The retreat calculator lists **12 units**, of which 2 (Lapa Lapa West and East) are held for facilitators. So 10 bookable guest rooms.
- Booking.com says **11 rooms**.
- The old main site says **10 rooms, 30 guests max**.
- The current retreat page says **11 units, 32 guests max**.

The stays page currently shows the calculator's 10 guest rooms and explains that Lapa Lapa is reserved for retreat facilitators. If that is wrong, it is wrong in a way guests will notice on arrival.

Needed: the real count, and the real maximum occupancy of the property.

---

## 3. Confirm the direct-booking perks are real and deliverable

The pricing pitch changed. The site no longer claims a lower direct rate (that would likely breach a Booking.com rate parity clause, which is the whole reason this needed rethinking). It now says: **same price as anywhere else, but book direct and you get first pick of rooms, a welcome drink on arrival, and Eli planning your stay personally.**

Those three perks are placeholders I chose because they're low-cost and easy to deliver, not because anyone confirmed them. Before this goes live, confirm:

- Are these the right three perks, or does Eli want to offer something else (a late checkout, a free excursion credit, a bottle of something local)?
- Can the team actually deliver "first pick of rooms" in practice, given how the property is allocated?
- Is a welcome drink realistic for every arrival, including odd hours after a full day of travel?

Change the copy in three places in `stay.html`: the `.promise` section near the top, the `.save-callout` box in the booking section, and the `.est-note` line inside the JavaScript estimate function.

---

## 4. A Formspree form ID

The booking request form is built and styled but posts nowhere. It needs an endpoint.

1. Create a free account at formspree.io
2. Make a new form, set the destination to Eli's inbox
3. Copy the form ID and replace `REPLACE_WITH_FORM_ID` in `stay.html`

Free tier covers 50 submissions a month, which is plenty. If volume grows, Resend with a small Vercel function is the next step and does not change the front end.

**Worth pushing on:** the page now promises a reply within 48 hours, stated twice. That's already a softer promise than the original 24-hour version, on purpose, but it's still doing real conversion work against Booking.com's instant confirmation. If Eli can't reliably hit 48 hours either, the number needs to change before launch rather than after the first bad review.

---

## 5. Media

Drop files into `/media` using the exact filenames in `media/README.md`. Any slot without a file shows a labelled frame on the page telling you which filename it is waiting for, so nothing silently breaks and you can see at a glance what is still missing.

Priority order, by how much each affects conversion:

1. **Room photos.** `-01` for each of the 10 rooms is the single highest-value asset. Nobody books a room they cannot see.
2. **Hero video.** `hero-stay.mp4` plus a poster frame. Until it lands the hero falls back to the existing YouTube embed, which works but carries YouTube branding and loads slowly.
3. **The long table and the kitchen.** Meals are included in the rate, not an upsell, but a good photo still does the work of justifying the price.
4. **The boat arrival.** Remoteness is the main objection. A photo of the journey turns it from a worry into part of the trip.

---

## 6. Decide on the old oceanforest.org

The plan is that this build replaces it entirely. Before the DNS switch we need a list of the old site's live URLs so we can write redirects for each one. Without that, every existing link and every page currently ranking in Google breaks on launch day.

---

## Still to build

- Embed the retreat calculator into the retreats page as a leader-facing planning tool
- Redirect map from the old site
- Final pre-flight pass across all three pages
