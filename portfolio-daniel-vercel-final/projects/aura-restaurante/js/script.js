/**
 * Lógica do Restaurante AURA
 * Funcionalidades interativas, filtro de cardápio, modal de reservas e animações
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.RESTAURANT_CONFIG || {};

  // --------------------------------------------------------------------------
  // 1. HEADER SCROLL & MOBILE MENU
  // --------------------------------------------------------------------------
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link?.classList.add("active");
      } else {
        link?.classList.remove("active");
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. RENDER MENU ITEMS & FILTER TABS
  // --------------------------------------------------------------------------
  const menuGrid = document.getElementById("menu-grid");
  const filterContainer = document.getElementById("menu-filter-container");

  if (menuGrid && config.menu) {
    const categories = [
      { id: "todos", label: "Cardápio Completo" },
      { id: "entradas", label: "Entradas" },
      { id: "principais", label: "Pratos Principais" },
      { id: "sobremesas", label: "Sobremesas" },
      { id: "mixologia", label: "Mixologia Autoral" }
    ];

    // Render Filter Buttons
    if (filterContainer) {
      filterContainer.innerHTML = categories
        .map(
          (cat, idx) => `
        <button class="menu-filter-btn ${idx === 0 ? "active" : ""}" data-category="${cat.id}">
          ${cat.label}
        </button>
      `
        )
        .join("");
    }

    // Function to Render Cards
    const renderCards = (categoryFilter = "todos") => {
      const filtered = categoryFilter === "todos"
        ? config.menu
        : config.menu.filter((item) => item.category === categoryFilter);

      menuGrid.innerHTML = filtered
        .map(
          (item) => `
        <article class="menu-card fade-up visible">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.name}</h3>
            <span class="menu-card-price">${item.price}</span>
          </div>
          <p class="menu-card-desc">${item.description}</p>
          <div class="menu-card-footer">
            <div class="menu-tags">
              ${(item.tags || []).map((t) => `<span class="menu-tag">${t}</span>`).join("")}
            </div>
            ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ""}
          </div>
        </article>
      `
        )
        .join("");
    };

    // Initial Render
    renderCards("todos");

    // Filter Click Listener
    filterContainer?.addEventListener("click", (e) => {
      const btn = e.target.closest(".menu-filter-btn");
      if (!btn) return;

      document.querySelectorAll(".menu-filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      renderCards(category);
    });
  }

  // --------------------------------------------------------------------------
  // 3. RENDER TESTIMONIALS / REVIEWS
  // --------------------------------------------------------------------------
  const reviewsGrid = document.getElementById("reviews-grid");
  if (reviewsGrid && config.testimonials) {
    reviewsGrid.innerHTML = config.testimonials
      .map(
        (t) => `
      <div class="review-card fade-up">
        <div>
          <div class="review-stars">
            ${'<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'.repeat(t.rating)}
          </div>
          <p class="review-quote">"${t.quote}"</p>
        </div>
        <div>
          <div class="review-author-name">${t.author}</div>
          <div class="review-author-role">${t.role}</div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // --------------------------------------------------------------------------
  // 4. RENDER & CONTROL FAQ ACCORDIONS
  // --------------------------------------------------------------------------
  const faqList = document.getElementById("faq-list");
  if (faqList && config.faqs) {
    faqList.innerHTML = config.faqs
      .map(
        (f, idx) => `
      <div class="faq-item fade-up">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-ans-${idx}">
          <span>${f.question}</span>
          <span class="faq-icon">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </span>
        </button>
        <div id="faq-ans-${idx}" class="faq-answer">
          <p>${f.answer}</p>
        </div>
      </div>
    `
      )
      .join("");

    faqList.addEventListener("click", (e) => {
      const qBtn = e.target.closest(".faq-question");
      if (!qBtn) return;
      const item = qBtn.closest(".faq-item");
      const isActive = item.classList.contains("active");

      // Close all
      document.querySelectorAll(".faq-item").forEach((fi) => {
        fi.classList.remove("active");
        fi.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        qBtn.setAttribute("aria-expanded", "true");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. RESERVATION MODAL DIALOG CONTROLLER
  // --------------------------------------------------------------------------
  const reservationModal = document.getElementById("reservation-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const reservationForm = document.getElementById("reservation-form");
  const reserveTriggers = document.querySelectorAll("[data-open-modal='reservation']");

  const openModal = () => {
    if (reservationModal) {
      reservationModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    if (reservationModal) {
      reservationModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  reserveTriggers.forEach((btn) => btn.addEventListener("click", openModal));
  modalCloseBtn?.addEventListener("click", closeModal);

  reservationModal?.addEventListener("click", (e) => {
    if (e.target === reservationModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && reservationModal?.classList.contains("active")) {
      closeModal();
    }
  });

  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(reservationForm);
      const name = formData.get("name");
      const date = formData.get("date");
      const time = formData.get("time");
      const guests = formData.get("guests");

      reservationForm.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(212, 175, 55, 0.15); color: var(--accent-gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="modal-title">Reserva Solicitada com Sucesso!</h3>
          <p class="modal-subtitle" style="margin-top: 1rem;">
            Obrigado, <strong>${name}</strong>! Recebemos sua solicitação para <strong>${guests} pessoa(s)</strong> no dia <strong>${date}</strong> às <strong>${time}</strong>.
          </p>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 2rem;">
            Nossa equipe de concierge enviará a confirmação via WhatsApp em instantes.
          </p>
          <button type="button" class="btn btn-primary" onclick="window.location.reload();">Voltar ao Site</button>
        </div>
      `;
    });
  }

  // --------------------------------------------------------------------------
  // 6. WHATSAPP DIRECT LINKS SETUP
  // --------------------------------------------------------------------------
  const whatsappButtons = document.querySelectorAll("[data-whatsapp-link]");
  if (config.info?.contact) {
    const waNumber = config.info.contact.whatsappNumber;
    const waMsg = encodeURIComponent(config.info.contact.whatsappMessage);
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

    whatsappButtons.forEach((btn) => {
      btn.href = waUrl;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
    });
  }

  // --------------------------------------------------------------------------
  // 7. INTERSECTION OBSERVER FOR FADE-UP ANIMATIONS
  // --------------------------------------------------------------------------
  const fadeUpElements = document.querySelectorAll(".fade-up");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeUpElements.forEach((el) => observer.observe(el));
});
