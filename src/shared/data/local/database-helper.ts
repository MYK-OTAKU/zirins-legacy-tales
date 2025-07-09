export interface DatabaseHelper {
  initDatabase(): Promise<void>;
  clearDatabase(): Promise<void>;
  executeQuery(query: string, params?: any[]): Promise<any>;
}

export class IndexedDBHelper implements DatabaseHelper {
  private dbName = 'ZirinDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store pour les contes
        if (!db.objectStoreNames.contains('contes')) {
          const conteStore = db.createObjectStore('contes', { keyPath: 'id' });
          conteStore.createIndex('category', 'category', { unique: false });
          conteStore.createIndex('isPremium', 'isPremium', { unique: false });
        }

        // Store pour les devinettes
        if (!db.objectStoreNames.contains('devinettes')) {
          const devinetteStore = db.createObjectStore('devinettes', { keyPath: 'id' });
          devinetteStore.createIndex('category', 'category', { unique: false });
          devinetteStore.createIndex('difficulty', 'difficulty', { unique: false });
        }

        // Store pour les réponses utilisateur
        if (!db.objectStoreNames.contains('user_answers')) {
          const answerStore = db.createObjectStore('user_answers', { keyPath: 'id', autoIncrement: true });
          answerStore.createIndex('devinetteId', 'devinetteId', { unique: false });
          answerStore.createIndex('userId', 'userId', { unique: false });
        }

        // Store pour les préférences utilisateur
        if (!db.objectStoreNames.contains('user_preferences')) {
          db.createObjectStore('user_preferences', { keyPath: 'userId' });
        }
      };
    });
  }

  async clearDatabase(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['contes', 'devinettes', 'user_answers', 'user_preferences'], 'readwrite');
    
    await Promise.all([
      this.clearStore(transaction, 'contes'),
      this.clearStore(transaction, 'devinettes'),
      this.clearStore(transaction, 'user_answers'),
      this.clearStore(transaction, 'user_preferences')
    ]);
  }

  private clearStore(transaction: IDBTransaction, storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async executeQuery(storeName: string, operation: 'get' | 'put' | 'delete' | 'getAll', data?: any): Promise<any> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], operation === 'get' || operation === 'getAll' ? 'readonly' : 'readwrite');
      const store = transaction.objectStore(storeName);
      
      let request: IDBRequest;
      
      switch (operation) {
        case 'get':
          request = store.get(data);
          break;
        case 'put':
          request = store.put(data);
          break;
        case 'delete':
          request = store.delete(data);
          break;
        case 'getAll':
          request = store.getAll();
          break;
        default:
          reject(new Error('Invalid operation'));
          return;
      }

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}