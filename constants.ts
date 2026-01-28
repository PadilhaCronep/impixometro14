
import { Justice, SenateSupport, PressureStatus, PoliticalAlignment, NewsItem } from './types';

export const JUSTICES: Justice[] = [
  {
    id: '6',
    name: 'Alexandre de Moraes',
    imageUrl: 'https://lh3.googleusercontent.com/d/1MsTGnH5T_GLdKJiRYhWvIAFDBPS94BaY',
    appointedBy: 'Michel Temer',
    appointmentYear: 2017,
    presidentParty: 'MDB',
    senateSupport: SenateSupport.LOW,
    politicalAlignment: PoliticalAlignment.SITUACAO,
    pressureScore: 85,
    status: PressureStatus.CRITICAL,
    trend: [80, 82, 85, 85, 85, 85, 85],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 900, stays: 400 })),
    openCases: 54
  },
  {
    id: '8',
    name: 'André Mendonça',
    imageUrl: 'https://lh3.googleusercontent.com/d/1b9ZOhGXs_BI91M3GwEZDxPT4oO_ysAwK',
    appointedBy: 'Jair Bolsonaro',
    appointmentYear: 2021,
    presidentParty: 'PL',
    senateSupport: SenateSupport.MEDIUM,
    politicalAlignment: PoliticalAlignment.OPOSICAO,
    pressureScore: 30,
    status: PressureStatus.STABLE,
    trend: [30, 30, 30, 30, 30, 30, 30],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 180, stays: 400 })),
    openCases: 2
  },
  {
    id: '2',
    name: 'Cármen Lúcia',
    imageUrl: 'https://lh3.googleusercontent.com/d/1uIgaTyzNXnVK8OX5OklybZ7jBdnuRMQQ',
    appointedBy: 'Lula',
    appointmentYear: 2006,
    presidentParty: 'PT',
    senateSupport: SenateSupport.HIGH,
    politicalAlignment: PoliticalAlignment.CENTRAO,
    pressureScore: 18,
    status: PressureStatus.STABLE,
    trend: [20, 19, 18, 18, 18, 18, 18],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 50, stays: 450 })),
    openCases: 1
  },
  {
    id: '9',
    name: 'Cristiano Zanin',
    imageUrl: 'https://lh3.googleusercontent.com/d/16DLHKA0ZNDnR8UJXUTvBGOr_rqjiNvJJ',
    appointedBy: 'Lula',
    appointmentYear: 2023,
    presidentParty: 'PT',
    senateSupport: SenateSupport.HIGH,
    politicalAlignment: PoliticalAlignment.SITUACAO,
    pressureScore: 15,
    status: PressureStatus.STABLE,
    trend: [15, 15, 15, 15, 15, 15, 15],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 60, stays: 300 })),
    openCases: 1
  },
  {
    id: '3',
    name: 'Dias Toffoli',
    imageUrl: 'https://lh3.googleusercontent.com/d/1iB3irR6_nKLjesR_NKNt2qYC2N0SmZxn',
    appointedBy: 'Lula',
    appointmentYear: 2009,
    presidentParty: 'PT',
    senateSupport: SenateSupport.LOW,
    politicalAlignment: PoliticalAlignment.SITUACAO,
    pressureScore: 92,
    status: PressureStatus.CRITICAL,
    trend: [80, 85, 88, 90, 92, 92, 92],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 800 + i * 20, stays: 150 })),
    openCases: 18
  },
  {
    id: '5',
    name: 'Edson Fachin',
    imageUrl: 'https://lh3.googleusercontent.com/d/181zWjXKfmCXezm5tWKRs4Jo4mY1FKTVB',
    appointedBy: 'Dilma Rousseff',
    appointmentYear: 2015,
    presidentParty: 'PT',
    senateSupport: SenateSupport.HIGH,
    politicalAlignment: PoliticalAlignment.SITUACAO,
    pressureScore: 25,
    status: PressureStatus.STABLE,
    trend: [30, 28, 25, 25, 25, 25, 25],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 120, stays: 400 })),
    openCases: 3
  },
  {
    id: '10',
    name: 'Flávio Dino',
    imageUrl: 'https://lh3.googleusercontent.com/d/16hNT1YOuCSI54iCpbkcJquWrl4N0JveU',
    appointedBy: 'Lula',
    appointmentYear: 2024,
    presidentParty: 'PT',
    senateSupport: SenateSupport.HIGH,
    politicalAlignment: PoliticalAlignment.SITUACAO,
    pressureScore: 45,
    status: PressureStatus.ATTENTION,
    trend: [40, 42, 45, 45, 45, 45, 45],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 300, stays: 400 })),
    openCases: 9
  },
  {
    id: '1',
    name: 'Gilmar Mendes',
    imageUrl: 'https://lh3.googleusercontent.com/d/1iB3irR6_nKLjesR_NKNt2qYC2N0SmZxn',
    appointedBy: 'FHC',
    appointmentYear: 2002,
    presidentParty: 'PSDB',
    senateSupport: SenateSupport.MEDIUM,
    politicalAlignment: PoliticalAlignment.SITUACAO,
    pressureScore: 68,
    status: PressureStatus.ATTENTION,
    trend: [60, 62, 65, 68, 67, 68, 68],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 400 + i * 10, stays: 300 })),
    openCases: 25
  },
  {
    id: '11',
    name: 'Jorge Messias (Indicado)',
    imageUrl: 'https://lh3.googleusercontent.com/d/17rnieebApsxPuHcsRq6duW8YxvVIFILL',
    appointedBy: 'Lula',
    appointmentYear: 2026,
    presidentParty: 'PT',
    senateSupport: SenateSupport.MEDIUM,
    politicalAlignment: PoliticalAlignment.SITUACAO,
    pressureScore: 50,
    status: PressureStatus.ATTENTION,
    trend: [50, 50, 50, 50, 50, 50, 50],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 100, stays: 100 })),
    openCases: 0
  },
  {
    id: '7',
    name: 'Kassio Nunes Marques',
    imageUrl: 'https://lh3.googleusercontent.com/d/1sHb_GS2LNIowO22wGpqMs2OQqzTsEM6_',
    appointedBy: 'Jair Bolsonaro',
    appointmentYear: 2020,
    presidentParty: 'PL',
    senateSupport: SenateSupport.MEDIUM,
    politicalAlignment: PoliticalAlignment.OPOSICAO,
    pressureScore: 35,
    status: PressureStatus.STABLE,
    trend: [35, 35, 35, 35, 35, 35, 35],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 200, stays: 350 })),
    openCases: 2
  },
  {
    id: '4',
    name: 'Luiz Fux',
    imageUrl: 'https://lh3.googleusercontent.com/d/1pJnhlGZWxLj06e3T32WK0VBnpdgH0QQ6',
    appointedBy: 'Dilma Rousseff',
    appointmentYear: 2011,
    presidentParty: 'PT',
    senateSupport: SenateSupport.MEDIUM,
    politicalAlignment: PoliticalAlignment.CENTRAO,
    pressureScore: 40,
    status: PressureStatus.STABLE,
    trend: [45, 42, 40, 40, 40, 40, 40],
    sentimentHistory: Array.from({ length: 7 }, (_, i) => ({ date: `${20 + i}-Jan`, falls: 150, stays: 200 })),
    openCases: 4
  }
];

export const NEWS_DATA: NewsItem[] = [
  // Gilmar Mendes
  { id: 'gm1', justiceId: '1', headline: 'Gilmar Mendes nega pedido de prisão domiciliar a Bolsonaro', excerpt: 'Decisão argumenta que habeas corpus foi apresentado por advogado não oficial da defesa.', source: 'Agência Brasil', date: '16 Jan 2026', type: 'Legal' },
  { id: 'gm2', justiceId: '1', headline: 'PGR arquiva afastamento de Toffoli e Gilmar elogia estabilidade', excerpt: 'Elogio reforça o funcionamento regular das instituições no caso Banco Master.', source: 'Terra', date: '21 Jan 2026', type: 'Political' },
  { id: 'gm3', justiceId: '1', headline: 'Redistribuição de HC de Bolsonaro por impedimento de Moraes', excerpt: 'Processo passa por nova relatoria devido ao recesso judiciário de Janeiro.', source: 'G1', date: '16 Jan 2026', type: 'Legal' },
  
  // Cármen Lúcia
  { id: 'cl1', justiceId: '2', headline: 'Cármen Lúcia nega HC coletivo para condenados do 8/1', excerpt: 'Ministra rejeita pedidos repetitivos e defende jurisprudência consolidada da Corte.', source: 'Correio Braziliense', date: '19 Jan 2026', type: 'Legal' },
  { id: 'cl2', justiceId: '2', headline: 'Rejeição de ADPF 1.283 sobre saques do FGTS', excerpt: 'Decisão monocrática sem conhecimento da arguição do partido Solidariedade.', source: 'Estadão', date: '16 Jan 2026', type: 'Legal' },
  { id: 'cl3', justiceId: '2', headline: 'Representação do STF em congresso sobre Judiciário Latino', excerpt: 'Ministra destaca temas de história e cultura institucional em evento internacional.', source: 'G1', date: '22 Jan 2026', type: 'Media' },

  // Dias Toffoli
  { id: 'dt1', justiceId: '3', headline: 'PGR arquiva pedidos de afastamento no caso Master', excerpt: 'Decisão de Paulo Gonet é vista como reforço ao devido processo legal.', source: 'Terra', date: '21 Jan 2026', type: 'Legal' },
  { id: 'dt2', justiceId: '3', headline: 'Toffoli determina lacre de bens na Compliance Zero', excerpt: 'Lacre de bens apreendidos e retenção de materiais surpreendem peritos e a PF.', source: 'BBC', date: '20 Jan 2026', type: 'Legal' },
  { id: 'dt3', justiceId: '3', headline: 'Novo pedido de impeachment por senadores em Janeiro', excerpt: 'O quarto pedido desde sua nomeação foca em relações com investigados.', source: 'Nexo Jornal', date: '23 Jan 2026', type: 'Political' },

  // Luiz Fux
  { id: 'lf1', justiceId: '4', headline: 'Fux pede saída da 1ª Turma e gera expectativa', excerpt: 'Pedido de realocação para a 2ª Turma visa ajustes após aposentadoria de Barroso.', source: 'CNN Brasil', date: '22 Jan 2026', type: 'Political' },
  { id: 'lf2', justiceId: '4', headline: 'Defesa de absolvição no núcleo de desinformação', excerpt: 'Fux criticou acadêmicos por ignorarem garantias constitucionais brasileiras.', source: 'GloboNews', date: '10 Jan 2026', type: 'Legal' },
  { id: 'lf3', justiceId: '4', headline: 'Deferimento para manter número de deputados em 2026', excerpt: 'Decisão evita redistribuição imediata de cadeiras parlamentares nos estados.', source: 'Senado Federal', date: '30 Set 2025', type: 'Political' },

  // Edson Fachin
  { id: 'ef1', justiceId: '5', headline: 'Fachin defende atuação de Toffoli publicamente', excerpt: 'Presidente do STF rejeita pressões políticas e midiáticas no caso Master.', source: 'Poder360', date: '22 Jan 2026', type: 'Political' },
  { id: 'ef2', justiceId: '5', headline: 'Nota técnica reafirma supervisão judicial no STF', excerpt: 'Fachin enfatiza que a corte não se curva a ameaças ou pressões de investigados.', source: 'Agência Brasil', date: '22 Jan 2026', type: 'Political' },
  { id: 'ef3', justiceId: '5', headline: 'Fachin encurta férias para sondar pedidos de suspeição', excerpt: 'Tensão interna reportada enquanto presidente analisa pedidos contra Toffoli.', source: 'Folha', date: '20 Jan 2026', type: 'Media' },

  // Alexandre de Moraes
  { id: 'am1', justiceId: '6', headline: 'Fiscalização de 43 pedidos de impeachment no Senado', excerpt: 'Moraes lidera volume de pedidos arquivados ou suspensos pela regra Gilmar.', source: 'G1', date: '25 Dez 2025', type: 'Political' },
  { id: 'am2', justiceId: '6', headline: 'Ato STF pela democracia: 3 anos dos atos de 8/1', excerpt: 'Fachin e Moraes exaltam a defesa das instituições em evento oficial.', source: 'Estadão', date: '08 Jan 2026', type: 'Media' },

  // Outros
  { id: 'gen1', justiceId: 'general', headline: 'Câmara tem 39 projetos para restringir ações do STF', excerpt: 'Legislativo intensifica pressão para limitar decisões monocráticas da corte.', source: 'CNN', date: '24 Jan 2026', type: 'Political' },
  { id: 'gen2', justiceId: 'general', headline: 'Regra Gilmar mantém 10+ pedidos de impeachment parados', excerpt: 'Status de todos os pedidos contra ministros permanecem suspensos no Senado.', source: 'Migalhas', date: '25 Jan 2026', type: 'Legal' }
];

export const COLORS = {
  PRIMARY: '#F9CC18',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  CRITICAL: '#EF4444',
  ATTENTION: '#FBBF24',
  STABLE: '#22C55E'
};
