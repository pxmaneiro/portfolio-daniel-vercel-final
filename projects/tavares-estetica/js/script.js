(() => {
  const cfg = window.tavaresConfig;
  const wa = message => cfg.whatsapp ? `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(message || cfg.whatsappMessage)}` : '#';
  document.querySelectorAll('.wa').forEach(link => { link.href = wa(); });
  const services = document.querySelector('#services-grid');
  cfg.services.forEach(service => {
    const card = document.createElement('article'); card.className = 'card reveal';
    card.innerHTML = `<img src="${service.image}" alt="${service.name} na Tavares Estética Automotiva" loading="lazy"><div class="card-body"><h3>${service.name}</h3><p>${service.description}</p><a class="btn btn-outline" href="${wa(`Olá! Vim pelo site da Tavares Estética Automotiva e gostaria de solicitar um orçamento para ${service.name}.`)}">Solicitar orçamento ↗</a></div>`;
    services.appendChild(card);
  });
  const gallery = document.querySelector('#gallery');
  cfg.gallery.forEach(source => {
    const image = document.createElement('img'); image.src = source; image.alt = 'Resultado de serviço automotivo Tavares'; image.loading = 'lazy';
    image.addEventListener('click', () => { const win = window.open('', '_blank'); win.document.write(`<img src="${source}" style="max-width:95vw;max-height:95vh;display:block;margin:2vh auto;background:#000">`); }); gallery.appendChild(image);
  });
  document.querySelectorAll('[data-field]').forEach(element => { const value = cfg[element.dataset.field]; if (value) element.textContent = value; });
  const nav = document.querySelector('#nav'); const menu = document.querySelector('.menu');
  menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('#nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); }), {threshold: .12});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
})();
