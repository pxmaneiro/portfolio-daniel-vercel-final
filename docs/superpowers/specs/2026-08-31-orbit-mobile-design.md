# Orbit Mobile — Design Specification

**Date:** 2026-08-31  
**Status:** Approved for implementation  
**Project location:** `projects/orbit-mobile/`

## 1. Objective

Create a highly polished fictional smartphone storefront for Daniel's portfolio. Orbit Mobile presents eight current premium devices, prioritizes modern iPhones, and converts interest into WhatsApp conversations rather than processing checkout on the site.

The finished project may become the primary featured project in the portfolio only after implementation, responsive testing, animation review, and explicit final approval. The portfolio homepage must not be changed earlier.

## 2. Brand and Visual Direction

The brand name is **Orbit Mobile**. The approved direction combines a minimal premium storefront with a dark, cinematic product showcase inspired by the supplied reference without reproducing it.

The visual system uses:

- A near-black foundation with warm metallic rose accents.
- Large, realistic smartphone imagery treated as designed objects.
- Spacious layouts, concise typography, subtle reflections, and deep shadows.
- Strong hierarchy and one dominant action per viewport.
- Restrained supporting colors; no playful or rainbow palette.
- SVG icons rather than emoji or inconsistent icon styles.

The UI UX Pro Max recommendation is adapted rather than copied literally: its 3D and hyperrealist product-showcase pattern, spacious density, and balanced visual variance are retained; the approved black-and-rose art direction overrides its default light background and gold accent.

## 3. Audience and Conversion

The primary audience is a customer comparing premium smartphones on desktop or mobile and wanting quick human assistance before buying.

The primary conversion is a WhatsApp consultation. Product buttons create prefilled messages that identify the selected device, for example: “Olá, quero consultar o iPhone 17 Pro Max.” The site does not include cart, login, payment processing, inventory management, or a backend.

Prices and commercial terms are fictional portfolio content. The interface must make the demonstration context clear and avoid implying live inventory.

## 4. Information Architecture

The single-page experience contains:

1. **Header:** Orbit Mobile identity, anchor navigation, and compact WhatsApp action.
2. **Immersive hero:** premium headline, primary CTA, and an interactive iPhone sequence.
3. **Featured catalog:** eight filterable product cards with model, category, storage, color, price, and WhatsApp action.
4. **Quick comparison:** concise camera, display, battery, and storage comparison for selected models.
5. **Trust benefits:** provenance, warranty, support, and delivery messaging.
6. **Featured offer:** a high-impact conversion block for the principal model.
7. **Testimonials:** fictional but clearly presented social proof suited to a portfolio demonstration.
8. **FAQ:** payment, delivery, warranty, device condition, and support.
9. **Final contact/footer:** repeated WhatsApp action and essential navigation.
10. **Floating WhatsApp control:** visible but non-obstructive across breakpoints.

## 5. Product Catalog

The initial catalog contains six Apple devices and two Samsung devices:

1. iPhone 17 Pro Max
2. iPhone 17 Pro
3. iPhone Air
4. iPhone 17
5. iPhone 17e
6. iPhone 16
7. Galaxy S26 Ultra
8. Galaxy Z Fold8

The product list is based on the current Brazilian Apple and Samsung lineups as checked on 2026-08-31. Product details live in one JavaScript data module so names, prices, storage, colors, specifications, imagery, badges, and WhatsApp messages can be changed without editing markup.

## 6. Motion and 3D Experience

The approved approach is a hybrid 3D sequence with the visual quality of a product video but better interactivity and responsiveness.

The hero sequence includes:

- An iPhone entering with controlled rotation, lighting, and reflection.
- Scroll-linked camera movement that moves closer to the product.
- Layer separation that calls out display, camera, and finish.
- A visual handoff from the hero into the product catalog.
- Subtle rose particles or light accents responding to pointer movement on capable devices.
- Product-card depth and restrained tilt on fine-pointer devices.

GSAP coordinates the scroll sequence and interface transitions. Product visuals use optimized layered WebP/AVIF renders and CSS 3D transforms instead of a large runtime 3D model. The site must not depend on animation for content access or navigation.

For `prefers-reduced-motion`, low-power devices, or failed animation initialization, the final composed hero state displays immediately. Touch devices do not require hover or pointer tracking.

## 7. Technical Architecture

The project follows the repository's static-project pattern:

```text
projects/orbit-mobile/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── products.js
│   └── script.js
└── assets/
    ├── hero/
    └── products/
```

- Semantic HTML provides the complete content and functional links.
- CSS custom properties define color, type, spacing, elevation, and motion tokens.
- JavaScript progressively enhances navigation, filters, comparison, WhatsApp URLs, and animation.
- GSAP may be loaded from a pinned trusted CDN; failure leaves a usable static experience.
- There is no package manager, build step, API, database, or server requirement.
- The page remains directly deployable under the existing static Vercel configuration.

## 8. Interaction and Data Flow

On load, the page renders all essential content from HTML. JavaScript hydrates the catalog from the product data module, attaches filtering and comparison controls, and builds encoded WhatsApp URLs from the selected product.

Catalog filters update visible cards without changing the underlying product order. Comparison supports a small, readable selection rather than a complex spreadsheet. Visible status text announces filter and comparison changes to assistive technology.

Every interactive control uses native buttons or links, has a visible label or accessible name, shows keyboard focus, and provides an effective touch target of at least 44 by 44 pixels.

## 9. Resilience and Error Handling

- Missing product images fall back to a branded product surface with the model name.
- Failed or blocked animation libraries leave the content in its final readable state.
- With JavaScript disabled, navigation, catalog content, and essential WhatsApp links remain usable.
- Invalid or incomplete product data is ignored without breaking the remaining catalog.
- External links use safe target and relationship attributes when opened in a new tab.
- The experience never traps focus or hides essential actions behind hover.

## 10. Accessibility and Performance

- Text contrast targets WCAG AA, including at least 4.5:1 for normal text.
- Page landmarks, headings, labels, image alternatives, and status announcements are semantic.
- Focus rings remain visible against dark and rose surfaces.
- Body text starts at a readable 16-pixel equivalent with comfortable line height.
- Responsive behavior is validated at 375, 768, 1024, and 1440 pixels without horizontal scrolling.
- Hero media reserves dimensions to avoid layout shift.
- Below-the-fold media uses lazy loading and responsive sources.
- Expensive pointer and scroll effects are throttled and limited to transform and opacity where practical.
- Reduced-motion users receive immediate states without parallax, tilt, or long transitions.

## 11. Verification

Automated validation checks:

- Required files and semantic sections exist.
- Exactly eight initial products are represented in the data source.
- All product actions generate valid WhatsApp URLs.
- Header anchors reference real section IDs.
- Images include dimensions and meaningful alternatives where appropriate.
- Reduced-motion styling exists.
- No accidental placeholder markers or broken local asset references remain.

Browser verification checks:

- Layout at 375, 768, 1024, and 1440 pixels.
- Mobile menu, catalog filters, comparison, FAQ, and WhatsApp actions.
- Hero sequence, scroll handoff, tilt, and reduced-motion fallback.
- Keyboard navigation, focus visibility, text contrast, and absence of horizontal overflow.
- Graceful behavior with animation initialization disabled.

## 12. Portfolio Integration Gate

Orbit Mobile remains isolated under `projects/orbit-mobile/` during implementation. Only after all automated and browser checks pass and the user approves the finished experience may the portfolio homepage be updated to feature Orbit Mobile as its principal project. That final integration includes a representative preview image, project copy, link, and any project-order adjustment required by the existing portfolio structure.
