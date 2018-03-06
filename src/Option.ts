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

export interface OptionMatch<T, U> {
  some: (v: T) => U,
  none: () => U
}

export interface OptionTee<T> {
  some: (v: T) => void,
  none: () => void
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

  match<U>(actions: OptionMatch<T, U>): U {
    return actions.some(this.value);
  }

  tee(actions: OptionTee<T>): Option<T> {
    actions.some(this.value);
    return this;
  }
}

export class None<T> {

  isSome(): boolean {
    return false;
  }

  isNone(): boolean {
    return true;
  }

  match<U>(actions: OptionMatch<T, U>): U {
    return actions.none();
  }

  tee(actions: OptionTee<T>): Option<T> {
    actions.none();
    return this;
  }
}

export type Option<T> = Some<T> | None<T>;
