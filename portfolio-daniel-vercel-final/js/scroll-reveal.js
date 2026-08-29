// ==========================================================================
// SCROLL-REVEAL.JS
// Revela progressivamente elementos marcados com [data-reveal] conforme
// entram na viewport. Um único IntersectionObserver, reutilizado por toda
// a página. Respeita prefers-reduced-motion por herança do CSS (base.css
// já zera durações globalmente)  nenhuma lógica condicional necessária
// aqui além de checar a preferência para decidir se observamos ou apenas
// revelamos tudo de imediato.
// ==========================================================================

export function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');

  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Com movimento reduzido, revela tudo de imediato sem observar scroll 
  // evita qualquer dependência de transição para o conteúdo aparecer.
  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // revela uma vez, não re-observa
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
}
