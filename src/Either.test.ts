import { left } from './Either';
import { expect } from 'chai'

describe('Either monad', () => {
  describe('left function', () => {
    it('should create left as either', () => {
      let sut = left<string, string>("");
      expect(sut.isLeft()).to.be.true;
      expect(sut.isRight()).to.be.false;
    });
  });
});
