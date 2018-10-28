/* test cases for function isEven */

import { expect } from 'chai';
const util = require("../src/utilities");

describe('#isEven()', () => {
    it('should return true if the value is an even number', () => {
        expect(util.isEven(2)).to.be.true;
    });

    it('should return true if the value is an even number', () => {
        expect(util.isEven(1)).to.be.false;
    });

    it('should return error if the value is not a number', () => {
        expect(() => util.isEven("string")).to.throw(Error);
    });
});