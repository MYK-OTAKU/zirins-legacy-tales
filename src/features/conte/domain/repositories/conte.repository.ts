import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { Conte } from '../entities/conte';

export interface ConteRepository {
  getAllContes(): Promise<Either<Failure, Conte[]>>;
  getConteById(id: string): Promise<Either<Failure, Conte>>;
  searchContes(query: string): Promise<Either<Failure, Conte[]>>;
  getContesByCategory(category: string): Promise<Either<Failure, Conte[]>>;
  downloadConte(id: string): Promise<Either<Failure, void>>;
  getFreeContes(): Promise<Either<Failure, Conte[]>>;
  getPremiumContes(): Promise<Either<Failure, Conte[]>>;
}