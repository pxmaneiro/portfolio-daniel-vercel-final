// =============================================================
// Seven Natural Life  script principal
//
// ⚠️ IMPORTANTE: número de WhatsApp NÃO confirmado em fonte oficial.
// Substitua a linha abaixo pelo número real assim que confirmado,
// no formato: DDI + DDD + número, apenas dígitos. Exemplo:
// const WHATSAPP_NUMBER = "5511999999999";
// =============================================================
const WHATSAPP_NUMBER = "INSERIR_NUMERO_OFICIAL";

const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Seven Natural Life e gostaria de saber mais sobre os produtos.";

function buildWhatsAppLink() {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Preenche todos os links/botões de WhatsApp com o link montado
  const waLink = buildWhatsAppLink();
  document.querySelectorAll(".wa-cta").forEach((el) => {
    el.setAttribute("href", waLink);
  });

  const headerWa = document.getElementById("wa-btn-header");
  if (headerWa) headerWa.setAttribute("href", waLink);

  // Aviso no console enquanto o número não for confirmado
  if (WHATSAPP_NUMBER === "INSERIR_NUMERO_OFICIAL") {
    console.warn(
      "[Seven Natural Life] Número de WhatsApp ainda não configurado. " +
      "Edite a constante WHATSAPP_NUMBER em script.js."
    );
  }

  // Ano dinâmico no rodapé
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header com sombra ao rolar
  const header = document.getElementById("site-header");
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menu mobile
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu mobile ao clicar em um link
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
});
