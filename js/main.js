// ==========================================================================
// MAIN.JS
// Ponto de entrada único. Importa e inicializa cada módulo.
// Nenhuma lógica de UI vive aqui  apenas orquestração.
// ==========================================================================

import { initScrollReveal } from './scroll-reveal.js';
import { initSectionTracker } from './section-tracker.js';
import { initNav } from './nav.js';

// Remove a marca "no-js" assim que este módulo executa  confirma que o
// JavaScript carregou e os estados de [data-reveal] podem ser controlados
// por scroll-reveal.js. Ver fallback em components.css (html.no-js).
document.documentElement.classList.remove('no-js');

initScrollReveal();
initSectionTracker();
initNav();
