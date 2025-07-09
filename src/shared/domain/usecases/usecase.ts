import { Either } from '../../../core/utils/either';
import { Failure } from '../../../core/error/failures';

export abstract class UseCase<Type, Params> {
  abstract call(params: Params): Promise<Either<Failure, Type>>;
}

export class NoParams {}