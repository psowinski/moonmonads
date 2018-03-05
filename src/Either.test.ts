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
    }),

    it('should execute bindLeft function and return new left', () => {
      let sut = left<string, string>("lval");
      let next = left<string, string>("xyz");
      let actual = sut.bindLeft(x => {
        if(x === "lval") { return next; }
        else { throw new Error(x); }
      });
      expect(actual).to.be.equal(next);
    }),

    it('should execute bindRight function and return left', () => {
      let sut = left<string, string>("lval");
      let actual = sut.bindRight(x => { throw new Error(x); });
      expect(actual.equal(left("lval"))).to.be.true;
    }),

    it('should execute mapLeft function and return left monad', () => {
      let sut = left<number, string>(5);
      let actual = sut.mapLeft(x => x * 2);
      expect(actual.equal(left(10))).to.be.true;
    }),

    it('should execute mapRight function and return left', () => {
      let sut = left<number, number>(3);
      let actual = sut.mapRight(x => x * 2);
      expect(actual.equal(left(3))).to.be.true;
    }),

    it('should always return left value', () => {
      let sut = left<number, number>(5);
      expect(sut.leftValueOr(1)).to.be.equal(5);
    }),

    it('should always return default right value', () => {
      let sut = left<number, number>(5);
      expect(sut.rightValueOr(1)).to.be.equal(1);
    }),

    it('should correctly compare to other left with the same value', () => {
      expect(left<number, number>(5).equal(left<number, number>(5))).to.be.true;
    }),

    it('should correctly compare to other left with different value', () => {
      expect(left<number, number>(5).equal(left<number, number>(1))).to.be.false;
    }),

    it('should correctly compare to right', () => {
      expect(left<string, string>("abc").equal(right<string, string>("abc"))).to.be.false;
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
    }),

    it('should execute bindLeft function and return right', () => {
      let sut = right<string, string>("rval");
      let actual = sut.bindLeft(x => { throw new Error(x); });
      expect(actual.equal(right<number, string>("rval"))).to.be.true;
    })

    it('should execute bindRight function and return new right', () => {
      let sut = right<string, string>("rval");
      let next = right<string, string>("xyz");
      let actual = sut.bindRight(x => {
        if(x === "rval") { return next; }
        else { throw new Error(x); }
      });
      expect(actual).to.be.equal(next);
    }),

    it('should execute mapLeft function and return right', () => {
      let sut = right<number, string>("abc");
      let actual = sut.mapLeft(x => x * 2);
      expect(actual.equal(right<number, string>("abc"))).to.be.true;
    }),

    it('should execute mapRight function and return new right', () => {
      let sut = right<number, number>(5);
      let actual = sut.mapRight(x => x * 2);
      expect(actual.equal(right(10))).to.be.true;
    }),

    it('should always return right value', () => {
      let sut = right<number, number>(5);
      expect(sut.rightValueOr(1)).to.be.equal(5);
    }),

    it('should always return default left value', () => {
      let sut = right<number, number>(5);
      expect(sut.leftValueOr(1)).to.be.equal(1);
    }),

    it('should correctly compare to other right with the same value', () => {
      expect(right<number, number>(5).equal(right<number, number>(5))).to.be.true;
    }),

    it('should correctly compare to other right with different value', () => {
      expect(right<number, number>(5).equal(right<number, number>(1))).to.be.false;
    }),

    it('should correctly compare to left', () => {
      expect(right<string, string>("abc").equal(left<string, string>("abc"))).to.be.false;
    });
  });
});
