/**
 * Configuração e Dados de Conteúdo do Restaurante AURA
 * Gastronomia Contemporânea & Mixologia Autoral
 */

const RESTAURANT_CONFIG = {
  info: {
    name: "AURA",
    subtitle: "Gastronomia Contemporânea & Mixologia",
    tagline: "Uma experiência sensorial onde a tradição encontra a alta gastronomia contemporânea.",
    description: "Sob o comando da renomada Chef Helena Vasconcelos (ex-Le Jardin des Sens, Paris), o AURA une ingredientes de pequenos produtores brasileiros a técnicas da alta cozinha internacional em um ambiente sofisticado e acolhedor.",
    address: {
      street: "Alameda Lorena, 1420",
      neighborhood: "Jardins",
      city: "São Paulo - SP",
      postalCode: "01424-002",
      full: "Alameda Lorena, 1420 - Jardins, São Paulo - SP",
      mapsUrl: "https://maps.google.com/?q=Alameda+Lorena+1420+Jardins+Sao+Paulo",
      geo: {
        latitude: -23.5658,
        longitude: -46.6632
      }
    },
    contact: {
      phone: "+55 (11) 3088-9100",
      whatsappNumber: "5511990889100",
      whatsappMessage: "Olá! Gostaria de obter informações ou confirmar uma reserva no AURA.",
      email: "reservas@aurarestaurante.com.br",
      instagram: "https://instagram.com/aura.gastronomia",
      instagramHandle: "@aura.gastronomia"
    },
    hours: [
      { days: "Terça a Quinta", hours: "19h00 às 23h30" },
      { days: "Sexta e Sábado", hours: "19h00 às 00h30" },
      { days: "Domingo (Almoço)", hours: "12h30 às 16h30" },
      { days: "Segunda-feira", hours: "Fechado" }
    ],
    highlights: {
      rating: "4.9",
      totalReviews: "640+",
      awards: [
        "Guia Gastronômico 2025/2026 - 3 Garfos",
        "Veja Comer & Beber - Revelação em Mixologia",
        "Prêmio Sommelier de Excelência 2025"
      ]
    }
  },

  menu: [
    // ENTRADAS
    {
      id: "ent-1",
      category: "entradas",
      categoryLabel: "Entradas",
      name: "Tartare de Atum com Emulsão de Yuzu",
      description: "Atum fresco selado, óleo de gergelim tostado, crostini de mandioca e picles de rabanete orgânico.",
      price: "R$ 78",
      badge: "Mais Pedido",
      tags: ["Sem Glúten", "Fresco"]
    },
    {
      id: "ent-2",
      category: "entradas",
      categoryLabel: "Entradas",
      name: "Vieiras Grelhadas ao Velouté de Milho Doce",
      description: "Vieiras frescas grelhadas na manteiga de garrafa, crispy de presunto cru e azeite de carvão vegetal.",
      price: "R$ 92",
      badge: "Assinatura",
      tags: ["Frutos do Mar"]
    },
    {
      id: "ent-3",
      category: "entradas",
      categoryLabel: "Entradas",
      name: "Carpaccio de Beterraba Defumada com Queijo de Cabra",
      description: "Beterraba assada na lenha, emulsão de queijo de cabra artesanal, nozes caramelizadas e brotos de rúcula.",
      price: "R$ 64",
      badge: "Vegetariano",
      tags: ["Vegetariano", "Orgânico"]
    },

    // PRATOS PRINCIPAIS
    {
      id: "pri-1",
      category: "principais",
      categoryLabel: "Pratos Principais",
      name: "Ancho Angus ao Roti de Pimenta-de-Cheiro",
      description: "Corte nobre Angus (300g), purê de mandioca perfumado com trufas brasileiras e legumes glacados na brasa.",
      price: "R$ 148",
      badge: "Especialidade",
      tags: ["Corte Nobre", "Na Brasa"]
    },
    {
      id: "pri-2",
      category: "principais",
      categoryLabel: "Pratos Principais",
      name: "Risotinho de Cavaquinha & Limão Siciliano",
      description: "Arroz carnaroli al dente, cauda de cavaquinha salteada na manteiga de ervas e raspas de limão confeitado.",
      price: "R$ 136",
      badge: "Favorito do Sommelier",
      tags: ["Frutos do Mar", "Harmonizado"]
    },
    {
      id: "pri-3",
      category: "principais",
      categoryLabel: "Pratos Principais",
      name: "Robalo em Crosta de Castanha-do-Pará",
      description: "Filé de robalo fresco, mousseline de baroa, molho velouté de tucupi reduzido e aspargos grelhados.",
      price: "R$ 124",
      badge: "Sem Glúten",
      tags: ["Peixe Fresco", "Ingredientes Nacionais"]
    },
    {
      id: "pri-4",
      category: "principais",
      categoryLabel: "Pratos Principais",
      name: "Gnocchi de Batata-Doce Roxa ao Pesto de Baru",
      description: "Gnocchi artesanal tostado na manteiga de sálvia, tomates confitados e crumble de castanha de baru.",
      price: "R$ 96",
      badge: "Vegano",
      tags: ["Vegano", "Sem Lactose"]
    },

    // SOBREMESAS
    {
      id: "sob-1",
      category: "sobremesas",
      categoryLabel: "Sobremesas",
      name: "Texturas de Cacau Amazônico 70%",
      description: "Mousse aveludada, crocante de nibs de cacau, sorbet de cupuaçu artesanal e calda quente de praliné.",
      price: "R$ 48",
      badge: "Sobremesa Assinatura",
      tags: ["Cacau Orgânico"]
    },
    {
      id: "sob-2",
      category: "sobremesas",
      categoryLabel: "Sobremesas",
      name: "Mille-Feuille de Baunilha do Cerrado",
      description: "Massa folhada artesanal ultracrocante, creme patissière infusionado com fava de baunilha nacional e morangos frescos.",
      price: "R$ 44",
      badge: "Artesanal",
      tags: ["Doces Finos"]
    },

    // MIXOLOGIA & BEBIDAS
    {
      id: "mix-1",
      category: "mixologia",
      categoryLabel: "Mixologia Autoral",
      name: "AURA Botanical Tonic",
      description: "Gin artesanal infusionado com flor de borboleta, tônica premium, xarope de capim-santo e bruma aromática de alecrim.",
      price: "R$ 46",
      badge: "Cocktail da Casa",
      tags: ["Autoral", "Instagramável"]
    },
    {
      id: "mix-2",
      category: "mixologia",
      categoryLabel: "Mixologia Autoral",
      name: "Smoked Old Fashioned de Cachaça Envelhecida",
      description: "Cachaça extra premium armazenada em bálsamo, bitters da casa, açúcar demerara e defumação ao vivo em madeira de laranjeira.",
      price: "R$ 52",
      badge: "Defumado",
      tags: ["Premium", "Exclusivo"]
    }
  ],

  testimonials: [
    {
      quote: "O AURA entrega a melhor experiência de gastronomia contemporânea de São Paulo. O Ancho Angus com molho Roti e a mixologia são simplesmente inesquecíveis.",
      author: "Revista Gastronomia & Estilo",
      role: "Crítica Gastronômica",
      rating: 5
    },
    {
      quote: "Atendimento impecável do início ao fim. O equilíbrio perfeito entre a sofisticação de um restaurante refinado e o aconchego de uma atmosfera acolhedora.",
      author: "Dr. Carlos Eduardo & Marina S.",
      role: "Clientes Frequentes",
      rating: 5
    },
    {
      quote: "O trabalho da Chef Helena Vasconcelos com ingredientes nativos brasileiros em técnicas francesas coloca o AURA no topo dos restaurantes paulistas.",
      author: "Guia Urbano de Gastronomia",
      role: "Avaliação 2025",
      rating: 5
    }
  ],

  faqs: [
    {
      question: "Qual é o dress code recomendado no AURA?",
      answer: "Recomendamos o estilo Esporte Fino ou Passeio Completo. Prezamos por uma atmosfera elegante e confortável para todos os nossos convidados."
    },
    {
      question: "Como funciona a política de reservas e cancelamentos?",
      answer: "As reservas podem ser efetuadas online ou via WhatsApp até às 17h do próprio dia. Solicitamos que eventuais cancelamentos sejam informados com no mínimo 3 horas de antecedência."
    },
    {
      question: "O restaurante possui serviço de valet (manobrista)?",
      answer: "Sim, dispomos de serviço de valet cortesia com manobristas segurados na entrada principal do restaurante na Alameda Lorena, 1420."
    },
    {
      question: "Atendem restrições alimentares (sem glúten, vegano, alergias)?",
      answer: "Perfeitamente. Nosso cardápio identifica opções sem glúten, sem lactose e veganas. Caso possua alergias severas, por favor informe no momento da reserva para que a equipe de cozinha prepare uma adaptação dedicada."
    },
    {
      question: "É possível realizar eventos privados ou mini-weddings no AURA?",
      answer: "Sim, dispomos de um Salão Privativo com capacidade para até 30 pessoas e opção de fechamento exclusivo do restaurante para eventos especiais. Entre em contato via e-mail ou WhatsApp para propostas personalizadas."
    }
  ]
};

// Tornar disponível globalmente (Browser e Node)
if (typeof window !== "undefined") {
  window.RESTAURANT_CONFIG = RESTAURANT_CONFIG;
}
if (typeof global !== "undefined") {
  global.RESTAURANT_CONFIG = RESTAURANT_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = RESTAURANT_CONFIG;
}

