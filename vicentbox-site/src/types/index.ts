export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription?: string;
  price: string;
  priceDetails?: string;
  features: string[];
  icon: string;
  image?: string;
  imageAlt?: string;
  ctaText: string;
  ctaType: 'whatsapp' | 'email';
  ctaUrl: string;
  priority: boolean;
  comingSoon?: boolean;
  jsonLdType?: 'Service' | 'Product';
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  avatar?: string;
  result?: string;
  service?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FormData {
  name: string;
  email?: string;
  phone: string;
  objective?: string;
  preferredTime?: string;
  subject?: string;
  message?: string;
  injuries?: string;
  source: 'treinamento' | 'corrida' | 'consultoria' | 'contato' | 'studio' | 'sobre';
  formType: 'whatsapp' | 'email';
}

export interface WhatsAppMessage {
  phone: string;
  message: string;
}

export interface TrackingEvent {
  event: string;
  parameters: Record<string, unknown>;
}

export interface JSONLD {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export interface SiteConfig {
  name: string;
  url: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    full: string;
  };
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
    youtube: string;
  };
  googleBusinessProfile: string;
  businessHours: {
    weekdays: string;
    weekdaysAlt?: string;
    saturday?: string;
    sunday?: string;
  };
  companyYears: number;
  experienceYears: number;
  ga4Id?: string;
  gtmId?: string;
  metaPixelId?: string;
  googleAdsConversionId?: string;
  googleAdsConversionLabel?: string;
  formspreeEndpoint?: string;
  googleSiteVerification?: string;
}

export const siteConfig: SiteConfig = {
  name: 'VicentBOX',
  url: 'https://vicentboxmga.com.br',
  phone: '5544999218147',
  phoneFormatted: '(44) 99921-8147',
  whatsappNumber: '5544999218147',
  email: 'vicentbox71@gmail.com',
  companyYears: 3,
  experienceYears: 19,
  address: {
    street: 'Rua Néo Alves Martins, 2447',
    neighborhood: 'Zona 01 - Centro',
    city: 'Maringá',
    state: 'PR',
    zipCode: '87013-913',
    full: 'Rua Néo Alves Martins, 2447 - Zona 01 - Centro, Maringá - PR, 87013-913',
  },
  social: {
    instagram: 'https://www.instagram.com/vicent_box',
    facebook: 'https://www.facebook.com/share/19MrJNc28k/',
    tiktok: 'https://www.tiktok.com/@vicentbox03',
    youtube: 'https://youtube.com/@prof.fernandoserrano8999',
  },
  googleBusinessProfile: 'https://www.google.com/maps?cid=6061027470552195231',
  businessHours: {
    weekdays: 'Seg, Qua e Sex: 7h às 18h',
    weekdaysAlt: 'Ter e Qui: 7h às 21h',
    saturday: 'Sábado: sob consulta',
    sunday: 'Domingo: sob consulta',
  } as SiteConfig['businessHours'],
  ga4Id: import.meta.env.GA4_MEASUREMENT_ID,
  gtmId: import.meta.env.GTM_CONTAINER_ID,
  metaPixelId: import.meta.env.META_PIXEL_ID,
  googleAdsConversionId: import.meta.env.GOOGLE_ADS_CONVERSION_ID,
  googleAdsConversionLabel: import.meta.env.GOOGLE_ADS_CONVERSION_LABEL,
  formspreeEndpoint: import.meta.env.FORMSPREE_ENDPOINT,
  googleSiteVerification: import.meta.env.GOOGLE_SITE_VERIFICATION,
};

export const services: Service[] = [
  {
    id: 'treinamento-multifuncional',
    name: 'Treinamento Multifuncional',
    shortDescription: 'Reduza dores, melhore a postura e volte a se movimentar com segurança em turmas de até 3 pessoas.',
    price: '2x/semana R$ 400 | 1x/semana R$ 250',
    priceDetails: 'Turmas reduzidas (máx. 3 alunos) com terapia manual ao final de cada sessão.',
    features: [
      'Avaliação inicial antes de começar',
      'Turma de até 3 alunos por hora',
      'Terapia manual de 5 minutos ao final de toda aula',
      'Foco em dores corporais, cansaço, fadiga e sobrepeso',
      'Exercícios personalizados para 40+ e saúde',
      'Atenção humanizada com acompanhamento próximo',
    ],
    icon: 'dumbbell',
    image: '/images/treinamento-multifuncional.jpg',
    imageAlt: 'Personal trainer com duas alunas em turma reduzida no studio VicentBOX',
    ctaText: 'Agendar Avaliação',
    ctaType: 'whatsapp',
    ctaUrl: '/treinamento-multifuncional',
    priority: true,
    jsonLdType: 'Service',
  },
  {
    id: 'grupo-corrida',
    name: 'Grupo de Corrida',
    shortDescription: 'Corrida de rua presencial 3x/semana ou consultoria online, com acompanhamento e comunidade.',
    price: 'Presencial 3x/sem R$ 100 | Online R$ 50/mês',
    priceDetails: 'Presencial: até 50 alunos/hora. Online: consultoria de corrida.',
    features: [
      'Grupo de corrida de rua presencial 3x por semana (R$ 100/mês)',
      'Consultoria online de corrida (R$ 50/mês)',
      'Acompanhamento do treino',
      'Para diferentes níveis de corredores',
      'Horários presenciais conforme agenda do grupo',
      'Iniciantes são bem-vindos',
    ],
    icon: 'running',
    image: '/images/grupo-corrida.jpg',
    imageAlt: 'Grupo de corredores treinando ao ar livre — Grupo de Corrida VicentBOX em Maringá',
    ctaText: 'Entrar no Grupo',
    ctaType: 'whatsapp',
    ctaUrl: '/grupo-corrida',
    priority: true,
    jsonLdType: 'Service',
  },
  {
    id: 'consultoria-online',
    name: 'Consultoria Online / App',
    shortDescription: 'App de consultoria online com treino personalizado — onde e quando quiser.',
    price: 'R$ 39,90/mês',
    priceDetails: 'Assinatura mensal do App de Consultoria Online.',
    features: [
      'App de consultoria online por R$ 39,90/mês',
      'Treino personalizado no celular',
      'Atendimento online (além do presencial)',
      'Acompanhamento pelo professor',
      'Onde e quando você quiser',
      'Sem contratos complexos (assinatura mensal)',
    ],
    icon: 'smartphone',
    image: '/images/consultoria-online.jpg',
    imageAlt: 'Aluna em aula online com o professor — consultoria VicentBOX pelo celular ou computador',
    ctaText: 'Começar Agora',
    ctaType: 'email',
    ctaUrl: '/consultoria-online',
    priority: true,
    jsonLdType: 'Product',
  },
  {
    id: 'desafio-15-dias',
    name: 'Desafio 15 Dias',
    shortDescription: 'Protocolo de perda de peso com acompanhamento em 15 dias.',
    price: 'Consulte no WhatsApp',
    priceDetails: 'Protocolo de perda de peso da VicentBOX.',
    features: [
      'Protocolo de perda de peso em 15 dias',
      'Acompanhamento durante o desafio',
      'Foco em voltar a se movimentar',
      'Turmas e inscrições via WhatsApp',
      'Formato de desafio com suporte',
      'Presencial em Maringá',
    ],
    icon: 'target',
    image: '/images/desafio-15-dias.jpg',
    imageAlt: 'Resultado de perda de peso — Desafio 15 Dias da VicentBOX',
    ctaText: 'Quero Participar',
    ctaType: 'whatsapp',
    ctaUrl: 'https://wa.me/5544999218147?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20VicentBOX.%20Tenho%20interesse%20no%20Desafio%2015%20Dias.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.',
    priority: false,
  },
  {
    id: 'alongamento-grupo',
    name: 'Alongamento em Grupo',
    shortDescription: 'Sessão de alongamento em grupo: até 6 alunos por hora.',
    price: '2x/semana R$ 180 | 1x/semana R$ 120',
    priceDetails: 'Sessão de Alongamento em Grupo — até 6 alunos/hora.',
    features: [
      'Sessão de alongamento em grupo',
      'Até 6 alunos por hora',
      '2x/semana R$ 180 ou 1x/semana R$ 120',
      'Alongamento guiado em turma',
      'Movimento com acompanhamento',
      'Presencial no studio em Maringá',
    ],
    icon: 'sparkles',
    image: '/images/alongamento.jpg',
    imageAlt: 'Sessão de alongamento em grupo no studio VicentBOX',
    ctaText: 'Agendar Sessão',
    ctaType: 'whatsapp',
    ctaUrl: 'https://wa.me/5544999218147?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20VicentBOX.%20Tenho%20interesse%20no%20Alongamento%20em%20Grupo.%20Gostaria%20de%20agendar.',
    priority: false,
  },
  {
    id: 'relaxamento-individual',
    name: 'Relaxamento Individual',
    shortDescription: 'Sessão individual de relaxamento: 1 aluno por hora.',
    price: 'R$ 150/hora',
    priceDetails: 'Sessão de Relaxamento Individual — 1 aluno/hora.',
    features: [
      'Sessão de relaxamento individual',
      '1 aluno por hora',
      'R$ 150 por hora',
      'Atendimento individualizado',
      'Ambiente no studio VicentBOX',
      'Agendamento via WhatsApp',
    ],
    icon: 'heart-pulse',
    image: '/images/terapia-manual.jpg',
    imageAlt: 'Sessão individual de relaxamento no studio VicentBOX',
    ctaText: 'Agendar Sessão',
    ctaType: 'whatsapp',
    ctaUrl: 'https://wa.me/5544999218147?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20VicentBOX.%20Tenho%20interesse%20no%20Relaxamento%20Individual.%20Gostaria%20de%20agendar.',
    priority: false,
  },
  {
    id: 'palestras-saude',
    name: 'Palestras e Ações de Saúde',
    shortDescription: 'Palestras, eventos e ações de saúde e exercício físico.',
    price: 'R$ 500/hora',
    priceDetails: 'Palestras Eventos e Ações de Saúde e Exercício Físico.',
    features: [
      'Palestras e eventos de saúde',
      'Ações de exercício físico',
      'R$ 500 por hora',
      'Conteúdo de movimento e qualidade de vida',
      'Para empresas e grupos',
      'Orçamento via WhatsApp ou formulário',
    ],
    icon: 'users',
    image: '/images/palestras-saude.jpg',
    imageAlt: 'Palestra de saúde e exercício físico com público em ambiente de treino',
    ctaText: 'Solicitar Orçamento',
    ctaType: 'whatsapp',
    ctaUrl: 'https://wa.me/5544999218147?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20VicentBOX.%20Gostaria%20de%20um%20or%C3%A7amento%20de%20Palestras%20e%20A%C3%A7%C3%B5es%20de%20Sa%C3%BAde.',
    priority: false,
  },
];

export const faqHome: FAQItem[] = [
  {
    question: 'Onde fica o studio da VicentBOX em Maringá?',
    answer: 'Rua Néo Alves Martins, 2447 — Zona 01 (Centro), Maringá/PR, CEP 87013-913. Segunda, quarta e sexta das 7h às 18h; terça e quinta das 7h às 21h. Demais dias sob consulta pelo WhatsApp.',
  },
  {
    question: 'Quanto custa o personal trainer na VicentBOX?',
    answer: 'Treinamento Multifuncional (turmas de até 3 pessoas): R$ 400/mês com 2x por semana ou R$ 250/mês com 1x por semana. Grupo de Corrida presencial: R$ 100/mês; online: R$ 50/mês. Consultoria online no app: R$ 39,90/mês. Avaliação com valor informado no agendamento pelo WhatsApp.',
  },
  {
    question: 'Como funciona a avaliação inicial?',
    answer: 'Agendamos uma avaliação para anamnese, testes de movimento, análise postural e definição de objetivos. A avaliação não é gratuita — os valores são informados no agendamento pelo WhatsApp. Sem compromisso de contratação de plano.',
  },
  {
    question: 'Para quem é o treinamento personalizado? Atende iniciantes e 40+?',
    answer: 'Sim. O método foi desenhado para quem está começando, voltando após pausa ou convivendo com dores, cansaço, fadiga, sobrepeso/obesidade — com destaque para mulheres a partir dos 40. Turmas de no máximo 3 alunos, com terapia manual de 5 minutos ao final de toda aula.',
  },
  {
    question: 'Preciso ter experiência em corrida para entrar no grupo?',
    answer: 'Não. Iniciantes são bem-vindos: a progressão respeita o seu nível. Também há consultoria online de corrida por R$ 50/mês para quem treina à distância.',
  },
  {
    question: 'Vocês atendem lesões, hérnia de disco ou condições crônicas?',
    answer: 'A avaliação inicial identifica restrições e o treino é prescrito respeitando o quadro. Em caso de dúvida, leve o laudo ou orientação do seu médico/fisioterapeuta para a primeira sessão.',
  },
];

export const faqTreinamento: FAQItem[] = [
  {
    question: 'Quais são os horários disponíveis?',
    answer: 'Segunda, quarta e sexta das 7h às 18h; terça e quinta das 7h às 21h. Demais horários sob consulta. A avaliação inicial é agendada conforme sua disponibilidade.',
  },
  {
    question: 'Preciso levar algum equipamento ou roupa especial?',
    answer: 'Apenas roupa confortável para exercício e tênis. Todo o equipamento é fornecido pelo studio.',
  },
  {
    question: 'Tenho hérnia de disco / artrose / outra condição. Posso fazer?',
    answer: 'Sim. A avaliação inicial identifica suas restrições e o treino é prescrito respeitando seu quadro. Em caso de dúvida, leve a orientação do seu médico ou fisioterapeuta.',
  },
  {
    question: 'Nunca treinei na vida. É para iniciantes?',
    answer: 'Sim. O método foi feito para quem está começando ou voltando após muito tempo. A progressão é individualizada e segura.',
  },
  {
    question: 'Como funciona a avaliação inicial?',
    answer: 'Agendamos uma sessão para anamnese, testes de movimento, análise postural e definição de objetivos. A avaliação tem valor informado no agendamento (não é gratuita) e sem compromisso de contratação de plano.',
  },
];

export const faqCorrida: FAQItem[] = [
  {
    question: 'Nunca corri. Consigo acompanhar o grupo?',
    answer: 'Sim. Iniciantes são bem-vindos e a progressão respeita o seu nível atual, começando de forma gradual e segura.',
  },
  {
    question: 'Preciso de tênis especial?',
    answer: 'Recomendamos tênis de corrida confortável. Orientamos na escolha na avaliação do grupo.',
  },
  {
    question: 'E se chouver no dia do treino presencial?',
    answer: 'Em caso de chuva forte, o treino é adaptado ou reagendado conforme combinado no grupo.',
  },
  {
    question: 'Quanto custa o grupo de corrida?',
    answer: 'Presencial 3x/semana: R$ 100/mês. Consultoria online de corrida: R$ 50/mês.',
  },
  {
    question: 'A versão online funciona igual a presencial?',
    answer: 'A consultoria online inclui o acompanhamento do treino, mas não substitui o treino presencial em grupo. A diferença é a ausência da sessão supervisionada presencial.',
  },
];

export const faqConsultoria: FAQItem[] = [
  {
    question: 'Como funciona o app de consultoria?',
    answer: 'É um app de consultoria online por R$ 39,90/mês, com treino personalizado adaptado ao local onde você treina e acompanhamento pelo professor — presencial e online.',
  },
  {
    question: 'E se eu não tiver academia? Tem treino para casa?',
    answer: 'Sim. Na avaliação inicial você informa onde treina (academia, casa, parque) e o treino é adaptado ao local e aos equipamentos disponíveis.',
  },
  {
    question: 'Como é o suporte do professor?',
    answer: 'O acompanhamento é feito pelo próprio professor, com suporte para dúvidas, adaptações por dor ou viagem, e motivação no dia a dia.',
  },
  {
    question: 'A consulta online funciona para quem treina fora do studio?',
    answer: 'Sim. O app de consultoria online (R$ 39,90/mês) atende quem prefere treinar à distância, com treino personalizado no celular e acompanhamento pelo professor.',
  },
  {
    question: 'Tenho lesão/condição médica. O treino é adaptado?',
    answer: 'Sim. Na avaliação inicial você detalha restrições e condições. O treino é prescrito respeitando seu quadro. Se precisar, leve laudo ou orientação do seu fisioterapeuta/médico.',
  },
];

export const problemsTreinamento = [
  'Dores corporais que limitam o seu dia a dia',
  'Cansaço e fadiga que derrubam sua energia',
  'Sobrepeso ou obesidade sem rumo definido',
  'Sedentarismo e medo de se machucar ao tentar voltar a treinar',
  'Falta de acompanhamento próximo e plano claro de ação',
];

export const benefitsTreinamento = [
  { icon: 'shield-check', title: 'Alívio das Dores', desc: 'Foco em reduzir dores corporais com exercícios adaptados ao seu quadro' },
  { icon: 'posture', title: 'Mais Mobilidade', desc: 'Exercícios personalizados para voltar a se movimentar com segurança' },
  { icon: 'dumbbell', title: 'Força para o Dia a Dia', desc: 'Ganho de força para atividades do dia a dia: carregar, levantar, brincar com netos' },
  { icon: 'user-check', title: 'Acompanhamento Próximo', desc: 'Turmas de até 3 pessoas — o professor corrige cada repetição' },
  { icon: 'users', title: 'Atenção Humanizada', desc: 'Grupo pequeno, mesmo objetivo, zero julgamento. Você não é "mais um número"' },
  { icon: 'heart-pulse', title: 'Terapia Manual em Toda Aula', desc: '5 minutos de terapia manual ao final de toda sessão, conforme o diferencial da VicentBOX' },
];

export const benefitsCorrida = [
  { icon: 'shield-check', title: 'Corra com Acompanhamento', desc: 'Acompanhamento do treino para evoluir com segurança no seu nível' },
  { icon: 'timer', title: 'Evolua seu Ritmo', desc: 'Progressão respeitando seu nível atual, do iniciante ao corredor experiente' },
  { icon: 'users', title: 'Comunidade que Apoia', desc: 'Grupo presencial 3x/semana com colegas de treino e motivação' },
  { icon: 'target', title: 'Opção Online', desc: 'Consultoria online de corrida por R$ 50/mês para treinar de onde quiser' },
  { icon: 'graduation-cap', title: 'Para Diferentes Níveis', desc: 'Produto da VicentBOX para iniciantes e corredores mais experientes' },
  { icon: 'smartphone', title: 'Acompanhamento Contínuo', desc: 'Acompanhamento do treino presencial ou online, conforme o formato escolhido' },
];

export const featuresConsultoria = [
  { icon: 'video', title: 'Treino Personalizado', desc: 'Treino montado para o seu objetivo, no celular — onde e quando quiser' },
  { icon: 'map-pin', title: 'Adaptado ao Local', desc: 'O treino se adapta ao local onde você treina (academia, casa, parque)' },
  { icon: 'message-circle', title: 'Acompanhamento do Professor', desc: 'Suporte direto com o professor para dúvidas, adaptações e motivação' },
  { icon: 'users', title: 'Assinatura Simples', desc: 'R$ 39,90/mês — consultoria online completa, sem contratos complexos' },
  { icon: 'dumbbell', title: 'Onde e Quando Quizer', desc: 'Academia, casa, hotel, parque. Treino personalizado no celular' },
  { icon: 'shield', title: 'Além do Presencial', desc: 'Atendimento online para alunos que preferem treinar à distância' },
];
