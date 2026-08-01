# How the Ocean Forest website goes live

Push to `main` on github.com/primalbynaturepro-lgtm/Ocean-forest. That is the only way.

Vercel builds from the folder `ocean-forest-website/`. Everything in that folder becomes a
public web address, so nothing private goes in it — specs, notes and source copy live one
level up, in this folder.

Do NOT run `vercel deploy`, `vercel --prod`, or `vercel link` here or anywhere else.
There is no `.vercel` folder on this machine on purpose. On 2026-07-25 a stray copy of that
key published an unfinished rebuild over the live site. Do not recreate it.

Vercel only. This project does not use Netlify.
