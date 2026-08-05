/* ============================================================================
   Ocean Forest Ecolodge V2 — SHARED SHELL
   ----------------------------------------------------------------------------
   Lifted and adapted from index.html's inline <script> and shared-sections.js's
   placeholder helper, per specs/of-v2-shell.md §3. Every V2 page loads this
   after shell.css. Edit once here and every page changes.
   ========================================================================== */

var GALLERY = [
  'gallery-01.jpg', 'gallery-02.jpg', 'gallery-03.jpg', 'gallery-04.jpg',
  'gallery-05.jpg', 'gallery-06.jpg', 'gallery-07.jpg', 'gallery-08.jpg',
  'gallery-09.jpg', 'gallery-10.jpg', 'gallery-11.jpg', 'gallery-12.jpg',
  'gallery-13.jpg', 'gallery-14.jpg', 'gallery-15.jpg', 'gallery-16.jpg',
  'gallery-17.jpg', 'gallery-18.jpg', 'gallery-19.jpg', 'gallery-20.jpg',
  'gallery-21.jpg', 'gallery-22.jpg', 'gallery-23.jpg', 'gallery-24.jpg'
];

(function () {
  'use strict';

  /* ── THEME ───────────────────────────────────────────────────────────────
     Same of-theme localStorage key as V1. V2 flips the default to light:
     anyone who already chose dark keeps dark, everyone else starts light.  */
  var THEME_KEY = 'of-theme';
  var store = null;
  try { store = window.localStorage; } catch (e) { store = null; }

  var themeBtn = document.getElementById('themeBtn');

  function paintTheme(light) {
    document.body.classList.toggle('light', light);
    if (themeBtn) {
      themeBtn.textContent = light ? '☀' : '☾';
      themeBtn.setAttribute('aria-pressed', light ? 'true' : 'false');
    }
  }

  var saved = null;
  try { saved = store && store.getItem(THEME_KEY); } catch (e) {}
  paintTheme(saved !== 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var light = !document.body.classList.contains('light');
      paintTheme(light);
      if (store) { try { store.setItem(THEME_KEY, light ? 'light' : 'dark'); } catch (e) {} }
    });
  }

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
    img.src = '../media/' + file;
  });

  /* ── HERO SLOT LOADER ────────────────────────────────────────────────────
     Tries a video, then a still, then falls back to the standard placeholder,
     full-bleed, inside the .hero-media host.                               */
  var heroMedia = document.querySelector('.hero-media');
  if (heroMedia) {
    var slug = heroMedia.getAttribute('data-hero-slug');
    var videoSrc = '../media/hero/' + slug + '.mp4';
    var stillSrc = '../media/hero/' + slug + '.jpg';

    function showHeroPlaceholder() {
      heroMedia.innerHTML = '';
      var d = document.createElement('div');
      d.className = 'ph';
      d.innerHTML =
        '<span class="ph-label">Hero video or still to come</span>' +
        '<span class="ph-file">media/hero/' + slug + '.mp4 or .jpg</span>';
      heroMedia.appendChild(d);
    }

    function tryStill() {
      var img = new Image();
      img.onload = function () {
        heroMedia.innerHTML = '';
        img.alt = '';
        heroMedia.appendChild(img);
      };
      img.onerror = showHeroPlaceholder;
      img.src = stillSrc;
    }

    (function tryVideo() {
      /* A <video> probe rather than an XHR HEAD request — this has to work
         opened straight from Finder over file://, where XHR to local files
         is blocked by CORS. A video element's error event is the right
         signal, but some servers return a 404 body that never triggers it
         (readyState stays HAVE_NOTHING with no error), so a short timeout
         is the fallback that guarantees the placeholder still appears. */
      var video = document.createElement('video');
      video.autoplay = true; video.muted = true; video.loop = true; video.playsInline = true;
      var settled = false;
      function fallToStill() {
        if (settled) return;
        settled = true;
        tryStill();
      }
      video.addEventListener('error', fallToStill);
      video.addEventListener('loadeddata', function () {
        if (settled) return;
        settled = true;
        heroMedia.innerHTML = '';
        heroMedia.appendChild(video);
      });
      video.src = videoSrc;
      setTimeout(fallToStill, 1500);
    })();
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
      slot.setAttribute('data-media', 'gallery/' + file);
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
      img.src = '../media/' + file;
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
