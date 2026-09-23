import { siteConfig } from '../types';

export function generateLocalBusinessJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    description: 'Studio de treinamento personalizado em Maringá/PR. Especialista em dores crônicas, desvios posturais, grupo de corrida e consultoria online. Fernando Serrano Vicentin - 19 anos de experiência, especialização USP HC.',
    url: siteConfig.url,
    telephone: `+55 ${siteConfig.phoneFormatted}`,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zipCode,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.4215,
      longitude: -51.9331,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '07:00',
        closes: '12:00',
      },
    ],
    priceRange: 'R$ 39,90 - R$ 500',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Cash, Credit Card, PIX, Bank Transfer',
    areaServed: {
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
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
      siteConfig.social.youtube,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços VicentBOX',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Treinamento Multifuncional',
            description: 'Elimine dores, corrija a postura e volte a se movimentar com segurança em turmas de até 3 pessoas com terapia manual.',
            provider: { '@type': 'LocalBusiness', name: siteConfig.name, '@id': `${siteConfig.url}/#localbusiness` },
          },
          price: '250',
          priceCurrency: 'BRL',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '250',
            priceCurrency: 'BRL',
            billingIncrement: '1',
            unitText: 'semana',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Grupo de Corrida',
            description: 'Corra com segurança, evolua seu pace e faça parte de uma comunidade. Presencial 3x/semana ou online.',
            provider: { '@type': 'LocalBusiness', name: siteConfig.name, '@id': `${siteConfig.url}/#localbusiness` },
          },
          price: '50',
          priceCurrency: 'BRL',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '50',
            priceCurrency: 'BRL',
            billingIncrement: '1',
            unitText: 'mês',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Consultoria Online / App',
            description: 'Treino personalizado no app com vídeos, progressão semanal, chat com professor e relatórios mensais.',
            provider: { '@type': 'LocalBusiness', name: siteConfig.name, '@id': `${siteConfig.url}/#localbusiness` },
          },
          price: '39.90',
          priceCurrency: 'BRL',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '39.90',
            priceCurrency: 'BRL',
            billingIncrement: '1',
            unitText: 'mês',
          },
        },
      ],
    },
  };
}

export function generateServiceJSONLD(service: {
  name: string;
  description: string;
  price: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      '@id': `${siteConfig.url}/#localbusiness`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Maringá',
    },
    offers: {
      '@type': 'Offer',
      name: service.name,
      description: service.description,
      price: service.price.replace(/[^\d.,]/g, '').replace(',', '.'),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}${service.url}`,
    },
    ...(service.image && { image: `${siteConfig.url}${service.image}` }),
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
    offers: {
      '@type': 'Offer',
      name: product.name,
      price: product.price.toFixed(2),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}${product.url}`,
      seller: {
        '@type': 'LocalBusiness',
        name: siteConfig.name,
        '@id': `${siteConfig.url}/#localbusiness`,
      },
    },
    ...(product.image && { image: `${siteConfig.url}${product.image}` }),
  };
}

export function generateWebSiteJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/busca?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}