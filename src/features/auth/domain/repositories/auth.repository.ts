import { Either } from '../../../../core/utils/either';
import { Failure } from '../../../../core/error/failures';
import { User } from '../entities/user';

export interface AuthRepository {
  signInWithGoogle(): Promise<Either<Failure, User>>;
  signOut(): Promise<Either<Failure, void>>;
  getCurrentUser(): Promise<Either<Failure, User | null>>;
  updateUserProfile(user: Partial<User>): Promise<Either<Failure, User>>;
  deleteAccount(): Promise<Either<Failure, void>>;
}