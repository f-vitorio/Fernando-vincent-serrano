/**
 * motion.ts — animações de scroll, brilho em cards e barra de progresso.
 * Tudo desligado quando o usuário pede prefers-reduced-motion.
 */

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const REVEAL_SEL = '.reveal, .heading-section, .quote-text';

const show = (el: Element) => el.classList.add('is-in');

function initReveal() {
  const nodes = document.querySelectorAll(REVEAL_SEL);

  if (REDUCE || !('IntersectionObserver' in window)) {
    nodes.forEach(show);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        const parent = el.parentElement;
        let idx = 0;
        if (parent) {
          const sibs = [...parent.children].filter((c) => c.matches(REVEAL_SEL));
          idx = Math.max(0, sibs.indexOf(el));
        }
        el.style.setProperty('--d', String(Math.min(idx, 6)));
        show(el);
        io.unobserve(el);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  nodes.forEach((el) => io.observe(el));
}

function initCardGlow() {
  if (REDUCE) return;
  document.querySelectorAll<HTMLElement>('.card-hover').forEach((card) => {
    card.addEventListener('pointermove', (ev) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${(((ev.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(((ev.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    });
  });
}

function initScrollBar() {
  if (REDUCE) return;
  const bar = document.createElement('div');
  bar.className = 'progresso';
  bar.setAttribute('aria-hidden', 'true');
  const fill = document.createElement('i');
  bar.appendChild(fill);
  document.body.appendChild(bar);

  let ticking = false;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    fill.style.width = `${pct.toFixed(2)}%`;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

initReveal();
initCardGlow();
initScrollBar();
