/* ============================================================================
   Ocean Forest Ecolodge V2 — SHARED SHELL
   ----------------------------------------------------------------------------
   Lifted and adapted from index.html's inline <script> and shared-sections.js's
   placeholder helper, per specs/of-v2-shell.md §3. Every V2 page loads this
   after shell.css. Edit once here and every page changes.
   ========================================================================== */

var GALLERY = [
  'gallery/gallery-01.jpg', 'gallery/gallery-02.jpg', 'gallery/gallery-03.jpg', 'gallery/gallery-04.jpg',
  'gallery/gallery-05.jpg', 'gallery/gallery-06.jpg', 'gallery/gallery-07.jpg', 'gallery/gallery-08.jpg',
  'gallery/gallery-09.webp', 'gallery/gallery-10.webp', 'gallery/gallery-11.webp', 'gallery/gallery-12.webp',
  'gallery/gallery-13.webp', 'gallery/gallery-14.webp', 'gallery/gallery-15.webp', 'gallery/gallery-16.webp',
  'gallery/gallery-17.webp', 'gallery/gallery-18.webp', 'gallery/gallery-19.webp', 'gallery/gallery-20.webp',
  'gallery/gallery-21.webp', 'gallery/gallery-22.webp'
];

(function () {
  'use strict';

  /* ── THEME ───────────────────────────────────────────────────────────────
     D7: light is now the only theme. The toggle, the of-theme storage key and
     the paint handler are all gone. Every page carries class="light" on
     <body> in its own markup, so the colours are right before any script
     runs and there is no flash of the wrong palette. Nothing is read from
     storage, so a stale value left there by the old toggle has no effect. */

  /* ── HEADER: pinned, shrinks on scroll ─────────────────────────────────── */
  var head = document.getElementById('siteHead');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      head.classList.toggle('scrolled', window.scrollY > 60);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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
     Any element with data-media points at a file in ../media (one level up
     from v2/). If the file is missing, a labelled frame appears showing
     exactly which filename to drop in. Nothing else needs changing when the
     real assets arrive.                                                    */
  function placeholder(file, note) {
    var d = document.createElement('div');
    d.className = 'ph';
    d.innerHTML =
      '<span class="ph-label">Photo to come</span>' +
      '<span class="ph-file">media/' + file + '</span>' +
      (note ? '<span class="ph-note">' + note + '</span>' : '');
    return d;
  }

  document.querySelectorAll('[data-media]').forEach(function (host) {
    var file  = host.getAttribute('data-media');
    var ratio = host.getAttribute('data-ratio') || '4/3';
    var note  = host.getAttribute('data-note') || '';
    host.style.aspectRatio = ratio.replace('/', ' / ');

    var img = new Image();
    img.onload = function () {
      host.innerHTML = '';
      img.alt = note || '';
      host.appendChild(img);
    };
    img.onerror = function () {
      host.innerHTML = '';
      host.appendChild(placeholder(file, note));
    };
    img.src = '/media/' + file;
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
    for (var i = 0; i < 8; i++) {
      var file = GALLERY[(offset + i) % GALLERY.length];
      var slot = document.createElement('div');
      slot.setAttribute('data-media', file);
      slot.setAttribute('data-ratio', '1/1');
      slot.setAttribute('data-note', 'Gallery slot ' + (i + 1));
      galHost.appendChild(slot);
    }
    galHost.querySelectorAll('[data-media]').forEach(function (host) {
      var file  = host.getAttribute('data-media');
      var ratio = host.getAttribute('data-ratio') || '4/3';
      var note  = host.getAttribute('data-note') || '';
      host.style.aspectRatio = ratio.replace('/', ' / ');

      var img = new Image();
      img.onload = function () {
        host.innerHTML = '';
        img.alt = note || '';
        host.appendChild(img);
      };
      img.onerror = function () {
        host.innerHTML = '';
        host.appendChild(placeholder(file, note));
      };
      img.src = '/media/' + file;
    });
  }

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
})();
