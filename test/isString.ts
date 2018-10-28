/* test cases for function isString */

import { expect } from 'chai';
const util = require("../src/utilities");

describe('#isString()', () => {
    it('should return true if the value is a string', () => {
        expect(util.isString("some string")).to.be.true;
    });

    it('should return true if the value is a string of a logical value', () => {
        expect(util.isString("false")).to.be.true;
    });

    it('should return false if the value is a number', () => {
        expect(util.isString(123)).to.be.false;
    });

    it('should return false if the value is an array', () => {
        expect(util.isString([1, 2, 3])).to.be.false;
    });

    it('should return false if the value is an object', () => {
        expect(util.isString({ value: "an object value " })).to.be.false;
    });

    it('should return false if the value is a logical value', () => {
        expect(util.isString(true)).to.be.false;
    });

    it('should return false if the value is a function', () => {
        expect(util.isString(() => { })).to.be.false;
    });
});