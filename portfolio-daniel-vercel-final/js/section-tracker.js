// ==========================================================================
// SECTION-TRACKER.JS
// Atualiza o indicador "§ 0X/06" do header conforme a seção ativa cruza o
// centro da viewport, e alterna o estado visual do header (transparente no
// topo → levemente escurecido com hairline ao sair do Hero).
// Um único IntersectionObserver por responsabilidade, sem scroll listener
// bruto.
// ==========================================================================

const TOTAL_SECTIONS = 6;

export function initSectionTracker() {
  const header = document.querySelector('.site-header');
  const tracker = document.querySelector('.site-header__tracker');
  const hero = document.getElementById('hero');
  const sections = document.querySelectorAll('main .section[data-index]');

  if (!header || !tracker || !sections.length) return;

  // --- Estado do header: transparente sobre o Hero, "scrolled" depois ---
  if (hero) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        header.dataset.state = entry.isIntersecting ? 'top' : 'scrolled';
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );
    heroObserver.observe(hero);
  }

  // --- Tracker de seção ativa, threshold no centro da viewport ---
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          tracker.textContent = `§ ${index}/${String(TOTAL_SECTIONS).padStart(2, '0')}`;
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '-42% 0px -42% 0px', // cria uma faixa estreita ao redor do centro
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
