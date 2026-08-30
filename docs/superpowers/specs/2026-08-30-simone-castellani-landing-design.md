# Landing page da Dra. Simone Castellani — design aprovado

**Data:** 2026-08-30
**Status:** Design aprovado para planejamento de implementação

## Objetivo

Criar uma landing page independente em `projects/simone-castellani/`, com estrutura de conversão inspirada na jornada do site de referência `https://www.raphaelnutri.com/`, mas com identidade visual, copy e fatos próprios da Dra. Simone Castellani.

## Regra de conteúdo e veracidade

- Usar somente informações confirmadas na especificação da Dra. Simone, no perfil público autorizado e nos dados fornecidos pelo usuário.
- Não copiar textos, marca, imagens, depoimentos ou provas sociais do site de Raphael Souza.
- Não inventar métricas, quantidade de pacientes, avaliações, CRN, endereço, certificações, resultados ou testemunhos.
- Itens não confirmados devem aparecer como campos editáveis claramente identificados ou permanecer fora da publicação.
- As seções de medicamentos, resultados e depoimentos só entram quando houver informação e autorização específicas.

## Direção visual

Clínico minimalista, moderno e premium: base clara, verde clínico, tipografia sans-serif legível, bastante espaço em branco, cartões objetivos, fotografia profissional autorizada e CTA em alto contraste. A experiência deve transmitir precisão e acolhimento sem parecer academia, loja de suplementos ou clínica hospitalar.

## Jornada da página

1. Navegação simples com âncoras e CTA de WhatsApp.
2. Hero com a promessa de combate à obesidade e cuidado das doenças decorrentes, apresentação da Dra. Simone e foto aprimorada.
3. Faixa de confiança com especialidades e modalidades confirmadas.
4. Bloco de identificação com dores reais: dificuldade para emagrecer, falta de constância, dúvidas alimentares e necessidade de cuidar da saúde.
5. Benefícios do acompanhamento: plano individual, orientação baseada em evidências, reeducação alimentar, fitoterapia quando indicada e suporte próximo.
6. Grade de especialidades: clínica, fitoterapia, esportiva, obesidade, reeducação alimentar e educação nutricional.
7. Processo em quatro etapas: anamnese, consulta, planejamento individualizado e acompanhamento.
8. Cards de atendimento presencial e online, sem inventar local ou disponibilidade não confirmados.
9. Diferenciais: atendimento humanizado, estratégia personalizada, autonomia e ausência de dietas genéricas ou terrorismo nutricional.
10. Área de provas sociais com placeholders até receber avaliações ou depoimentos autorizados.
11. Conteúdos educativos com temas coerentes com as especialidades, sem alegações clínicas não validadas.
12. FAQ com dúvidas de consulta e agendamento, usando respostas editáveis quando faltar informação.
13. CTA final orientado a conversa no WhatsApp.
14. Rodapé com WhatsApp, Facebook e Instagram confirmado; LinkedIn e demais campos somente se fornecidos.

## Conversão

- Ação principal: iniciar conversa pelo WhatsApp `+55 11 99478-4220`.
- Link: `https://wa.me/5511994784220` com mensagem pré-preenchida autorizada.
- CTAs devem usar verbos e benefício: “Agendar minha consulta”, “Falar com a Dra. Simone” e “Conhecer o acompanhamento”.
- Repetir o CTA no hero, após benefícios, após modalidades e no fechamento.
- Links externos de agendamento abrem em nova aba com `rel="noopener"`.

## Implementação

- HTML, CSS e JavaScript vanilla, sem framework.
- Arquivos: `index.html`, `css/style.css`, `js/script.js`, `assets/`.
- Mobile-first, navegação acessível, foco visível, contraste adequado, `prefers-reduced-motion`, SEO básico e JSON-LD de profissional somente com campos confirmados.
- A foto aprimorada deve ser um asset local; a página não deve depender de URL do Facebook.

## Validação

- Testar navegação por âncoras, todos os CTAs de WhatsApp, menu mobile, FAQ, carregamento da imagem local e responsividade.
- Fazer auditoria de conteúdo para remover placeholders não intencionais e qualquer alegação sem fonte.
- Verificar console sem erros e links sem destino quebrado.
