import { UseCase } from '../../../../shared/domain/usecases/usecase';
import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { Conte } from '../entities/conte';
import { ConteRepository } from '../repositories/conte.repository';

export interface SearchContesParams {
  query: string;
}

export class SearchContesUseCase implements UseCase<Conte[], SearchContesParams> {
  constructor(private readonly repository: ConteRepository) {}

  async call(params: SearchContesParams): Promise<Either<Failure, Conte[]>> {
    return await this.repository.searchContes(params.query);
  }
}