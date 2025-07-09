import { ConteRepository } from '../../domain/repositories/conte.repository';
import { Either, left, right } from '../../../../core/utils/either';
import { Failure, ServerFailure, CacheFailure, NetworkFailure } from '../../../../core/error/failures';
import { Conte } from '../../domain/entities/conte';
import { ConteRemoteDataSource } from '../datasources/conte-remote.datasource';
import { ConteLocalDataSource } from '../datasources/conte-local.datasource';
import { ConteModelMapper } from '../models/conte.model';
import { ServerException, CacheException, NetworkException } from '../../../../core/error/exceptions';

export class ConteRepositoryImpl implements ConteRepository {
  constructor(
    private readonly remoteDataSource: ConteRemoteDataSource,
    private readonly localDataSource: ConteLocalDataSource
  ) {}

  async getAllContes(): Promise<Either<Failure, Conte[]>> {
    try {
      // Essayer de récupérer depuis le cache d'abord
      try {
        const cachedContes = await this.localDataSource.getCachedContes();
        const contes = cachedContes.map(ConteModelMapper.toDomain);
        return right(contes);
      } catch (cacheError) {
        // Si le cache échoue, récupérer depuis le serveur
        const remoteContes = await this.remoteDataSource.getAllContes();
        const contes = remoteContes.map(ConteModelMapper.toDomain);
        
        // Mettre en cache pour la prochaine fois
        try {
          await this.localDataSource.cacheContes(remoteContes);
        } catch (cacheError) {
          // Ignorer les erreurs de cache lors de l'écriture
        }
        
        return right(contes);
      }
    } catch (error) {
      if (error instanceof ServerException) {
        return left(new ServerFailure(error.message));
      }
      if (error instanceof NetworkException) {
        return left(new NetworkFailure(error.message));
      }
      return left(new ServerFailure('Erreur inconnue'));
    }
  }

  async getConteById(id: string): Promise<Either<Failure, Conte>> {
    try {
      // Essayer le cache d'abord
      try {
        const cachedConte = await this.localDataSource.getCachedConteById(id);
        return right(ConteModelMapper.toDomain(cachedConte));
      } catch (cacheError) {
        // Si le cache échoue, récupérer depuis le serveur
        const remoteConte = await this.remoteDataSource.getConteById(id);
        const conte = ConteModelMapper.toDomain(remoteConte);
        
        // Mettre en cache
        try {
          await this.localDataSource.cacheConteById(remoteConte);
        } catch (cacheError) {
          // Ignorer les erreurs de cache
        }
        
        return right(conte);
      }
    } catch (error) {
      if (error instanceof ServerException) {
        return left(new ServerFailure(error.message));
      }
      if (error instanceof NetworkException) {
        return left(new NetworkFailure(error.message));
      }
      return left(new ServerFailure('Erreur inconnue'));
    }
  }

  async searchContes(query: string): Promise<Either<Failure, Conte[]>> {
    try {
      const remoteContes = await this.remoteDataSource.searchContes(query);
      const contes = remoteContes.map(ConteModelMapper.toDomain);
      return right(contes);
    } catch (error) {
      if (error instanceof ServerException) {
        return left(new ServerFailure(error.message));
      }
      if (error instanceof NetworkException) {
        return left(new NetworkFailure(error.message));
      }
      return left(new ServerFailure('Erreur inconnue'));
    }
  }

  async getContesByCategory(category: string): Promise<Either<Failure, Conte[]>> {
    try {
      const remoteContes = await this.remoteDataSource.getContesByCategory(category);
      const contes = remoteContes.map(ConteModelMapper.toDomain);
      return right(contes);
    } catch (error) {
      if (error instanceof ServerException) {
        return left(new ServerFailure(error.message));
      }
      if (error instanceof NetworkException) {
        return left(new NetworkFailure(error.message));
      }
      return left(new ServerFailure('Erreur inconnue'));
    }
  }

  async downloadConte(id: string): Promise<Either<Failure, void>> {
    try {
      const remoteConte = await this.remoteDataSource.getConteById(id);
      await this.localDataSource.cacheConteById(remoteConte);
      return right(undefined);
    } catch (error) {
      if (error instanceof ServerException) {
        return left(new ServerFailure(error.message));
      }
      if (error instanceof NetworkException) {
        return left(new NetworkFailure(error.message));
      }
      if (error instanceof CacheException) {
        return left(new CacheFailure(error.message));
      }
      return left(new ServerFailure('Erreur inconnue'));
    }
  }

  async getFreeContes(): Promise<Either<Failure, Conte[]>> {
    const result = await this.getAllContes();
    return result.fold(
      (failure) => left(failure),
      (contes) => right(contes.filter(conte => !conte.isPremium))
    );
  }

  async getPremiumContes(): Promise<Either<Failure, Conte[]>> {
    const result = await this.getAllContes();
    return result.fold(
      (failure) => left(failure),
      (contes) => right(contes.filter(conte => conte.isPremium))
    );
  }
}