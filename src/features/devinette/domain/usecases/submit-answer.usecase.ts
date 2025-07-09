import { UseCase } from '../../../../shared/domain/usecases/usecase';
import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { DevinetteAnswer } from '../entities/devinette';
import { DevinetteRepository } from '../repositories/devinette.repository';

export interface SubmitAnswerParams {
  devinetteId: string;
  userAnswer: string;
  userId: string;
}

export class SubmitAnswerUseCase implements UseCase<boolean, SubmitAnswerParams> {
  constructor(private readonly repository: DevinetteRepository) {}

  async call(params: SubmitAnswerParams): Promise<Either<Failure, boolean>> {
    const answer: DevinetteAnswer = {
      devinetteId: params.devinetteId,
      userAnswer: params.userAnswer,
      isCorrect: false, // Will be determined by the repository
      pointsEarned: 0,
      answeredAt: new Date()
    };

    return await this.repository.submitAnswer(answer);
  }
}