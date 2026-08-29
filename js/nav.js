// ==========================================================================
// NAV.JS
// Menu mobile/tablet acessível: estado ARIA, foco, Escape e bloqueio de
// scroll do documento enquanto o overlay está aberto.
// ==========================================================================

export function initNav() {
  const toggle = document.querySelector('.header__menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (!toggle || !nav) return;

  const links = [...nav.querySelectorAll('a')];
  let triggerElement = null;

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const closeMenu = ({ restoreFocus = false } = {}) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    toggle.textContent = 'Menu';
    nav.dataset.state = 'closed';
    document.body.classList.remove('nav-open');

    if (restoreFocus) {
      (triggerElement ?? toggle).focus();
    }
  };

  const openMenu = () => {
    triggerElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : toggle;

    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu de navegação');
    toggle.textContent = 'Fechar';
    nav.dataset.state = 'open';
    document.body.classList.add('nav-open');

    links[0]?.focus();
  };

  toggle.addEventListener('click', () => {
    if (isOpen()) {
      closeMenu({ restoreFocus: true });
    } else {
      openMenu();
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isOpen()) {
      closeMenu();
    }
  });

  // Estado inicial explícito para reduzir variação caso o script execute antes
  // de uma interação com o menu.
  closeMenu();
}
