'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const heroIntro = document.querySelector('.intro');
if (heroIntro) heroIntro.textContent = 'Óculos que unem conforto, estilo e personalidade, com atendimento próximo em Santo André.';
const socialTitle = document.querySelector('.testimonials h2');
if (socialTitle) socialTitle.innerHTML = '5,0 ★ no Google.<br><em>59 avaliações de clientes.</em>';
const visitHeading = document.querySelector('.visit h2');
if (visitHeading) visitHeading.innerHTML = 'Encontre seu próximo<br>óculos na <em>Gaffa.</em>';
const visitCopy = document.querySelector('.visit p:not(.eyebrow)');
if (visitCopy) visitCopy.innerHTML = 'Fale com nossa equipe e conheça os modelos disponíveis na loja.<br><span class="visit-address">Rua Oratório, 684 — Bangu, Santo André · Seg. a sex. 9h–18h · Sáb. 9h–14h</span>';
const visitWhatsapp = document.querySelector('.visit-actions .light');
if (visitWhatsapp) visitWhatsapp.innerHTML = '<svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.1-3.5-8.3Zm-8.4 18.1h-.1c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.9 1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.2 4.7Z"/></svg> Falar com a Óticas Gaffa no WhatsApp <span aria-hidden="true">↗</span>';
document.querySelectorAll('.face-photo img, .essence-art img, .tortoise-gallery img').forEach(image => { image.loading = 'lazy'; });
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => { const selected = filter === button; filter.classList.toggle('active', selected); filter.setAttribute('aria-pressed', String(selected)); });
  let count = 0;
  document.querySelectorAll('.product').forEach(product => { product.hidden = button.dataset.filter !== 'todos' && product.dataset.category !== button.dataset.filter; if (!product.hidden) count++; });
  const resultCount = document.querySelector('#result-count');
  if (resultCount) resultCount.textContent = `${count} ${count === 1 ? 'modelo' : 'modelos'}`;
}));
const dialog = document.querySelector('#model-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogOptions = document.querySelector('#dialog-options-list');
const modelDetails = {
  Aura: { title: 'Óculos de grau', category: 'Óculos de grau', image: 'https://raw.githubusercontent.com/pxmaneiro/portfolio-daniel-vercel-final/master/projects/otica-lume/assets/gaffa-tartaruga-1.png', description: 'Acetato tartaruga · Óculos de grau', label: 'Escolha uma versão:', options: [['Tartaruga clássica','https://raw.githubusercontent.com/pxmaneiro/portfolio-daniel-vercel-final/master/projects/otica-lume/assets/gaffa-tartaruga-1.png'],['Preto','https://raw.githubusercontent.com/pxmaneiro/portfolio-daniel-vercel-final/master/projects/otica-lume/assets/gaffa-tartaruga-2.png'],['Tartaruga com detalhe','https://raw.githubusercontent.com/pxmaneiro/portfolio-daniel-vercel-final/master/projects/otica-lume/assets/gaffa-tartaruga-3.png'],['Preto avermelhado','https://raw.githubusercontent.com/pxmaneiro/portfolio-daniel-vercel-final/master/projects/otica-lume/assets/gaffa-tartaruga-4.png']] },
  Horizonte: { title: 'Óculos de Sol', category: 'Óculos de sol', image: 'assets/horizonte-frente.jpg', description: 'Óculos de sol tartaruga · Lentes escuras', label: 'Visualizações:', options: [['Frontal','assets/horizonte-frente.jpg'],['Outro ângulo','assets/horizonte-capa.jpg'],['Detalhe lateral','assets/horizonte-lateral.jpg']] }
};
function openModel(model) {
  const detail = modelDetails[model];
  document.querySelector('#dialog-title').textContent = detail.title;
  document.querySelector('#dialog-description').textContent = detail.description;
  dialogImage.src = detail.image;
  dialogImage.alt = `${model} — ${detail.category}`;
  document.querySelector('#dialog-options-label').textContent = detail.label;
  dialogOptions.innerHTML = '';
  detail.options.forEach(([label, src], index) => { const option = document.createElement('button'); option.type = 'button'; option.className = `dialog-option${index === 0 ? ' active' : ''}`; option.textContent = label; option.addEventListener('click', () => { dialogImage.src = src; dialogOptions.querySelectorAll('.dialog-option').forEach(item => item.classList.toggle('active', item === option)); }); dialogOptions.appendChild(option); });
  dialog.showModal();
}
document.querySelectorAll('.product-open,.product-detail-link').forEach(button => button.addEventListener('click', () => {
  openModel(button.dataset.model);
}));
document.querySelector('#dialog-whatsapp').addEventListener('click', () => {
  document.querySelector('#dialog-whatsapp').href = `https://wa.me/551123795276?text=${encodeURIComponent(`Olá, Óticas Gaffa! Quero conhecer o modelo ${document.querySelector('#dialog-title').textContent}.`)}`;
});
const visitButton = document.querySelector('#visit-button');
if (visitButton) visitButton.addEventListener('click', () => {
  document.querySelector('#dialog-title').textContent = 'Vamos encontrar seu estilo.';
  document.querySelector('#dialog-description').textContent = 'Escolha entre óculos de grau e óculos de sol para encontrar o modelo ideal para você.';
  dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); });
