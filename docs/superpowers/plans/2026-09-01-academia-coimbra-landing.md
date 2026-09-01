# Academia Coimbra Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma landing page estática, responsiva e orientada a conversão para a Academia Coimbra em `projects/academia-coimbra/`.

**Architecture:** Uma página HTML semântica concentra o conteúdo e os destinos de navegação; um CSS tokenizado implementa a direção premium e responsiva; uma pequena camada de JavaScript puro adiciona o menu móvel, estado do cabeçalho e revelações progressivas. Assets ficam organizados por função para que fotografias demonstrativas possam ser substituídas sem alterar a estrutura.

**Tech Stack:** HTML5, CSS3, JavaScript puro, SVG inline, imagens locais e PowerShell para validação estrutural.

**Spec:** `docs/superpowers/specs/2026-09-01-academia-coimbra-design.md`

## Global Constraints

- Projeto independente em `projects/academia-coimbra/`.
- Usar somente HTML5, CSS3 e JavaScript puro; sem React, Bootstrap, Tailwind ou frameworks.
- Preservar a logo fornecida sem redesenho.
- Base preta/grafite, branco para leitura e verde intenso apenas em ações e detalhes.
- WhatsApp oficial: `5511962839322`.
- Mensagem oficial: `Olá! Vi o site da Academia Coimbra e gostaria de saber mais sobre os planos e horários.`
- Endereço: `R. Champollion, 294 - Vila Suíça, Santo André - SP, 09131-020`.
- Mobile-first, sem overflow horizontal, com alvos de toque de pelo menos 44 px e suporte a `prefers-reduced-motion`.
- Um único `h1`, metadados SEO e Open Graph, textos alternativos e foco por teclado visível.

---

### Task 1: Criar o contrato estrutural e o validador inicial

**Files:**
- Create: `tests/validate-academia-coimbra.ps1`
- Create: `projects/academia-coimbra/README.md`

**Interfaces:**
- Consumes: requisitos e conteúdo definidos na especificação aprovada.
- Produces: `Assert-CoimbraCondition([bool]$Condition, [string]$Message)` e um contrato executável para arquivos, seções, conteúdo, links e acessibilidade.

- [ ] **Step 1: Escrever o validador inicialmente falho** com esta base e verificações explícitas:

```powershell
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$project = Join-Path $root 'projects\academia-coimbra'
$htmlPath = Join-Path $project 'index.html'
$cssPath = Join-Path $project 'css\style.css'
$jsPath = Join-Path $project 'js\script.js'
$logoPath = Join-Path $project 'assets\images\logo-academia-coimbra.png'
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-CoimbraCondition([bool]$Condition, [string]$Message) {
    if (-not $Condition) { $script:failures.Add($Message) }
}

@($htmlPath, $cssPath, $jsPath, $logoPath) | ForEach-Object {
    Assert-CoimbraCondition (Test-Path -LiteralPath $_) "Arquivo obrigatório ausente: $_"
}

if (Test-Path -LiteralPath $htmlPath) {
    $html = Get-Content -Raw -LiteralPath $htmlPath
    @('inicio','academia','modalidades','horarios','localizacao','contato') | ForEach-Object {
        Assert-CoimbraCondition ($html.Contains("id=`"$_`"")) "Seção ausente: $_"
    }
    Assert-CoimbraCondition (($html | Select-String -Pattern '<h1[ >]' -AllMatches).Matches.Count -eq 1) 'A página deve ter exatamente um h1.'
    Assert-CoimbraCondition ($html.Contains('5511962839322')) 'WhatsApp oficial ausente.'
    Assert-CoimbraCondition ($html.Contains('R. Champollion, 294')) 'Endereço oficial ausente.'
    Assert-CoimbraCondition ($html.Contains('aria-expanded="false"')) 'Contrato acessível do menu ausente.'
    Assert-CoimbraCondition ($html.Contains('Pular para o conteúdo')) 'Skip link ausente.'
    Assert-CoimbraCondition (-not ($html -match 'href="javascript:')) 'Links javascript: não são permitidos.'
}

if ($failures.Count) { $failures | ForEach-Object { Write-Error $_ }; exit 1 }
Write-Host 'Academia Coimbra: validação estrutural aprovada.'
```

- [ ] **Step 2: Executar o teste e confirmar a falha esperada**.

Run: `powershell -ExecutionPolicy Bypass -File tests/validate-academia-coimbra.ps1`

Expected: FAIL informando que `index.html`, `css/style.css`, `js/script.js` e a logo ainda não existem.

- [ ] **Step 3: Criar o README** com mapa de arquivos, contato oficial, mensagem do WhatsApp, horários, instruções para substituir as quatro fotografias e observação de que a logo não deve ser redesenhada.

- [ ] **Step 4: Commit**.

```powershell
git add tests/validate-academia-coimbra.ps1 projects/academia-coimbra/README.md
git commit -m "test: define Academia Coimbra landing contract"
```

### Task 2: Preparar identidade e assets locais

**Files:**
- Create: `projects/academia-coimbra/assets/images/logo-academia-coimbra.png`
- Create: `projects/academia-coimbra/assets/images/hero-academia.webp`
- Create: `projects/academia-coimbra/assets/images/sobre-treino.webp`
- Create: `projects/academia-coimbra/assets/images/modalidade-coletiva.webp`
- Create: `projects/academia-coimbra/assets/images/modalidade-pilates.webp`
- Create: `projects/academia-coimbra/assets/favicon.svg`

**Interfaces:**
- Consumes: logo em `C:/Users/Daniel/AppData/Local/Temp/codex-clipboard-c93d9058-cb3b-4eb0-9148-37cfde98b5b7.png` e imagens de academia com licença adequada.
- Produces: caminhos locais estáveis consumidos por `index.html` e documentados no README.

- [ ] **Step 1: Copiar a logo sem alteração visual** para `assets/images/logo-academia-coimbra.png` e verificar que largura, altura e proporção permanecem iguais às do arquivo enviado.

- [ ] **Step 2: Selecionar e salvar quatro fotografias demonstrativas** com enquadramentos distintos: ambiente/equipamentos para o hero, musculação para a seção sobre, aula em grupo e Pilates. Converter para WebP com dimensão máxima aproximada de 1920 px e qualidade visual suficiente para fundos de tela cheia.

- [ ] **Step 3: Criar favicon SVG** com fundo preto e a letra `C` em verde, sem alegar que ele substitui ou redesenha a logo principal.

- [ ] **Step 4: Estender o validador** para verificar cada asset local e rejeitar imagens HTML com URL remota em `src`.

```powershell
@('hero-academia.webp','sobre-treino.webp','modalidade-coletiva.webp','modalidade-pilates.webp') | ForEach-Object {
    Assert-CoimbraCondition (Test-Path (Join-Path $project "assets\images\$_")) "Imagem local ausente: $_"
}
Assert-CoimbraCondition (-not ($html -match '<img[^>]+src="https?://')) 'Imagens de conteúdo devem ser locais.'
```

- [ ] **Step 5: Executar o validador** e confirmar que agora falha apenas pelos arquivos de página ainda ausentes.

- [ ] **Step 6: Commit**.

```powershell
git add projects/academia-coimbra/assets tests/validate-academia-coimbra.ps1
git commit -m "feat: add Academia Coimbra visual assets"
```

### Task 3: Implementar conteúdo semântico e fluxo de conversão

**Files:**
- Create: `projects/academia-coimbra/index.html`

**Interfaces:**
- Consumes: caminhos de assets da Task 2.
- Produces: IDs `inicio`, `academia`, `modalidades`, `horarios`, `localizacao`, `contato`; elementos `[data-header]`, `[data-menu-toggle]`, `[data-nav]`, `[data-reveal]`; e links `.js-whatsapp` consumidos pelo CSS e JavaScript.

- [ ] **Step 1: Criar o head completo** com `lang="pt-BR"`, viewport, título exato, meta description exata, theme-color, Open Graph, favicon, preload do hero, CSS e script com `defer`.

- [ ] **Step 2: Criar header e hero** com skip link, logo original, menu solicitado, CTA, botão hambúrguer com `aria-controls="menu-principal" aria-expanded="false"`, um único `h1`, subtítulo e os dois botões do briefing.

- [ ] **Step 3: Criar as seções de conteúdo** na ordem definida na especificação: sobre, três modalidades, motivação, quatro diferenciais, conversão, sete cards de horários, localização com mapa e rodapé.

- [ ] **Step 4: Aplicar o URL exato a todos os CTAs de WhatsApp**.

```text
https://wa.me/5511962839322?text=Ol%C3%A1%21%20Vi%20o%20site%20da%20Academia%20Coimbra%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20planos%20e%20hor%C3%A1rios.
```

- [ ] **Step 5: Configurar localização** usando um iframe do Google Maps para o endereço oficial e um link externo de rota para `https://www.google.com/maps/search/?api=1&query=R.%20Champollion%2C%20294%20-%20Vila%20Su%C3%AD%C3%A7a%2C%20Santo%20Andr%C3%A9%20-%20SP`.

- [ ] **Step 6: Garantir imagens acessíveis e performáticas** com `width`, `height`, `alt`, `loading="lazy"` fora do hero e `decoding="async"`.

- [ ] **Step 7: Rodar o validador**.

Run: `powershell -ExecutionPolicy Bypass -File tests/validate-academia-coimbra.ps1`

Expected: FAIL somente porque CSS/JS ainda não foram criados ou porque verificações específicas dessas camadas ainda não passam.

- [ ] **Step 8: Commit**.

```powershell
git add projects/academia-coimbra/index.html tests/validate-academia-coimbra.ps1
git commit -m "feat: add Academia Coimbra page content"
```

### Task 4: Implementar o sistema visual responsivo

**Files:**
- Create: `projects/academia-coimbra/css/style.css`

**Interfaces:**
- Consumes: classes e atributos semânticos do HTML da Task 3.
- Produces: tokens `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-accent`, `--container`; estados `.is-scrolled`, `.is-open`, `.is-visible`; breakpoints móveis e desktop.

- [ ] **Step 1: Definir reset e tokens** incluindo fundo `#080a09`, superfícies grafite, texto quase branco, verde vivo com contraste adequado, tipografia condensada para títulos, sans-serif para texto, escala fluida, container e espaçamento.

- [ ] **Step 2: Construir a silhueta visual** com hero mínimo de `min(920px, 100svh)`, overlay em gradiente, filete verde, seções amplas, composição assimétrica na seção sobre e cards fotográficos de modalidades.

- [ ] **Step 3: Estilizar conversão e conteúdo** incluindo botões com no mínimo 44 px, ícones SVG, faixa motivacional, grid de diferenciais, bloco “Pronto para começar?”, cards de horários, mapa e rodapé.

- [ ] **Step 4: Implementar responsividade mobile-first** para 360, 768, 1024 e 1440 px, garantindo empilhamento de cards, hero legível, menu off-canvas contido e `overflow-x: clip` sem mascarar componentes que dependam de rolagem.

- [ ] **Step 5: Criar estados acessíveis** para `:focus-visible`, skip link, menu aberto, hover apenas como aprimoramento e `@media (prefers-reduced-motion: reduce)`.

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  [data-reveal] { opacity: 1; transform: none; }
}
```

- [ ] **Step 6: Estender o validador** para exigir `:focus-visible`, `prefers-reduced-motion`, `overflow-x`, media queries e tamanho mínimo dos botões.

- [ ] **Step 7: Executar o validador** e confirmar que resta apenas a camada de interação JavaScript.

- [ ] **Step 8: Commit**.

```powershell
git add projects/academia-coimbra/css/style.css tests/validate-academia-coimbra.ps1
git commit -m "feat: style Academia Coimbra landing page"
```

### Task 5: Adicionar interações progressivas e validar a entrega

**Files:**
- Create: `projects/academia-coimbra/js/script.js`
- Modify: `tests/validate-academia-coimbra.ps1`
- Modify as defects require: `projects/academia-coimbra/index.html`
- Modify as defects require: `projects/academia-coimbra/css/style.css`

**Interfaces:**
- Consumes: `[data-header]`, `[data-menu-toggle]`, `[data-nav]`, `[data-reveal]` e `#footer-year`.
- Produces: `setMenu(open: boolean): void`, estado acessível do menu, `.is-scrolled`, revelação progressiva e ano atual no rodapé.

- [ ] **Step 1: Implementar `setMenu(open)`** para sincronizar `.is-open`, `aria-expanded`, bloqueio de rolagem, fechamento por link, Escape e clique fora, retornando foco ao botão após Escape.

```javascript
const setMenu = (open) => {
  menu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
};
```

- [ ] **Step 2: Implementar o cabeçalho na rolagem** usando um listener passivo e alternando `.is-scrolled` quando `window.scrollY > 32`.

- [ ] **Step 3: Implementar revelações progressivas** com `IntersectionObserver`, aplicando `.is-visible` uma vez e exibindo tudo imediatamente quando a API não existir ou movimento reduzido estiver ativo.

- [ ] **Step 4: Preencher o ano do rodapé** sem esconder conteúdo caso JavaScript esteja desativado.

- [ ] **Step 5: Completar o validador** com checagem de IDs duplicados, assets locais referenciados, links externos com `rel="noopener"`, URL e mensagem exatas de WhatsApp, meta tags, sete dias de horários e ausência de marcadores inacabados.

```powershell
$ids = [regex]::Matches($html, 'id="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
Assert-CoimbraCondition (($ids | Group-Object | Where-Object Count -gt 1).Count -eq 0) 'IDs duplicados encontrados.'
@('SEGUNDA','TERÇA','QUARTA','QUINTA','SEXTA','SÁBADO','DOMINGO') | ForEach-Object {
    Assert-CoimbraCondition ($html.Contains($_)) "Horário ausente para $_"
}
Assert-CoimbraCondition (-not ($html -match 'PREENCHER|Lorem ipsum')) 'Marcador inacabado encontrado.'
```

- [ ] **Step 6: Executar validação estrutural final**.

Run: `powershell -ExecutionPolicy Bypass -File tests/validate-academia-coimbra.ps1`

Expected: PASS com `Academia Coimbra: validação estrutural aprovada.`

- [ ] **Step 7: Servir a página localmente**.

Run: `python -m http.server 4173 --directory projects/academia-coimbra`

Expected: `http://localhost:4173/` responde com status 200, carrega logo, CSS, JavaScript, quatro imagens e iframe do mapa sem erros locais.

- [ ] **Step 8: Fazer a verificação responsiva solicitada** em 360, 768, 1024 e 1440 px: confirmar ausência de overflow, títulos sem corte, botões ≥44 px, cards legíveis, mapa contido, botão flutuante não obstruindo conteúdo e menu operável por teclado/toque.

- [ ] **Step 9: Verificar fluxos**: links internos rolam para as seções corretas; todos os CTAs abrem o WhatsApp com telefone e mensagem aprovados; “Como chegar” abre o endereço correto; Escape fecha o menu e restaura foco; movimento reduzido elimina animações não essenciais.

- [ ] **Step 10: Commit final**.

```powershell
git add projects/academia-coimbra tests/validate-academia-coimbra.ps1
git commit -m "feat: complete Academia Coimbra landing page"
```

## Definition of Done

- Validador estrutural aprovado sem avisos.
- Página responde com HTTP 200 e não apresenta erros de assets locais.
- Conteúdo, horários, endereço e mensagem do WhatsApp correspondem ao briefing.
- Logo original preservada.
- Menu, navegação, mapa e CTAs funcionam em desktop e mobile.
- Nenhum dos quatro viewports de referência apresenta overflow ou obstrução.
- SEO, foco, textos alternativos e movimento reduzido estão presentes.
