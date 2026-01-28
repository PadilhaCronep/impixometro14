
export enum SenateSupport {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum PressureStatus {
  STABLE = 'STABLE',
  ATTENTION = 'ATTENTION',
  CRITICAL = 'CRITICAL'
}

export enum Alignment {
  SUPPORT = 'SUPPORT',
  NEUTRAL = 'NEUTRAL',
  OPPOSITION = 'OPPOSITION'
}

export enum PoliticalAlignment {
  SITUACAO = 'SITUACAO',
  OPOSICAO = 'OPOSICAO',
  CENTRAO = 'CENTRAO'
}

export interface Justice {
  id: string;
  name: string;
  imageUrl: string;
  appointedBy: string;
  appointmentYear: number;
  presidentParty: string;
  senateSupport: SenateSupport;
  politicalAlignment: PoliticalAlignment;
  pressureScore: number;
  status: PressureStatus;
  trend: number[];
  sentimentHistory: { date: string; falls: number; stays: number }[];
  // Property to track active legal actions or impeachment requests for each justice
  openCases: number;
}

export interface NewsItem {
  id: string;
  justiceId: string | 'general';
  headline: string;
  excerpt: string;
  source: string;
  date: string;
  type: 'Legal' | 'Political' | 'Media';
  url?: string;
}

export interface VoteData {
  falls: number;
  stays: number;
}

export interface Senator {
  id: string;
  name: string;
  party: string;
  uf: string;
  reelectionYear: number;
  alignmentScore: number;
  proximityToJustices: Record<string, Alignment>;
  blocStatus: 'government' | 'opposition' | 'unknown';
  contact: {
    email?: string;
    phone?: string;
    officeAddress?: string;
    chiefOfStaff?: string;
  };
  actions: {
    impeachmentAction: boolean | 'unknown';
    lavaToga: boolean | 'unknown';
  };
}
