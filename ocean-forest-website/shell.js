/* ============================================================================
   Ocean Forest Ecolodge V2 — SHARED SHELL
   ----------------------------------------------------------------------------
   Lifted and adapted from index.html's inline <script> and shared-sections.js's
   placeholder helper, per specs/of-v2-shell.md §3. Every V2 page loads this
   after shell.css. Edit once here and every page changes.
   ========================================================================== */

/* The gallery list lives in photos.js now, so Eli can add and remove
   photographs without opening this file — see the note at the top of it.
   The fallback is an empty list rather than a crash: a page that forgets the
   script loses its gallery strip and keeps everything else. */
var GALLERY = (typeof window !== 'undefined' && window.GALLERY) || [];

(function () {
  'use strict';

  /* ── THEME ───────────────────────────────────────────────────────────────
     D7: light is now the only theme. The toggle, the of-theme storage key and
     the paint handler are all gone. Every page carries class="light" on
     <body> in its own markup, so the colours are right before any script
     runs and there is no flash of the wrong palette. Nothing is read from
     storage, so a stale value left there by the old toggle has no effect. */

  /* ── HEADER: built here, once, for every page ────────────────────────────
     Until 2026-08-11 this markup was hand-written into all six pages. It had
     to be: this is a static site with no build step, so nothing assembles a
     page from parts - whatever is in the .html file is what the browser
     gets. shell.js owned the header's BEHAVIOUR from the start and never
     owned its MARKUP, so there were six copies of the menu driven by one
     brain. Adding one link meant six edits, and five of them going right was
     a silently broken site.

     Mehdi, 2026-08-11: "The nav should be the same for the page, not hand
     written right? Why is there 6 copies?" It is one now. A page carries
     <div data-shell="header"></div> and nothing else.

     Two things make that safe on a site with no build step:

     - shell.css reserves the header's height on the empty mount, so the page
       does not jump when the real header lands in it.
     - The current page is read from the URL rather than written into the
       markup, which was the only thing that differed between the six copies
       anyway. Nothing to keep in sync.

     ADDING OR RENAMING A LINK: edit NAV below. That is the whole job. */
  var NAV = [
    { href: '/arriving.html',    label: 'Arriving' },
    { href: '/lodging.html',     label: 'Lodging' },
    { href: '/experiences.html', label: 'Experiences' },
    { href: '/retreats.html',    label: 'Retreats' },
    /* About is a link AND a menu - Mehdi's call: clicking it goes to the
       About page, hovering it opens the three below. A top-level item that
       only opens a menu strands anyone who wanted the page itself. */
    { href: '/about.html', label: 'About', children: [
      { href: '/about.html', label: 'About the lodge' },
      /* The blog is a folder with an index inside it, not a blog.html page.
         Vercel runs cleanUrls, so blog.html and blog/ would both claim the
         address /blog and one of them would win silently.

         under: every post lives at /blog/<slug>, so the Blog link and the
         About item above it stay marked while the reader is on a post. A
         plain href test only ever matched the index itself. */
      { href: '/blog/', label: 'Blog', under: '/blog' },
      { href: 'https://rainforest-medicine-gatherings.vercel.app/',
        label: 'Rainforest Medicine', external: true }
    ] }
  ];

  var BOOK_URL = 'https://book.securebookings.net/roomrate?id=6f26c974-1ec9-1696435169-45ec-8406-383fd87820a3';

  /* A page is "current" if the path matches. The home page arrives as
     '/index.html', as '/' and — from an old link — as '/v2' or '/v2/', and
     Vercel serves all of them without the .html because of cleanUrls. So
     compare on the stem rather than the literal string.

     The '/v2' prefix is stripped here as well as being redirected in
     vercel.json. Belt and braces on purpose: the redirect handles the real
     world, and this handles a local review server, which has no redirects
     and where somebody will absolutely still be opening /v2/ URLs out of
     habit for weeks. Without it the nav simply stops marking the current
     page there, which is the kind of thing nobody reports and everybody
     half-notices.

     Returns '/' for the home page — the site moved out of /v2/ and to the
     root of the domain on 2026-08-11, Mehdi: "it shouldn't have V2 in the
     address, it should fully replace the V1." */
  function stem(path) {
    return String(path || '')
      .replace(/^\/v2(?=\/|$)/, '')
      .replace(/\/index\.html$/, '/')
      .replace(/\.html$/, '')
      .replace(/\/$/, '') || '/';
  }

  /* Is this nav item the page we are on? Normally the stems match. An item
     that carries `under` also matches anything below that path, which is how
     a blog post at /blog/<slug> keeps the Blog link, and the About item it
     hangs from, marked as current. */
  function isHere(item, here) {
    if (item.external) return false;
    if (stem(item.href) === here) return true;
    if (!item.under) return false;
    var root = stem(item.under);
    return here === root || here.indexOf(root + '/') === 0;
  }

  function navLinkHTML(item, here) {
    var on = isHere(item, here);
    return '<a href="' + item.href + '"' +
           (item.external ? ' target="_blank" rel="noopener"' : '') +
           (on ? ' class="current" aria-current="page"' : '') + '>' +
           item.label + (item.external ? ' <span aria-hidden="true">&#8599;</span>' : '') +
           '</a>';
  }

  function buildHeader(mount) {
    var here = stem(location.pathname);

    var items = NAV.map(function (item) {
      if (!item.children) return navLinkHTML(item, here);

      /* One <a> plus a panel. The panel is a sibling of the link, not inside
         it: an <a> may not contain other <a>s, and a browser that repairs
         that markup will move the children out from under you. */
      var childOn = item.children.some(function (c) { return isHere(c, here); });
      return '<span class="nav-drop">' +
               '<a href="' + item.href + '" class="nav-drop-top' +
                 (childOn ? ' current' : '') + '"' +
                 (childOn ? ' aria-current="page"' : '') + '>' +
                 item.label +
                 '<svg class="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
                 'stroke-width="1.8" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke-linecap="round" ' +
                 'stroke-linejoin="round"/></svg>' +
               '</a>' +
               '<span class="nav-drop-menu">' +
                 item.children.map(function (c) { return navLinkHTML(c, here); }).join('') +
               '</span>' +
             '</span>';
    }).join('');

    mount.outerHTML =
      '<a class="skip" href="#main">Skip to the lodge</a>' +
      '<header class="site-head" id="siteHead">' +
        '<a href="/index.html" class="nav-logo">' +
          '<img class="logo-dark" src="/images/logo-white.png" alt="Ocean Forest Ecolodge">' +
          '<img class="logo-light" src="/images/logo-color.png" alt="" aria-hidden="true">' +
        '</a>' +
        '<nav class="nav-menu" id="navMenu" aria-label="Main">' + items + '</nav>' +
        '<div class="nav-actions">' +
          '<a class="book-btn" href="' + BOOK_URL + '" rel="noopener">Book now</a>' +
          '<button class="burger" id="burger" type="button" aria-label="Menu" ' +
                  'aria-expanded="false" aria-controls="navMenu">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
            'aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>' +
          '</button>' +
        '</div>' +
      '</header>';
  }

  var headerMount = document.querySelector('[data-shell="header"]');
  if (headerMount) buildHeader(headerMount);

  /* ── BAND SPACING ────────────────────────────────────────────────────────
     A .media-band fades into the page at its top and bottom edges. That fade
     is already about 70px of visual breathing room, so a section that adds
     its own 104px on the same edge shows roughly 280px of white where a
     text-led section shows 170px. Four sections on this site had that fault
     - Arriving #layer3, Experiences #break, About #story and Retreats
     #conservation - and it is why Mehdi read Arriving as a different page
     from the home page although both obeyed the same padding rule.

     So: if a section's content STARTS with a band, the section loses its top
     padding. If it ENDS with one, it loses its bottom padding. The band's
     own fade does that job.

     Done here rather than by hand on each page for the reason everything
     else moved into this file: written on a page it is invisible from
     anywhere else, and the next person to add a band will not know. The
     .flush-top / .flush-bottom classes it applies are real classes in
     shell.css, so anything this cannot detect can still be written by hand.

     The hero case, separately: a band directly under a hero must fade
     DOWNWARD only. There is no page above a hero to dissolve into, so a
     top fade renders as a white stripe between the two. That has now been
     found and fixed by hand twice - Experiences, then Retreats - which is
     twice too many, so it is detected here as well. */
  function bandSpacing() {
    var main = document.getElementById('main');
    var firstSection = main ? main.querySelector(':scope > section') : null;

    Array.prototype.forEach.call(document.querySelectorAll('section'), function (sec) {
      /* Bands live inside the section's .wrap, which is what gives them a
         containing block wide enough for calc(50% - 50vw) to reach the
         viewport edge. Look at the wrap's children, not the section's. */
      var wrap = sec.querySelector(':scope > .wrap');
      if (!wrap) return;
      var kids = Array.prototype.filter.call(wrap.children, function (n) {
        return n.nodeType === 1;
      });
      if (!kids.length) return;

      var first = kids[0];
      var last  = kids[kids.length - 1];

      if (first.classList && first.classList.contains('media-band')) {
        sec.classList.add('flush-top');

        /* And the section ABOVE it gives up its bottom padding too, added
           2026-08-12. Taking the band's own top padding away only closed
           half the gap: the section before it still contributed its full
           104px, so a full-width photograph still arrived after a stripe of
           empty page. Mehdi, on the Retreats shala: "remove the white space,
           so the photo of the conservation space just starts straight after."

           Its previous sibling rather than any section, so this only ever
           affects the one directly above a band. */
        var prev = sec.previousElementSibling;
        while (prev && prev.tagName !== 'SECTION') prev = prev.previousElementSibling;
        if (prev) prev.classList.add('flush-bottom');

        /* First section on the page means this band is directly beneath the
           hero. Swap the four-edge fade for the downward one. */
        if (sec === firstSection && first.classList.contains('media-fade')) {
          first.classList.remove('media-fade');
          first.classList.add('media-fade-down');
        }
      }
      if (last.classList && last.classList.contains('media-band')) {
        sec.classList.add('flush-bottom');
      }
    });
  }
  bandSpacing();

  /* ── HEADER: pinned, shrinks on scroll ─────────────────────────────────── */
  var head = document.getElementById('siteHead');
  var ticking = false;
  function onScroll() {
    if (ticking || !head) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      head.classList.toggle('scrolled', window.scrollY > 60);
      ticking = false;
    });
  }
  /* Guarded, 2026-08-11. Before the header moved in here it was always in the
     markup, so head could not be null. Now a page that forgets the mount
     would throw on the first scroll and take every component below down with
     it - the galleries, the lightbox, the tour tabs, all of it. A missing
     header should cost a header, not the page. */
  if (head) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── MOBILE MENU (Book now stays outside it, always visible) ───────────── */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('navMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── MEDIA PLACEHOLDERS ──────────────────────────────────────────────────
     Any element with data-media points at a file in /media. If the file is
     missing, a labelled frame appears showing exactly which filename to drop
     in. Nothing else needs changing when the real assets arrive.

     These two helpers are published on window.OF (bottom of this file). They
     used to be copy-pasted into lodging.html, experiences.html and
     retreats.html as well as living here - four definitions of the same
     twenty lines, which is how a fix to one of them silently misses the
     other three. There is one now. Page scripts call OF.placeholder and
     OF.paint; nothing redefines them.                                     */
  function placeholder(file, note) {
    var d = document.createElement('div');
    d.className = 'ph';
    d.innerHTML =
      '<span class="ph-label">Photo to come</span>' +
      '<span class="ph-file">media/' + file + '</span>' +
      (note ? '<span class="ph-note">' + note + '</span>' : '');
    return d;
  }

  /* Paint one file into a host element, swapping in the labelled placeholder
     if it is not there. `ratio` is a CSS aspect-ratio like '4/3'; pass null
     to leave the host's own height alone (the full-bleed sliders do). */
  function paint(host, file, note, ratio) {
    host.innerHTML = '';
    if (ratio) host.style.aspectRatio = String(ratio).replace('/', ' / ');

    var img = new Image();
    img.onload = function () {
      host.innerHTML = '';
      img.alt = note || '';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.display = 'block';
      host.appendChild(img);
    };
    img.onerror = function () {
      host.innerHTML = '';
      host.appendChild(placeholder(file, note));
    };
    img.src = '/media/' + file;
    return img;
  }

  document.querySelectorAll('[data-media]').forEach(function (host) {
    paint(host,
          host.getAttribute('data-media'),
          host.getAttribute('data-note') || '',
          host.getAttribute('data-ratio') || '4/3');
  });

  /* ── HERO VIDEO ──────────────────────────────────────────────────────────
     Same YouTube embed V1 uses, on all six pages, until Ryan's per-page cuts
     exist. One constant here is the seam: a page gets its own cut by adding
     one entry to HERO_OVERRIDES, nothing else changes.

     A still-photograph poster was briefly layered over this iframe on
     2026-08-09 to hide YouTube's start-up furniture. Removed the same day,
     Mehdi's call: the home hero is the film, uncovered, as it has always
     been. The furniture is a known cost of the embed and is accepted. If it
     ever needs hiding again, the removal is in this file's history; do not
     rebuild it from scratch.                                               */
  var HERO_YOUTUBE_ID = 'AjqtTXfJbeg';
  var HERO_OVERRIDES = {}; // slug -> youtube id, filled in as Ryan delivers per-page cuts

  var heroMedia = document.querySelector('.hero-media');
  if (heroMedia) {
    var slug = heroMedia.getAttribute('data-hero-slug');
    var heroImage = heroMedia.getAttribute('data-hero-image');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (heroImage) {
      /* This page pins its hero to a still photograph rather than the shared
         video (of-v2-revisions.md C5). One attribute, no other change. */
      var photo = document.createElement('div');
      photo.className = 'hero-media-photo';
      photo.style.backgroundImage = "url('/media/" + heroImage + "')";
      heroMedia.appendChild(photo);
    } else if (reducedMotion) {
      var still = document.createElement('div');
      still.className = 'hero-media-still';
      heroMedia.appendChild(still);
    } else {
      var youtubeId = HERO_OVERRIDES[slug] || HERO_YOUTUBE_ID;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + youtubeId +
        '?autoplay=1&mute=1&loop=1&playlist=' + youtubeId +
        '&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&start=2';
      iframe.title = 'Ocean Forest Ecolodge from the air';
      iframe.loading = 'lazy';
      iframe.setAttribute('aria-hidden', 'true');
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.tabIndex = -1;
      heroMedia.appendChild(iframe);
    }
  }

  /* ── GALLERY ROTATION ────────────────────────────────────────────────────
     Reads data-gallery-offset off #gallery, slices 8 filenames from GALLERY
     (wrapping around), and builds the same [data-media] markup as V1's
     gallery grid.                                                          */
  var galHost = document.querySelector('[data-gallery-offset]');
  if (galHost) {
    var offset = parseInt(galHost.getAttribute('data-gallery-offset'), 10) || 0;
    var galFiles = [];
    for (var i = 0; i < 8; i++) {
      var file = GALLERY[(offset + i) % GALLERY.length];
      galFiles.push(file);
      var slot = document.createElement('div');
      slot.setAttribute('data-media', file);
      slot.setAttribute('data-ratio', '1/1');
      slot.setAttribute('data-note', 'Gallery slot ' + (i + 1));
      /* Opens the shared lightbox at THIS tile, 2026-08-11. The strip was
         eight pictures you could not click, on every page, which is the one
         thing everybody tries with a gallery.

         The file list goes on the host and the index on the tile, so the
         lightbox opens on the photograph you actually clicked rather than
         always on the first. Eight photographs, not all 22 in GALLERY: what
         you can see is what you can page through.

         role and tabindex because these are divs. Without them the strip is
         mouse-only, and it is the only gallery on the site that is not a
         real <button> - the room cards and the slider stages already are. */
      slot.setAttribute('data-gallery-start', String(i));
      slot.setAttribute('role', 'button');
      slot.setAttribute('tabindex', '0');
      slot.setAttribute('aria-label', 'Open photograph ' + (i + 1) + ' of 8 full screen');
      galHost.appendChild(slot);
    }
    galHost.setAttribute('data-gallery', galFiles.join(','));
    galHost.setAttribute('data-gallery-note', 'Ocean Forest Ecolodge');
    galHost.querySelectorAll('[data-media]').forEach(function (host) {
      paint(host,
            host.getAttribute('data-media'),
            host.getAttribute('data-note') || '',
            host.getAttribute('data-ratio') || '4/3');
    });
  }

  /* ── ROOM CARDS ──────────────────────────────────────────────────────────
     Moved here from index.html on 2026-08-09, with the CSS, so the home
     page, Lodging and Retreats all behave identically. The visual state is
     one class, .is-open; the stylesheet does the photo swap and the detail
     expand, this only decides when. mouseenter/leave covers the pointer,
     focusin/focusout covers the keyboard so a tabbed-to card opens too.
     Whether the card is a link or a button is the page's business. */
  document.querySelectorAll('.hm-room').forEach(function (card) {
    function open()  { card.classList.add('is-open'); }
    function close() { card.classList.remove('is-open'); }
    card.addEventListener('mouseenter', open);
    card.addEventListener('mouseleave', close);
    card.addEventListener('focusin', open);
    card.addEventListener('focusout', close);
  });

  /* ══ SLIDER ═══════════════════════════════════════════════════════════════
     One photo slider for the whole site. Before this there were four: the
     Lodging food strip, the Retreats conservation strip, the Experiences
     frame and the tour slider in shared-sections.js, each with its own
     arrows, dots and bugs.

     Markup:
       <div class="sl" data-files="a.jpg,b.webp" data-notes="A|B"
            data-auto="5000" data-arrows="true" data-ratio="4/3">
         <div class="sl-stage"></div>
       </div>
     Everything except data-files is optional. Arrows and dots are built by
     this code, so a page never hand-writes them and they cannot drift.

     data-auto is the only reason a slider ever moves on its own. Mehdi's
     rule, 2026-08-09: ONLY the conservation strip sets it. Photographs a
     visitor is actively comparing - rooms, food, tours - wait to be asked,
     because a set that slides away mid-sentence is worse than a static one.

     Auto-advance pauses on hover and while the tab is in the background, and
     stops for good the moment the visitor touches a control. It never starts
     under prefers-reduced-motion.                                          */
  function buildSlider(root) {
    var files = (root.getAttribute('data-files') || '').split(',').filter(Boolean);
    if (!files.length) return;

    var notes  = (root.getAttribute('data-notes') || '').split('|');
    var ratio  = root.getAttribute('data-ratio') || null;
    var auto   = parseInt(root.getAttribute('data-auto'), 10) || 0;
    var arrows = root.getAttribute('data-arrows') !== 'false';
    var label  = root.getAttribute('data-label') || 'Photographs';

    var stage = root.querySelector('.sl-stage');
    if (!stage) return;

    var at = 0, timer = null, stopped = false;

    var dots = document.createElement('div');
    dots.className = 'sl-dots';
    dots.setAttribute('role', 'group');
    dots.setAttribute('aria-label', label);

    function noteFor(i) { return (notes[i] || label).trim(); }

    /* ── THE SLIDE ────────────────────────────────────────────────────────
       Until 2026-08-12 this called paint() on the stage, which replaced the
       photograph outright. On a slider that advances itself every three
       seconds that is a hard cut, and Mehdi's word for it was "harsh" - a
       picture simply becomes a different picture with nothing in between.

       So a change now moves. The outgoing photograph slides out and the new
       one slides in behind it, in the direction you are travelling: forward
       goes right to left, back goes left to right, and a dot jumps whichever
       way is shorter. Direction matters more than the animation itself -
       motion that contradicts the gesture reads worse than no motion.

       Two layers on top of each other, not a track of all of them: a track
       would have to hold eighteen photographs for the food slider and decide
       what to load when. Two layers cost two images and the loop is free.

       The incoming layer is only moved once the file has actually decoded.
       Animating an <img> that has not loaded slides an empty rectangle in
       and pops the photograph into it a moment later, which is worse than
       the cut this replaces.

       Under prefers-reduced-motion it goes straight back to being a swap -
       the auto-advance is already switched off there, so this only affects
       somebody pressing an arrow. */
    var SLIDE_MS = 620;
    var EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
    var busy = false;
    var layer = null;                       // the photograph currently shown

    /* The stage carries the shape, because nothing else can any more: every
       photograph is now an absolutely positioned layer inside it and
       contributes no height of its own. Set once, here. */
    if (ratio) stage.style.aspectRatio = String(ratio).replace('/', ' / ');

    /* Every photograph gets its own <div> that this function owns.

       The first attempt at the slide painted straight into the stage and then
       tagged whatever was inside it. That never worked: paint() empties the
       host immediately and only fills it when the file has decoded, so at the
       moment of tagging the stage was empty and the class went nowhere. Every
       change stayed a hard cut and nothing said so.

       A wrapper this function creates is not subject to paint()'s timing -
       paint only ever touches what is inside it. */
    function makeLayer(file, alt) {
      var el = document.createElement('div');
      el.className = 'sl-layer';
      stage.appendChild(el);
      paint(el, file, alt, null);           // ratio belongs to the stage now
      return el;
    }

    function show(n, dir) {
      var from = at;
      at = n;
      dots.querySelectorAll('button').forEach(function (b, i) {
        b.setAttribute('aria-current', i === n ? 'true' : 'false');
      });

      var alt = noteFor(n) + ' (' + (n + 1) + ' of ' + files.length + ')';

      /* First photograph, reduced motion, or no actual change: just place it. */
      if (!layer || reducedMotion || from === n) {
        if (layer && layer.parentNode) layer.parentNode.removeChild(layer);
        layer = makeLayer(files[n], alt);
        return;
      }
      if (busy) return;                     // one slide at a time
      busy = true;

      var outgoing = layer;
      var incoming = makeLayer(files[n], alt);
      layer = incoming;

      /* Forward travels right to left. A dot jump takes the shorter way
         round, so pressing dot 2 from dot 8 moves the way you would expect. */
      var forward = dir === undefined
        ? ((n - from + files.length) % files.length) <= (files.length / 2)
        : dir > 0;
      incoming.style.transform = 'translateX(' + (forward ? '100%' : '-100%') + ')';

      function go() {
        /* Force the browser to accept the start position by reading a layout
           property, then set the end position. The read is the whole trick:
           without it both transforms land in the same batch and the layer is
           simply already there, with nothing to animate.

           This was two nested requestAnimationFrame calls until 2026-08-12,
           which is the usual way to do it and was wrong here. rAF does not
           fire in a background tab, so a rotation that ticked over while
           somebody was reading another tab set itself up and then froze
           mid-slide - a photograph stuck off to one side, permanently, with
           no error anywhere. A forced reflow runs whatever the tab is doing. */
        void incoming.offsetWidth;                                  // eslint-disable-line

        incoming.style.transition = 'transform ' + SLIDE_MS + 'ms ' + EASE;
        outgoing.style.transition = 'transform ' + SLIDE_MS + 'ms ' + EASE;
        incoming.style.transform  = 'translateX(0)';
        outgoing.style.transform  = 'translateX(' + (forward ? '-100%' : '100%') + ')';

        window.setTimeout(function () {
          if (outgoing.parentNode) outgoing.parentNode.removeChild(outgoing);
          incoming.style.transition = '';
          incoming.style.transform  = '';
          busy = false;
        }, SLIDE_MS + 40);
      }

      /* Wait for the file to decode. Sliding in an empty rectangle and
         popping the photograph into it afterwards is worse than the cut this
         replaces. The 1.2s ceiling stops a slow file freezing the rotation. */
      var img = incoming.querySelector('img');
      if (img && !img.complete) {
        var done = false;
        var once = function () { if (!done) { done = true; go(); } };
        img.addEventListener('load',  once, { once: true });
        img.addEventListener('error', once, { once: true });
        window.setTimeout(once, 1200);
      } else {
        window.setTimeout(go, 30);          // paint() fills on load, so give it a tick
      }
    }
    function step(d) { show((at + d + files.length) % files.length, d); }

    function start() { if (!stopped && !reducedMotion && auto && !timer) timer = window.setInterval(function () { step(1); }, auto); }
    function pause() { if (timer) { window.clearInterval(timer); timer = null; } }
    function stop()  { stopped = true; pause(); }

    files.forEach(function (f, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', noteFor(i));
      b.addEventListener('click', function () { stop(); show(i); });
      dots.appendChild(b);
    });

    if (files.length > 1 && arrows) {
      ['prev', 'next'].forEach(function (dir) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'sl-arrow sl-' + dir;
        b.setAttribute('aria-label', dir === 'prev' ? 'Previous photograph' : 'Next photograph');
        b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
          '<path d="' + (dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7') + '" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        b.addEventListener('click', function () { stop(); step(dir === 'prev' ? -1 : 1); });
        root.appendChild(b);
      });
    }

    if (files.length > 1) root.appendChild(dots);

    root.addEventListener('mouseenter', pause);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', pause);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause(); else start();
    });

    show(0);
    start();

    /* Handed back so a page can drive the slider from something else, which
       is how the Experiences frame follows its list of activities. */
    return { show: show, step: step, stop: stop, count: files.length };
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.sl').forEach(buildSlider);

  /* ══ LIGHTBOX ═════════════════════════════════════════════════════════════
     One lightbox for the whole site, built once here rather than copied into
     each page that wants one. Any element carrying data-gallery opens it:

       <button data-gallery="a.jpg,b.webp" data-gallery-note="Beach Bungalows">

     Wired to rooms, tours and food - anywhere there is a real set worth
     stepping through. Maps, hero images and one-off shots stay inert on
     purpose: a lightbox that opens onto a single photograph with nothing to
     browse is a dead end dressed as a feature.

     Arrows and the left/right keys step and wrap, Escape closes, clicking
     the backdrop closes, scrolling behind it is locked, and focus returns to
     whatever opened it so a keyboard user is not dumped at the top of the
     page.                                                                  */
  {
    var lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photographs');
    lb.hidden = true;
    lb.innerHTML =
      '<span class="lb-title"></span>' +
      '<img class="lb-img" alt="">' +
      '<button class="lb-btn lb-prev" type="button" aria-label="Previous photograph">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<button class="lb-btn lb-next" type="button" aria-label="Next photograph">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<button class="lb-btn lb-close" type="button" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button>' +
      '<span class="lb-count"></span>';
    document.body.appendChild(lb);

    var lbImg   = lb.querySelector('.lb-img');
    var lbTitle = lb.querySelector('.lb-title');
    var lbCount = lb.querySelector('.lb-count');
    var lbPrev  = lb.querySelector('.lb-prev');
    var lbNext  = lb.querySelector('.lb-next');
    var lbClose = lb.querySelector('.lb-close');

    var lbFiles = [], lbLabel = '', lbAt = 0, lbOpener = null;

    function lbPaint() {
      lbImg.src = '/media/' + lbFiles[lbAt];
      lbImg.alt = lbLabel + ', photograph ' + (lbAt + 1) + ' of ' + lbFiles.length;
      lbTitle.textContent = lbLabel;
      lbCount.textContent = (lbAt + 1) + ' of ' + lbFiles.length;
      var many = lbFiles.length > 1;
      lbPrev.hidden = !many;
      lbNext.hidden = !many;
    }
    function lbStep(d) { lbAt = (lbAt + d + lbFiles.length) % lbFiles.length; lbPaint(); }
    function lbShut() {
      lb.hidden = true;
      document.body.style.overflow = '';
      lbImg.removeAttribute('src');
      if (lbOpener) { lbOpener.focus(); lbOpener = null; }
    }

    lbPrev.addEventListener('click', function () { lbStep(-1); });
    lbNext.addEventListener('click', function () { lbStep(1); });
    lbClose.addEventListener('click', lbShut);
    /* Only the backdrop closes, never the photograph itself. */
    lb.addEventListener('click', function (e) { if (e.target === lb) lbShut(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') lbShut();
      else if (e.key === 'ArrowLeft') lbStep(-1);
      else if (e.key === 'ArrowRight') lbStep(1);
    });

    /* Delegated from the document rather than bound to each opener, so a
       [data-gallery] that is rendered later still works. The tour slider in
       shared-sections.js rewrites itself every time you change tab or tour,
       and binding at load would have missed every one of those. */
    function lbOpen(target) {
      var el = target.closest && target.closest('[data-gallery]');
      if (!el) return false;
      var files = (el.getAttribute('data-gallery') || '').split(',').filter(Boolean);
      if (!files.length) return false;

      /* Which photograph to open on. The file list lives on the container
         and the index on the thing you clicked, so a strip of tiles sharing
         one list can each open at their own picture. Anything without
         data-gallery-start opens at the first, which is every opener that
         existed before the gallery strips were wired up. */
      var startEl = target.closest('[data-gallery-start]');
      var start = startEl ? parseInt(startEl.getAttribute('data-gallery-start'), 10) : 0;
      if (isNaN(start) || start < 0 || start >= files.length) start = 0;

      lbFiles = files;
      lbLabel = el.getAttribute('data-gallery-note') || '';
      lbAt = start;
      lbOpener = startEl || el;
      lbPaint();
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      lbClose.focus();
      return true;
    }

    document.addEventListener('click', function (e) {
      if (!lb.hidden) return;                       // ignore clicks inside it
      lbOpen(e.target);
    });

    /* The gallery tiles are divs with role="button", so the browser gives
       them no keyboard behaviour of their own. Enter and Space have to be
       wired up by hand or the strip is reachable by Tab and then does
       nothing, which is worse than not being reachable at all. */
    document.addEventListener('keydown', function (e) {
      if (!lb.hidden) return;
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      var t = e.target;
      if (!t.closest || !t.closest('[data-gallery-start]')) return;
      e.preventDefault();
      lbOpen(t);
    });
  }

  /* ══ EXPANDER ═════════════════════════════════════════════════════════════
     One expand-in-place row for the whole site. Before this there were five
     families - ea-bar, lo-pol, ar-faq, ab-faq and the include cards - all
     doing the same thing with different class names, different arrows and
     different motion.

     Markup:
       <div class="xp-list" data-exclusive="true">
         <div class="xp">
           <button class="xp-head"><span class="xp-name">…</span></button>
           <div class="xp-body">…</div>
         </div>
       </div>

     data-exclusive="true" means opening one closes the rest. Mehdi's rule,
     2026-08-09: exclusive wherever the list drives something else (the
     Experiences photo frame), independent everywhere else, because people
     comparing two policies or two answers want both open at once.

     Opening dispatches an 'xp:open' event on the row, which is how the
     Experiences page swaps its photograph without this component needing to
     know anything about photographs.                                       */
  /* Delegated from the document, not bound to each row at load. The
     Experiences accordion is built from shared data AFTER this file runs, and
     binding at load would have missed every row - the same reason the
     lightbox delegates. */
  document.addEventListener('click', function (e) {
    var head = e.target.closest && e.target.closest('.xp-head');
    if (!head) return;
    var row  = head.closest('.xp');
    var list = head.closest('.xp-list');
    if (!row || !list) return;

    var exclusive = list.getAttribute('data-exclusive') === 'true';
    var wasOpen = row.getAttribute('data-open') === 'true';

    if (exclusive) {
      list.querySelectorAll('.xp').forEach(function (other) {
        other.setAttribute('data-open', 'false');
        var h = other.querySelector('.xp-head');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
    }
    var nowOpen = !wasOpen;
    row.setAttribute('data-open', nowOpen ? 'true' : 'false');
    head.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');

    /* Exclusive lists fire on every click, open or closed, so whatever is
       listening keeps following the selection rather than blanking. */
    if (nowOpen || exclusive) {
      row.dispatchEvent(new CustomEvent('xp:open', { bubbles: true }));
    }
  });

  /* Rows that exist at load get their starting state stamped. Rows added
     later carry data-open in their own markup. */
  document.querySelectorAll('.xp').forEach(function (row) {
    if (row.getAttribute('data-open') !== 'true') row.setAttribute('data-open', 'false');
    var h = row.querySelector('.xp-head');
    if (h) h.setAttribute('aria-expanded', row.getAttribute('data-open'));
  });

  /* ── REVEAL ON SCROLL ──────────────────────────────────────────────────── */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ── PUBLISHED ───────────────────────────────────────────────────────────
     The two media helpers, so a page script can paint a photograph into
     something the shell does not own (the Experiences frame) without
     redefining them. Nothing else is exported: pages use the components. */
  window.OF = { paint: paint, placeholder: placeholder };
})();
