/* Ocean Forest Ecolodge — concierge widget.
 *
 * One self-contained file: styles, markup and behaviour. No framework, no dependencies,
 * no API key (the key lives only in the serverless function at /api/concierge).
 *
 * Discreet by design: the bubble never opens by itself, makes no sound and shows no badge.
 * Conversation lives in a JS variable while the panel is open and is dropped when it closes.
 * Nothing is stored anywhere.
 *
 * Theming: every colour is a site CSS variable, so light/dark follows the page automatically.
 */
(function () {
  'use strict';

  if (window.__ofConcierge) return;
  window.__ofConcierge = true;

  var ENDPOINT = '/api/concierge';
  var WHATSAPP = 'https://wa.me/50687379416';
  var OFFLINE =
    "I can't reach the lodge right now — message Eli directly";

  /* ── styles ──────────────────────────────────────────────────────────────────────────── */

  var CSS = [
    '.ofc-bubble{',
    '  position:fixed;right:20px;bottom:20px;z-index:150;',
    '  width:56px;height:56px;border-radius:50%;border:0;padding:0;cursor:pointer;',
    '  background:var(--gradient-ocean-lime,linear-gradient(90deg,#3C88A4,#53A871,#DFDF5B));',
    '  box-shadow:0 6px 24px rgba(0,0,0,0.30);',
    '  display:flex;align-items:center;justify-content:center;',
    '  transition:transform .22s ease,box-shadow .22s ease,opacity .22s ease;',
    '}',
    '.ofc-bubble:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,0.36);}',
    '.ofc-bubble:focus-visible{outline:2px solid var(--teal,#2AADA8);outline-offset:3px;}',
    '.ofc-bubble svg{width:26px;height:26px;display:block;fill:none;stroke:#0b1210;',
    '  stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;}',
    '.ofc-bubble.ofc-open{transform:scale(.92);}',

    '.ofc-panel{',
    '  position:fixed;right:20px;bottom:88px;z-index:150;',
    '  width:360px;max-width:calc(100vw - 40px);max-height:min(560px,calc(100vh - 160px));',
    '  display:none;flex-direction:column;overflow:hidden;',
    '  background:var(--ink-2,#141a16);color:var(--mist,#e8ede4);',
    '  border:1px solid var(--hairline,rgba(232,237,228,0.14));border-radius:16px;',
    '  box-shadow:0 24px 60px rgba(0,0,0,0.45);',
    '  font-family:var(--sans,system-ui,sans-serif);font-size:14.5px;line-height:1.6;',
    '  opacity:0;transform:translateY(10px);',
    '  transition:opacity .2s ease,transform .2s ease;',
    '}',
    '.ofc-panel.ofc-show{display:flex;}',
    '.ofc-panel.ofc-in{opacity:1;transform:translateY(0);}',

    '.ofc-head{display:flex;align-items:center;gap:10px;padding:14px 14px 12px 16px;',
    '  border-bottom:1px solid var(--hairline,rgba(232,237,228,0.14));}',
    '.ofc-head::before{content:"";width:8px;height:8px;border-radius:50%;flex:0 0 auto;',
    '  background:var(--gradient-ocean-lime,linear-gradient(90deg,#3C88A4,#53A871,#DFDF5B));}',
    '.ofc-title{font-family:var(--serif,Georgia,serif);font-size:1.02rem;font-weight:400;',
    '  letter-spacing:.04em;margin:0;flex:1 1 auto;}',
    '.ofc-x{background:none;border:0;cursor:pointer;color:var(--dim,rgba(232,237,228,.62));',
    '  font-size:20px;line-height:1;padding:4px 6px;border-radius:6px;}',
    '.ofc-x:hover{color:var(--mist,#e8ede4);}',
    '.ofc-x:focus-visible{outline:2px solid var(--teal,#2AADA8);outline-offset:1px;}',

    '.ofc-log{flex:1 1 auto;overflow-y:auto;padding:14px 16px;',
    '  display:flex;flex-direction:column;gap:10px;overscroll-behavior:contain;}',
    '.ofc-msg{max-width:86%;padding:9px 13px;border-radius:14px;word-wrap:break-word;}',
    '.ofc-msg a{color:inherit;text-decoration:underline;text-underline-offset:2px;}',
    '.ofc-them{align-self:flex-start;background:var(--ink-3,#1a221c);',
    '  border:1px solid var(--hairline,rgba(232,237,228,0.14));border-bottom-left-radius:5px;}',
    '.ofc-me{align-self:flex-end;background:var(--teal-deep,#16707E);color:#fafaf8;',
    '  border-bottom-right-radius:5px;}',
    'body.light .ofc-me{background:var(--teal-deep,#16707E);color:#fafaf8;}',

    '.ofc-dots{display:inline-flex;gap:4px;align-items:center;height:12px;}',
    '.ofc-dots i{width:5px;height:5px;border-radius:50%;display:block;',
    '  background:var(--dim,rgba(232,237,228,.62));animation:ofc-b 1.2s infinite ease-in-out;}',
    '.ofc-dots i:nth-child(2){animation-delay:.18s}',
    '.ofc-dots i:nth-child(3){animation-delay:.36s}',
    '@keyframes ofc-b{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}',
    '@media (prefers-reduced-motion:reduce){.ofc-dots i{animation:none;opacity:.6}',
    '  .ofc-panel,.ofc-bubble{transition:none}}',

    '.ofc-foot{border-top:1px solid var(--hairline,rgba(232,237,228,0.14));',
    '  padding:10px 12px;display:flex;gap:8px;align-items:flex-end;}',
    '.ofc-in-txt{flex:1 1 auto;resize:none;max-height:96px;min-height:38px;',
    '  background:var(--ink,#0e1310);color:var(--mist,#e8ede4);',
    '  border:1px solid var(--hairline,rgba(232,237,228,0.14));border-radius:10px;',
    '  padding:9px 11px;font-family:inherit;font-size:14.5px;line-height:1.45;}',
    '.ofc-in-txt::placeholder{color:var(--dim,rgba(232,237,228,.62));}',
    '.ofc-in-txt:focus{outline:none;border-color:var(--teal,#2AADA8);}',
    '.ofc-send{flex:0 0 auto;width:38px;height:38px;border:0;border-radius:10px;cursor:pointer;',
    '  background:var(--gradient-ocean-lime,linear-gradient(90deg,#3C88A4,#53A871,#DFDF5B));',
    '  display:flex;align-items:center;justify-content:center;}',
    '.ofc-send svg{width:17px;height:17px;fill:none;stroke:#0b1210;stroke-width:1.9;',
    '  stroke-linecap:round;stroke-linejoin:round;}',
    '.ofc-send:disabled{opacity:.45;cursor:default;}',
    '.ofc-send:focus-visible{outline:2px solid var(--teal,#2AADA8);outline-offset:2px;}',
    '.ofc-note{padding:0 16px 10px;font-size:11.5px;letter-spacing:.03em;',
    '  color:var(--dim,rgba(232,237,228,.62));}',

    '@media (max-width:600px){',
    '  .ofc-bubble{right:16px;bottom:16px;}',
    '  .ofc-panel{right:0;left:0;bottom:0;width:auto;max-width:none;border-radius:16px 16px 0 0;',
    '    max-height:min(78vh,calc(100vh - 96px));border-left:0;border-right:0;border-bottom:0;}',
    '}'
  ].join('');

  /* ── build ───────────────────────────────────────────────────────────────────────────── */

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  var style = el('style');
  style.setAttribute('data-of-concierge', '');
  style.textContent = CSS;
  document.head.appendChild(style);

  var bubble = el('button', 'ofc-bubble');
  bubble.type = 'button';
  bubble.setAttribute('aria-label', 'Ask the lodge a question');
  bubble.setAttribute('aria-expanded', 'false');
  bubble.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-2.8-.4L4 21l1.6-3.9A8.2 8.2 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/>' +
    '</svg>';

  var panel = el('div', 'ofc-panel');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'false');
  panel.setAttribute('aria-label', 'Ocean Forest concierge');
  panel.innerHTML =
    '<div class="ofc-head">' +
    '<h2 class="ofc-title">Ask the lodge</h2>' +
    '<button type="button" class="ofc-x" aria-label="Close">&times;</button>' +
    '</div>' +
    '<div class="ofc-log" role="log" aria-live="polite"></div>' +
    '<div class="ofc-note">Answers come from the lodge&rsquo;s own information. For anything else, Eli is on WhatsApp.</div>' +
    '<form class="ofc-foot">' +
    '<textarea class="ofc-in-txt" rows="1" placeholder="Ask about rooms, food, getting here&hellip;" aria-label="Your question"></textarea>' +
    '<button type="submit" class="ofc-send" aria-label="Send">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>' +
    '</button>' +
    '</form>';

  function mount() {
    document.body.appendChild(bubble);
    document.body.appendChild(panel);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  var log = panel.querySelector('.ofc-log');
  var form = panel.querySelector('.ofc-foot');
  var input = panel.querySelector('.ofc-in-txt');
  var send = panel.querySelector('.ofc-send');
  var closeBtn = panel.querySelector('.ofc-x');

  /* ── state (lives only while the panel is open) ──────────────────────────────────────── */

  var history = [];
  var busy = false;
  var open = false;
  var greeted = false;

  /* ── rendering ───────────────────────────────────────────────────────────────────────── */

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* A raw booking URL is 100 characters of noise in a chat bubble. Show a short, honest
     form of the same link — language-neutral, so it reads right in any reply. */
  function label(url) {
    if (url.indexOf('wa.me/50687379416') > -1) return 'wa.me/50687379416';
    if (url.indexOf('book.securebookings.net') > -1) return 'book.securebookings.net';
    if (url.length > 46) {
      var m = url.match(/^https?:\/\/(?:www\.)?([^/]+)/);
      return m ? m[1] + '/…' : url.slice(0, 43) + '…';
    }
    return url;
  }

  /* Escape first, then linkify — no untrusted HTML ever reaches the DOM. */
  function render(text) {
    var safe = escapeHtml(text);
    safe = safe.replace(/(https?:\/\/[^\s<>()"']+)/g, function (url) {
      var trail = '';
      while (/[.,;:!?]$/.test(url)) {
        trail = url.slice(-1) + trail;
        url = url.slice(0, -1);
      }
      return (
        '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' +
        label(url) + /* url is already escaped by escapeHtml above */
        '</a>' + trail
      );
    });
    return safe.replace(/\n/g, '<br>');
  }

  function bubbleMsg(who, html) {
    var n = el('div', 'ofc-msg ' + (who === 'me' ? 'ofc-me' : 'ofc-them'), html);
    log.appendChild(n);
    log.scrollTop = log.scrollHeight;
    return n;
  }

  function say(text) {
    return bubbleMsg('them', render(text));
  }

  function offline() {
    bubbleMsg(
      'them',
      escapeHtml(OFFLINE) +
        ' &mdash; <a href="' + WHATSAPP + '" target="_blank" rel="noopener noreferrer">WhatsApp</a>.'
    );
  }

  function typing() {
    return bubbleMsg('them', '<span class="ofc-dots"><i></i><i></i><i></i></span>');
  }

  /* ── open / close ────────────────────────────────────────────────────────────────────── */

  function openPanel() {
    if (open) return;
    open = true;
    panel.classList.add('ofc-show');
    /* next frame so the transition runs */
    requestAnimationFrame(function () {
      panel.classList.add('ofc-in');
    });
    bubble.classList.add('ofc-open');
    bubble.setAttribute('aria-expanded', 'true');
    if (!greeted) {
      greeted = true;
      say('Hello. Ask me anything about the lodge — rooms, food, tours, how to get here.');
    }
    input.focus();
  }

  function closePanel() {
    if (!open) return;
    open = false;
    panel.classList.remove('ofc-in');
    bubble.classList.remove('ofc-open');
    bubble.setAttribute('aria-expanded', 'false');
    setTimeout(function () {
      if (!open) panel.classList.remove('ofc-show');
    }, 200);
    /* memory lasts only while the panel is open */
    history = [];
    greeted = false;
    log.innerHTML = '';
    input.value = '';
    input.style.height = '';
    bubble.focus();
  }

  bubble.addEventListener('click', function () {
    if (open) closePanel();
    else openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) closePanel();
  });

  /* ── talking ─────────────────────────────────────────────────────────────────────────── */

  function setBusy(state) {
    busy = state;
    send.disabled = state;
  }

  async function ask(text) {
    history.push({ role: 'user', content: text });
    bubbleMsg('me', render(text));
    setBusy(true);
    var dots = typing();

    try {
      var res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      dots.remove();

      if (!res.ok) {
        offline();
        history.pop();
        return;
      }
      var data = await res.json();
      if (!data || typeof data.reply !== 'string' || !data.reply.trim()) {
        offline();
        history.pop();
        return;
      }
      history.push({ role: 'assistant', content: data.reply });
      say(data.reply);
    } catch (e) {
      dots.remove();
      offline();
      history.pop();
    } finally {
      setBusy(false);
      if (open) input.focus();
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || busy) return;
    input.value = '';
    input.style.height = '';
    ask(text);
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  });

  input.addEventListener('input', function () {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 96) + 'px';
  });
})();
