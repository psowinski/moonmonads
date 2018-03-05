/**
* @module Result monad
* @author Przemyslaw Sowinski <psowinski@users.noreply.github.com>
* @version 1.0.0
* @license MIT
*/

export function success<TS, TF>(x: TS): Result<TS, TF> {
  return new Success(x);
}

export function fail<TS, TF>(x: TF): Result<TS, TF> {
  return new Fail(x);
}

export interface ResultMatch<TS, TF, T> {
  success: (s: TS) => T;
  fail: (f: TF) => T;
}

export interface ResultTee<TS, TF> {
  success: (s: TS) => void;
  fail: (f: TF) => void;
}

export class Success<TS, TF>
{
  constructor(readonly value: TS) {
  }

  isSuccess(): boolean {
    return true;
  }

  isFail(): boolean {
    return false;
  }

  match<T>(pattern: ResultMatch<TS, TF, T>): T {
    return pattern.success(this.value);
  }

  tee(pattern: ResultTee<TS, TF>): Result<TS, TF> {
      pattern.success(this.value);
      return this;
  }

  bind<T>(f: (x: TS) => Result<T, TF>): Result<T, TF> {
    return f(this.value);
  }

  map<T>(f: (x: TS) => T): Result<T, TF> {
    return this.bind(y => success(f(y)));
  }

  valueOr(defaultValue: TS): TS {
    return this.value;
  }
}

export class Fail<TS, TF>
{
  constructor(readonly value: TF) {
  }

  isSuccess(): boolean {
    return false;
  }

  isFail(): boolean {
    return true;
  }

  match<T>(pattern: ResultMatch<TS, TF, T>): T {
    return pattern.fail(this.value);
  }

  tee(pattern: ResultTee<TS, TF>): Result<TS, TF> {
      pattern.fail(this.value);
      return this;
  }

  bind<T>(f: (x: TS) => Result<T, TF>): Result<T, TF> {
    return fail(this.value);
  }

  map<T>(f: (x: TS) => T): Result<T, TF> {
    return fail(this.value);
  }

  valueOr(defaultValue: TS): TS {
    return defaultValue;
  }
}

export type Result<TS, TF> = Success<TS, TF> | Fail<TS, TF>;
