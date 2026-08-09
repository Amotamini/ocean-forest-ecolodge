STATUS: BUILT 2026-08-09 — awaiting Jonathon's confirmation on five points

# Rainforest Medicine V2 — Jonathon's answers applied

Carries the answers Jonathon gave through Redline Queries on 2026-08-07, plus the five
testimonials he sent on 2026-08-09, plus what was verified directly against the live
WeTravel and rainforestmedicine.net pages on 2026-08-09.

Supersedes the "what's included" and "testimonials" placeholders left by
`rfm-events-first-homepage.md`. It overturns three decisions from that spec. Those are
named below so nobody has to guess which document is current.

## 1. What changed and why

### 1.1 Booking moves to WeTravel — overturns `rfm-events-first-homepage.md`

That spec decided "Booking is an email application today. No payment, no Stripe, no form
service." That was written without knowing the client was already selling. They are:
both Costa Rica gatherings and the Ecuador expedition take deposits on WeTravel right now,
at $500, $333 and $500 respectively.

WeTravel cannot name the medicine — Jonathon stated this explicitly. So the split is:

- **This site carries the ceremony.** Ceremony counts, the tradition, the preparation
  protocol, the plants. Everything WeTravel is not able to say.
- **WeTravel carries the money.** Each card's "Reserve your place" opens that gathering's
  WeTravel page in a new tab, with the deposit figure printed on our card first.

The email application is retired as the primary path. `applyMailto()` survives as a quiet
secondary link, "Questions before you book", and keeps the full health questionnaire —
that screening has nowhere else to live, since WeTravel cannot ask about ayahuasca
contraindications.

### 1.2 Three gatherings, not two — overturns `rfm-events-first-homepage.md`

That spec decided "Two gatherings only. There is no third." There is a third, it is live,
and it is sooner than both: **Napo-Galeras Wilderness Expedition, November 20 to 29, 2026,
Napo Province, Ecuador, $2,700, $500 deposit.** Jonathon referred to "the Ecuador trip" in
his Queries answer and it has its own event page and its own WeTravel listing.

It is now the first card and the hero's "next gathering". It is framed as an expedition
rather than a retreat, because the camp is a full day's walk in.

### 1.3 The elders have passed

Jonathon, 2026-08-07: *"Our elders sadly have all passed to the other side. On the new web
site we can downplay Siekopai participation, I'll go through the text and offer edits."*

The site was written in the present tense throughout and was, as of this morning, telling
visitors that the elders "still live with grace, devotion and natural presence, and gladly
share their way of life with those who come with sincere hearts." That is corrected now
rather than held for Jonathon's edits, because the false version was live.

Four passages changed:

- **Lineage body.** Cesáreo Piaguaje moves to the past tense. The claim that the elders
  still receive visitors is replaced with: "The elders who taught here have now passed to
  the other side. What they gave, they gave completely, and it is carried today by those
  they taught."
- **Lineage quote.** "They share visions" becomes "They shared visions".
- **Intentions.** "To learn from skilled Secoya wisdom keepers" becomes "To meet the
  teaching of the Secoya wisdom keepers, given by the traditional elders, and carried
  forward by those who sat with them."
- **The Gathering.** "the company of elders who carry this way of life" becomes "the
  company of those who carry this way of life."
- **Conservation.** "Supporting the elders" becomes "Supporting Siekopai families".

The tradition is not downplayed. What is removed is every sentence that promised a living
elder would be in the room. Jonathon's own edits are still welcome on top of this.

### 1.4 Minors — overturns `rfm-events-first-homepage.md`

That spec decided "Minimum age to participate is 18." Jonathon, 2026-08-07: *"Yes, and
minors are welcome too with parental accompaniment."*

Mehdi decided 2026-08-09 to state it as Jonathon said it. The page now reads: "Participants
are 18 and over. Younger people are welcome when accompanied by a parent or guardian."

**This was flagged as a risk and taken anyway, knowingly.** It is a public invitation on a
page about ayahuasca. Jonathon should confirm in writing that he means it as a published
policy. See question 4 in the open list.

### 1.5 Testimonials

Five supplied, all five published, in the participants' own words. Two mechanical edits:

- The spelling of Jonathon's name corrected where a writer wrote "Jonathan".
- Dr Santander's licence number, clinic name and website are not published. He supplied
  them, but printing a licensed practitioner's credentials beside ayahuasca testimony
  exposes him, not us. His name and profession stand.

No gathering is attributed to any testimonial except Charles Buckingham's, which names
Napo-Galeras itself. The rest do not say which gathering they attended and it is not
guessed at. See question 5.

## 2. Sources for every figure on the page

| Figure | Source |
|---|---|
| Ecuador, Nov 20 to 29 2026, $2,700, $500 deposit | rainforestmedicine.net event page |
| Cicadas, Jan 24 to 31 2027, $2,700, $500 deposit | WeTravel listing + event page, agree |
| Cocoterra, Feb 2 to 7 2027, $999, $333 deposit | WeTravel listing |
| Cicadas: 2 yagé, 2 sunrise renewals, 3 floral baths | Event page, corroborated by Jonathon 2026-08-07 |
| Cocoterra: 1 yagé, 1 to 2 sunrise renewals | Jonathon 2026-08-07 — **conflicts with his own event page**, see question 2 |
| Ecuador: 1 to 2 yagé, 1 to 2 sunrise renewals | Jonathon 2026-08-07 |
| Includes and excludes, all three | WeTravel "What's included" blocks |
| 12 places | Both live pages — **conflicts with Jonathon's answer**, see question 1 |

## 3. What was deliberately not copied

The rainforestmedicine.net January event page carries a second "Key Details" block that
contradicts the block above it on the same page: it claims max 9 participants, 3 yagé
ceremonies, 3 sunrise purifications, and describes the retreat as "held during the lush
renewal season of **July**" for a January event. It is stale paste. Nothing was taken
from it. Jonathon should delete it.

## 4. Still not done

- Botanical correction (*cabrerana* to *longialata*, Huambisa type) is still only in the
  DRAFT `rfm-tradition-depth-pages.md`. The live plants list still prints *cabrerana*.
  Jonathon has never been asked this through Queries. See question 3.
- The preparation protocol page, the blog migration and the talks page remain DRAFT.
- Hero video field is still empty. No film, no venue footage supplied.
- Book cover scans, Amaringo art and the webinar uploads are all still outstanding.

## 5. Header — contents menu and the temporary palette toggle

Added 2026-08-09, after the copy work.

### 5.1 The menu is now the page's table of contents

The old nav listed five sections out of thirteen, in an order that did not match the page.
It now lists **every section, in page order, with a line saying what is in it**, driven by
the `nav` array in `lib/content.ts`. Add or move a section and the array moves with it.

**One decision taken, open to veto:** the inline row of desktop links is gone. Thirteen
items do not fit in a header bar, and cutting them back to fit is what produced the
inaccurate menu in the first place. In its place is a "Contents" button, at every
breakpoint, opening a numbered index. The Reserve button stays in the bar. If the row of
links is wanted back, the honest version is a short bar of five plus the full index behind
the button, and it is about twenty minutes of work.

### 5.2 The palette toggle is scaffolding, not a feature

A sun/moon button sits in the header. It flips the whole site between the night palette and
a daylight one, and remembers the choice in `localStorage`.

**This is temporary and must be removed once the palette is chosen.** Four things to delete:

1. `components/site/ThemeToggle.tsx`, and its import and usage in `components/site/Nav.tsx`
2. The no-flash `<script>` block in `app/layout.tsx`
3. The losing palette block in `app/globals.css`
4. The `data-theme` attribute on `<html>` in `app/layout.tsx`

Then fold the winning values back into `tailwind.config.ts` as plain hex, which is where
they lived before.

**How it works, so nobody has to reverse-engineer it.** Every colour in
`tailwind.config.ts` now reads from a CSS variable rather than a hex value, and the two
palettes are declared in `app/globals.css`. Not one component was recoloured. Class names
are unchanged and deliberately keep their original meaning: `night` is the ground the page
sits on and `cream` is the type, in either palette. The eleven hard-coded `rgba()` gradients
scattered through the components were replaced with variables at the same time, which is
worth keeping regardless of which palette wins.

**What is honestly not solved.** This is a photographic site built on dark processed
images, and a palette flip is not an art direction pass. In daylight the photo overlays
fade to bone rather than to black, and the hero in particular is weaker for it. If daylight
wins, the images want reprocessing and the overlays want redrawing. Judge the daylight
option on the type, the cards and the general feel, not on the photographs.

`viewport.themeColor` in `app/layout.tsx` is still the hard-coded night value, so mobile
browser chrome stays dark in either palette. Not worth wiring up for a throwaway toggle.

## 6. Verification

`npx tsc --noEmit` passes clean. `next build` could not be run in the sandbox: `app/fonts.ts`
pulls Cormorant Garamond and Hanken Grotesk from Google Fonts at build time and the sandbox
has no route to fonts.googleapis.com. **Run `npm run build` locally before deploying.**
