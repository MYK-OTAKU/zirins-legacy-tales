// Dependency Injection Container
class InjectionContainer {
  private dependencies = new Map<string, any>();
  private singletons = new Map<string, any>();

  register<T>(key: string, factory: () => T, singleton: boolean = false): void {
    this.dependencies.set(key, { factory, singleton });
  }

  get<T>(key: string): T {
    const dependency = this.dependencies.get(key);
    
    if (!dependency) {
      throw new Error(`Dependency ${key} not found`);
    }

    if (dependency.singleton) {
      if (!this.singletons.has(key)) {
        this.singletons.set(key, dependency.factory());
      }
      return this.singletons.get(key);
    }

    return dependency.factory();
  }

  clear(): void {
    this.dependencies.clear();
    this.singletons.clear();
  }
}

export const container = new InjectionContainer();

// Configuration des dépendances
export const configureDependencies = () => {
  // Core
  container.register('NetworkInfo', () => new (require('../network/network-info').NetworkInfoImpl)(), true);
  container.register('DatabaseHelper', () => new (require('../../shared/data/local/database-helper').IndexedDBHelper)(), true);
  container.register('ApiClient', () => new (require('../../shared/data/remote/api-client').ApiClient)(), true);

  // Conte
  container.register('ConteRemoteDataSource', () => {
    const apiClient = container.get('ApiClient');
    return new (require('../../features/conte/data/datasources/conte-remote.datasource').ConteRemoteDataSourceImpl)(apiClient);
  });

  container.register('ConteLocalDataSource', () => {
    return new (require('../../features/conte/data/datasources/conte-local.datasource').ConteLocalDataSourceImpl)();
  });

  container.register('ConteRepository', () => {
    const remoteDataSource = container.get('ConteRemoteDataSource');
    const localDataSource = container.get('ConteLocalDataSource');
    return new (require('../../features/conte/data/repositories/conte-repository.impl').ConteRepositoryImpl)(remoteDataSource, localDataSource);
  });

  container.register('GetAllContesUseCase', () => {
    const repository = container.get('ConteRepository');
    return new (require('../../features/conte/domain/usecases/get-all-contes.usecase').GetAllContesUseCase)(repository);
  });

  container.register('GetConteByIdUseCase', () => {
    const repository = container.get('ConteRepository');
    return new (require('../../features/conte/domain/usecases/get-conte-by-id.usecase').GetConteByIdUseCase)(repository);
  });

  container.register('SearchContesUseCase', () => {
    const repository = container.get('ConteRepository');
    return new (require('../../features/conte/domain/usecases/search-contes.usecase').SearchContesUseCase)(repository);
  });
};