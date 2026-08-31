# Clínica Restore — design de landing page aprovado

**Data:** 2026-08-31
**Status:** Design aprovado para planejamento de implementação

## Objetivo

Criar um site independente em `projects/clinica-restore/` para apresentar fisioterapia, pilates, saúde, estética e bem-estar, conduzindo visitantes ao WhatsApp oficial da Clínica Restore.

## Dados confirmados

- Nome: Clínica Restore.
- Instagram: `https://www.instagram.com/clinica_restore`.
- WhatsApp: `+55 11 99529-3817`.
- Link: `https://wa.me/5511995293817`.
- Mensagem padrão: “Olá! Encontrei a Clínica Restore pelo site e gostaria de saber mais sobre os atendimentos.”

## Regra de veracidade

- Endereço, e-mail, telefone adicional, horários, profissionais, formações, registros, experiência, avaliações, métricas e mapa ficam vazios/configuráveis até confirmação.
- Avaliações não podem ser apresentadas como reais sem texto, nome e autorização; usar placeholders identificados no código.
- Não prometer resultados médicos, cura ou garantias.
- Fotos de banco gratuito são temporárias e devem ficar locais, organizadas para substituição pelas imagens da clínica.

## Direção visual

Wellness editorial: branco, off-white, bege claro, verde suave e verde-azulado; grandes fotografias com luz natural; tipografia moderna; bordas arredondadas; sombras discretas; animações leves; bastante espaço em branco; linguagem acolhedora e profissional.

## Jornada da página

1. Header com marca, âncoras e CTA “Agendar atendimento”.
2. Hero com “Movimento, cuidado e qualidade de vida”, subtítulo, foto de atendimento/movimento e CTAs.
3. Faixa de confiança com atendimento individualizado, cuidado integrado e foco no bem-estar.
4. Sobre com proposta da clínica e bloco preparado para equipe/profissionais.
5. Serviços: fisioterapia, pilates, acupuntura, RPG, massagem e drenagem linfática; cada card terá foto, descrição e CTA com mensagem específica no WhatsApp.
6. Diferenciais sem alegações exageradas.
7. Avaliações com placeholders claramente identificados.
8. Galeria local de fotos temporárias, pronta para substituição.
9. CTA de largura total com imagem.
10. Instagram oficial com link para `@clinica_restore`.
11. Contato com WhatsApp, Instagram e campos editáveis.
12. Formulário com nome, WhatsApp, serviço e mensagem; no envio, montar texto e abrir WhatsApp sem backend.
13. Localização preparada para endereço e mapa quando fornecidos.
14. CTA final, footer e botão flutuante de WhatsApp.

## Implementação

- HTML5, CSS3 e JavaScript vanilla, sem framework.
- `js/config.js` centraliza todos os dados editáveis e serviços.
- `js/script.js` monta links/mensagens de WhatsApp, menu, FAQ, formulário e reveal.
- Mobile-first, sem overflow horizontal, touch targets adequados, foco visível, labels, alt text e `prefers-reduced-motion`.
- SEO com title, meta description, Open Graph, H1 único, headings semânticos e JSON-LD somente com dados confirmados.
- Poucas dependências; imagens locais em WebP/AVIF quando possível e lazy loading fora do hero.

## Validação

- Testar todos os CTAs, mensagens específicas por serviço, Instagram, formulário, menu mobile, FAQ, imagens, links, console, responsividade e mapa condicional.
- Rodar auditoria para garantir que nenhum campo vazio virou informação inventada.
