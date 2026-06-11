// Header scroll behavior
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.innerHTML = links.classList.contains('open')
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  }));
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1500; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(target % 1 ? 1 : 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// Concierge handoff — pre-fill contact form from URL params
(function prefillContactFromConcierge() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('from') !== 'concierge') return;

  const typeMap = {
    stay: 'stay',
    retreat: 'retreat',
    group: 'group',
    press: 'press',
    other: 'other',
  };

  const enquiryType = document.getElementById('enquiry-type');
  const arrivalMonth = document.getElementById('arrival-month');
  const guestCount = document.getElementById('guest-count');
  const message = document.getElementById('message');
  const note = document.getElementById('concierge-prefill-note');

  const type = params.get('type');
  if (type && enquiryType && typeMap[type]) {
    enquiryType.value = typeMap[type];
  }

  const month = params.get('month');
  if (month && arrivalMonth) arrivalMonth.value = month;

  const guests = params.get('guests');
  if (guests && guestCount) guestCount.value = guests;

  const msg = params.get('message');
  const suggested = params.get('suggested');
  if (message) {
    let text = msg || '';
    if (suggested) {
      text = text ? `${text}\n\nSuggested: ${suggested}` : `Suggested: ${suggested}`;
    }
    if (text) message.value = text;
  }

  if (note) note.hidden = false;

  const formSection = document.getElementById('contact-form');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
})();
