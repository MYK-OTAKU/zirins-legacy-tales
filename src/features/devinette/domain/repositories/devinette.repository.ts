import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { Devinette, DevinetteAnswer } from '../entities/devinette';

export interface DevinetteRepository {
  getAllDevinettes(): Promise<Either<Failure, Devinette[]>>;
  getDevinetteById(id: string): Promise<Either<Failure, Devinette>>;
  getDevinettesByCategory(category: string): Promise<Either<Failure, Devinette[]>>;
  getDevinettesByDifficulty(difficulty: string): Promise<Either<Failure, Devinette[]>>;
  submitAnswer(answer: DevinetteAnswer): Promise<Either<Failure, boolean>>;
  getHint(devinetteId: string, hintIndex: number): Promise<Either<Failure, string>>;
  getFreeDevinettes(): Promise<Either<Failure, Devinette[]>>;
  getUserAnswers(userId: string): Promise<Either<Failure, DevinetteAnswer[]>>;
}