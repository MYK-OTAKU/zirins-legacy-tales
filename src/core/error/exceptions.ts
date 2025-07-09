export class ServerException extends Error {
  constructor(message: string = 'Erreur serveur') {
    super(message);
    this.name = 'ServerException';
  }
}

export class CacheException extends Error {
  constructor(message: string = 'Erreur de cache') {
    super(message);
    this.name = 'CacheException';
  }
}

export class NetworkException extends Error {
  constructor(message: string = 'Pas de connexion internet') {
    super(message);
    this.name = 'NetworkException';
  }
}

export class AuthException extends Error {
  constructor(message: string = 'Erreur d\'authentification') {
    super(message);
    this.name = 'AuthException';
  }
}