/* ═══════════════════════════════════════════════════════════════
   reveal.js — mesmo scroll reveal do portfolio/index.html
   ═══════════════════════════════════════════════════════════════ */

// Scroll reveal — direction-aware: hides again when scrolling up, reappears scrolling down
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        e.target.classList.toggle('visible', e.isIntersecting);
    });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

function observeReveal() {
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
