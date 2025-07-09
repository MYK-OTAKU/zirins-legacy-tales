import { ConteModel } from '../models/conte.model';
import { ServerException, NetworkException } from '../../../../core/error/exceptions';

export interface ConteRemoteDataSource {
  getAllContes(): Promise<ConteModel[]>;
  getConteById(id: string): Promise<ConteModel>;
  searchContes(query: string): Promise<ConteModel[]>;
  getContesByCategory(category: string): Promise<ConteModel[]>;
}

export class ConteRemoteDataSourceImpl implements ConteRemoteDataSource {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAllContes(): Promise<ConteModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/contes`);
      
      if (!response.ok) {
        throw new ServerException(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.contes || [];
    } catch (error) {
      if (error instanceof ServerException) {
        throw error;
      }
      throw new NetworkException('Impossible de récupérer les contes');
    }
  }

  async getConteById(id: string): Promise<ConteModel> {
    try {
      const response = await fetch(`${this.baseUrl}/contes/${id}`);
      
      if (!response.ok) {
        throw new ServerException(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.conte;
    } catch (error) {
      if (error instanceof ServerException) {
        throw error;
      }
      throw new NetworkException(`Impossible de récupérer le conte ${id}`);
    }
  }

  async searchContes(query: string): Promise<ConteModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/contes/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new ServerException(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.contes || [];
    } catch (error) {
      if (error instanceof ServerException) {
        throw error;
      }
      throw new NetworkException('Impossible de rechercher les contes');
    }
  }

  async getContesByCategory(category: string): Promise<ConteModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/contes/category/${category}`);
      
      if (!response.ok) {
        throw new ServerException(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.contes || [];
    } catch (error) {
      if (error instanceof ServerException) {
        throw error;
      }
      throw new NetworkException(`Impossible de récupérer les contes de la catégorie ${category}`);
    }
  }
}