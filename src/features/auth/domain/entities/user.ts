export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isPremium: boolean;
  subscriptionType: 'free' | 'premium';
  subscriptionExpiresAt?: Date;
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  preferredLanguage: 'fr' | 'bm';
  autoPlay: boolean;
  volume: number;
  downloadQuality: 'low' | 'medium' | 'high';
}