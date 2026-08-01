/* ============================================================================
   FEEDBACK TOOL — dev-only, click-to-annotate review mode.
   ----------------------------------------------------------------------------
   Runs ONLY on localhost / 127.0.0.1. On the live Vercel/production domain
   this script no-ops immediately, so there is no risk of it shipping to real
   visitors even if the <script> tag is left in the page.

   How it works, in one line: turn it on, click anything you want changed,
   type a note, keep going across as many pages as you like, then copy the
   whole list as one prompt to hand back to Claude.
   ========================================================================== */
(function () {
  'use strict';

  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  if (!isLocal) return;

  var STORE_KEY = 'of-feedback-notes';
  var COLLAPSE_KEY = 'of-fb-collapsed';
  var active = false;
  var notes = load();
  var collapsed = loadCollapsed();

  /* ── storage ── */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
    catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(notes)); } catch (e) {}
  }
  function loadCollapsed() {
    try { return localStorage.getItem(COLLAPSE_KEY) === '1'; } catch (e) { return false; }
  }
  function saveCollapsed() {
    try { localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0'); } catch (e) {}
  }

  /* ── describe an element so the note is self-locating ── */
  function excerpt(el) {
    var t = (el.getAttribute('alt') || el.getAttribute('placeholder') || el.textContent || '').trim();
    t = t.replace(/\s+/g, ' ');
    return t.length > 90 ? t.slice(0, 90) + '…' : (t || '(no visible text — ' + el.tagName.toLowerCase() + ')');
  }
  function nearestSection(el) {
    var cur = el;
    while (cur && cur !== document.body) {
      if (cur.tagName === 'SECTION' || cur.tagName === 'HEADER' || cur.tagName === 'FOOTER' || cur.tagName === 'NAV') {
        var head = cur.querySelector('h1, h2, .eyebrow, .fork-label');
        return head ? head.textContent.trim().replace(/\s+/g, ' ').slice(0, 40) : cur.tagName.toLowerCase();
      }
      cur = cur.parentElement;
    }
    return 'page';
  }
  function cssPath(el) {
    var parts = [];
    var cur = el;
    for (var i = 0; i < 4 && cur && cur !== document.body; i++) {
      var seg = cur.tagName.toLowerCase();
      if (cur.id) { parts.unshift(seg + '#' + cur.id); break; }
      if (cur.className && typeof cur.className === 'string' && cur.className.trim()) {
        seg += '.' + cur.className.trim().split(/\s+/).slice(0, 2).join('.');
      }
      parts.unshift(seg);
      cur = cur.parentElement;
    }
    return parts.join(' > ');
  }

  /* ── styles ── */
  var style = document.createElement('style');
  style.textContent = [
    '#of-fb-tab{position:fixed;left:14px;bottom:14px;z-index:99998;font-family:monospace;',
    'font-size:11px;letter-spacing:.04em;background:#0e1310;color:#e8ede4;border:1px solid #2AADA8;',
    'padding:8px 14px;cursor:pointer;opacity:.55;transition:opacity .15s;user-select:none;}',
    '#of-fb-tab:hover{opacity:1;}',
    '#of-fb-tab.on{opacity:1;background:#2AADA8;color:#0e1310;}',
    '.of-fb-hover{outline:2px dashed #2AADA8 !important;outline-offset:2px !important;cursor:crosshair !important;}',
    '#of-fb-popover{position:fixed;z-index:99999;background:#fff;color:#1a1f1a;border:1px solid #2AADA8;',
    'box-shadow:0 8px 28px rgba(0,0,0,.28);padding:14px;width:280px;font-family:sans-serif;font-size:13px;}',
    '#of-fb-popover .of-fb-tag{font-family:monospace;font-size:10px;color:#16707E;margin-bottom:6px;',
    'text-transform:uppercase;letter-spacing:.06em;}',
    '#of-fb-popover .of-fb-excerpt{font-size:12px;color:rgba(26,31,26,.6);margin-bottom:8px;',
    'border-left:2px solid #2AADA8;padding-left:8px;}',
    '#of-fb-popover textarea{width:100%;min-height:64px;font-family:sans-serif;font-size:13px;',
    'padding:8px;border:1px solid rgba(26,31,26,.2);resize:vertical;box-sizing:border-box;}',
    '#of-fb-popover .of-fb-row{display:flex;gap:8px;margin-top:8px;}',
    '#of-fb-popover button{font-family:monospace;font-size:11px;letter-spacing:.04em;',
    'text-transform:uppercase;padding:8px 12px;border:0;cursor:pointer;}',
    '#of-fb-popover .of-fb-save{background:#0e1310;color:#fff;flex:1;}',
    '#of-fb-popover .of-fb-cancel{background:transparent;color:rgba(26,31,26,.5);}',
    '#of-fb-panel{position:fixed;right:14px;bottom:14px;z-index:99998;width:340px;max-height:70vh;',
    'display:flex;flex-direction:column;background:#0e1310;color:#e8ede4;border:1px solid #2AADA8;',
    'font-family:sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.4);}',
    '#of-fb-panel.hidden{display:none;}',
    '#of-fb-panel-head{padding:12px 14px;border-bottom:1px solid rgba(232,237,228,.15);',
    'display:flex;justify-content:space-between;align-items:center;font-family:monospace;font-size:11px;',
    'letter-spacing:.06em;text-transform:uppercase;color:#3DCFD0;cursor:pointer;user-select:none;}',
    '#of-fb-panel.collapsed{max-height:none;}',
    '#of-fb-panel.collapsed #of-fb-panel-head{border-bottom:0;}',
    '#of-fb-panel.collapsed #of-fb-list,#of-fb-panel.collapsed #of-fb-panel-foot{display:none;}',
    '#of-fb-chevron{display:inline-block;margin-left:6px;transition:transform .15s;}',
    '#of-fb-panel.collapsed #of-fb-chevron{transform:rotate(-90deg);}',
    '#of-fb-list{overflow-y:auto;padding:6px 14px;flex:1;}',
    '.of-fb-note{padding:10px 0;border-bottom:1px solid rgba(232,237,228,.1);}',
    '.of-fb-note .of-fb-n-page{font-family:monospace;font-size:9px;color:rgba(232,237,228,.4);',
    'text-transform:uppercase;}',
    '.of-fb-note .of-fb-n-tag{font-size:11px;color:#3DCFD0;margin:2px 0;}',
    '.of-fb-note .of-fb-n-excerpt{font-size:11px;color:rgba(232,237,228,.5);margin-bottom:4px;}',
    '.of-fb-note .of-fb-n-text{font-size:13px;line-height:1.4;color:#e8ede4;}',
    '.of-fb-note .of-fb-n-del{font-family:monospace;font-size:10px;color:rgba(232,237,228,.4);',
    'background:none;border:0;cursor:pointer;padding:0;margin-top:6px;text-decoration:underline;}',
    '#of-fb-panel-foot{padding:12px 14px;border-top:1px solid rgba(232,237,228,.15);',
    'display:flex;flex-direction:column;gap:8px;}',
    '#of-fb-panel-foot button{font-family:monospace;font-size:11px;letter-spacing:.04em;',
    'text-transform:uppercase;padding:10px;border:0;cursor:pointer;background:#2AADA8;color:#0e1310;}',
    '#of-fb-panel-foot button.secondary{background:transparent;color:#e8ede4;border:1px solid rgba(232,237,228,.3);}',
    '#of-fb-empty{font-size:12px;color:rgba(232,237,228,.4);padding:20px 0;text-align:center;}'
  ].join('');
  document.head.appendChild(style);

  /* ── tab ── */
  var tab = document.createElement('div');
  tab.id = 'of-fb-tab';
  document.body.appendChild(tab);

  /* ── panel ── */
  var panel = document.createElement('div');
  panel.id = 'of-fb-panel';
  panel.className = 'hidden';
  panel.innerHTML =
    '<div id="of-fb-panel-head"><span>Feedback notes<span id="of-fb-chevron">▾</span></span><span id="of-fb-count">0</span></div>' +
    '<div id="of-fb-list"></div>' +
    '<div id="of-fb-panel-foot">' +
      '<button id="of-fb-copy-page">Copy prompt — this page</button>' +
      '<button id="of-fb-copy-all">Copy prompt — all pages</button>' +
      '<button class="secondary" id="of-fb-download">Download .txt</button>' +
      '<button class="secondary" id="of-fb-clear">Clear all notes</button>' +
    '</div>';
  document.body.appendChild(panel);

  function renderTab() {
    var n = notes.length;
    tab.textContent = active ? 'Feedback: ON — click anything (' + n + ')' : 'Feedback mode (' + n + ')';
    tab.classList.toggle('on', active);
    panel.classList.toggle('hidden', n === 0 && !active);
    panel.classList.toggle('collapsed', collapsed);
  }

  function renderList() {
    var list = document.getElementById('of-fb-list');
    var count = document.getElementById('of-fb-count');
    count.textContent = notes.length;
    if (!notes.length) {
      list.innerHTML = '<div id="of-fb-empty">No notes yet. Turn feedback mode on, then click whatever you want changed.</div>';
      return;
    }
    list.innerHTML = notes.map(function (n, i) {
      return '<div class="of-fb-note" data-idx="' + i + '">' +
        '<div class="of-fb-n-page">' + n.page + '</div>' +
        '<div class="of-fb-n-tag">' + escapeHtml(n.section) + '</div>' +
        '<div class="of-fb-n-excerpt">“' + escapeHtml(n.excerpt) + '”</div>' +
        '<div class="of-fb-n-text">' + escapeHtml(n.text) + '</div>' +
        '<button class="of-fb-n-del" data-idx="' + i + '">Delete</button>' +
        '</div>';
    }).join('');
    list.querySelectorAll('.of-fb-n-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        notes.splice(parseInt(btn.dataset.idx, 10), 1);
        save(); renderTab(); renderList();
      });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── hover highlight + click-to-annotate ── */
  var hovered = null;
  function onMove(e) {
    if (!active) return;
    var el = e.target;
    if (el.closest('#of-fb-panel, #of-fb-tab, #of-fb-popover')) {
      if (hovered) hovered.classList.remove('of-fb-hover');
      hovered = null;
      return;
    }
    if (hovered === el) return;
    if (hovered) hovered.classList.remove('of-fb-hover');
    hovered = el;
    hovered.classList.add('of-fb-hover');
  }

  function onClick(e) {
    if (!active) return;
    if (e.target.closest('#of-fb-panel, #of-fb-tab, #of-fb-popover')) return;
    e.preventDefault();
    e.stopPropagation();
    openPopover(e.target, e.clientX, e.clientY);
  }

  var popover = null;
  function openPopover(target, x, y) {
    closePopover();
    popover = document.createElement('div');
    popover.id = 'of-fb-popover';
    var left = Math.min(x, window.innerWidth - 300);
    var top = Math.min(y, window.innerHeight - 220);
    popover.style.left = Math.max(8, left) + 'px';
    popover.style.top = Math.max(8, top) + 'px';
    popover.innerHTML =
      '<div class="of-fb-tag">' + escapeHtml(nearestSection(target)) + '</div>' +
      '<div class="of-fb-excerpt">“' + escapeHtml(excerpt(target)) + '”</div>' +
      '<textarea placeholder="What should change here?" autofocus></textarea>' +
      '<div class="of-fb-row">' +
        '<button class="of-fb-save">Save note</button>' +
        '<button class="of-fb-cancel">Cancel</button>' +
      '</div>';
    document.body.appendChild(popover);
    var ta = popover.querySelector('textarea');
    ta.focus();

    popover.querySelector('.of-fb-cancel').addEventListener('click', closePopover);
    popover.querySelector('.of-fb-save').addEventListener('click', function () {
      var text = ta.value.trim();
      if (!text) { closePopover(); return; }
      notes.push({
        page: location.pathname.replace(/^\//, '') || 'index.html',
        section: nearestSection(target),
        excerpt: excerpt(target),
        selector: cssPath(target),
        text: text,
        ts: Date.now()
      });
      save();
      closePopover();
      renderTab(); renderList();
    });
    ta.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') closePopover();
      if (ev.key === 'Enter' && (ev.metaKey || ev.ctrlKey)) popover.querySelector('.of-fb-save').click();
    });
  }
  function closePopover() {
    if (popover) { popover.remove(); popover = null; }
    if (hovered) { hovered.classList.remove('of-fb-hover'); hovered = null; }
  }

  document.addEventListener('mousemove', onMove, true);
  document.addEventListener('click', onClick, true);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopover();
  });

  tab.addEventListener('click', function () {
    active = !active;
    if (!active) closePopover();
    renderTab(); renderList();
  });

  /* ── prompt generation ── */
  function buildPrompt(scope) {
    var mine = scope === 'all' ? notes : notes.filter(function (n) { return n.page === (location.pathname.replace(/^\//, '') || 'index.html'); });
    if (!mine.length) return '';
    var byPage = {};
    mine.forEach(function (n) { (byPage[n.page] = byPage[n.page] || []).push(n); });
    var out = ['Feedback on Ocean Forest Ecolodge — please make these changes:\n'];
    Object.keys(byPage).forEach(function (page) {
      out.push('## ' + page + '\n');
      byPage[page].forEach(function (n, i) {
        out.push((i + 1) + '. Near "' + n.section + '" — element containing "' + n.excerpt + '"');
        out.push('   (' + n.selector + ')');
        out.push('   → ' + n.text + '\n');
      });
    });
    return out.join('\n');
  }

  function copy(text) {
    if (!text) { alert('No notes to copy yet.'); return; }
    var done = function () { flashTab('Copied ✓'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text); done(); });
    } else {
      fallbackCopy(text); done();
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
  }
  function flashTab(msg) {
    var prev = tab.textContent;
    tab.textContent = msg;
    setTimeout(renderTab, 1200);
  }

  document.getElementById('of-fb-panel-head').addEventListener('click', function () {
    collapsed = !collapsed;
    saveCollapsed();
    renderTab();
  });

  document.getElementById('of-fb-copy-page').addEventListener('click', function () { copy(buildPrompt('page')); });
  document.getElementById('of-fb-copy-all').addEventListener('click', function () { copy(buildPrompt('all')); });
  document.getElementById('of-fb-download').addEventListener('click', function () {
    var text = buildPrompt('all');
    if (!text) { alert('No notes to save yet.'); return; }
    var blob = new Blob([text], { type: 'text/plain' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ocean-forest-feedback.txt';
    a.click();
  });
  document.getElementById('of-fb-clear').addEventListener('click', function () {
    if (!confirm('Clear all feedback notes across every page?')) return;
    notes = []; save(); renderTab(); renderList();
  });

  renderTab();
  renderList();
})();
