export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription?: string;
  price: string;
  priceDetails?: string;
  features: string[];
  icon: string;
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
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  ga4Id?: string;
  gtmId?: string;
  metaPixelId?: string;
  googleAdsConversionId?: string;
  googleAdsConversionLabel?: string;
  formspreeEndpoint?: string;
}

export const siteConfig: SiteConfig = {
  name: 'VicentBOX',
  url: 'https://vicentbox.com.br',
  phone: '5544999218147',
  phoneFormatted: '(44) 99921-8147',
  whatsappNumber: '5544999218147',
  email: 'vicentbox71@gmail.com',
  address: {
    street: 'Rua Néo Alves Martins, 2447',
    neighborhood: 'Zona 01 - Centro',
    city: 'Maringá',
    state: 'PR',
    zipCode: '87013-913',
    full: 'Rua Néo Alves Martins, 2447 - Zona 01 - Centro, Maringá - PR, 87013-913',
  },
  social: {
    instagram: 'https://instagram.com/vicentbox',
    facebook: 'https://facebook.com/vicentbox',
    tiktok: 'https://tiktok.com/@vicentbox',
    youtube: 'https://youtube.com/@vicentbox',
  },
  businessHours: {
    weekdays: 'Segunda a Sexta: 6h às 21h',
    saturday: 'Sábado: 7h às 12h',
    sunday: 'Domingo: Fechado',
  },
  ga4Id: import.meta.env.GA4_MEASUREMENT_ID,
  gtmId: import.meta.env.GTM_CONTAINER_ID,
  metaPixelId: import.meta.env.META_PIXEL_ID,
  googleAdsConversionId: import.meta.env.GOOGLE_ADS_CONVERSION_ID,
  googleAdsConversionLabel: import.meta.env.GOOGLE_ADS_CONVERSION_LABEL,
  formspreeEndpoint: import.meta.env.FORMSPREE_ENDPOINT,
};

export const services: Service[] = [
  {
    id: 'treinamento-multifuncional',
    name: 'Treinamento Multifuncional',
    shortDescription: 'Elimine dores, corrija a postura e volte a se movimentar com segurança em turmas de até 3 pessoas.',
    price: '2x/semana R$ 400 | 1x/semana R$ 250',
    priceDetails: 'Turmas reduzidas (máx. 3 alunos) com terapia manual ao final de cada sessão.',
    features: [
      'Avaliação postural e funcional completa',
      'Prescrição individualizada em grupo reduzido',
      'Terapia manual (5 min) ao final de cada sessão',
      'Acompanhamento de evolução quinzenal',
      'Foco em dores crônicas e desvios posturais',
      'Resultados perceptíveis em 30 dias',
    ],
    icon: 'dumbbell',
    ctaText: 'Agendar Avaliação Gratuita',
    ctaType: 'whatsapp',
    ctaUrl: '/treinamento-multifuncional',
    priority: true,
    jsonLdType: 'Service',
  },
  {
    id: 'grupo-corrida',
    name: 'Grupo de Corrida',
    shortDescription: 'Corra com segurança, evolua seu pace e faça parte de uma comunidade que se apoia.',
    price: 'Presencial 3x/sem R$ 100 | Online R$ 50/mês',
    priceDetails: 'Plano presencial: 3 treinos/semana + planilha + grupo WhatsApp. Online: planilha personalizada + suporte semanal.',
    features: [
      'Planilha personalizada para seu nível e objetivo',
      'Acompanhamento semanal de volume e intensidade',
      'Grupo WhatsApp ativo para dúvidas e motivação',
      'Prova alvo opcional (5k, 10k, 21k, 42k)',
      'Treinos educativos de técnica e força',
      'Comunidade acolhedora para todos os níveis',
    ],
    icon: 'running',
    ctaText: 'Entrar no Grupo',
    ctaType: 'whatsapp',
    ctaUrl: '/grupo-corrida',
    priority: true,
    jsonLdType: 'Service',
  },
  {
    id: 'consultoria-online',
    name: 'Consultoria Online / App',
    shortDescription: 'Treino personalizado na palma da mão — onde e quando quiser, com suporte direto do professor.',
    price: 'R$ 39,90/mês',
    priceDetails: 'Cancelamento livre a qualquer momento. Acesso vitalício aos treinos já entregues.',
    features: [
      'App com vídeos explicativos de cada exercício',
      'Progressão semanal automática baseada no seu feedback',
      'Chat de suporte direto com o professor',
      'Relatórios mensais de evolução e aderência',
      'Treinos para academia, casa ou ao ar livre',
      'Adaptação para lesões e restrições',
    ],
    icon: 'smartphone',
    ctaText: 'Começar Agora',
    ctaType: 'email',
    ctaUrl: '/consultoria-online',
    priority: true,
    jsonLdType: 'Product',
  },
  {
    id: 'desafio-15-dias',
    name: 'Desafio 15 Dias',
    shortDescription: 'Protocolo intensivo de emagrecimento e reeducação de hábitos com acompanhamento diário.',
    price: 'Sob consulta',
    priceDetails: 'Próxima turma em breve. Lista de espera aberta.',
    features: [
      'Protocolo alimentar simples e sustentável',
      'Treinos curtos (20 min) para fazer em casa',
      'Acompanhamento diário via WhatsApp',
      'Grupo de suporte e accountability',
      'Check-in de peso e medidas guiado',
      'Transição para rotina sustentável pós-desafio',
    ],
    icon: 'target',
    ctaText: 'Entrar na Lista de Espera',
    ctaType: 'whatsapp',
    ctaUrl: '/servicos',
    priority: false,
    comingSoon: true,
  },
  {
    id: 'alongamento-grupo',
    name: 'Alongamento em Grupo',
    shortDescription: 'Recupere mobilidade, alivie tensões e melhore a qualidade do sono em sessões guiadas.',
    price: '2x/semana R$ 180 | 1x/semana R$ 120',
    priceDetails: 'Turmas de até 6 pessoas. Foco em cadeias musculares e respiração.',
    features: [
      'Liberação miofascial e alongamento global',
      'Técnicas de respiração e relaxamento',
      'Foco em postura e mobilidade articular',
      'Turmas reduzidas (máx. 6 alunos)',
      'Ideal para quem passa muito tempo sentado',
      'Melhora qualidade do sono e disposição',
    ],
    icon: 'sparkles',
    ctaText: 'Agendar Aula Experimental',
    ctaType: 'whatsapp',
    ctaUrl: '/servicos',
    priority: false,
    comingSoon: true,
  },
  {
    id: 'relaxamento-individual',
    name: 'Relaxamento Individual',
    shortDescription: 'Sessão 1:1 de terapia manual, liberação miofascial e técnicas de relaxamento profundo.',
    price: 'R$ 150/hora',
    priceDetails: 'Sessão avulsa ou pacotes com desconto. Agendamento sob demanda.',
    features: [
      'Avaliação de pontos de tensão e dor',
      'Liberação miofascial e trigger points',
      'Mobilização articular suave',
      'Técnicas de respiração guiada',
      'Orientações de autocuidado para casa',
      'Ambiente silencioso e climatizado',
    ],
    icon: 'heart-pulse',
    ctaText: 'Agendar Sessão',
    ctaType: 'whatsapp',
    ctaUrl: '/servicos',
    priority: false,
    comingSoon: true,
  },
  {
    id: 'palestras-saude',
    name: 'Palestras Saúde Corporativa',
    shortDescription: 'Palestras e workshops sobre saúde, movimento, ergonomia e qualidade de vida para empresas.',
    price: 'R$ 500/hora',
    priceDetails: 'Presencial em Maringá/PR ou online para todo Brasil. Temas personalizados.',
    features: [
      'Ergonomia no trabalho e home office',
      'Prevenção de dores crônicas e LER/DORT',
      'Movimento como medicina: ciência e prática',
      'Saúde mental, sono e gestão de estresse',
      'Dinâmicas práticas de pausa ativa',
      'Material de apoio digital para colaboradores',
    ],
    icon: 'users',
    ctaText: 'Solicitar Orçamento',
    ctaType: 'whatsapp',
    ctaUrl: '/servicos',
    priority: false,
    comingSoon: true,
  },
  {
    id: 'sessoes-avulsas',
    name: 'Sessões Avulsas / Alongamento',
    shortDescription: 'Sessões individuais de alongamento assistido ou treinamento pontual sem compromisso mensal.',
    price: 'Sob consulta',
    priceDetails: 'Disponibilidade conforme agenda. Ideal para manutenção ou necessidades específicas.',
    features: [
      'Alongamento assistido personalizado',
      'Ajuste de técnica em exercícios específicos',
      'Reavaliação postural pontual',
      'Sem fidelidade ou mensalidade',
      'Agendamento flexível',
      'Pagamento por sessão realizada',
    ],
    icon: 'calendar',
    ctaText: 'Ver Disponibilidade',
    ctaType: 'whatsapp',
    ctaUrl: '/servicos',
    priority: false,
    comingSoon: true,
  },
];

export const faqTreinamento: FAQItem[] = [
  {
    question: 'Quais são os horários disponíveis?',
    answer: 'Temos turmas de segunda a sexta, das 6h às 21h, e sábados das 7h às 12h. A avaliação inicial é agendada conforme sua disponibilidade.',
  },
  {
    question: 'Preciso levar algum equipamento ou roupa especial?',
    answer: 'Apenas roupa confortável para exercício e tênis. Todo o equipamento (halteres, elásticos, colchonetes, bolas) é fornecido pelo studio.',
  },
  {
    question: 'Tenho hérnia de disco / artrose / outra condição. Posso fazer?',
    answer: 'Sim. A avaliação inicial identifica suas restrições e o treino é prescrito respeitando seu quadro clínico. Muitos alunos vêm encaminhados por fisioterapeutas e ortopedistas.',
  },
  {
    question: 'Nunca treinei na vida. É para iniciantes?',
    answer: 'Sim. O método foi feito para quem está começando ou voltando após muito tempo. A progressão é individualizada e segura.',
  },
  {
    question: 'Como funciona a avaliação gratuita?',
    answer: 'Agendamos 40 minutos para anamnese, testes de movimento, análise postural e definição de objetivos. Sem compromisso de contratação.',
  },
];

export const faqCorrida: FAQItem[] = [
  {
    question: 'Nunca corri. Consigo acompanhar o grupo?',
    answer: 'Sim. A planilha é 100% individualizada para seu nível atual. Iniciantes começam com caminhada + trotes curtos e progridem no próprio ritmo.',
  },
  {
    question: 'Preciso de tênis especial?',
    answer: 'Recomendamos tênis de corrida adequado ao seu tipo de pisada, mas para começar qualquer tênis esportivo confortável serve. Orientamos na escolha na avaliação.',
  },
  {
    question: 'E se chover no dia do treino presencial?',
    answer: 'Temos espaço coberto para treinos educativos e de força. Em caso de chuva forte, o treino é adaptado ou reagendado conforme combinado no grupo.',
  },
  {
    question: 'O grupo prepara para provas específicas (5k, 10k, meia, maratona)?',
    answer: 'Sim. Definimos a prova alvo juntos e a planilha é periodizada para o pico de performance na data da prova.',
  },
  {
    question: 'A versão online funciona igual a presencial?',
    answer: 'A planilha e o acompanhamento semanal são idênticos. A diferença é a ausência do treino presencial supervisionado. Muitos alunos online evoluem igual ou mais que os presenciais.',
  },
];

export const faqConsultoria: FAQItem[] = [
  {
    question: 'Como funciona o app? Preciso instalar algo?',
    answer: 'É um web app (PWA) que roda no navegador do celular. Você "instala" com um toque na tela inicial, sem precisar de loja de apps. Funciona offline após o primeiro carregamento.',
  },
  {
    question: 'E se eu não tiver academia? Tem treino para casa?',
    answer: 'Sim. Na onboarding você informa onde treina (academia, casa, parque, estúdio) e quais equipamentos tem. O app monta o treino com o que você tem disponível.',
  },
  {
    question: 'Como é o suporte do professor?',
    answer: 'Chat direto no app. Você manda dúvidas, vídeos de execução para correção, relata dores ou cansaço. Resposta em até 24h úteis, geralmente muito antes.',
  },
  {
    question: 'Posso cancelar quando quiser?',
    answer: 'Sim. Cancelamento livre, sem multa, direto no app ou respondendo um e-mail. O acesso permanece até o fim do período já pago.',
  },
  {
    question: 'Tenho lesão/condição médica. O treino é adaptado?',
    answer: 'Sim. No questionário inicial você detalha tudo. O treino é prescrito respeitando suas restrições. Se precisar, pedimos laudo ou orientação do seu fisioterapeuta/médico.',
  },
];

export const problemsTreinamento = [
  'Dores crônicas nas costas, joelhos ou ombros que limitam seu dia a dia',
  'Desvios posturais (hiperlordose, cifose, escoliose, cabeça anteriorizada)',
  'Sedentarismo e medo de se machucar ao tentar voltar a treinar',
  'Já tentou academias convencionais e não teve resultado ou se lesionou',
  'Falta de tempo e necessidade de treino eficiente e supervisionado',
];

export const benefitsTreinamento = [
  { icon: 'shield-check', title: 'Alívio das Dores', desc: 'Redução significativa de dores crônicas nas primeiras 4-6 semanas' },
  { icon: 'posture', title: 'Postura Corrigida', desc: 'Alinhamento postural progressivo com exercícios específicos e terapia manual' },
  { icon: 'dumbbell', title: 'Força Funcional', desc: 'Ganho de força para atividades do dia a dia: carregar, levantar, brincar com netos' },
  { icon: 'user-check', title: 'Acompanhamento Próximo', desc: 'Turmas de até 3 pessoas — o professor corrige cada repetição' },
  { icon: 'users', title: 'Ambiente Acolhedor', desc: 'Grupo pequeno, mesmo objetivo, zero julgamento. Você não é "mais um número"' },
  { icon: 'trending-up', title: 'Resultados em 30 Dias', desc: 'Protocolo testado: evolução mensurável em força, mobilidade e dor no primeiro mês' },
];

export const benefitsCorrida = [
  { icon: 'shield-check', title: 'Corra sem Se Machucar', desc: 'Progressão gradual de volume e intensidade previne lesões comuns de iniciantes' },
  { icon: 'timer', title: 'Evolua seu Pace', desc: 'Treinos polarizados (80/20) + força educativa = melhora consistente de velocidade' },
  { icon: 'users', title: 'Comunidade que Apoia', desc: 'Grupo WhatsApp ativo: dúvidas, conquistas, parceiros de treino, motivação diária' },
  { icon: 'target', title: 'Prova Alvo Personalizada', desc: 'Do 5k à maratona: periodização completa até sua prova dos sonhos' },
  { icon: 'graduation-cap', title: 'Aprenda a Correr Melhor', desc: 'Treinos educativos semanais: técnica, cadência, respiração, economia de corrida' },
  { icon: 'smartphone', title: 'Acompanhamento na Palma da Mão', desc: 'Planilha no app + feedback semanal do professor + ajustes baseados no seu dia a dia' },
];

export const featuresConsultoria = [
  { icon: 'video', title: 'Vídeos Explicativos', desc: 'Cada exercício tem demonstração em vídeo com pontos de atenção e erros comuns' },
  { icon: 'trending-up', title: 'Progressão Inteligente', desc: 'O app ajusta carga, volume e complexidade baseando no seu feedback semanal (RPE, dor, aderência)' },
  { icon: 'message-circle', title: 'Chat com o Professor', desc: 'Dúvidas de execução, adaptações por dor/viagem, motivação — resposta direta, sem robôs' },
  { icon: 'bar-chart', title: 'Relatórios Mensais', desc: 'Volume, frequência, evolução de cargas, aderência, pontos de atenção — tudo visual e simples' },
  { icon: 'dumbbell', title: 'Treino Onde Quiser', desc: 'Academia, casa, hotel, parque. O app adapta o treino aos equipamentos disponíveis no momento' },
  { icon: 'shield', title: 'Adaptação para Lesões', desc: 'Informe a restrição e o app reconstrói o treino evitando o movimento problemático' },
];