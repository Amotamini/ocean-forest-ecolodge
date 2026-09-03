# How the Ocean Forest website goes live

Push to `main` on `github.com/Amotamini/ocean-forest-ecolodge`. That is the only way.

Vercel builds from the folder `ocean-forest-website/` — that folder, and no other, must be set as
the project's **Root Directory** in Vercel. Everything inside it becomes a public web address, so
nothing private goes in it — specs, notes and source copy live one level up, in this folder.

Do NOT run `vercel deploy`, `vercel --prod`, or `vercel link` here or anywhere else.
There is no `.vercel` folder on this machine on purpose. On 2026-07-25 a stray copy of that
key published an unfinished rebuild over the live site. Do not recreate it.

Vercel only. This project does not use Netlify.

---

**Changed 2026-09-03.** The repository moved from `primalbynaturepro-lgtm/Ocean-forest` to
`Amotamini/ocean-forest-ecolodge` when the project passed from Eli to Jonas. The old address no
longer publishes anything. Older documents in `specs/` and `audits/` still name it; those are
dated records and were left as written.
