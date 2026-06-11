/* Ocean Forest Concierge Widget */

(function () {
  const HOST_NAME = 'Teresa';
  const API_URL = '/api/chat';

  const STARTER_CHIPS = [
    'How do I get there?',
    'Tell me about the rooms',
    'What retreats do you host?',
    'What should I pack?',
    'Help me plan my stay',
  ];

  const GREETING =
    `Hola — I'm ${HOST_NAME}, your digital host at Ocean Forest. Ask me anything about the lodge, getting here, rooms, retreats, or the Osa Peninsula. When you're ready, I'll help you send an enquiry to our team.`;

  let isOpen = false;
  let isLoading = false;
  let messages = [];
  let enquiry = {};
  let readyForHandoff = false;

  const root = document.createElement('div');
  root.id = 'of-concierge';
  root.innerHTML = `
    <div class="of-concierge-panel" aria-hidden="true">
      <header class="of-concierge-header">
        <div>
          <strong>${HOST_NAME} · Ocean Forest</strong>
          <small>AI-assisted digital host</small>
        </div>
        <button type="button" class="of-concierge-minimize" aria-label="Minimize chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
      </header>
      <div class="of-concierge-messages" role="log" aria-live="polite"></div>
      <div class="of-concierge-chips"></div>
      <div class="of-concierge-handoff" hidden>
        <a class="of-concierge-cta" href="#">Complete your enquiry</a>
      </div>
      <form class="of-concierge-input">
        <input type="text" placeholder="Ask about stays, retreats, travel…" autocomplete="off" maxlength="2000" />
        <button type="submit" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </form>
    </div>
    <button type="button" class="of-concierge-launcher" aria-label="Open concierge chat" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Ask ${HOST_NAME}</span>
    </button>
  `;
  document.body.appendChild(root);

  const launcher = root.querySelector('.of-concierge-launcher');
  const panel = root.querySelector('.of-concierge-panel');
  const minimizeBtn = root.querySelector('.of-concierge-minimize');
  const messagesEl = root.querySelector('.of-concierge-messages');
  const chipsEl = root.querySelector('.of-concierge-chips');
  const handoffEl = root.querySelector('.of-concierge-handoff');
  const ctaLink = root.querySelector('.of-concierge-cta');
  const form = root.querySelector('.of-concierge-input');
  const input = form.querySelector('input');

  function renderChips() {
    chipsEl.innerHTML = STARTER_CHIPS.map(
      (chip) => `<button type="button" class="of-concierge-chip">${chip}</button>`
    ).join('');
    chipsEl.querySelectorAll('.of-concierge-chip').forEach((btn) => {
      btn.addEventListener('click', () => sendMessage(btn.textContent));
    });
  }

  function appendMessage(role, content) {
    const div = document.createElement('div');
    div.className = `of-concierge-msg of-concierge-msg--${role}`;
    div.textContent = content;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'of-concierge-msg of-concierge-msg--assistant of-concierge-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    div.dataset.typing = 'true';
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    messagesEl.querySelector('[data-typing="true"]')?.remove();
  }

  function buildHandoffUrl() {
    const params = new URLSearchParams();
    params.set('from', 'concierge');
    if (enquiry.enquiryType) params.set('type', enquiry.enquiryType);
    if (enquiry.arrivalMonth) params.set('month', enquiry.arrivalMonth);
    if (enquiry.guestCount) params.set('guests', String(enquiry.guestCount));
    if (enquiry.summary) params.set('message', enquiry.summary);
    if (enquiry.suggestedRoomOrProgram) {
      params.set('suggested', enquiry.suggestedRoomOrProgram);
    }
    return `contact.html?${params.toString()}`;
  }

  function updateHandoff() {
    if (readyForHandoff) {
      handoffEl.hidden = false;
      ctaLink.href = buildHandoffUrl();
      chipsEl.hidden = true;
    } else {
      handoffEl.hidden = true;
      chipsEl.hidden = messages.length > 2;
    }
  }

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    isLoading = true;
    input.disabled = true;
    form.querySelector('button').disabled = true;

    appendMessage('user', trimmed);
    messages.push({ role: 'user', content: trimmed });
    chipsEl.hidden = true;

    showTyping();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, enquiry }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('Invalid response from chat API');
      }
      hideTyping();

      if (!res.ok && !data.reply) {
        throw new Error(data.error || `Chat API error (${res.status})`);
      }

      const reply = data.reply || data.error || 'Something went wrong. Please try again.';
      appendMessage('assistant', reply);
      messages.push({ role: 'assistant', content: reply });

      if (data.enquiry) enquiry = { ...enquiry, ...data.enquiry };
      readyForHandoff = Boolean(data.readyForHandoff);
      updateHandoff();
    } catch {
      hideTyping();
      appendMessage(
        'assistant',
        "I'm having trouble connecting. Please write to visit@oceanforest.org — we reply within 24 hours."
      );
    } finally {
      isLoading = false;
      input.disabled = false;
      form.querySelector('button').disabled = false;
      input.focus();
    }
  }

  function setOpen(open) {
    isOpen = open;
    root.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    launcher.setAttribute('aria-expanded', open ? 'true' : 'false');
    launcher.setAttribute('aria-label', open ? 'Minimize concierge chat' : 'Open concierge chat');
  }

  function openPanel() {
    if (isOpen) return;
    setOpen(true);
    if (messages.length === 0) {
      appendMessage('assistant', GREETING);
      messages.push({ role: 'assistant', content: GREETING });
      renderChips();
    }
    input.focus();
  }

  function minimizePanel() {
    if (!isOpen) return;
    setOpen(false);
  }

  launcher.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) minimizePanel();
    else openPanel();
  });

  minimizeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    minimizePanel();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    sendMessage(text);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) minimizePanel();
  });

  document.addEventListener('click', (e) => {
    if (!isOpen) return;
    if (root.contains(e.target)) return;
    minimizePanel();
  });
})();
