import { UseCase, NoParams } from '../../../../shared/domain/usecases/usecase';
import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { Conte } from '../entities/conte';
import { ConteRepository } from '../repositories/conte.repository';

export class GetAllContesUseCase implements UseCase<Conte[], NoParams> {
  constructor(private readonly repository: ConteRepository) {}

  async call(params: NoParams): Promise<Either<Failure, Conte[]>> {
    return await this.repository.getAllContes();
  }
}