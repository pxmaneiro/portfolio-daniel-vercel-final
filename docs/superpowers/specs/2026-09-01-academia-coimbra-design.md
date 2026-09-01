# Academia Coimbra — Especificação de design

## Objetivo

Criar uma landing page de alta conversão para a Academia Coimbra, em Santo André, com aparência profissional, contemporânea e coerente com uma academia de bairro consolidada. A ação principal será iniciar uma conversa no WhatsApp sobre planos, horários e modalidades.

## Escopo

O projeto será uma página estática independente em `projects/academia-coimbra/`, construída somente com HTML5, CSS3 e JavaScript puro. A entrega inclui navegação responsiva, hero, apresentação da academia, modalidades, faixa motivacional, diferenciais, chamada de conversão, horários, localização, rodapé, botão flutuante de WhatsApp, SEO local e tratamento básico de acessibilidade.

Não fazem parte do escopo: área administrativa, cadastro de alunos, pagamentos, formulários com backend, blog ou múltiplas páginas.

## Direção visual

A linguagem será “academia premium de bairro”: forte e energética, sem futurismo excessivo. A paleta terá preto e grafite como base, branco para leitura e verde vivo como cor de ação. O verde ficará concentrado em botões, pequenos indicadores, ícones e detalhes de marca.

A logo fornecida será usada sem redesenho. O arquivo será copiado para a pasta de assets do projeto e aplicado no cabeçalho e rodapé com enquadramento que preserve sua proporção. A tipografia combinará uma família condensada e pesada nos títulos com uma sans-serif neutra no texto corrido. Fotografias demonstrativas de treino serão grandes, contrastadas e fáceis de substituir por fotos reais no futuro.

O gesto visual memorável será uma composição editorial com títulos de grande escala, linhas verdes finas e imagens recortadas em blocos assimétricos, mantendo boa leitura e um tom realista.

## Estrutura da página

1. Cabeçalho transparente sobre o hero, tornando-se sólido após a rolagem. No desktop haverá os links do briefing e CTA; no celular, menu hambúrguer acessível.
2. Hero quase em tela cheia, com fotografia de academia, camada escura, slogan, subtítulo e dois CTAs.
3. Seção “Seu treino. Sua evolução.” em composição de imagem e texto com quatro benefícios curtos.
4. Três cards fotográficos de modalidades: musculação, aulas coletivas e Pilates.
5. Faixa motivacional de largura total com imagem e CTA para WhatsApp.
6. Quatro diferenciais com ícones SVG minimalistas.
7. Bloco de conversão “Pronto para começar?”.
8. Horários apresentados como cards, com dias úteis agrupados visualmente sem perder a leitura individual solicitada.
9. Localização com endereço, mapa incorporado e botões para rota e WhatsApp.
10. Rodapé com logo, modalidades, endereço, telefone e direitos autorais.
11. Botão flutuante de WhatsApp durante toda a navegação.

## Interações e comportamento

Todos os CTAs de contato abrirão `https://wa.me/5511962839322` com a mensagem: “Olá! Vi o site da Academia Coimbra e gostaria de saber mais sobre os planos e horários.” O botão “Conhecer a academia” e os links internos usarão rolagem suave.

O menu móvel abrirá e fechará por botão, fechará ao selecionar um link e refletirá seu estado com `aria-expanded`. Elementos entrarão suavemente ao alcançar a viewport por `IntersectionObserver`. Usuários com preferência por movimento reduzido receberão a experiência sem animações essenciais. Foco por teclado permanecerá visível.

## Responsividade e acessibilidade

O layout será mobile-first e não terá rolagem horizontal. Alvos interativos terão pelo menos 44 px, texto corrido terá no mínimo 16 px, imagens terão textos alternativos e contraste será verificado especialmente nos detalhes verdes. Cards e CTAs serão empilhados em telas menores, com enquadramento de imagens definido por `object-fit` e `object-position`.

## Conteúdo e SEO

O documento usará o título e a meta description fornecidos, Open Graph, favicon derivado da própria logo, hierarquia semântica de headings, dados locais no conteúdo, endereço completo, telefone legível e links externos seguros. A página terá apenas um `h1`.

## Organização técnica

- `index.html`: conteúdo e semântica.
- `css/style.css`: tokens, layout, responsividade e movimento.
- `js/script.js`: menu, cabeçalho na rolagem, revelação de conteúdo e ano do rodapé.
- `assets/images/`: logo e fotografias, com nomes descritivos para troca simples.

Não haverá dependências de framework. Ícones de interface serão SVG inline; não serão usados emojis como ícones.

## Validação

A entrega será considerada pronta quando:

- a página carregar sem erros em servidor local;
- todos os links internos, CTAs de WhatsApp e botões de localização tiverem destinos corretos;
- o menu funcionar por mouse, toque e teclado;
- não houver overflow horizontal nos tamanhos móveis principais;
- a experiência respeitar `prefers-reduced-motion`;
- título, metadados, headings e textos alternativos estiverem presentes;
- a logo fornecida estiver preservada e legível;
- HTML, CSS e JavaScript permanecerem organizados e fáceis de editar.
