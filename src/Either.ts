/**
* @module Either monad
* @author Przemyslaw Sowinski <psowinski@users.noreply.github.com>
* @version 1.0.0
* @license MIT
*/

export function left<TL, TR>(x: TL): Either<TL, TR> {
  return new Left(x);
}

export function right<TL, TR>(x: TR): Either<TL, TR> {
  return new Right(x);
}

export interface EitherMatch<TL, TR, T> {
  left: (lv: TL) => T,
  right: (rv: TR) => T
}

export interface EitherTee<TL, TR> {
  left: (lv: TL) => void,
  right: (rv: TR) => void
}

export class Left<TL, TR> {
  constructor(private readonly value: TL){
  }

  isLeft(): boolean {
    return true;
  }

  isRight(): boolean {
    return false;
  }

  match<T>(actions: EitherMatch<TL, TR, T>): T {
    return actions.left(this.value);
  }

  tee(actions: EitherTee<TL, TR>): Either<TL, TR> {
    actions.left(this.value);
    return this;
  }

  bindLeft<T>(f: (x: TL) => Either<T, TR>): Either<T, TR> {
    return f(this.value);
  }

  bindRight<T>(f: (x: TR) => Either<TL, T>): Either<TL, T> {
    return left(this.value);
  }

  mapLeft<T>(f: (x: TL) => T): Either<T, TR> {
    return this.bindLeft((y: TL) => left<T, TR>(f(y)));
  }

  equal(x: Either<TL, TR>): boolean {
    return x.match({
      left: lv => lv === this.value,
      right: rv => false
    });
  }
}

export class Right<TL, TR> {
  constructor(private readonly value: TR){
  }

  isLeft(): boolean {
    return false;
  }

  isRight(): boolean {
    return true;
  }

  match<T>(actions: EitherMatch<TL, TR, T>): T {
    return actions.right(this.value);
  }

  tee(actions: EitherTee<TL, TR>): Either<TL, TR> {
    actions.right(this.value);
    return this;
  }

  bindLeft<T>(f: (x: TL) => Either<T, TR>): Either<T, TR> {
    return right(this.value);
  }

  bindRight<T>(f: (x: TR) => Either<TL, T>): Either<TL, T> {
    return f(this.value);
  }

  mapLeft<T>(f: (x: TL) => T): Either<T, TR> {
    return right(this.value);
  }

  equal(x: Either<TL, TR>): boolean {
    return x.match({
      left: lv => false,
      right: rv => rv === this.value
    });
  }
}

export type Either<TL, TR> = Left<TL, TR> | Right<TL, TR>;
