export abstract class Either<L, R> {
  abstract isLeft(): boolean;
  abstract isRight(): boolean;
  abstract fold<T>(onLeft: (left: L) => T, onRight: (right: R) => T): T;
}

export class Left<L, R> extends Either<L, R> {
  constructor(private readonly value: L) {
    super();
  }

  isLeft(): boolean {
    return true;
  }

  isRight(): boolean {
    return false;
  }

  fold<T>(onLeft: (left: L) => T, onRight: (right: R) => T): T {
    return onLeft(this.value);
  }
}

export class Right<L, R> extends Either<L, R> {
  constructor(private readonly value: R) {
    super();
  }

  isLeft(): boolean {
    return false;
  }

  isRight(): boolean {
    return true;
  }

  fold<T>(onLeft: (left: L) => T, onRight: (right: R) => T): T {
    return onRight(this.value);
  }
}

export const left = <L, R>(value: L): Either<L, R> => new Left(value);
export const right = <L, R>(value: R): Either<L, R> => new Right(value);