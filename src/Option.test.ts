import { some, none } from './Option';
import { expect } from 'chai'

describe('Option monad', () => {
  describe('some function', () => {
    it('should create some result', () => {
      let sut = some<string>("");
      expect(sut.isSome()).to.be.true;
      expect(sut.isNone()).to.be.false;
    });
  }),

  describe('none function', () => {
    it('should create none result', () => {
      let sut = none<string>();
      expect(sut.isSome()).to.be.false;
      expect(sut.isNone()).to.be.true;
    });
  });
});
