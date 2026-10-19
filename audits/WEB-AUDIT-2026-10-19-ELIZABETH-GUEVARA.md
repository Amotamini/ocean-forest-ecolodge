# Ocean Forest Ecolodge web audit (English translation)

19 October 2026 · Elizabeth Guevara · translated and checked against the new site the same day.

The audit reviewed the home page and the six main pages of the **old** live site at
oceanforestecolodge.com. Each item below has its original finding in English, followed by its
**status on the new site**. The new site is the one in `ocean-forest-website/`.

- **Fixed today**: changed in this pass. Each change has an entry in `ocean-forest-website/CHANGES.md`.
- **Already fine**: the problem is not on the new site.
- **Needs a decision**: the audit disagrees with something already settled, or the answer is still
  pending. Nothing was changed.

The audit's summary: the site is attractive and has good content, but some problems cost
bookings. These are visible placeholder text, broken links, data that contradicts itself between
pages, and poorly configured SEO. The audit was done by automated reading, so items marked ⚠️
should be confirmed visually.

---

## 1. Data that does not match the project's data

Confirm which version is correct before changing anything. The most serious item is the
September–October closure. The site does not mention it, so a guest can try to book those dates.

| Topic | What the old site says | Project data | New site |
|---|---|---|---|
| Number of rooms | "10 spacious rooms", but the list adds up to 11: 3 Beach, 4 Jungle Suites, 1 Quadruple, 2 Lapa Lapa and 1 Garden | 11 rooms | **Needs a decision.** The new site says ten rooms everywhere. `CLAUDE.md` records "ten bookable guest rooms; Lapa Lapa West and East are facilitator space. Settled with Eli 2026-08-13, do not re-open." This audit contradicts that, so Jonas and Eli need to agree on one number. |
| Categories | 5 or 6 names appear: Beach Bungalows, Jungle Suites, Family Bungalows, Quadruple Bungalow, Lapa Lapa and Garden Bungalow | 4 categories | **Needs a decision.** The Lodging page shows 3 categories (Beach, Jungle Suite, Family). The retreat calculator also names Garden Bungalow and "Gardens & stream" rooms. The official names are still pending (see below). |
| Capacity | "up to 30 guests" in one place, "up to 32 guests" in another | 32 people | **Already fine.** It says 32 everywhere. |
| Seasons | FAQ: green season May to November, dry December to April. Does not say the lodge closes | Green: November and May to August. Closed 1 Sep to 31 Oct | **Fixed today.** The FAQ on the Home page, the booking answer, the boat route and the Host Kit now give the closure and the new green-season months. |
| Group terms | The yoga page does not mention minimum nights, deposit, free leader, included meals or transfers | Minimum 3 nights, 20% deposit, free leader from 10 participants, three meals included, transfers extra | **Mostly already fine, one conflict.** The Retreats page states minimum 3 nights, the free leader from 10 guests and three meals. It says a **25%** deposit, and so does the calculator (25/50/25). The project data says 20%. That needs a decision before anything changes, because the calculator's payment plan changes with it. The page does not say transfers are extra. That line should be added once it is confirmed. |

## 2. Critical errors

| Problem | Where (old site) | Detail | New site |
|---|---|---|---|
| Visible placeholder text | Contact (FAQ) | "[Link]", "[Link to appropriate site here]", "[Link to location here]" and "You can pay per xxx" in the answers on booking rooms and tours | **Already fine** on the pages. One placeholder remains in the Retreat Host Kit: "+506 XXXX XXXX" next to `retreat@oceanforestecolodge.com`. It needs the real number and the official email. |
| Broken email link | Arriving | Malformed code: "mailto:maito>eli@oceanforest.org" | **Already fine.** Every mailto link is well formed. |
| Empty "Stories" menu | All | Links to "#", and its three subpages do not exist | **Already fine.** There is no Stories menu. The Blog replaces it. |
| Newsletter not visible ⚠️ | All | Shows "JavaScript is required for this content" instead of the form | **Known and waiting.** The form shows, but it is not connected to a mailing service yet. See `Last-little-things.md` #1. |
| Wrong link | Contact | The yellow fever link goes to abacus.ai, which has nothing to do with Costa Rica's entry requirements | **Already fine.** That link is not on the new site. |
| Check-in form with no link | Dining and Arriving | Guests are asked to send dietary needs "via the check-in form", but there is no link | **Already fine.** The new site asks for diets with 48 hours' notice and does not mention a form. |
| Button with no destination ⚠️ | Yoga | "HOST A RETREAT" goes nowhere, and it is the key button for retreat leaders | **Already fine.** Retreats ends with "WhatsApp us" and "Email us" buttons, and the calculator above them. |

## 3. Data that contradicts itself within the site

| Item | Version 1 | Version 2 | New site |
|---|---|---|---|
| 4x4 taxi from Drake Bay | $70, about 45 min | $60, about 40 min | **Already consistent:** $60, about 45 min, which matches the settled facts. ($70 on the boat card is the San José to Sierpe taxi, a different trip.) The real price is still on the pending list. |
| Tracopa bus | About 8 h | About 5 h (neither fits the 4 pm boat) | **Needs a decision.** The new site says about 7 h. The real duration is still on the pending list. |
| San José to Sierpe | 250 km | 280 km | **Already fine.** No distance is given. |
| Uvita to Sierpe | 2.5 h | 2 h | **Already fine.** Uvita is not mentioned. |
| Family Bungalow size | 540 ft² = 45 m² | 540 ft² is about 50 m² | **Already fine.** It says 540 ft² / 50 m². |
| Jungle Suites | "Families of three" | "3–4 guests" | **Already fine** on the Lodging and Home pages: "families of three", with 1 double and 1 single bed. One room in the calculator (White Hawk Bottom) sleeps 4, so this needs another look once the categories are settled. |
| Luggage | 15 kg | 11 kg on local flights | **Already fine.** It says 15 kg everywhere and does not mention 11 kg. |
| Osa biodiversity | "Nearly 3% of the planet's biodiversity" | "The most biodiverse place on Earth" | **Fixed today.** The new site now says "One of the most biodiverse places on Earth", which agrees with the Host Kit's 2.5%. |
| Cancellation policy | Tiered, with refunds | "Full payment due at booking… no refunds or changes" | **Needs a decision.** The new site shows only the tiered policy. The audit's other point is still open: the "29 days" tier does not say what happens between day 29 and day 8. Whether there are two rates is on the pending list. |

If there are two rates (flexible and non-refundable), the policy must explain both. If there are
not, the text contradicts itself.

## 4. Bookings and conversion

- **"Book Now" buttons.** On the old site every room's button opens the same booking-engine page,
  with no room preselected. **Still true on the new site.** Fixing it needs a per-room link from
  Secure Bookings. Ask the booking-engine provider whether it has one.
- **Three different systems.** Secure Bookings for rooms, WeTravel for tours and boats, WhatsApp
  for "Reserve". The tours page says "book upon arrival" but sells online. **Mostly fine.** The new
  site has no WeTravel and no "book upon arrival". Tours are booked by WhatsApp.
- **Contact.** The old home page has no phone, email or WhatsApp. They appear only on Contact.
  **Already fine.** WhatsApp and email are in the footer of every page.
- **Email domain.** The emails are @oceanforest.org but the site is oceanforestecolodge.com, which
  undermines trust. **Needs a decision.** The new site still uses eli@oceanforest.org, and the Host
  Kit uses retreat@oceanforestecolodge.com. The official email is on the pending list.
- **Yoga Retreats** sits under "Rooms", and its link (#YogaRetreats) goes nowhere. **Already
  fine.** Retreats is its own page in the main menu.
- **Lapa Lapa** appears only in a list, with no photos or room page of its own. **Settled.** Lapa
  Lapa West and East are facilitator space. Only the retreat calculator lists them.

## 5. SEO

- **Broken meta descriptions** on every page. Google shows the menu text instead of a summary.
  **Fixed today.** Home, Arriving, Lodging, Experiences and About now have descriptions. Retreats
  and the Blog already had them.
- **Home page title** "Home-SC – Ocean Forest Ecolodge". **Already fine:** "Ocean Forest Ecolodge
  · Beachfront rainforest lodge on the Osa Peninsula".
- **Missing H1** on Arriving and Yoga, and Accommodations uses "Corcovado National Park" as its H1.
  **Already fine.** Every page has exactly one H1 that fits the page.
- **Photos** with no alt text or generic names, some misspelled ("Ocean Ecoforest Ecolodge").
  **Already fine.** Photos take their alt text from descriptive notes, and the misspelling is not
  on the site.
- **Language.** English only, no Spanish version. **Decided 4 August:** no language switcher. The
  browser's one-click translation is used instead (`WHAT-WE-AGREED.md`).

## 6. Typos

| Says | Should say | New site |
|---|---|---|
| ACCOMODATIONS | ACCOMMODATIONS | Already fine |
| Recomendations | Recommendations | Already fine |
| Cancelation (menu) / Cancellation (text) | Use Cancellation throughout | Already fine |
| Dinning ⚠️ | Dining | Already fine |
| How do I to get here? | How do I get here? | Already fine |
| Wellness retreats Corcovado | Wellness retreats in Corcovado | Already fine |
| 1,5 hours | 1.5 hours | Already fine |
| a 11 kg | an 11 kg | Already fine |
| More Info / More info | Use one form | Already fine |

The old menu also has empty items and a URL that appears raw as link text. **Already fine.** The
new menu is built in one place, and neither problem is in it.

## 7. Priorities, with status

1. Confirm the data in section 1 and publish the September–October closure. **Closure published.
   Rooms, categories and deposit need a decision.**
2. Remove the placeholder text from the FAQ and fix the email link. **Already fine.** The Host Kit
   phone placeholder remains.
3. Make transfer prices and times consistent (taxi, bus, distances). **Consistent on the new site.**
   The real taxi price and bus time are still pending.
4. Give the Yoga page a clear call to action for retreat leaders, with a form or email, and the
   group terms once confirmed. **Already there.** The deposit (20% or 25%) and "transfers extra"
   need confirming.
5. Write meta descriptions for the 7 pages and fix the titles and H1s. **Done.**
6. Hide "Stories" until it has content and fix the newsletter. **Stories: already fine.
   Newsletter: still waiting on a mailing service.**
7. Fix the typos. **Already fine.**

## Still to confirm

- [ ] Number of room categories and their official names. This also settles 10 or 11 rooms,
      which conflicts with the settled "ten rooms"
- [ ] Real price of the 4x4 taxi (the site says $60)
- [ ] Real duration of the Tracopa bus (the site says about 7 h)
- [ ] Whether the cancellation policy has two rates or one, and what applies between day 29 and day 8
- [ ] Official contact email (eli@oceanforest.org or an @oceanforestecolodge.com address)
- [ ] *(added in translation)* Retreat deposit: 20% (audit) or 25% (Retreats page and calculator)
- [ ] *(added in translation)* Whether retreat transfers are charged separately, so it can be said
      on the Retreats page
- [ ] *(added in translation)* The real phone number for the Retreat Host Kit's "+506 XXXX XXXX"
