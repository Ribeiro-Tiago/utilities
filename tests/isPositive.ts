/* test cases for function isPositive */

import { expect } from 'chai';
const util = require("../src/utilities");

describe('#isPositive()', () => {
    it('should return true if the value is zero', () => {
        expect(util.isPositive(0)).to.be.true;
    });

    it('should return true if the value is a string "0"', () => {
        expect(util.isPositive("0")).to.be.true;
    });

    it('should return true if the value is greater than zero', () => {
        expect(util.isPositive(20)).to.be.true;
    });

    it('should return true if the value is a string number greater than zero', () => {
        expect(util.isPositive("20")).to.be.true;
    });

    it('should return true if the value is lesser than zero', () => {
        expect(util.isPositive(-6)).to.be.false;
    });

    it('should return true if the value is a string number lesser than zero', () => {
        expect(util.isPositive("-1")).to.be.false;
    });

    it('should return error if the value is not a number', () => {
        expect(() => util.isPositive("string")).to.throw(Error);
    });
});