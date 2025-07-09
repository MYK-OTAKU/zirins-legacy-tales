import { UseCase, NoParams } from '../../../../shared/domain/usecases/usecase';
import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { User } from '../entities/user';
import { AuthRepository } from '../repositories/auth.repository';

export class SignInWithGoogleUseCase implements UseCase<User, NoParams> {
  constructor(private readonly repository: AuthRepository) {}

  async call(params: NoParams): Promise<Either<Failure, User>> {
    return await this.repository.signInWithGoogle();
  }
}