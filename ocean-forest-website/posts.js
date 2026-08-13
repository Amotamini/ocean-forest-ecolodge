/* posts.js — the list of blog posts.
   ─────────────────────────────────────────────────────────────────────────
   This is the only place that decides what appears on /blog. The blog index
   builds one card per entry here, newest first, working the order out from
   the date rather than from the order of this list.

   Same pattern as ACTIVITIES and FAQ in shared-sections.js: the data is a
   plain list, the page that shows it is dumb, and adding something means
   adding one entry rather than writing markup.

   ONE ENTRY PER POST. The fields, all of them required:

     slug     lowercase, hyphens, no spaces. It is the web address and the
              filename: slug "turtles-of-san-josecito" means the post lives
              at blog/turtles-of-san-josecito.html and is read at
              /blog/turtles-of-san-josecito
     title    the headline, exactly as it appears on the post
     date     YYYY-MM-DD. Used both for the sort and for the printed date
     excerpt  one or two sentences, shown on the card only
     hero     root-absolute path to the card photograph, or "" for none
     alt      what the photograph shows, for anyone who cannot see it

   REMOVING A POST means deleting its entry from this list and nothing else.
   The post file and its photographs stay on disk, so putting the entry back
   restores it exactly. Nothing in media/ is ever renamed, moved or deleted.

   The list is empty until the first post is published. While it is empty the
   blog index shows its waiting message and carries a noindex line, which the
   publishing recipe in CLAUDE.md removes when post number one goes up. */

var POSTS = [
  {
    slug:    "seediii-goddess-of-the-osa",
    title:   "See~diii: a 9th dimensional goddess protects the Osa Peninsula",
    date:    "2021-04-12",
    excerpt: "In 2008 a group of Taoist masters asked to be taken to Caño Island, the small island you can see from our beach. This is what they said they found there.",
    hero:    "/media/blog/seediii-goddess-of-the-osa/hero.webp",
    alt:     "Rocky outcrops and a small palm-topped islet in the Pacific off San Josecito beach."
  }
];

window.OF_POSTS = POSTS;
