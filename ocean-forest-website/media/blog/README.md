# media/blog

One folder per blog post, named after the post's slug.

A post whose slug is `turtles-of-san-josecito` keeps its photographs in
`media/blog/turtles-of-san-josecito/`, and the post refers to them as
`/media/blog/turtles-of-san-josecito/hero.webp`. Always with the leading slash.

Every picture is resized to 1600px on the long edge and saved as `.webp` before it
goes in. Phone photographs are often 5MB or more, which makes the page slow to load in
a way nobody would ever connect back to the photograph.

**Nothing in here is ever renamed, moved or deleted.** Taking a post off the blog means
removing its entry from `posts.js`. Its folder stays exactly where it is, which is what
makes putting the post back a one line change.
