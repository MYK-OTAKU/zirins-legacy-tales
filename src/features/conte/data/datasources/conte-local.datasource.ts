import { ConteModel } from '../models/conte.model';
import { CacheException } from '../../../../core/error/exceptions';

export interface ConteLocalDataSource {
  getCachedContes(): Promise<ConteModel[]>;
  cacheContes(contes: ConteModel[]): Promise<void>;
  getCachedConteById(id: string): Promise<ConteModel>;
  cacheConteById(conte: ConteModel): Promise<void>;
  clearCache(): Promise<void>;
}

export class ConteLocalDataSourceImpl implements ConteLocalDataSource {
  private readonly CACHE_KEY = 'zirin_contes_cache';
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 heures

  async getCachedContes(): Promise<ConteModel[]> {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) {
        throw new CacheException('Aucun conte en cache');
      }

      const data = JSON.parse(cached);
      const now = Date.now();

      if (now - data.timestamp > this.CACHE_EXPIRY) {
        localStorage.removeItem(this.CACHE_KEY);
        throw new CacheException('Cache expiré');
      }

      return data.contes;
    } catch (error) {
      throw new CacheException('Erreur lors de la lecture du cache');
    }
  }

  async cacheContes(contes: ConteModel[]): Promise<void> {
    try {
      const data = {
        contes,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      throw new CacheException('Erreur lors de la mise en cache');
    }
  }

  async getCachedConteById(id: string): Promise<ConteModel> {
    try {
      const contes = await this.getCachedContes();
      const conte = contes.find(c => c.id === id);
      
      if (!conte) {
        throw new CacheException(`Conte ${id} non trouvé en cache`);
      }

      return conte;
    } catch (error) {
      throw new CacheException(`Erreur lors de la récupération du conte ${id} en cache`);
    }
  }

  async cacheConteById(conte: ConteModel): Promise<void> {
    try {
      const contes = await this.getCachedContes().catch(() => []);
      const index = contes.findIndex(c => c.id === conte.id);
      
      if (index >= 0) {
        contes[index] = conte;
      } else {
        contes.push(conte);
      }

      await this.cacheContes(contes);
    } catch (error) {
      throw new CacheException('Erreur lors de la mise en cache du conte');
    }
  }

  async clearCache(): Promise<void> {
    try {
      localStorage.removeItem(this.CACHE_KEY);
    } catch (error) {
      throw new CacheException('Erreur lors de la suppression du cache');
    }
  }
}