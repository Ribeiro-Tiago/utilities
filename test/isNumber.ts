/* test cases for function isNumber */

import { expect } from 'chai';
const util = require("../src/utilities");

describe('#isNumber()', () => {
    it('should return true if the value is a number', () => {
        expect(util.isNumber(1)).to.be.true;
    });

    it('should return true if the value is a string number', () => {
        expect(util.isNumber("2")).to.be.true;
    });

    it('should return false if the value has non-numbers in it', () => {
        expect(util.isNumber("2andSring")).to.be.false;
    });

    it('should return throw an error if the value is empty', () => {
        expect(() => util.isNumber().to.throw(Error));
    });
});