import { success, fail } from './Result';
import { expect } from 'chai'

describe('Result monad', () => {
  describe('success function', () => {
    it('should create success result', () => {
      let sut = success<string, string>("");
      expect(sut.isSuccess()).to.be.true;
      expect(sut.isFail()).to.be.false;
    }),

    it('should match success action', () => {
      let sut = success<string, string>("ok");
      let actual = sut.match({
        success: sv => sv,
        fail: sf => { throw new Error(sf); }
      });
      expect(actual).to.be.equal("ok");
    }),

    it('should execute dead end acton and return itself on tee', () => {
      let sut = success<string, string>("ok");
      let actual = "";
      let ret = sut.tee({
        success: sv => { actual = sv },
        fail: sf => { throw new Error(sf); }
      });
      expect(actual).to.be.equal("ok");
      expect(ret).to.be.equal(sut);
    }),

    it('should execute bind function and return new monad', () => {
      let sut = success<string, string>("abc");
      let next = success<string, string>("xyz");
      let actual = sut.bind(x => {
        if(x === "abc") {
          return next;
        }
        else {
          throw new Error(x);
        }
      });
      expect(actual).to.be.equal(next);
    }),

    it('should execute map function and return result as success', () => {
      let sut = success<number, string>(2);
      let actual = sut.map(x => x * 2);
      expect(actual.valueOr(0)).to.be.equal(4);
    }),

    it('should always return real value', () => {
      let sut = success<number, string>(5);
      expect(sut.valueOr(1)).to.be.equal(5);
    }),

    it('should correctly compare to other success with the same value', () => {
      expect(success<number, string>(5).equal(success<number, string>(5))).to.be.true;
    }),

    it('should correctly compare to other success with different value', () => {
      expect(success<number, string>(5).equal(success<number, string>(1))).to.be.false;
    }),

    it('should correctly compare to fail', () => {
      expect(success<string, string>("abc").equal(fail<string, string>("abc"))).to.be.false;
    });
  }),

  describe('fail function', () => {
    it('should create fail result', () => {
      let sut = fail<string, string>("");
      expect(sut.isSuccess()).to.be.false;
      expect(sut.isFail()).to.be.true;
    }),

    it('should match fail action', () => {
      let sut = fail<string, string>("abc");
      let actual = sut.match({
        success: sv => { throw new Error(sv); },
        fail: sf => sf
      });
      expect(actual).to.be.equal("abc");
    }),

    it('should execute dead end acton and return itself on tee', () => {
      let sut = fail<string, string>("xyz");
      let actual = "";
      let ret = sut.tee({
        success: sv => { throw new Error(sv); },
        fail: sf => { actual = sf }
      });
      expect(actual).to.be.equal("xyz");
      expect(ret).to.be.equal(sut);
    }),

    it('should execute bind function and return fail monad', () => {
      let sut = fail<string, string>("abc");
      let actual = sut.bind(x => success("cde"));
      expect(actual.equal(fail("abc"))).to.be.true;
    }),

    it('should execute map function and return fail monad', () => {
      let sut = fail<string, string>("err");
      let actual = sut.map(x => "xyz");
      expect(actual.equal(fail("err"))).to.be.true;
    }),

    it('should always return default value', () => {
      let sut = fail<number, number>(5);
      expect(sut.valueOr(1)).to.be.equal(1);
    }),

    it('should correctly compare to other fail with the same error', () => {
      expect(fail<number, number>(5).equal(fail<number, number>(5))).to.be.true;
    }),

    it('should correctly compare to other fail with different error', () => {
      expect(fail<number, number>(5).equal(fail<number, number>(1))).to.be.false;
    }),

    it('should correctly compare to success', () => {
      expect(fail<string, string>("abc").equal(success<string, string>("abc"))).to.be.false;
    });
  });
});
