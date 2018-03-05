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
}

export type Either<TL, TR> = Left<TL, TR> | Right<TL, TR>;
