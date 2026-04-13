/* ══════════════════════════════════════════════════════════════════════
   TLM Landing Page — main.js
   ══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Scroll Reveal ─────────────────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── Nav scroll effect ─────────────────────────────────────────────
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');

  if (nav && hero) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);
  }

  // ── Mobile nav toggle ─────────────────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
    });

    navLinks.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        nav.classList.remove('nav--open');
      }
    });
  }

  // ── Layer type tabs ───────────────────────────────────────────────
  const tabs = document.querySelectorAll('.layers__tab');
  const panels = document.querySelectorAll('.layers__panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.remove('is-active'));
      panels.forEach((p) => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.getElementById('tab-' + target)?.classList.add('is-active');
    });
  });

  // ── Stat counter animation ────────────────────────────────────────
  const statsSection = document.querySelector('.stats__grid');

  if (statsSection) {
    let counted = false;

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    statsObserver.observe(statsSection);
  }

  function animateCounters() {
    const counters = document.querySelectorAll('.stats__number[data-target]');
    const duration = 1500;

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target, 10);
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }
})();
