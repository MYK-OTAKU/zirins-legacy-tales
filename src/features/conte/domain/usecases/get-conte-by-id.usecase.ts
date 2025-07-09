import { UseCase } from '../../../../shared/domain/usecases/usecase';
import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { Conte } from '../entities/conte';
import { ConteRepository } from '../repositories/conte.repository';

export interface GetConteByIdParams {
  id: string;
}

export class GetConteByIdUseCase implements UseCase<Conte, GetConteByIdParams> {
  constructor(private readonly repository: ConteRepository) {}

  async call(params: GetConteByIdParams): Promise<Either<Failure, Conte>> {
    return await this.repository.getConteById(params.id);
  }
}