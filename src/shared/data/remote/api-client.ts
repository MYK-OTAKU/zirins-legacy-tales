import { API_CONSTANTS } from '../../../core/constants/app.constants';
import { NetworkException, ServerException } from '../../../core/error/exceptions';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = API_CONSTANTS.BASE_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return this.makeRequest<T>(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.defaultHeaders,
    });
  }

  private async makeRequest<T>(url: string, options: RequestInit): Promise<ApiResponse<T>> {
    try {
      if (!navigator.onLine) {
        throw new NetworkException('Pas de connexion internet');
      }

      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new ServerException(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        data: data.data || data,
        message: data.message,
        status: response.status,
      };
    } catch (error) {
      if (error instanceof NetworkException || error instanceof ServerException) {
        throw error;
      }
      throw new NetworkException('Erreur de connexion');
    }
  }
}

export const apiClient = new ApiClient();