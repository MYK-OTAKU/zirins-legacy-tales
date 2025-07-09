export interface AudioTrack {
  id: string;
  language: 'fr' | 'bm';
  url: string;
  duration: number; // en secondes
}

export interface ContePage {
  id: string;
  pageNumber: number;
  text: string;
  imageUrl?: string;
}

export interface Conte {
  id: string;
  title: string;
  description: string;
  category: string;
  isPremium: boolean;
  imageUrl: string;
  pages: ContePage[];
  audioTracks: AudioTrack[];
  moral?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ConteCategory = 
  | 'Sagesse'
  | 'Merveilleux' 
  | 'Tradition'
  | 'Morale'
  | 'Aventure'
  | 'Drôle'
  | 'Peur';