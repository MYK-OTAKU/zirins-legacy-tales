import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { Subscription, SubscriptionPlan } from '../entities/subscription';

export interface SubscriptionRepository {
  getAvailablePlans(): Promise<Either<Failure, SubscriptionPlan[]>>;
  getCurrentSubscription(userId: string): Promise<Either<Failure, Subscription | null>>;
  upgradeToPremium(userId: string, planId: string): Promise<Either<Failure, Subscription>>;
  cancelSubscription(subscriptionId: string): Promise<Either<Failure, void>>;
  checkSubscriptionStatus(userId: string): Promise<Either<Failure, boolean>>;
}