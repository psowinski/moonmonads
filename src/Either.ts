/**
* @module Either monad
* @author Przemyslaw Sowinski <psowinski@users.noreply.github.com>
* @version 1.0.0
* @license MIT
*/

export function left<TL, TR>(x: TL) {
  return new Left(x);
}

export function right<TL, TR>(x: TR) {
  return new Right(x);
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
}

export type Either<TL, TR> = Left<TL, TR> | Right<TL, TR>;
