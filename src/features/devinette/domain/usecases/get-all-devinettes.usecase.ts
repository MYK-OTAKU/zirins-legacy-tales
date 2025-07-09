import { UseCase, NoParams } from '../../../../shared/domain/usecases/usecase';
import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { Devinette } from '../entities/devinette';
import { DevinetteRepository } from '../repositories/devinette.repository';

export class GetAllDevinettesUseCase implements UseCase<Devinette[], NoParams> {
  constructor(private readonly repository: DevinetteRepository) {}

  async call(params: NoParams): Promise<Either<Failure, Devinette[]>> {
    return await this.repository.getAllDevinettes();
  }
}