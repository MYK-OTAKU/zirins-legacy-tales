export interface Devinette {
  id: string;
  question: string;
  answer: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  points: number;
  category: string;
  hints?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type DevinetteCategory = 
  | 'Nature'
  | 'Objets'
  | 'Éléments'
  | 'Animaux'
  | 'Famille'
  | 'Tradition';

export interface DevinetteAnswer {
  devinetteId: string;
  userAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
  answeredAt: Date;
}