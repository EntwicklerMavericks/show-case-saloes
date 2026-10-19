/**
 * Contrato de Dados e Catálogo de Temas — Vitrine Theodoro Digital
 * 
 * Estrutura refinada para espelhar com exatidão o layout de alta conversão
 * da referência visual (Bella Vita Hair Studio), mantendo a capacidade
 * dinâmica de troca instantânea entre as 3 identidades visuais conceituais.
 */

export type ThemeId = 'luxo-sofisticado' | 'moderno-feminino' | 'natural-contemporaneo';

export type ServiceIconType = 'scissors' | 'brush' | 'sparkles' | 'spa' | 'comb';
export type DifferentialIconType = 'diamond' | 'heart' | 'star' | 'map-pin';

export interface VisualTokens {
  // Cores de Fundo por Seção
  colorBgDark: string;          // Fundo das seções escuras (Header, Hero, Serviços, Galeria, Banner CTA, Footer)
  colorBgLight: string;         // Fundo das seções claras (Sobre Nós, Depoimentos)
  colorCardLight: string;       // Fundo dos cards na seção clara (depoimentos, caixas)
  colorCardDark: string;        // Fundo dos cards escuros

  // Textos
  colorTextOnDark: string;
  colorTextOnDarkMuted: string;
  colorTextOnLight: string;
  colorTextOnLightMuted: string;

  // Destaque / CTA
  colorAccent: string;          // Tom nude, rosé ou dourado dos botões e destaques
  colorAccentHover: string;
  colorAccentText: string;

  // Bordas
  colorBorderDark: string;
  colorBorderLight: string;

  // Tipografia
  fontHeading: string;
  fontBody: string;

  // Formato dos Botões
  radiusBtn: string;
  radiusCard: string;
}

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  shortName: string;
  concept: string;
  salonName: string;
  salonSubtitle: string;
  swatches: string[];
  badge: string;
}

export interface HeaderData {
  logoPrefix: string;
  logoHighlight: string;
  ctaText: string;
  ctaHref: string;
}

export interface HeroData {
  overline: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  heroImageUrl: string;
  heroImageAlt: string;
}

export interface ServiceItem {
  id: string;
  icon: ServiceIconType;
  title: string;
  subtitle: string;
  line1?: string;
  line2?: string;
}

export interface ServicesSectionData {
  items: [ServiceItem, ServiceItem, ServiceItem, ServiceItem, ServiceItem];
}

export interface DifferentialItem {
  id: string;
  icon: DifferentialIconType;
  title: string;
  line1: string;
  line2: string;
}

export interface AboutSectionData {
  overline: string;
  title: string;
  paragraph: string;
  ctaText: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
  differentials: [DifferentialItem, DifferentialItem, DifferentialItem, DifferentialItem];
}

export interface GalleryItem {
  id: string;
  url: string;
  alt: string;
}

export interface GallerySectionData {
  overline: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  items: [GalleryItem, GalleryItem, GalleryItem, GalleryItem];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  rating: number; // 5
}

export interface TestimonialsSectionData {
  overline: string;
  title: string;
  disclaimer: string;
  items: TestimonialItem[];
}

export interface SalonLocationData {
  address: string;
  neighborhood: string;
  city: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  mapsUrl: string;
}

export interface BookingFormData {
  overline: string;
  title: string;
  description: string;
  attendantName: string;
  attendantRole: string;
  attendantAvatar: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  benefits: [string, string, string];
  submitButtonText: string;
  location: SalonLocationData;
}

export interface CtaBannerData {
  overline: string;
  title: string;
  ctaText: string;
  ctaHref: string;
}

export interface FooterData {
  logoPrefix: string;
  logoHighlight: string;
  phone1: string;
  phone2: string;
  addressLine1: string;
  addressLine2: string;
  hoursTitle: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  socialTitle: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  copyright: string;
}

export interface Theme {
  meta: ThemeMeta;
  tokens: VisualTokens;
  header: HeaderData;
  hero: HeroData;
  services: ServicesSectionData;
  about: AboutSectionData;
  gallery: GallerySectionData;
  testimonials: TestimonialsSectionData;
  bookingForm: BookingFormData;
  ctaBanner: CtaBannerData;
  footer: FooterData;
}

export type ThemeCatalog = Record<ThemeId, Theme>;

export const THEME_DEFAULT_ID: ThemeId = 'luxo-sofisticado';

export const THEMES: ThemeCatalog = {
  'luxo-sofisticado': {
    meta: {
      id: 'luxo-sofisticado',
      name: 'Tema 1 — Luxo Sofisticado (Bella Vita)',
      shortName: 'Luxo Sofisticado',
      concept: 'Exclusividade, contraste dramático em preto e nude champanhe.',
      salonName: 'BELLA VITA',
      salonSubtitle: 'HAIR STUDIO',
      swatches: ['#0A0A0A', '#141414', '#E8C5B0', '#EFECE6'],
      badge: 'Referência Visual Exata',
    },
    tokens: {
      colorBgDark: '#0A0A0A',
      colorBgLight: '#EFECE6',
      colorCardLight: '#FFFFFF',
      colorCardDark: '#141414',
      colorTextOnDark: '#FFFFFF',
      colorTextOnDarkMuted: '#A3A3A3',
      colorTextOnLight: '#1A1A1A',
      colorTextOnLightMuted: '#5C5550',
      colorAccent: '#E8C5B0',
      colorAccentHover: '#DFC0AB',
      colorAccentText: '#1A1A1A',
      colorBorderDark: '#262626',
      colorBorderLight: '#DDD7CE',
      fontHeading: "'Playfair Display', Georgia, serif",
      fontBody: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      radiusBtn: '2px',
      radiusCard: '8px',
    },
    header: {
      logoPrefix: 'BELLA VITA',
      logoHighlight: 'HAIR STUDIO',
      ctaText: 'AGENDAR HORÁRIO',
      ctaHref: '#agendamento',
    },
    hero: {
      overline: 'MAIS QUE CABELOS. É SOBRE VOCÊ',
      title: 'Realce a sua melhor versão',
      description: 'No Bella Vita Hair Studio, cada detalhe é pensado para valorizar sua beleza, com atendimento exclusivo, profissionais experientes e um ambiente que inspira bem-estar.',
      ctaText: 'AGENDAR HORÁRIO →',
      ctaHref: '#agendamento',
      heroImageUrl: '/images/hero-model-bella-vita.jpg',
      heroImageAlt: 'Modelo Bella Vita com ondas morena iluminada em tom avelã e caramelo com acabamento editorial',
    },
    services: {
      items: [
        {
          id: 's1',
          icon: 'scissors',
          title: 'CORTE',
          subtitle: 'Estilo e personalidade em cada detalhe',
          line1: 'Estilo e personalidade',
          line2: 'em cada detalhe',
        },
        {
          id: 's2',
          icon: 'brush',
          title: 'COLORAÇÃO',
          subtitle: 'Cores que realçam a sua beleza',
          line1: 'Cores que realçam',
          line2: 'a sua beleza',
        },
        {
          id: 's3',
          icon: 'sparkles',
          title: 'MECHAS',
          subtitle: 'Iluminação na medida certa para você',
          line1: 'Iluminação na medida',
          line2: 'certa para você',
        },
        {
          id: 's4',
          icon: 'spa',
          title: 'TRATAMENTOS',
          subtitle: 'Cabelos mais saudáveis, fortes e brilhantes',
          line1: 'Cabelos mais saudáveis,',
          line2: 'fortes e brilhantes',
        },
        {
          id: 's5',
          icon: 'comb',
          title: 'ESCOVA',
          subtitle: 'Beleza e praticidade no seu dia a dia',
          line1: 'Beleza e praticidade',
          line2: 'no seu dia a dia',
        },
      ],
    },
    about: {
      overline: 'SOBRE NÓS',
      title: 'Beleza, cuidado e autoestima',
      paragraph: 'Somos mais que um salão, somos um espaço de transformação. Aqui, unimos técnica, tendências e atendimento personalizado para que você se sinta bem, linda e confiante em todas as fases da sua vida.',
      ctaText: 'CONHEÇA NOSSA HISTÓRIA →',
      ctaHref: '#agendamento',
      imageUrl: '/images/salon-interior-bella-vita.jpg',
      imageAlt: 'Ambiente interno do Bella Vita Hair Studio com espelhos circulares iluminados e poltronas modernas',
      differentials: [
        { id: 'd1', icon: 'diamond', title: 'Profissionais especializados', line1: 'Profissionais', line2: 'especializados' },
        { id: 'd2', icon: 'heart', title: 'Produtos de alta qualidade', line1: 'Produtos de', line2: 'alta qualidade' },
        { id: 'd3', icon: 'star', title: 'Ambiente confortável e sofisticado', line1: 'Ambiente confortável', line2: 'e sofisticado' },
        { id: 'd4', icon: 'map-pin', title: 'Localização privilegiada', line1: 'Localização', line2: 'privilegiada' },
      ],
    },
    gallery: {
      overline: 'NOSSO TRABALHO',
      title: 'Resultados que falam por si',
      description: 'Cada cabelo é único. E é por isso que nosso trabalho é personalizado, do seu jeito, com o seu estilo.',
      ctaText: 'VER MAIS NA GALERIA →',
      ctaHref: '#agendamento',
      items: [
        {
          id: 'g1',
          url: '/images/gallery-bella-1.jpg',
          alt: 'Cabelo loiro com ondas perfeitas visto de costas em salão de luxo',
        },
        {
          id: 'g2',
          url: '/images/gallery-bella-2.jpg',
          alt: 'Ritual de lavatório e massagem capilar premium com produtos de alta performance',
        },
        {
          id: 'g3',
          url: '/images/gallery-bella-3.jpg',
          alt: 'Corte french bob moderno de precisão com acabamento espelhado em morena',
        },
        {
          id: 'g4',
          url: '/images/gallery-bella-4.jpg',
          alt: 'Ondas morena iluminada com reflexos avelã e acabamento de seda',
        },
      ],
    },
    testimonials: {
      overline: 'DEPOIMENTOS',
      title: 'O que nossas clientes dizem',
      disclaimer: 'Depoimentos demonstrativos da vitrine digital Theodoro Digital.',
      items: [
        {
          id: 't1',
          quote: 'O atendimento é impecável, sempre saio daqui me sentindo mais linda e confiante!',
          clientName: 'Mariana S.',
          rating: 5,
        },
        {
          id: 't2',
          quote: 'Profissionais incríveis, ambiente super agradável e um resultado sempre maravilhoso!',
          clientName: 'Juliana R.',
          rating: 5,
        },
        {
          id: 't3',
          quote: 'É o meu lugar favorito! O cuidado e a atenção aos detalhes fazem toda a diferença.',
          clientName: 'Camila T.',
          rating: 5,
        },
        {
          id: 't4',
          quote: 'Minhas mechas nunca ficaram tão naturais e saudáveis. O tom champagne é deslumbrante!',
          clientName: 'Fernanda Lima',
          rating: 5,
        },
        {
          id: 't5',
          quote: 'A consultoria de visagismo antes do corte transformou minha autoestima por completo.',
          clientName: 'Patrícia Alencar',
          rating: 5,
        },
        {
          id: 't6',
          quote: 'O ritual de tratamento com ozonioterapia salvou meus fios do ressecamento.',
          clientName: 'Beatriz Mendonça',
          rating: 5,
        },
        {
          id: 't7',
          quote: 'Espaço elegante, pontualidade britânica e profissionais de nível internacional.',
          clientName: 'Carolina Castro',
          rating: 5,
        },
        {
          id: 't8',
          quote: 'A escova modelada dura dias com um brilho espelhado que impressiona a todos.',
          clientName: 'Renata Vasconcelos',
          rating: 5,
        },
        {
          id: 't9',
          quote: 'Ambiente exclusivo e acolhedor. Fazer o cabelo aqui é uma verdadeira experiência de spa.',
          clientName: 'Larissa Fontes',
          rating: 5,
        },
        {
          id: 't10',
          quote: 'Fiz a transição para morena iluminada aqui e recebi elogios de todos. Recomendo muito!',
          clientName: 'Vanessa Prado',
          rating: 5,
        },
      ],
    },
    bookingForm: {
      overline: 'AGENDAMENTO EXCLUSIVO',
      title: 'Reserve seu momento de cuidado e transformação',
      description: 'Escolha o serviço desejado e finalize a confirmação do seu horário diretamente com a nossa concierge via WhatsApp.',
      attendantName: 'Juliana Mendes',
      attendantRole: 'Concierge Bella Vita',
      attendantAvatar: '/images/attendant-juliana.jpg',
      whatsappNumber: '5511933565640',
      whatsappDisplay: '(11) 93356-5640',
      benefits: [
        'Atendimento individualizado com consultoria de imagem',
        'Produtos de alta performance e rituais exclusivos',
        'Confirmação rápida da data e do horário ideal para você',
      ],
      submitButtonText: 'Enviar Pedido para o WhatsApp',
      location: {
        address: 'Rua Oscar Freire, 920',
        neighborhood: 'Jardins',
        city: 'São Paulo - SP',
        fullAddress: 'Rua Oscar Freire, 920 - Jardins, São Paulo - SP',
        latitude: -23.5615,
        longitude: -46.6698,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Oscar+Freire+920+Jardins+Sao+Paulo',
      },
    },
    ctaBanner: {
      overline: 'PRONTA PARA SE SENTIR AINDA MAIS LINDA?',
      title: 'Agende seu horário agora!',
      ctaText: 'AGENDAR HORÁRIO →',
      ctaHref: '#agendamento',
    },
    footer: {
      logoPrefix: 'BELLA VITA',
      logoHighlight: 'HAIR STUDIO',
      phone1: '(11) 93356-5640',
      phone2: '(11) 93356-5640',
      addressLine1: 'Rua Oscar Freire, 920 - Jardins',
      addressLine2: 'São Paulo - SP',
      hoursTitle: 'Horário de atendimento',
      hoursWeekdays: 'Segunda a Sexta: 9h às 19h',
      hoursSaturday: 'Sábado: 9h às 15h',
      socialTitle: 'Acompanhe nosso trabalho',
      instagramUrl: 'https://instagram.com',
      facebookUrl: 'https://facebook.com',
      tiktokUrl: 'https://tiktok.com',
      copyright: '© 2026 Bella Vita Hair Studio. Todos os direitos reservados.',
    },
  },

  'moderno-feminino': {
    meta: {
      id: 'moderno-feminino',
      name: 'Tema 2 — Moderno e Feminino (Lumina Studio)',
      shortName: 'Moderno & Feminino',
      concept: 'Tons quentes de terracota, acolhimento e autoestima radiante.',
      salonName: 'LUMINA',
      salonSubtitle: 'STUDIO & GLOW',
      swatches: ['#1C1615', '#241D1C', '#C86D56', '#F7F2EE'],
      badge: 'Visual Quente e Acolhedor',
    },
    tokens: {
      colorBgDark: '#1C1615',
      colorBgLight: '#F7F2EE',
      colorCardLight: '#FFFFFF',
      colorCardDark: '#261F1E',
      colorTextOnDark: '#FFFFFF',
      colorTextOnDarkMuted: '#B8A8A2',
      colorTextOnLight: '#2D2321',
      colorTextOnLightMuted: '#6B5E59',
      colorAccent: '#C86D56',
      colorAccentHover: '#B55D46',
      colorAccentText: '#FFFFFF',
      colorBorderDark: '#3A2E2C',
      colorBorderLight: '#E8DDD6',
      fontHeading: "'Playfair Display', Georgia, serif",
      fontBody: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      radiusBtn: '9999px',
      radiusCard: '16px',
    },
    header: {
      logoPrefix: 'LUMINA',
      logoHighlight: 'STUDIO & GLOW',
      ctaText: 'AGENDAR HORÁRIO',
      ctaHref: '#agendamento',
    },
    hero: {
      overline: 'LEVEZA, COR E AUTOESTIMA',
      title: 'Cabelos luminosos e cheios de vida',
      description: 'No Lumina Studio, valorizamos sua personalidade com técnicas modernas de iluminação, tratamentos restauradores e um acolhimento pensado no seu conforto.',
      ctaText: 'AGENDAR PELO WHATSAPP →',
      ctaHref: '#agendamento',
      heroImageUrl: '/images/hero-model-lumina.jpg',
      heroImageAlt: 'Modelo Lumina Studio com balayage dourada e sorriso radiante e acolhedor',
    },
    services: {
      items: [
        {
          id: 's1',
          icon: 'sparkles',
          title: 'SUN KISS',
          subtitle: 'Mechas em degradê com efeito de sol natural',
          line1: 'Mechas em degradê',
          line2: 'efeito de sol natural',
        },
        {
          id: 's2',
          icon: 'scissors',
          title: 'CORTE EM CAMADAS',
          subtitle: 'Leveza e movimento que valorizam seus traços',
          line1: 'Leveza e movimento',
          line2: 'que valorizam você',
        },
        {
          id: 's3',
          icon: 'spa',
          title: 'SPA DO GLOW',
          subtitle: 'Nutrição profunda e brilho acetinado',
          line1: 'Nutrição profunda',
          line2: 'e brilho acetinado',
        },
        {
          id: 's4',
          icon: 'brush',
          title: 'MAKE & SOBRANCELHA',
          subtitle: 'Beleza fresh e harmonização facial delicada',
          line1: 'Beleza fresh e',
          line2: 'harmonização facial',
        },
        {
          id: 's5',
          icon: 'comb',
          title: 'STYLING ONDULADO',
          subtitle: 'Ondas volumosas para ocasiões especiais',
          line1: 'Ondas volumosas',
          line2: 'para ocasiões especiais',
        },
      ],
    },
    about: {
      overline: 'NOSSO REFÚGIO',
      title: 'Um espaço pensado no seu bem-estar',
      paragraph: 'Acreditamos que cuidar dos cabelos é um ritual de amor-próprio. Criamos um estúdio contemporâneo com luz natural, aromaterapia suave e uma equipe pronta para realçar o que há de mais belo em você.',
      ctaText: 'CONHEÇA NOSSO ESPAÇO →',
      ctaHref: '#agendamento',
      imageUrl: '/images/about-interior-lumina.jpg',
      imageAlt: 'Ambiente aconchegante com espelhos redondos retroiluminados e poltronas de veludo no Lumina Studio',
      differentials: [
        { id: 'd1', icon: 'diamond', title: 'Visagismo contemporâneo', line1: 'Visagismo', line2: 'contemporâneo' },
        { id: 'd2', icon: 'heart', title: 'Cosméticos cruelty-free e suaves', line1: 'Cosméticos', line2: 'cruelty-free' },
        { id: 'd3', icon: 'star', title: 'Aromaterapia e chás botânicos', line1: 'Aromaterapia', line2: 'e chás botânicos' },
        { id: 'd4', icon: 'map-pin', title: 'Fácil acesso e estacionamento', line1: 'Fácil acesso', line2: 'e estacionamento' },
      ],
    },
    gallery: {
      overline: 'TRANSFORMAÇÕES REAIS',
      title: 'Inspirações do nosso dia a dia',
      description: 'Veja como unimos saúde dos fios, texturas modernas e luminosidade para criar resultados encantadores.',
      ctaText: 'VER MAIS NO INSTAGRAM →',
      ctaHref: '#agendamento',
      items: [
        {
          id: 'g1',
          url: '/images/gallery-lumina-1.jpg',
          alt: 'Cliente com mechas mel e ondas luminosas em cadeira de salão moderno',
        },
        {
          id: 'g2',
          url: '/images/gallery-lumina-2.jpg',
          alt: 'Nail art e manicure em tons terracota e nude segurando sérum botânico',
        },
        {
          id: 'g3',
          url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
          alt: 'Pele iluminada e maquiagem glow em ambiente acolhedor',
        },
        {
          id: 'g4',
          url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
          alt: 'Pincéis e maquiagens finas sobre toucador claro',
        },
      ],
    },
    testimonials: {
      overline: 'DEPOIMENTOS',
      title: 'O carinho das nossas clientes',
      disclaimer: 'Depoimentos demonstrativos da vitrine digital Theodoro Digital.',
      items: [
        {
          id: 't1',
          quote: 'O corte em camadas deu um caimento leve e prático que consigo arrumar em 5 minutos todos os dias.',
          clientName: 'Carla Peixoto',
          rating: 5,
        },
        {
          id: 't2',
          quote: 'O efeito Sun Kiss é surreal de natural! Cabelo iluminado e sem aquela sensação ressecada.',
          clientName: 'Beatriz Vasconcelos',
          rating: 5,
        },
        {
          id: 't3',
          quote: 'Um ambiente que transmite paz. O cronograma glow recuperou o brilho e a maciez dos meus fios!',
          clientName: 'Mariana Duarte',
          rating: 5,
        },
        {
          id: 't4',
          quote: 'A combinação de make glow com o styling ondulado foi a escolha perfeita para o meu evento.',
          clientName: 'Gabriela Ramos',
          rating: 5,
        },
        {
          id: 't5',
          quote: 'Equipe super atenciosa, música boa e um café delicioso. Dá vontade de morar no salão!',
          clientName: 'Sofia Nogueira',
          rating: 5,
        },
        {
          id: 't6',
          quote: 'Meu corte borboleta ficou com um movimento impecável. Super recomendo o estúdio!',
          clientName: 'Aline Cerqueira',
          rating: 5,
        },
        {
          id: 't7',
          quote: 'A iluminação quente nos fios destacou a cor dos meus olhos de um jeito surpreendente.',
          clientName: 'Lorena Maia',
          rating: 5,
        },
        {
          id: 't8',
          quote: 'Harmonização facial e sobrancelhas com acabamento extremamente delicado e natural.',
          clientName: 'Helena Pires',
          rating: 5,
        },
        {
          id: 't9',
          quote: 'A cada visita saio mais apaixonada pelo meu reflexo no espelho. Elas entendem o que a gente pede!',
          clientName: 'Daniela Faria',
          rating: 5,
        },
        {
          id: 't10',
          quote: 'Tratamentos modernos e produtos cheirosos. O brilho acetinado do cabelo dura semanas!',
          clientName: 'Isabela Monteiro',
          rating: 5,
        },
      ],
    },
    bookingForm: {
      overline: 'SEU MOMENTO DE BRILHO',
      title: 'Agende sua experiência com nossas especialistas',
      description: 'Conte pra gente a transformação que você deseja e receba o atendimento personalizado da nossa equipe pelo WhatsApp.',
      attendantName: 'Camila Rocha',
      attendantRole: 'Recepção Lumina Studio',
      attendantAvatar: '/images/attendant-camila.jpg',
      whatsappNumber: '5511977770002',
      whatsappDisplay: '(11) 97777-0002',
      benefits: [
        'Visagismo moderno e valorização da sua beleza natural',
        'Espaço acolhedor com atendimento caloroso e dinâmico',
        'Horários flexíveis e confirmação imediata da agenda',
      ],
      submitButtonText: 'Enviar Pedido para o WhatsApp',
      location: {
        address: 'Rua Bela Cintra, 890',
        neighborhood: 'Vila Madalena',
        city: 'São Paulo - SP',
        fullAddress: 'Rua Bela Cintra, 890 - Vila Madalena, São Paulo - SP',
        latitude: -23.5558,
        longitude: -46.6612,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Bela+Cintra+890+Sao+Paulo',
      },
    },
    ctaBanner: {
      overline: 'VIVA ESSA EXPERIÊNCIA',
      title: 'Agende seu momento de cuidado hoje!',
      ctaText: 'AGENDAR HORÁRIO →',
      ctaHref: '#agendamento',
    },
    footer: {
      logoPrefix: 'LUMINA',
      logoHighlight: 'STUDIO & GLOW',
      phone1: '(11) 97777-0002',
      phone2: '(11) 97777-0002',
      addressLine1: 'Rua Bela Cintra, 890 - Vila Madalena',
      addressLine2: 'São Paulo - SP',
      hoursTitle: 'Horário de atendimento',
      hoursWeekdays: 'Terça a Sábado: 9h30 às 19h30',
      hoursSaturday: 'Segunda: 13h às 18h (Tratamentos)',
      socialTitle: 'Acompanhe nosso trabalho',
      instagramUrl: 'https://instagram.com',
      facebookUrl: 'https://facebook.com',
      tiktokUrl: 'https://tiktok.com',
      copyright: '© 2026 Lumina Studio & Glow. Todos os direitos reservados.',
    },
  },

  'natural-contemporaneo': {
    meta: {
      id: 'natural-contemporaneo',
      name: 'Tema 3 — Natural e Contemporâneo (Botânica)',
      shortName: 'Natural & Orgânico',
      concept: 'Tons terrosos, verde sálvia, fitoterapia e respeito às texturas naturais.',
      salonName: 'BOTÂNICA',
      salonSubtitle: 'CONCEPT SALON',
      swatches: ['#1A2219', '#242F23', '#4A5D45', '#F6F5F1'],
      badge: 'Conceito Eco-Chic e Bem-Estar',
    },
    tokens: {
      colorBgDark: '#1A2219',
      colorBgLight: '#F6F5F1',
      colorCardLight: '#FCFBF9',
      colorCardDark: '#232D22',
      colorTextOnDark: '#FFFFFF',
      colorTextOnDarkMuted: '#A6B3A4',
      colorTextOnLight: '#232B20',
      colorTextOnLightMuted: '#4F574C',
      colorAccent: '#4A5D45',
      colorAccentHover: '#3C4B37',
      colorAccentText: '#F7F6F2',
      colorBorderDark: '#2F3C2D',
      colorBorderLight: '#DCD6CB',
      fontHeading: "'Playfair Display', Georgia, serif",
      fontBody: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      radiusBtn: '8px',
      radiusCard: '12px',
    },
    header: {
      logoPrefix: 'BOTÂNICA',
      logoHighlight: 'CONCEPT SALON',
      ctaText: 'AGENDAR HORÁRIO',
      ctaHref: '#agendamento',
    },
    hero: {
      overline: 'BELEZA LIMPA E TERAPIAS BOTÂNICAS',
      title: 'A harmonia da natureza a favor da sua essência',
      description: 'Combinamos ciência fitoterápica a protocolos puros para revitalizar couro cabeludo e fios, respeitando a curvatura e a identidade de cada cliente.',
      ctaText: 'CONHECER RITUAIS BOTÂNICOS →',
      ctaHref: '#agendamento',
      heroImageUrl: '/images/hero-model-botanica.jpg',
      heroImageAlt: 'Modelo Botânica Concept com cachos naturais volumosos e definidos e beleza limpa',
    },
    services: {
      items: [
        {
          id: 's1',
          icon: 'spa',
          title: 'TRICOLOGIA & DETOX',
          subtitle: 'Argiloterapia e hidrolatos purificantes do couro',
          line1: 'Argiloterapia e hidrolatos',
          line2: 'purificantes do couro',
        },
        {
          id: 's2',
          icon: 'scissors',
          title: 'CORTE A SECO',
          subtitle: 'Esculpido para valorizar curvaturas e cachos vivos',
          line1: 'Esculpido para valorizar',
          line2: 'cachos e texturas vivas',
        },
        {
          id: 's3',
          icon: 'brush',
          title: 'COLORAÇÃO VEGETAL',
          subtitle: 'Pigmentos botânicos sem amônia nem químicas pesadas',
          line1: 'Pigmentos botânicos',
          line2: 'sem amônia nem químicos',
        },
        {
          id: 's4',
          icon: 'sparkles',
          title: 'ÓLEOS ESSENCIAIS',
          subtitle: 'Umectação profunda e massagem craniana ayurvédica',
          line1: 'Umectação profunda e',
          line2: 'massagem craniana ayurvédica',
        },
        {
          id: 's5',
          icon: 'comb',
          title: 'TERAPIA DE FIOS',
          subtitle: 'Reconstrução biológica à base de aminoácidos vegetais',
          line1: 'Reconstrução biológica',
          line2: 'à base de aminoácidos vegetais',
        },
      ],
    },
    about: {
      overline: 'NOSSA FILOSOFIA',
      title: 'Reconexão profunda com a beleza autêntica',
      paragraph: 'Romper com padrões tóxicos e resgatar o poder das formulações puras. Nosso salão é um santuário de luz solar, plantas vivas e rituais que respeitam o tempo da sua regeneração.',
      ctaText: 'NOSSO MANIFESTO →',
      ctaHref: '#agendamento',
      imageUrl: '/images/about-interior-botanica.jpg',
      imageAlt: 'Ambiente biofílico do Botânica com plantas pendentes, bancadas em carvalho e luz natural',
      differentials: [
        { id: 'd1', icon: 'diamond', title: 'Formulações 100% veganas e limpas', line1: 'Formulações', line2: '100% veganas' },
        { id: 'd2', icon: 'heart', title: 'Especialistas em transição capilar', line1: 'Especialistas em', line2: 'transição capilar' },
        { id: 'd3', icon: 'star', title: 'Ambiente biofílico com plantas vivas', line1: 'Ambiente com', line2: 'plantas vivas' },
        { id: 'd4', icon: 'map-pin', title: 'Compromisso com descarte ecológico', line1: 'Compromisso com', line2: 'descarte ecológico' },
      ],
    },
    gallery: {
      overline: 'NOSSAS VIVÊNCIAS',
      title: 'Texturas, plantas e resultados vivos',
      description: 'Veja como a abordagem holística valoriza a autenticidade e o movimento livre dos seus cabelos.',
      ctaText: 'VER MAIS NO PORTFÓLIO →',
      ctaHref: '#agendamento',
      items: [
        {
          id: 'g1',
          url: 'https://images.unsplash.com/photo-1512290900672-1f02e1b12b2a?auto=format&fit=crop&w=800&q=80',
          alt: 'Cachos definidos e hidratados com brilho vegetal',
        },
        {
          id: 'g2',
          url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
          alt: 'Massagem terapêutica do couro com óleos essenciais',
        },
        {
          id: 'g3',
          url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
          alt: 'Aplicação de máscara fitoterápica e argila pura',
        },
        {
          id: 'g4',
          url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
          alt: 'Espaço com plantas tropicais e iluminação natural acolhedora',
        },
      ],
    },
    testimonials: {
      overline: 'DEPOIMENTOS',
      title: 'A transformação da nossa comunidade',
      disclaimer: 'Depoimentos demonstrativos da vitrine digital Theodoro Digital.',
      items: [
        {
          id: 't1',
          quote: 'Depois de 10 anos alisando o cabelo, fiz minha transição capilar no Botânica. Minha autoestima renasceu.',
          clientName: 'Larissa Alencar',
          rating: 5,
        },
        {
          id: 't2',
          quote: 'O spa do couro cabeludo com aromaterapia é uma verdadeira renovação de energia. Tratamento sério e puro.',
          clientName: 'Gabriel Sampaio',
          rating: 5,
        },
        {
          id: 't3',
          quote: 'A coloração vegetal cobriu meus fios brancos de forma linda, deixando um tom canela brilhante.',
          clientName: 'Thaís Monteiro',
          rating: 5,
        },
        {
          id: 't4',
          quote: 'O corte a seco para cachos respeitou a minha curvatura e devolveu a definição que eu tinha perdido.',
          clientName: 'Camila Antunes',
          rating: 5,
        },
        {
          id: 't5',
          quote: 'A terapia com argila verde purificou o couro cabeludo e controlou a oleosidade logo no primeiro mês.',
          clientName: 'Lucas Bernardes',
          rating: 5,
        },
        {
          id: 't6',
          quote: 'Salão que realmente vive a sustentabilidade. Ambiente com plantas vivas, chá fresco e produtos limpos.',
          clientName: 'Bruna Figueiredo',
          rating: 5,
        },
        {
          id: 't7',
          quote: 'A massagem craniana com óleos essenciais é maravilhosa! Saio de cada sessão leve e renovada.',
          clientName: 'Juliana Paiva',
          rating: 5,
        },
        {
          id: 't8',
          quote: 'Reconstrução vegetal sem químicas agressivas. Meus cachos nunca estiveram tão nutridos e com vida.',
          clientName: 'Marina Guimarães',
          rating: 5,
        },
        {
          id: 't9',
          quote: 'Atendimento humanizado e que escuta a nossa história com o cabelo. Apaixonada pela proposta!',
          clientName: 'Renata Abreu',
          rating: 5,
        },
        {
          id: 't10',
          quote: 'A tintura botânica não causou nenhuma alergia na minha pele sensível e deu um brilho dourado incrível.',
          clientName: 'Letícia Vargas',
          rating: 5,
        },
      ],
    },
    bookingForm: {
      overline: 'RITUAIS DE BEM-ESTAR',
      title: 'Reserve seu horário no nosso refúgio botânico',
      description: 'Conecte-se com sua essência através de tratamentos orgânicos. Fale diretamente com nosso acolhimento no WhatsApp.',
      attendantName: 'Helena Castro',
      attendantRole: 'Atendimento Botânica',
      attendantAvatar: '/images/attendant-helena.jpg',
      whatsappNumber: '5511966660003',
      whatsappDisplay: '(11) 96666-0003',
      benefits: [
        'Cosméticos limpos, veganos e aromaterapia inclusa',
        'Diagnóstico personalizado da saúde do couro e fios',
        'Ritmo sereno com foco em bem-estar e relaxamento',
      ],
      submitButtonText: 'Enviar Pedido para o WhatsApp',
      location: {
        address: 'Rua Fradique Coutinho, 1150',
        neighborhood: 'Pinheiros',
        city: 'São Paulo - SP',
        fullAddress: 'Rua Fradique Coutinho, 1150 - Pinheiros, São Paulo - SP',
        latitude: -23.5583,
        longitude: -46.6908,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Fradique+Coutinho+1150+Pinheiros+Sao+Paulo',
      },
    },
    ctaBanner: {
      overline: 'RECONECTE-SE COM A SUA NATUREZA',
      title: 'Agende seu horário botânico agora!',
      ctaText: 'AGENDAR HORÁRIO →',
      ctaHref: '#agendamento',
    },
    footer: {
      logoPrefix: 'BOTÂNICA',
      logoHighlight: 'CONCEPT SALON',
      phone1: '(11) 96666-0003',
      phone2: '(11) 96666-0003',
      addressLine1: 'Rua Fradique Coutinho, 1150 - Pinheiros',
      addressLine2: 'São Paulo - SP',
      hoursTitle: 'Horário de atendimento',
      hoursWeekdays: 'Terça a Sábado: 9h às 19h',
      hoursSaturday: 'Domingo: 10h às 16h (Oficinas)',
      socialTitle: 'Acompanhe nosso trabalho',
      instagramUrl: 'https://instagram.com',
      facebookUrl: 'https://facebook.com',
      tiktokUrl: 'https://tiktok.com',
      copyright: '© 2026 Botânica Concept Salon. Todos os direitos reservados.',
    },
  },
};

export function getTheme(id: string): Theme {
  if (id in THEMES) {
    return THEMES[id as ThemeId];
  }
  return THEMES[THEME_DEFAULT_ID];
}

export function getAllThemes(): Theme[] {
  return Object.values(THEMES);
}
