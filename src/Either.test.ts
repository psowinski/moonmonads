import { left, right } from './Either';
import { expect } from 'chai'

describe('Either monad', () => {
  describe('left function', () => {
    it('should create left as either', () => {
      let sut = left<string, string>("");
      expect(sut.isLeft()).to.be.true;
      expect(sut.isRight()).to.be.false;
    }),

    it('should match left action', () => {
      let sut = left<string, string>("abc");
      let actual = sut.match({
        left: lv => lv,
        right: rv => { throw new Error(rv); }
      });
      expect(actual).to.be.equal("abc");
    }),

    it('should execute dead end acton and return itself on tee', () => {
      let sut = left<string, string>("lact");
      let actual = "";
      let ret = sut.tee({
        left: lv => { actual = lv },
        right: rv => { throw new Error(rv); }
      });
      expect(actual).to.be.equal("lact");
      expect(ret).to.be.equal(sut);
    });
  }),
  describe('right function', () => {
    it('should create right as either', () => {
      let sut = right<string, string>("");
      expect(sut.isLeft()).to.be.false;
      expect(sut.isRight()).to.be.true;
    }),

    it('should match right action', () => {
      let sut = right<string, string>("abc");
      let actual = sut.match({
        left: lv => { throw new Error(lv); },
        right: rv => rv
      });
      expect(actual).to.be.equal("abc");
    }),

    it('should execute dead end acton and return itself on tee', () => {
      let sut = right<string, string>("ract");
      let actual = "";
      let ret = sut.tee({
        left: lv => { throw new Error(lv); },
        right: rv => { actual = rv }
      });
      expect(actual).to.be.equal("ract");
      expect(ret).to.be.equal(sut);
    });
  });
});
