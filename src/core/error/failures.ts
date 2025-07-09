export abstract class Failure {
  abstract readonly message: string;
}

export class ServerFailure extends Failure {
  readonly message: string;
  
  constructor(message: string = 'Erreur serveur') {
    super();
    this.message = message;
  }
}

export class CacheFailure extends Failure {
  readonly message: string;
  
  constructor(message: string = 'Erreur de cache') {
    super();
    this.message = message;
  }
}

export class NetworkFailure extends Failure {
  readonly message: string;
  
  constructor(message: string = 'Erreur de connexion') {
    super();
    this.message = message;
  }
}

export class AuthFailure extends Failure {
  readonly message: string;
  
  constructor(message: string = 'Erreur d\'authentification') {
    super();
    this.message = message;
  }
}

export class ValidationFailure extends Failure {
  readonly message: string;
  
  constructor(message: string = 'Données invalides') {
    super();
    this.message = message;
  }
}