# Last little things — Ocean Forest V2

Six unfinished items. Every one of them is a small job for Mehdi today and a wall for Eli alone
after the handover. None is a bug. Each is something the site is correctly *waiting* for.

Written 2026-08-09, updated 2026-08-11. The "and Sanity" in the original note is out of date:
Sanity was dropped. Eli edits through Claude, with GitHub Desktop to publish. See `START-HERE.md`.

**The rule for this list: nothing here transfers as "we'll sort it later."** Each item ends either
finished, or formally handed to a named person in writing, so that after the handover nobody
mistakes it for something we left broken.

---

## 1. The newsletter form is not connected to anything

**Where:** home page, "Sign up for our newsletter" section.
**What happens now:** a visitor types an email, presses the button, and the form shows a message
saying signup is not connected yet. Nobody is subscribed. Nothing is stored. No email is sent.

**Why it is like this:** the mailing-list service was never chosen. The markup carries
`action="#newsletter-endpoint-TODO"` and a visible honest message rather than pretending to work.

**To finish:** pick a service (Mailchimp, Brevo, ConvertKit, Beehiiv — any of them), create the
list, and paste the form endpoint into `v2/index.html`. About ten minutes once the account exists.

**Owed by:** Eli.

---

## 2. "Watch the full film" points at a placeholder

**Where:** home page hero, the small control under the headline.
**What happens now:** the link opens YouTube at `VIDEO_ID_TO_COME`, which is not a video.

**To finish:** replace `VIDEO_ID_TO_COME` in `v2/index.html` with the real YouTube ID of the full
film. One string.

**Owed by:** Eli or Ryan, whoever holds the final cut.

---

## 3. Guest reviews are an empty labelled slot

**Where:** home page, "What guests say".
**What happens now:** a dashed frame reading "Guest reviews to come — testimonials from Eli.
Nothing is quoted until it is real."

**Why it is like this:** deliberate. No review was ever invented. The slot is honest about being
empty rather than filled with something nobody said.

**To finish:** this needs Eli's own Google Business Profile login, so the review widget is
connected to her account and not ours. Then either embed the widget or paste real quotes with
names.

**Owed by:** Eli. **Blocked on:** her Google Business Profile access.

---

## 4. The shala 360° video was never delivered

**Where:** Retreats page, the yoga shala section.
**What happens now:** a labelled frame naming the exact file it is waiting for,
`media/video/shala-360.mp4`, and a 404 in the browser console. This is the house pattern for a
missing file, not a fault.

**To finish:** drop the file into `media/video/` under that exact name. No code change — the page
picks it up on its own.

**Owed by:** Ryan.

---

## 5. Helpful Contacts are marked "unconfirmed"

**Where:** Arriving page, "Who to call".
**What happens now:** each number carries a small dashed "unconfirmed" badge.

**Why it is like this:** these are other people's personal phone numbers, last verified in 2018.
Publishing a stranger's number that has since changed is worse than publishing nothing, so the
page says plainly that they are unverified.

**To finish:** ring each one. Confirmed numbers lose the badge; dead ones come off the page.

**Owed by:** Eli.

---

## 6. There is no photograph of Jonathon

**Where:** About page, "The People".
**What happens now:** a labelled frame reading "Photo to come — `media/about/jonathon-01.jpg`",
naming the exact file it is waiting for. Same house pattern as item 4.

**Why it is like this:** the repository holds about sixty photographs — wildlife, buildings,
beach — and not one portrait of anybody. Mehdi confirmed 2026-08-11 that Ryan has some. Rather
than put a photograph of a bird beside a man's biography, where nobody would ever notice the gap,
the page says plainly what is missing.

**To finish:** drop the file into `media/about/` under that exact name. No code change — the page
picks it up on its own. `media/about/README.txt` says the same thing to whoever opens the folder.
Square frame today because the copy beside it is one sentence; a portrait crop is a one-word
change once the real photograph is in.

**Owed by:** Ryan.

---

## Before the handover

- [ ] Each of the six above is finished, or emailed to its named owner with what is needed
- [ ] Vercel, GitHub, domain and DNS all created on **Eli's** email, not Mehdi's
- [ ] Mehdi removed from every one of those accounts
- [ ] Scott has the three repositories and this folder's `specs/`
- [ ] The teaching session with Eli is recorded
- [ ] One page exists listing every service, what it costs, and who to contact when it breaks
