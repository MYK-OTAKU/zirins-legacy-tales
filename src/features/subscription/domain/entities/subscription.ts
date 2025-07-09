export interface Subscription {
  id: string;
  userId: string;
  type: 'premium';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  endDate: Date;
  price: number;
  currency: string;
  paymentMethod: string;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number; // en jours
  features: string[];
  isPopular: boolean;
}