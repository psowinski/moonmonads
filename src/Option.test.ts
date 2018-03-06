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
    }),

    it('should execute dead end acton and return itself on tee', () => {
      let sut = some(123);
      let actual = 0;
      let ret = sut.tee({
        some: sv => { actual = sv },
        none: () => { throw new Error("none"); }
      });
      expect(actual).to.be.equal(123);
      expect(ret).to.be.equal(sut);
    }),

    it('should execute bind function and return new monad', () => {
      let sut = some("abc");
      let next = some(123);
      let actual = sut.bind(x => {
        if(x === "abc") { return next; }
        else { throw new Error(x); }
      });
      expect(actual).to.be.equal(next);
    }),

    it('should correctly compare to other some with the same value', () => {
      expect(some(5).equal(some(5))).to.be.true;
    }),

    it('should correctly compare to other some with different value', () => {
      expect(some(2).equal(some(1))).to.be.false;
    }),

    it('should correctly compare to none', () => {
      expect(some("abc").equal(none<string>())).to.be.false;
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
    }),

    it('should execute dead end acton and return itself on tee', () => {
      let sut = none<string>();
      let actual = 0;
      let ret = sut.tee({
        some: sv => { throw new Error(sv); },
        none: () => { actual = 123 }
      });
      expect(actual).to.be.equal(123);
      expect(ret).to.be.equal(sut);
    }),

    it('should execute bind function and return none', () => {
      let sut = none<string>();
      let actual = sut.bind(x => some(123));
      expect(actual.equal(none<number>())).to.be.true;
    });

    it('should correctly compare to other none', () => {
      expect(none().equal(none())).to.be.true;
    }),

    it('should correctly compare to some', () => {
      expect(none<string>().equal(some("abc"))).to.be.false;
    });
  });
});
