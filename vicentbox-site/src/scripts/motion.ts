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

function initParallax() {
  if (REDUCE) return;
  const nodes = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (!nodes.length) return;

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    for (const el of nodes) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) continue;
      const speed = parseFloat(el.dataset.parallax || '0.15');
      const center = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    }
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

function initLightbox() {
  const figures = [...document.querySelectorAll<HTMLElement>('[data-lightbox]')];
  if (!figures.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Visualizador de fotos');
  overlay.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="Fechar">\u00d7</button>
    <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Foto anterior">\u2039</button>
    <img class="lightbox__img" alt="" />
    <p class="lightbox__caption"></p>
    <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Pr\u00f3xima foto">\u203a</button>
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector<HTMLImageElement>('.lightbox__img')!;
  const caption = overlay.querySelector<HTMLElement>('.lightbox__caption')!;
  let index = 0;
  let lastFocus: HTMLElement | null = null;

  const show = (i: number) => {
    index = (i + figures.length) % figures.length;
    const fig = figures[index];
    const source = fig.querySelector<HTMLImageElement>('img');
    if (!source) return;
    img.src = source.currentSrc || source.src;
    img.alt = source.alt;
    caption.textContent = fig.dataset.caption || source.alt;
  };
  const open = (i: number) => {
    lastFocus = document.activeElement as HTMLElement;
    show(i);
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector<HTMLElement>('.lightbox__close')?.focus();
  };
  const close = () => {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    lastFocus?.focus();
  };

  figures.forEach((fig, i) => {
    fig.addEventListener('click', () => open(i));
    fig.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        open(i);
      }
    });
  });
  overlay.querySelector('.lightbox__close')?.addEventListener('click', close);
  overlay.querySelector('.lightbox__nav--prev')?.addEventListener('click', (e) => {
    e.stopPropagation();
    show(index - 1);
  });
  overlay.querySelector('.lightbox__nav--next')?.addEventListener('click', (e) => {
    e.stopPropagation();
    show(index + 1);
  });
  overlay.addEventListener('click', (ev) => {
    if (ev.target === overlay) close();
  });
  document.addEventListener('keydown', (ev) => {
    if (!overlay.classList.contains('is-open')) return;
    if (ev.key === 'Escape') close();
    if (ev.key === 'ArrowLeft') show(index - 1);
    if (ev.key === 'ArrowRight') show(index + 1);
  });
}

initReveal();
initCardGlow();
initScrollBar();
initParallax();
initLightbox();
