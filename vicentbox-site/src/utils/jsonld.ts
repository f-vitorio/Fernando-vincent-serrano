import { siteConfig, services } from '../types';

export const LOCAL_BUSINESS_ID = `${siteConfig.url}/#localbusiness`;
export const PERSON_ID = `${siteConfig.url}/#fernando-serrano-vicentin`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const areaServed = {
  '@type': 'City',
  name: 'Maringá',
  containedInPlace: {
    '@type': 'State',
    name: 'Paraná',
    containedInPlace: {
      '@type': 'Country',
      name: 'Brasil',
    },
  },
} as const;

const address = {
  '@type': 'PostalAddress',
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.state,
  postalCode: siteConfig.address.zipCode,
  addressCountry: 'BR',
};

const openingHoursSpecification = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Wednesday', 'Friday'],
    opens: '07:00',
    closes: '18:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Tuesday', 'Thursday'],
    opens: '07:00',
    closes: '21:00',
  },
];

const providerRef = {
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  '@id': LOCAL_BUSINESS_ID,
};

/** Catálogo fiel ao onboarding (preços e formatos oficiais). */
const catalogOffers = [
  {
    name: 'Treinamento Multifuncional',
    description:
      'Treinamento personalizado em turmas de até 3 pessoas, com avaliação inicial e terapia manual de 5 minutos ao final de toda aula. Foco em dores, cansaço, fadiga e sobrepeso.',
    url: `${siteConfig.url}/treinamento-multifuncional`,
    image: `${siteConfig.url}/images/treinamento-multifuncional.jpg`,
    price: '250.00',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: '400.00',
        priceCurrency: 'BRL',
        unitText: 'month',
        name: '2x por semana',
      },
      {
        '@type': 'UnitPriceSpecification',
        price: '250.00',
        priceCurrency: 'BRL',
        unitText: 'month',
        name: '1x por semana',
      },
    ],
  },
  {
    name: 'Grupo de Corrida',
    description:
      'Grupo de corrida de rua presencial 3x por semana (até 50 alunos) ou consultoria online de corrida, com acompanhamento do treino.',
    url: `${siteConfig.url}/grupo-corrida`,
    image: `${siteConfig.url}/images/grupo-corrida.jpg`,
    price: '50.00',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: '100.00',
        priceCurrency: 'BRL',
        unitText: 'month',
        name: 'Presencial 3x por semana',
      },
      {
        '@type': 'UnitPriceSpecification',
        price: '50.00',
        priceCurrency: 'BRL',
        unitText: 'month',
        name: 'Consultoria online',
      },
    ],
  },
  {
    name: 'Consultoria Online / App',
    description:
      'App de consultoria online com treino personalizado no celular, onde e quando quiser, com acompanhamento pelo professor.',
    url: `${siteConfig.url}/consultoria-online`,
    image: `${siteConfig.url}/images/consultoria-online.jpg`,
    price: '39.90',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: '39.90',
        priceCurrency: 'BRL',
        unitText: 'month',
        name: 'Assinatura mensal',
      },
    ],
  },
  {
    name: 'Desafio 15 Dias',
    description: 'Protocolo de perda de peso da VicentBOX com acompanhamento em 15 dias. Valor via WhatsApp.',
    url: `${siteConfig.url}/servicos`,
    image: `${siteConfig.url}/images/desafio-15-dias.jpg`,
    price: undefined as string | undefined,
    priceSpecification: undefined,
  },
  {
    name: 'Alongamento em Grupo',
    description: 'Sessão de alongamento em grupo de até 6 alunos por hora, no studio em Maringá.',
    url: `${siteConfig.url}/servicos`,
    image: `${siteConfig.url}/images/alongamento.jpg`,
    price: '120.00',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: '180.00',
        priceCurrency: 'BRL',
        unitText: 'month',
        name: '2x por semana',
      },
      {
        '@type': 'UnitPriceSpecification',
        price: '120.00',
        priceCurrency: 'BRL',
        unitText: 'month',
        name: '1x por semana',
      },
    ],
  },
  {
    name: 'Relaxamento Individual',
    description: 'Sessão de relaxamento individual, 1 aluno por hora, no studio VicentBOX.',
    url: `${siteConfig.url}/servicos`,
    image: `${siteConfig.url}/images/terapia-manual.jpg`,
    price: '150.00',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: '150.00',
        priceCurrency: 'BRL',
        unitText: 'hour',
        name: 'Por hora',
      },
    ],
  },
  {
    name: 'Palestras e Ações de Saúde',
    description: 'Palestras, eventos e ações de saúde e exercício físico para empresas e grupos. Orçamento via WhatsApp.',
    url: `${siteConfig.url}/servicos`,
    image: `${siteConfig.url}/images/palestras-saude.jpg`,
    price: '500.00',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: '500.00',
        priceCurrency: 'BRL',
        unitText: 'hour',
        name: 'Por hora',
      },
    ],
  },
];

function offerFromCatalog(item: (typeof catalogOffers)[number]) {
  const base = {
    '@type': 'Offer',
    name: item.name,
    description: item.description,
    url: item.url,
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    itemOffered: {
      '@type': 'Service',
      name: item.name,
      description: item.description,
      url: item.url,
      image: item.image,
      provider: providerRef,
      areaServed,
    } as Record<string, unknown>,
  };

  if (item.price) {
    return {
      ...base,
      price: item.price,
      ...(item.priceSpecification ? { priceSpecification: item.priceSpecification } : {}),
    };
  }

  return {
    ...base,
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'BRL',
      description: 'Valor informado no agendamento pelo WhatsApp',
    },
  };
}

export function generatePersonJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Fernando Serrano Vicentin',
    jobTitle: 'Personal Trainer',
    description:
      'Personal trainer em Maringá com 19 anos de experiência. Fundador da VicentBOX. Finalizando especialização em Educação Física na Saúde em Ambiente Hospitalar pela Escola de Medicina da USP — Hospital das Clínicas.',
    url: `${siteConfig.url}/sobre`,
    image: `${siteConfig.url}/images/sobre-fernando.jpg`,
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.name,
      '@id': LOCAL_BUSINESS_ID,
      url: siteConfig.url,
    },
    employer: {
      '@type': 'Organization',
      name: siteConfig.name,
      '@id': LOCAL_BUSINESS_ID,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zipCode,
      addressCountry: 'BR',
    },
    telephone: `+${siteConfig.phone}`,
    email: siteConfig.email,
    areaServed,
    knowsLanguage: 'pt-BR',
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
      siteConfig.social.youtube,
      siteConfig.googleBusinessProfile,
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Escola de Medicina da USP — Hospital das Clínicas',
      description: 'Especialização em Educação Física na Saúde em Ambiente Hospitalar (em andamento)',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Especialização em Educação Física na Saúde em Ambiente Hospitalar',
      credentialCategory: 'degree',
      description: 'Em andamento — Escola de Medicina da USP, Hospital das Clínicas (SP)',
    },
  };
}

export function generateLocalBusinessJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HealthAndBeautyBusiness', 'ExerciseGym'],
    '@id': LOCAL_BUSINESS_ID,
    name: siteConfig.name,
    alternateName: 'VicentBOX Personal Trainer',
    description:
      'Personal trainer e studio de treinamento personalizado em Maringá/PR. VicentBOX — Fernando Serrano Vicentin com 19 anos de experiência; empresa com 3 anos; especialização USP HC em andamento. Turmas de até 3 pessoas e terapia manual de 5 min.',
    url: siteConfig.url,
    telephone: `+${siteConfig.phone}`,
    email: siteConfig.email,
    address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.4231233,
      longitude: -51.9375232,
    },
    openingHoursSpecification,
    priceRange: 'R$ 39-500',
    currenciesAccepted: 'BRL',
    image: [
      `${siteConfig.url}/og-default.jpg`,
      `${siteConfig.url}/images/hero-personal-trainer.jpg`,
      `${siteConfig.url}/images/studio.jpg`,
      `${siteConfig.url}/images/sobre-fernando.jpg`,
    ],
    logo: `${siteConfig.url}/favicon.svg`,
    founder: generatePersonJSONLD(),
    employee: generatePersonJSONLD(),
    owner: generatePersonJSONLD(),
    areaServed,
    sameAs: [
      siteConfig.googleBusinessProfile,
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
      siteConfig.social.youtube,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços VicentBOX em Maringá',
      itemListElement: catalogOffers.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: offerFromCatalog(item),
      })),
    },
  };
}

export function generateServicesItemListJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Serviços da VicentBOX — Personal Trainer em Maringá',
    numberOfItems: services.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: services.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.shortDescription,
        url: service.ctaUrl.startsWith('http')
          ? `${siteConfig.url}/servicos`
          : `${siteConfig.url}${service.ctaUrl.startsWith('/') ? '' : '/'}${service.ctaUrl}`,
        image: service.image ? `${siteConfig.url}${service.image}` : undefined,
        provider: providerRef,
        areaServed,
        offers: {
          '@type': 'Offer',
          name: service.name,
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
          url: service.ctaUrl.startsWith('http')
            ? `${siteConfig.url}/servicos`
            : `${siteConfig.url}${service.ctaUrl.startsWith('/') ? '' : '/'}${service.ctaUrl}`,
          ...(service.priceDetails || service.price
            ? { description: [service.price, service.priceDetails].filter(Boolean).join(' — ') }
            : {}),
        },
      },
    })),
  };
}

export function generateServiceJSONLD(service: {
  name: string;
  description: string;
  price: string;
  url: string;
  image?: string;
}) {
  const numeric = service.price.replace(',', '.');
  const hasNumber = /\d/.test(numeric);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: providerRef,
    areaServed,
    ...(service.image && { image: `${siteConfig.url}${service.image}` }),
    offers: {
      '@type': 'Offer',
      name: service.name,
      description: service.description,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}${service.url}`,
      ...(hasNumber
        ? {
            price: (numeric.match(/[\d]+(?:\.\d+)?/) || ['0'])[0],
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: (numeric.match(/[\d]+(?:\.\d+)?/) || ['0'])[0],
              priceCurrency: 'BRL',
            },
          }
        : {
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'BRL',
              description: 'Valor informado no agendamento pelo WhatsApp',
            },
          }),
    },
  };
}

export function generateFAQPageJSONLD(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbListJSONLD(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateProductJSONLD(product: {
  name: string;
  description: string;
  price: number;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    ...(product.image && { image: `${siteConfig.url}${product.image}` }),
    offers: {
      '@type': 'Offer',
      name: product.name,
      price: product.price.toFixed(2),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}${product.url}`,
      seller: providerRef,
    },
  };
}

export function generateWebSiteJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: siteConfig.name,
    alternateName: 'VicentBOX Personal Trainer Maringá',
    url: siteConfig.url,
    inLanguage: 'pt-BR',
    description:
      'Personal trainer em Maringá: treinamento multifuncional, grupo de corrida, consultoria online e mais. Saúde aos 40+ com acompanhamento de perto.',
    publisher: {
      '@id': LOCAL_BUSINESS_ID,
    },
  };
}

export function generateWebPageJSONLD(options: {
  name: string;
  description?: string;
  url: string;
  type?: string;
  isPartOf?: boolean;
}) {
  const url = options.url.startsWith('http') ? options.url : `${siteConfig.url}${options.url}`;

  return {
    '@context': 'https://schema.org',
    '@type': options.type || 'WebPage',
    '@id': `${url}#webpage`,
    name: options.name,
    ...(options.description && { description: options.description }),
    url,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': WEBSITE_ID },
    ...(options.isPartOf !== false && { about: { '@id': LOCAL_BUSINESS_ID } }),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/og-default.jpg`,
    },
  };
}

export function generateAboutPageJSONLD(options: { name: string; description?: string; url: string }) {
  const url = options.url.startsWith('http') ? options.url : `${siteConfig.url}${options.url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#aboutpage`,
    name: options.name,
    ...(options.description && { description: options.description }),
    url,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    mainEntity: generatePersonJSONLD(),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/sobre-fernando.jpg`,
    },
  };
}

export function generateContactPageJSONLD(options: { name: string; description?: string; url: string }) {
  const url = options.url.startsWith('http') ? options.url : `${siteConfig.url}${options.url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contactpage`,
    name: options.name,
    ...(options.description && { description: options.description }),
    url,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': LOCAL_BUSINESS_ID },
    mainEntity: {
      '@type': 'Organization',
      '@id': LOCAL_BUSINESS_ID,
      name: siteConfig.name,
      telephone: `+${siteConfig.phone}`,
      email: siteConfig.email,
      address,
      openingHoursSpecification,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: `+${siteConfig.phone}`,
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: 'Portuguese',
        hoursAvailable: openingHoursSpecification,
      },
    },
  };
}

export function generateHomeReviewsJSONLD() {
  const reviews = [
    {
      author: 'roseli oliveira cordeiro',
      reviewBody:
        'Experiência incrível organização respeito equidade excelente profissional de educação física cujo nome é Fernando vc está de parabéns. Muito obrigada por sua dedicação a todos os participantes',
    },
    {
      author: 'Anita Naka',
      reviewBody: 'Muito bom profissional, atencioso. E ajudando na saude fisica e mental! Recomendo 100%',
    },
    {
      author: 'Carolina Siqueira',
      reviewBody:
        'Muito boa, professor atencioso e preocupado com a saúde dos alunos, em especial a minha por ser diabética.',
    },
  ];

  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@id': LOCAL_BUSINESS_ID,
      '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
      name: siteConfig.name,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: review.reviewBody,
  }));
}
