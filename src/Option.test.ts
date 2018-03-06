import { some, none } from './Option';
import { expect } from 'chai'

describe('Option monad', () => {
  describe('some function', () => {
    it('should create some result', () => {
      let sut = some<string>("");
      expect(sut.isSome()).to.be.true;
      expect(sut.isNone()).to.be.false;
    }),

    it('should match some action', () => {
      let sut = some("abc");
      let actual = sut.match({
        some: sv => sv,
        none: () => { throw new Error("none"); }
      });
      expect(actual).to.be.equal("abc");
    });
  }),

  describe('none function', () => {
    it('should create none result', () => {
      let sut = none<string>();
      expect(sut.isSome()).to.be.false;
      expect(sut.isNone()).to.be.true;
    }),

    it('should match some action', () => {
      let sut = none();
      let actual = sut.match({
        some: sv => { throw new Error("none"); },
        none: () => 123
      });
      expect(actual).to.be.equal(123);
    });
  });
});
