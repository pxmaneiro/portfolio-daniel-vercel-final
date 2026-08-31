(() => {
  const cfg = window.clinicConfig;
  const encode = value => encodeURIComponent(value);
  const waUrl = message => `https://wa.me/${cfg.whatsapp}?text=${encode(message)}`;
  document.querySelectorAll('.wa-link').forEach(link => { link.href = waUrl(link.dataset.message || cfg.whatsappMessage); });
  const serviceGrid = document.querySelector('#service-grid');
  if (serviceGrid) cfg.services.forEach(service => { const card = document.createElement('article'); card.className = 'service-card reveal'; card.innerHTML = `<img src="${service.image}" alt="${service.name} na Clínica Restore" loading="lazy"><div class="service-body"><h3>${service.name}</h3><p>${service.description}</p><a href="${waUrl(`Olá! Vi o site da Clínica Restore e gostaria de saber mais sobre ${service.name}.`)}" target="_blank" rel="noopener">Quero saber mais →</a></div>`; serviceGrid.appendChild(card); });
  const gallery = document.querySelector('#gallery-grid');
  if (gallery) cfg.gallery.forEach((src, index) => { const img = document.createElement('img'); img.src = src; img.alt = `Imagem ${index + 1} da Clínica Restore`; img.loading = 'lazy'; gallery.appendChild(img); });
  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', event => { event.preventDefault(); const data = new FormData(form); const message = `Olá! Meu nome é ${data.get('name')}.\n\nTenho interesse em: ${data.get('service')}\n\nWhatsApp: ${data.get('phone')}\n\nMensagem:\n${data.get('message')}`; window.open(waUrl(message), '_blank', 'noopener'); });
  const button = document.querySelector('.menu-toggle'); const menu = document.querySelector('#menu');
  if (button && menu) { const close = () => { menu.classList.remove('is-open'); button.setAttribute('aria-expanded', 'false'); }; button.addEventListener('click', () => { const open = menu.classList.toggle('is-open'); button.setAttribute('aria-expanded', String(open)); }); menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close)); document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }); }
  const items = document.querySelectorAll('.reveal'); if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) { const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }), { threshold: .1 }); items.forEach(item => io.observe(item)); } else items.forEach(item => item.classList.add('is-visible'));
  serviceGrid?.querySelectorAll('.service-card').forEach(card => card.classList.add('is-visible'));
})();
