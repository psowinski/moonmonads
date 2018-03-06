/**
* @module Option monad
* @author Przemyslaw Sowinski <psowinski@users.noreply.github.com>
* @version 1.0.0
* @license MIT
*/

export function some<T>(x: T): Option<T> {
  return new Some(x);
}

export function none<T>(): Option<T> {
  return new None();
}

export class Some<T> {
  constructor(private readonly value: T){
  }

  isSome(): boolean {
    let x = this.value;
    x = x;
    return true;
  }

  isNone(): boolean {
    return false;
  }
}

export class None {

  isSome(): boolean {
    return false;
  }

  isNone(): boolean {
    return true;
  }
}

export type Option<T> = Some<T> | None;
