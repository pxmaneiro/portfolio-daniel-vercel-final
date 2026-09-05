'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => { const selected = filter === button; filter.classList.toggle('active', selected); filter.setAttribute('aria-pressed', String(selected)); });
  let count = 0;
  document.querySelectorAll('.product').forEach(product => { product.hidden = button.dataset.filter !== 'todos' && product.dataset.category !== button.dataset.filter; if (!product.hidden) count++; });
  document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'modelo' : 'modelos'}`;
}));
document.querySelectorAll('.product').forEach(product => {
  const image = product.querySelector('[data-product-image]');
  product.querySelectorAll('.product-thumb').forEach(thumb => thumb.addEventListener('click', () => {
    const thumbImage = thumb.querySelector('img');
    image.src = thumbImage.src;
    image.alt = thumbImage.alt;
    product.querySelectorAll('.product-thumb').forEach(item => item.classList.toggle('active', item === thumb));
  }));
  product.querySelectorAll('.variant').forEach((variant, index) => variant.addEventListener('click', () => {
    if (variant.dataset.image) {
      image.src = variant.dataset.image;
      image.alt = variant.dataset.alt || image.alt;
    }
    const thumb = product.querySelectorAll('.product-thumb')[index];
    if (thumb) thumb.click();
    product.querySelectorAll('.variant').forEach(item => item.classList.toggle('active', item === variant));
  }));
});
const dialog = document.querySelector('#model-dialog');
const modelDescriptions = {
  Aura: 'Linhas arredondadas e acetato caramelo. Uma proposta acolhedora para quem gosta de um clássico com personalidade.',
  Horizonte: 'Armação marcante em preto e lentes escuras. Uma proposta de óculos solares para acompanhar os dias ao ar livre.',
  Brisa: 'Metal dourado e um desenho delicado. Uma proposta leve e discreta para compor o seu dia.'
};
document.querySelectorAll('.product-open').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#dialog-title').textContent = button.dataset.model;
  document.querySelector('#dialog-description').textContent = modelDescriptions[button.dataset.model];
  dialog.showModal();
}));
const visitButton = document.querySelector('#visit-button');
if (visitButton) visitButton.addEventListener('click', () => {
  document.querySelector('#dialog-title').textContent = 'Vamos encontrar seu estilo.';
  document.querySelector('#dialog-description').textContent = 'Você prefere a presença do Horizonte, o tom acolhedor do Aura ou a delicadeza do Brisa? Conheça os três modelos da coleção.';
  dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); });
document.querySelector('#dialog-explore').addEventListener('click', () => { dialog.close(); document.querySelector('#colecao').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.querySelector('.filter.active').focus({ preventScroll: true }); });
