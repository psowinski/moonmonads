"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function success(x) {
    return new Success(x);
}
exports.success = success;
function fail(x) {
    return new Fail(x);
}
exports.fail = fail;
class Success {
    constructor(value) {
        this.value = value;
    }
    isSuccess() {
        return true;
    }
    isFail() {
        return false;
    }
    match(pattern) {
        return pattern.success(this.value);
    }
    tee(pattern) {
        pattern.success(this.value);
        return this;
    }
    bind(f) {
        return f(this.value);
    }
    map(f) {
        return this.bind(y => success(f(y)));
    }
    valueOr(defaultValue) {
        return this.value;
    }
}
exports.Success = Success;
class Fail {
    constructor(value) {
        this.value = value;
    }
    isSuccess() {
        return false;
    }
    isFail() {
        return true;
    }
    match(pattern) {
        return pattern.fail(this.value);
    }
    tee(pattern) {
        pattern.fail(this.value);
        return this;
    }
    bind(f) {
        return fail(this.value);
    }
    map(f) {
        return fail(this.value);
    }
    valueOr(defaultValue) {
        return defaultValue;
    }
}
exports.Fail = Fail;
