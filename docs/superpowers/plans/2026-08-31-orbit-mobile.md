# Orbit Mobile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, responsive Orbit Mobile smartphone catalog with an interactive 3D-style iPhone hero, eight current products, comparison tools, and WhatsApp conversion, then feature it as the portfolio's principal project only after explicit final approval.

**Architecture:** Create an isolated static site under `projects/orbit-mobile/` using semantic HTML, one design-system stylesheet, one product-data module, and one progressive-enhancement script. Layered product renders and GSAP-powered transforms create the 3D sequence while accessible static markup and reduced-motion fallbacks preserve the full experience without animation or JavaScript.

**Tech Stack:** HTML5, CSS custom properties, vanilla JavaScript ES modules, GSAP 3 + ScrollTrigger from pinned CDN, PowerShell validation scripts, local Python HTTP server, browser verification.

**Spec:** `docs/superpowers/specs/2026-08-31-orbit-mobile-design.md`

## Global Constraints

- Keep all implementation isolated under `projects/orbit-mobile/` until the final portfolio-integration gate.
- Do not add cart, login, payment processing, backend, inventory system, or build tooling.
- Initial catalog must contain exactly six Apple devices and two Samsung devices listed in the spec.
- Prices and reviews are fictional demonstration content and must be labeled accordingly.
- The primary conversion is a product-specific prefilled WhatsApp message.
- Use near-black surfaces, warm metallic rose accents, large realistic product imagery, restrained supporting colors, and SVG icons.
- Preserve readable content and essential links when JavaScript or GSAP fails.
- Meet WCAG AA contrast for normal text, visible keyboard focus, 44×44px touch targets, and `prefers-reduced-motion` behavior.
- Validate at 375, 768, 1024, and 1440 CSS pixels without horizontal scrolling.
- Modify the portfolio homepage only after the isolated site passes verification and the user explicitly approves the finished experience.

---

## File Map

- `projects/orbit-mobile/index.html` — semantic page content, eight fallback product cards, navigation, comparison, benefits, testimonials, FAQ, footer, and external library includes.
- `projects/orbit-mobile/css/style.css` — tokens, responsive layout, product surfaces, 3D composition, interaction states, and reduced-motion fallback.
- `projects/orbit-mobile/js/products.js` — immutable product records and pure WhatsApp/filter/comparison helpers.
- `projects/orbit-mobile/js/script.js` — DOM enhancement, navigation, filters, comparison state, FAQ, image fallback, and GSAP orchestration.
- `projects/orbit-mobile/assets/hero/` — optimized layered hero renders.
- `projects/orbit-mobile/assets/products/` — optimized product-card renders.
- `projects/orbit-mobile/assets/favicon.svg` — Orbit Mobile mark.
- `projects/orbit-mobile/README.md` — local preview, editable data, fictional-content notice, and asset guidance.
- `tests/validate-orbit-mobile.ps1` — isolated structural and behavioral validation.
- `tests/validate-portfolio.ps1` — portfolio integration assertions, changed only at the final gate.
- `assets/project-previews/orbit-mobile.webp` — final verified preview for the portfolio card, created only at the final gate.
- `index.html` — principal portfolio card, changed only at the final gate.

---

### Task 1: Accessible Static Page Foundation

**Files:**
- Create: `projects/orbit-mobile/index.html`
- Create: `projects/orbit-mobile/css/style.css`
- Create: `projects/orbit-mobile/assets/favicon.svg`
- Create: `projects/orbit-mobile/README.md`
- Create: `tests/validate-orbit-mobile.ps1`

**Interfaces:**
- Consumes: none.
- Produces: stable section IDs `inicio`, `aparelhos`, `comparar`, `beneficios`, `oferta`, `depoimentos`, `faq`, and `contato`; product elements with `data-product-id`; `.hero-device`; `.product-grid`; `.comparison-panel`; `.faq-list`.

- [ ] **Step 1: Write the failing structural test**

Create `tests/validate-orbit-mobile.ps1` with the shared assertion helper and initial checks:

```powershell
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$project = Join-Path $root 'projects/orbit-mobile'
$htmlPath = Join-Path $project 'index.html'
$cssPath = Join-Path $project 'css/style.css'
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-OrbitCondition {
    param([bool]$Condition, [string]$Message)
    if (-not $Condition) { $script:failures.Add($Message) }
}

Assert-OrbitCondition (Test-Path $htmlPath) 'O index da Orbit Mobile deve existir.'
Assert-OrbitCondition (Test-Path $cssPath) 'O CSS da Orbit Mobile deve existir.'

if (Test-Path $htmlPath) {
    $html = Get-Content -Raw $htmlPath
    @('inicio','aparelhos','comparar','beneficios','oferta','depoimentos','faq','contato') | ForEach-Object {
        Assert-OrbitCondition ($html.Contains("id=`"$_`"")) "A secao $_ deve existir."
    }
    Assert-OrbitCondition ($html.Contains('Pular para o conteúdo')) 'Deve existir um skip link.'
    Assert-OrbitCondition ($html.Contains('Demonstração de portfólio')) 'O conteúdo comercial fictício deve ser identificado.'
    Assert-OrbitCondition (-not ($html -match '<[a-z][^>]*\sclass="[^"]+"[^>]*\sclass=')) 'Não deve haver atributos class duplicados.'
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}
Write-Host 'Orbit Mobile validada com sucesso.'
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-orbit-mobile.ps1
```

Expected: FAIL with `O index da Orbit Mobile deve existir.` and `O CSS da Orbit Mobile deve existir.`

- [ ] **Step 3: Create the semantic HTML skeleton**

Create `projects/orbit-mobile/index.html` with:

```html
<!doctype html>
<html lang="pt-BR" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Orbit Mobile: catálogo demonstrativo de smartphones premium com atendimento pelo WhatsApp.">
  <meta name="theme-color" content="#070707">
  <title>Orbit Mobile | Smartphones premium</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header"><a class="brand" href="#inicio">Orbit Mobile</a><nav id="site-nav" aria-label="Navegação principal"><a href="#aparelhos">Aparelhos</a><a href="#comparar">Comparar</a><a href="#beneficios">Benefícios</a><a href="#faq">Dúvidas</a><a href="#contato">Contato</a></nav></header>
  <main id="conteudo">
    <section id="inicio" class="hero"><p>Smartphones premium, atendimento humano.</p><h1>Seu próximo iPhone começa aqui.</h1><a href="#aparelhos">Explorar aparelhos</a><div class="hero-device" aria-hidden="true"></div></section>
    <section id="aparelhos" class="catalog"><h2>Escolha o seu próximo aparelho</h2><div class="product-grid"><article data-product-id="iphone-17-pro-max"></article></div></section>
    <section id="comparar" class="comparison"><h2>Compare os destaques</h2><div class="comparison-panel"></div></section>
    <section id="beneficios" class="benefits"><h2>Comprar bem também é comprar com confiança.</h2></section>
    <section id="oferta" class="featured-offer"><h2>Potência Pro em cada detalhe.</h2></section>
    <section id="depoimentos" class="testimonials"><h2>Uma experiência que conquista.</h2></section>
    <section id="faq" class="faq"><h2>Dúvidas frequentes</h2><div class="faq-list"></div></section>
    <section id="contato" class="contact"><h2>Vamos encontrar o smartphone ideal?</h2><a href="https://wa.me/5511999999999">Conversar pelo WhatsApp</a></section>
  </main>
  <footer>Orbit Mobile · Demonstração de portfólio — produtos, preços e avaliações fictícios.</footer>
  <script>document.documentElement.classList.replace('no-js', 'js');</script>
  <script type="module" src="js/script.js"></script>
</body>
</html>
```

Expand the catalog to all eight approved static cards and supply complete approved Portuguese copy in every section. Include a visible static WhatsApp URL on every product card so the catalog still converts without JavaScript.

- [ ] **Step 4: Create the foundational design system**

Create `projects/orbit-mobile/css/style.css` beginning with these exact tokens and base safeguards:

```css
:root {
  --ink: #070707;
  --ink-soft: #11100f;
  --surface: #181614;
  --surface-raised: #211e1c;
  --paper: #f6f2ef;
  --muted: #b8b0aa;
  --rose: #b77a74;
  --rose-bright: #d69a93;
  --line: rgb(246 242 239 / 14%);
  --success: #25d366;
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Manrope", sans-serif;
  --container: 76rem;
  --radius-sm: .75rem;
  --radius-md: 1.25rem;
  --radius-lg: 2rem;
  --shadow-product: 0 2rem 6rem rgb(0 0 0 / 45%);
  --ease-out: cubic-bezier(.22, 1, .36, 1);
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; overflow-x: clip; background: var(--ink); color: var(--paper); font: 400 1rem/1.6 var(--font-body); }
img { display: block; max-width: 100%; height: auto; }
a, button { min-height: 44px; }
:focus-visible { outline: 3px solid var(--rose-bright); outline-offset: 4px; }
```

Complete mobile-first layout styles for all sections, then add breakpoints at 48rem and 64rem. Keep all essential content readable at 320px and avoid fixed content widths.

- [ ] **Step 5: Add the brand asset and usage documentation**

Create a simple geometric `assets/favicon.svg` using two orbit arcs and a rose center circle. In `README.md`, document the local Python server command, the fictional-content notice, the product data file, the temporary demonstration WhatsApp number, and the rule that the portfolio card is added only after final approval.

- [ ] **Step 6: Run validation and commit**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-orbit-mobile.ps1
```

Expected: `Orbit Mobile validada com sucesso.`

Commit only Task 1 files:

```powershell
git add projects/orbit-mobile/index.html projects/orbit-mobile/css/style.css projects/orbit-mobile/assets/favicon.svg projects/orbit-mobile/README.md tests/validate-orbit-mobile.ps1
git commit -m "feat: scaffold Orbit Mobile storefront"
```

---

### Task 2: Product Data, Catalog, and WhatsApp Conversion

**Files:**
- Create: `projects/orbit-mobile/js/products.js`
- Create: `projects/orbit-mobile/js/script.js`
- Modify: `projects/orbit-mobile/index.html`
- Modify: `projects/orbit-mobile/css/style.css`
- Modify: `tests/validate-orbit-mobile.ps1`

**Interfaces:**
- Consumes: HTML elements with `[data-product-id]`, `[data-filter]`, `[data-compare-toggle]`, and `[data-whatsapp-product]`.
- Produces: `PRODUCTS: readonly Product[]`, `filterProducts(brand: string): Product[]`, `getProduct(id: string): Product | undefined`, `buildWhatsAppUrl(product: Product, phone?: string): string`, and `formatPrice(value: number): string`.

- [ ] **Step 1: Extend the failing validation**

Append checks that require the JS files, eight unique IDs, six Apple records, two Samsung records, and encoded WhatsApp behavior:

```powershell
$productsPath = Join-Path $project 'js/products.js'
$scriptPath = Join-Path $project 'js/script.js'
Assert-OrbitCondition (Test-Path $productsPath) 'O módulo de produtos deve existir.'
Assert-OrbitCondition (Test-Path $scriptPath) 'O script principal deve existir.'
if (Test-Path $productsPath) {
    $productsSource = Get-Content -Raw $productsPath
    Assert-OrbitCondition (($productsSource | Select-String -Pattern "brand: 'Apple'" -AllMatches).Matches.Count -eq 6) 'Devem existir seis aparelhos Apple.'
    Assert-OrbitCondition (($productsSource | Select-String -Pattern "brand: 'Samsung'" -AllMatches).Matches.Count -eq 2) 'Devem existir dois aparelhos Samsung.'
    Assert-OrbitCondition ($productsSource.Contains('encodeURIComponent(message)')) 'A mensagem do WhatsApp deve ser codificada.'
}
```

Also assert that `index.html` contains exactly eight `data-product-id` attributes and eight visible `data-whatsapp-product` links.

- [ ] **Step 2: Run the test and confirm failure**

Run the validator. Expected: FAIL for the missing JS modules and product counts.

- [ ] **Step 3: Implement the product module**

Create `products.js` with the exact record shape:

```js
export const PRODUCTS = Object.freeze([
  {
    id: 'iphone-17-pro-max',
    brand: 'Apple',
    name: 'iPhone 17 Pro Max',
    category: 'Pro',
    storage: ['256 GB', '512 GB', '1 TB'],
    colors: ['Rosé cósmico', 'Grafite'],
    price: 11499,
    display: '6,9 pol. Super Retina XDR',
    camera: 'Sistema Fusion Pro de 48 MP',
    battery: 'Até 37 h de vídeo',
    image: 'assets/products/iphone-17-pro-max.webp',
    featured: true
  },
  { id: 'iphone-17-pro', brand: 'Apple', name: 'iPhone 17 Pro', category: 'Pro', storage: ['256 GB', '512 GB', '1 TB'], colors: ['Rosé cósmico', 'Grafite'], price: 9999, display: '6,3 pol. Super Retina XDR', camera: 'Sistema Fusion Pro de 48 MP', battery: 'Até 31 h de vídeo', image: 'assets/products/iphone-17-pro.webp', featured: false },
  { id: 'iphone-air', brand: 'Apple', name: 'iPhone Air', category: 'Air', storage: ['256 GB', '512 GB'], colors: ['Titânio claro', 'Grafite'], price: 10499, display: '6,5 pol. Super Retina XDR', camera: 'Câmera Fusion de 48 MP', battery: 'Até 27 h de vídeo', image: 'assets/products/iphone-air.webp', featured: false },
  { id: 'iphone-17', brand: 'Apple', name: 'iPhone 17', category: 'Essencial', storage: ['128 GB', '256 GB', '512 GB'], colors: ['Rosé', 'Preto'], price: 7999, display: '6,3 pol. Super Retina XDR', camera: 'Sistema duplo Fusion de 48 MP', battery: 'Até 30 h de vídeo', image: 'assets/products/iphone-17.webp', featured: false },
  { id: 'iphone-17e', brand: 'Apple', name: 'iPhone 17e', category: 'Essencial', storage: ['128 GB', '256 GB'], colors: ['Branco', 'Preto'], price: 5799, display: '6,1 pol. Super Retina XDR', camera: 'Câmera Fusion de 48 MP', battery: 'Até 26 h de vídeo', image: 'assets/products/iphone-17e.webp', featured: false },
  { id: 'iphone-16', brand: 'Apple', name: 'iPhone 16', category: 'Clássico', storage: ['128 GB', '256 GB'], colors: ['Ultramarino', 'Preto'], price: 6799, display: '6,1 pol. Super Retina XDR', camera: 'Sistema duplo de 48 MP', battery: 'Até 22 h de vídeo', image: 'assets/products/iphone-16.webp', featured: false },
  { id: 'galaxy-s26-ultra', brand: 'Samsung', name: 'Galaxy S26 Ultra', category: 'Ultra', storage: ['256 GB', '512 GB', '1 TB'], colors: ['Titânio grafite', 'Prata'], price: 8999, display: '6,9 pol. Dynamic AMOLED 2X', camera: 'Sistema Galaxy AI multicâmera', battery: '5.000 mAh', image: 'assets/products/galaxy-s26-ultra.webp', featured: false },
  { id: 'galaxy-z-fold8', brand: 'Samsung', name: 'Galaxy Z Fold8', category: 'Dobrável', storage: ['256 GB', '512 GB'], colors: ['Grafite', 'Prata'], price: 11999, display: 'Tela dobrável Dynamic AMOLED 2X', camera: 'Sistema Galaxy AI multicâmera', battery: 'Bateria para o dia todo', image: 'assets/products/galaxy-z-fold8.webp', featured: false }
]);

export const getProduct = id => PRODUCTS.find(product => product.id === id);
export const filterProducts = brand => brand === 'Todos' ? [...PRODUCTS] : PRODUCTS.filter(product => product.brand === brand);
export const formatPrice = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
export function buildWhatsAppUrl(product, phone = '5511999999999') {
  const message = `Olá, quero consultar o ${product.name} na Orbit Mobile.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

Use current model facts already approved in the spec. Treat prices as fictional and keep the demonstration label visible.

- [ ] **Step 4: Implement progressive catalog enhancement**

In `script.js`, import the pure helpers, update each existing static card from its matching record, and never delete a card when a record is missing:

```js
import { PRODUCTS, getProduct, buildWhatsAppUrl, formatPrice } from './products.js';

document.querySelectorAll('[data-product-id]').forEach(card => {
  const product = getProduct(card.dataset.productId);
  if (!product) return;
  card.querySelector('[data-product-price]').textContent = `A partir de ${formatPrice(product.price)}`;
  const action = card.querySelector('[data-whatsapp-product]');
  action.href = buildWhatsAppUrl(product);
  action.setAttribute('aria-label', `Consultar ${product.name} pelo WhatsApp`);
});
```

Add brand filters that use `hidden`, update `aria-pressed`, and write “8 aparelhos exibidos”, “6 aparelhos exibidos”, or “2 aparelhos exibidos” into an `aria-live="polite"` result element.

- [ ] **Step 5: Finish card and filter styling**

Create a responsive two-column mobile/desktop catalog progression, visible stock-demo labels, equal action alignment, clear filter pressed states, and a non-obstructive floating WhatsApp button. Disable pointer tilt styling on coarse pointers.

- [ ] **Step 6: Run validation and commit**

Run the Orbit validator and the existing portfolio validator. Expected: both pass.

```powershell
git add projects/orbit-mobile/index.html projects/orbit-mobile/css/style.css projects/orbit-mobile/js/products.js projects/orbit-mobile/js/script.js tests/validate-orbit-mobile.ps1
git commit -m "feat: add Orbit Mobile product catalog"
```

---

### Task 3: Product Art Direction and Optimized Assets

**Files:**
- Create: `projects/orbit-mobile/assets/hero/iphone-hero-front.webp`
- Create: `projects/orbit-mobile/assets/hero/iphone-hero-back.webp`
- Create: `projects/orbit-mobile/assets/hero/iphone-hero-glow.webp`
- Create: eight files under `projects/orbit-mobile/assets/products/*.webp`
- Modify: `projects/orbit-mobile/index.html`
- Modify: `projects/orbit-mobile/js/products.js`
- Modify: `tests/validate-orbit-mobile.ps1`

**Interfaces:**
- Consumes: approved black/rose visual direction and image paths in `PRODUCTS`.
- Produces: transparent or black-compatible WebP renders with stable intrinsic dimensions and descriptive HTML alternatives.

- [ ] **Step 1: Add failing asset checks**

Add an `$requiredAssets` array containing all 11 exact paths and assert `Test-Path`, file length greater than 10 KB, and file length less than 600 KB per asset. Assert that every product image in HTML has numeric `width` and `height` attributes.

- [ ] **Step 2: Run validation and confirm missing-asset failures**

Expected: FAIL naming each absent hero and catalog asset.

- [ ] **Step 3: Generate the hero layers with the imagegen skill**

Use the imagegen skill with the approved prompt, requesting separate compositions that align when layered:

```text
Premium studio product render of a fictional modern flagship smartphone inspired by contemporary industrial design, no logos, black titanium and warm metallic rose finish, isolated on transparent background, three-quarter angle, dramatic rim light, physically accurate reflections, luxury advertising photography, centered object, no text, no hands, 4:5 composition.
```

Create front, back, and glow/support layers. Keep the device fictional and omit Apple/Samsung logos to avoid passing generated artwork off as an official product photo.

- [ ] **Step 4: Generate and optimize the eight catalog renders**

Create consistent device renders with distinct silhouettes and approved color variants. Convert outputs to WebP using the bundled image tooling, preserving transparency where available, maximum long edge 1400px, and quality 82. Verify each file visually before accepting it.

- [ ] **Step 5: Wire responsive image markup and fallbacks**

Add explicit dimensions, useful `alt` text for product images, empty `alt` for purely decorative hero layers, `loading="lazy"` below the fold, `decoding="async"`, and a `.product-media.is-missing` fallback activated by the image `error` event.

- [ ] **Step 6: Run validation and commit**

Run the validator and visually inspect a contact sheet of all 11 images. Expected: all asset constraints pass and the set has consistent lighting.

```powershell
git add projects/orbit-mobile/assets projects/orbit-mobile/index.html projects/orbit-mobile/js/products.js projects/orbit-mobile/js/script.js tests/validate-orbit-mobile.ps1
git commit -m "feat: add Orbit Mobile product artwork"
```

---

### Task 4: Comparison, Navigation, FAQ, and Interaction States

**Files:**
- Modify: `projects/orbit-mobile/index.html`
- Modify: `projects/orbit-mobile/css/style.css`
- Modify: `projects/orbit-mobile/js/script.js`
- Modify: `tests/validate-orbit-mobile.ps1`

**Interfaces:**
- Consumes: `PRODUCTS`, `getProduct(id)`, product-card IDs, and comparison toggles.
- Produces: `setMenu(open: boolean): void`, `toggleComparison(id: string): void`, `renderComparison(): void`, and a maximum three-product comparison state.

- [ ] **Step 1: Add failing interaction-contract checks**

Assert the presence of `aria-expanded`, `aria-controls="site-nav"`, a live comparison status, native FAQ `<details>` elements, `MAX_COMPARE = 3`, and the functions named above in `script.js`.

- [ ] **Step 2: Run validation and confirm failure**

Expected: FAIL for missing interaction contracts.

- [ ] **Step 3: Implement menu and FAQ behavior**

Use a real button for the mobile menu. `setMenu` must update `aria-expanded`, body scroll state, and the visible label. Close the menu after navigation and on Escape. Use native `<details>` for FAQ so answers remain usable without JS; enhance only to optionally close sibling answers.

- [ ] **Step 4: Implement the comparison state**

Use this state contract:

```js
const MAX_COMPARE = 3;
const comparisonIds = new Set();

function toggleComparison(id) {
  if (comparisonIds.has(id)) comparisonIds.delete(id);
  else if (comparisonIds.size < MAX_COMPARE) comparisonIds.add(id);
  else announce('Compare no máximo 3 aparelhos por vez.');
  renderComparison();
}
```

`renderComparison()` creates columns for name, display, camera, battery, and storage using text content, updates every toggle's `aria-pressed`, and announces the new count. With no selection, keep concise instructions visible.

- [ ] **Step 5: Add interaction styling**

Style menu open/closed states, comparison columns that stack at 375px, native disclosure markers, selected comparison controls, hover/focus states, and clear disabled feedback without relying on color alone.

- [ ] **Step 6: Run validation and commit**

Run both PowerShell validators. Expected: PASS.

```powershell
git add projects/orbit-mobile/index.html projects/orbit-mobile/css/style.css projects/orbit-mobile/js/script.js tests/validate-orbit-mobile.ps1
git commit -m "feat: add Orbit Mobile shopping interactions"
```

---

### Task 5: Scroll-Driven 3D Hero and Motion Fallbacks

**Files:**
- Modify: `projects/orbit-mobile/index.html`
- Modify: `projects/orbit-mobile/css/style.css`
- Modify: `projects/orbit-mobile/js/script.js`
- Modify: `tests/validate-orbit-mobile.ps1`

**Interfaces:**
- Consumes: `.hero-device`, `[data-hero-layer]`, `.hero-copy`, `.product-card`, and optimized hero layers.
- Produces: `initMotion(): void`, `initHeroSequence(): void`, `initPointerDepth(): void`, and the root classes `motion-ready` or `motion-static`.

- [ ] **Step 1: Add failing motion-safety checks**

Assert pinned GSAP and ScrollTrigger `3.13.0` script URLs, `prefers-reduced-motion`, `.motion-static`, `initMotion`, and a GSAP-failure fallback. Assert that the initial HTML does not hide hero content with inline opacity.

- [ ] **Step 2: Run validation and confirm failure**

Expected: FAIL for missing library URLs and fallback contracts.

- [ ] **Step 3: Add pinned GSAP includes**

Load before the module script:

```html
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```

Do not block semantic content on either library.

- [ ] **Step 4: Implement the guarded animation entry point**

```js
function initMotion() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  if (reduced || !window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.add('motion-static');
    return;
  }
  window.gsap.registerPlugin(window.ScrollTrigger);
  document.documentElement.classList.add('motion-ready');
  initHeroSequence();
  if (!coarse) initPointerDepth();
}
```

Call it after DOM readiness. Wrap initialization in `try/catch`; on error, remove `motion-ready` and add `motion-static`.

- [ ] **Step 5: Build the hero timeline**

Use a scrubbed GSAP timeline pinned only on desktop widths via `gsap.matchMedia()`. Animate transforms and opacity only: front layer from `rotateY(-22deg) rotateZ(-8deg) translate3d(8%,8%,0)` to a centered final state; back layer separates on the z axis; glow shifts and scales; copy moves no more than 48px; the full composition hands off toward `#aparelhos`. Keep the total pinned distance near 140vh and avoid scroll-jacking.

- [ ] **Step 6: Add pointer depth and section reveals**

Throttle pointer updates through one `requestAnimationFrame`, clamp rotations to ±5 degrees, reset on pointer leave, and apply only to decorative layers. Reveal catalog cards with 300–450ms staggered motion. Do not animate width, height, top, or left.

- [ ] **Step 7: Implement reduced-motion and static CSS**

```css
.motion-static [data-hero-layer],
.motion-static [data-reveal] { transform: none !important; opacity: 1 !important; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

- [ ] **Step 8: Run validation and commit**

Run both validators and load the page once with the CDN blocked to confirm the static state remains visible.

```powershell
git add projects/orbit-mobile/index.html projects/orbit-mobile/css/style.css projects/orbit-mobile/js/script.js tests/validate-orbit-mobile.ps1
git commit -m "feat: animate Orbit Mobile hero experience"
```

---

### Task 6: Full Browser Verification and Quality Pass

**Files:**
- Modify as defects require: `projects/orbit-mobile/index.html`
- Modify as defects require: `projects/orbit-mobile/css/style.css`
- Modify as defects require: `projects/orbit-mobile/js/products.js`
- Modify as defects require: `projects/orbit-mobile/js/script.js`
- Modify: `tests/validate-orbit-mobile.ps1`

**Interfaces:**
- Consumes: the complete isolated Orbit Mobile site.
- Produces: verified site suitable for user review; no portfolio-homepage changes.

- [ ] **Step 1: Add final static checks**

Add checks for all local `src`/`href` asset paths, exactly eight unique product IDs, no unfinished-marker text, no duplicate IDs, no root-relative Orbit assets, safe external-link `rel` values, and an explicit `prefers-reduced-motion` block.

- [ ] **Step 2: Run all repository validators**

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-orbit-mobile.ps1
powershell -ExecutionPolicy Bypass -File tests/validate-portfolio.ps1
```

Expected: both exit 0.

- [ ] **Step 3: Start a local server and inspect the primary flow**

```powershell
& 'C:\Users\Daniel\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 8000
```

Open `http://localhost:8000/projects/orbit-mobile/`. Verify header → hero CTA → Apple filter → Samsung filter → select three comparisons → reject a fourth → open FAQ → product WhatsApp action.

- [ ] **Step 4: Verify responsive layouts**

At 375, 768, 1024, and 1440px, capture screenshots and verify no horizontal overflow, clipped headings, overlapping product art, obscured floating action, or controls below 44px. Confirm product-card copy reflows naturally and comparison columns remain readable.

- [ ] **Step 5: Verify accessibility and resilience**

Navigate every control with keyboard only; inspect focus visibility; confirm menu closes on Escape; emulate reduced motion; block the GSAP URLs; disable JavaScript; break one image URL locally. The page must retain content, product identity, and essential WhatsApp links in every fallback state.

- [ ] **Step 6: Fix discovered defects and rerun the full matrix**

For each defect, first add or tighten a reproducible assertion where possible, then make the smallest code change. Rerun both validators and the affected viewport/interaction check until clean.

- [ ] **Step 7: Commit the verified isolated project**

```powershell
git add projects/orbit-mobile tests/validate-orbit-mobile.ps1
git commit -m "test: verify Orbit Mobile experience"
```

- [ ] **Step 8: Stop for explicit user approval**

Show the finished Orbit Mobile site and responsive screenshots. Ask the user to approve it as the principal portfolio project. Do not begin Task 7 without an explicit yes after this review.

---

### Task 7: Final Portfolio Integration Gate

**Files:**
- Create: `assets/project-previews/orbit-mobile.webp`
- Modify: `index.html`
- Modify: `tests/validate-portfolio.ps1`
- Modify if required: `PROJECTS-MAP.md`

**Interfaces:**
- Consumes: explicit post-verification user approval and the completed `projects/orbit-mobile/` site.
- Produces: Orbit Mobile as the first/principal portfolio project linking to `projects/orbit-mobile/index.html`.

- [ ] **Step 1: Confirm the gate in the task record**

Before editing, quote or record the user's explicit approval of the final rendered site. If approval is absent or conditional, stop without modifying the portfolio homepage.

- [ ] **Step 2: Write the failing portfolio assertions**

Add to `tests/validate-portfolio.ps1`:

```powershell
$orbitPreview = 'assets/project-previews/orbit-mobile.webp'
Assert-PortfolioCondition ($portfolio.Contains('href="projects/orbit-mobile/index.html"')) 'O projeto principal deve abrir a Orbit Mobile.'
Assert-PortfolioCondition ($portfolio.Contains("src=`"$orbitPreview`"")) 'O card principal deve usar a capa da Orbit Mobile.'
Assert-PortfolioCondition (Test-Path (Join-Path $root $orbitPreview)) 'A capa da Orbit Mobile deve existir.'
$orbitIndex = $portfolio.IndexOf('Orbit Mobile')
$auraIndex = $portfolio.IndexOf('AURA Restaurante')
Assert-PortfolioCondition ($orbitIndex -ge 0 -and $orbitIndex -lt $auraIndex) 'Orbit Mobile deve ser o primeiro projeto exibido.'
```

- [ ] **Step 3: Run the portfolio test and confirm failure**

Expected: FAIL because the card and preview are not integrated yet.

- [ ] **Step 4: Create the verified preview image**

Capture the approved 1440px hero at a 16:10 crop, convert it to `assets/project-previews/orbit-mobile.webp`, and keep it below 350 KB. Verify that the crop clearly shows the Orbit Mobile name and hero device without small unreadable UI.

- [ ] **Step 5: Add Orbit Mobile as the first project card**

Insert the card before AURA using the existing portfolio markup contract:

```html
<article class="project-card" data-reveal>
  <a href="projects/orbit-mobile/index.html" target="_blank" rel="noopener">
    <div class="project-card__media">
      <img src="assets/project-previews/orbit-mobile.webp" alt="Página inicial da Orbit Mobile, loja conceito de smartphones premium" loading="eager">
      <span class="project-card__number">01</span>
      <span class="project-card__open">Abrir ↗</span>
    </div>
    <div class="project-card__body">
      <p class="project-card__kicker">E-COMMERCE / 3D EXPERIENCE</p>
      <h3 class="project-card__title">Orbit Mobile</h3>
      <p class="project-card__description">Loja conceito de smartphones premium com catálogo interativo, comparação e experiência 3D orientada à conversão.</p>
      <p class="text-meta project-card__stack">HTML / CSS / JAVASCRIPT / GSAP</p>
    </div>
  </a>
</article>
```

Renumber subsequent visible project-card labels sequentially without changing their URLs or content.

- [ ] **Step 6: Update project documentation if it enumerates card order**

If `PROJECTS-MAP.md` lists featured projects, add Orbit Mobile first with its exact route and preview path. Do not refactor unrelated entries.

- [ ] **Step 7: Run final validation**

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-orbit-mobile.ps1
powershell -ExecutionPolicy Bypass -File tests/validate-portfolio.ps1
```

Open the portfolio homepage at 375 and 1440px. Confirm Orbit Mobile is first, its preview is crisp, the card opens the correct page, and existing project cards still work.

- [ ] **Step 8: Commit the approved integration**

```powershell
git add index.html assets/project-previews/orbit-mobile.webp tests/validate-portfolio.ps1 PROJECTS-MAP.md
git commit -m "feat: feature Orbit Mobile in portfolio"
```

---

## Completion Criteria

- Orbit Mobile passes its isolated validator and the existing portfolio validator.
- The primary flow works with mouse, touch, and keyboard.
- The page remains useful with reduced motion, blocked GSAP, failed imagery, and JavaScript disabled.
- All four target viewports are visually approved without overflow or obstruction.
- Exactly eight products appear, with six Apple and two Samsung models.
- Every product opens a correctly encoded WhatsApp consultation message.
- The portfolio homepage remains unchanged until the user approves the verified isolated site.
- After that approval, Orbit Mobile appears first and links to the completed project.
