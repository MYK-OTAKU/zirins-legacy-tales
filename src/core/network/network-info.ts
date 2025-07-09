export interface NetworkInfo {
  isConnected(): Promise<boolean>;
}

export class NetworkInfoImpl implements NetworkInfo {
  async isConnected(): Promise<boolean> {
    return navigator.onLine;
  }
}