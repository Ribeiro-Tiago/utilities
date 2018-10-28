/* test cases for function isArray */

import { expect } from 'chai';
const util = require("../src/utilities");

describe('#isArray()', () => {
    it('should return true if the value is an empty array literal', () => {
        expect(util.isArray([])).to.be.true;
    });

    it('should return true if the value is a non empty array', () => {
        expect(util.isArray([1, 2, 3])).to.be.true;
    });

    it('should return true if the value is a new array object', () => {
        expect(util.isArray(new Array())).to.be.true;
    });

    it('should return false if the value is a string of an array literal', () => {
        expect(util.isArray("[]")).to.be.false;
    });

    it('should return false if the value is a string of a new array object', () => {
        expect(util.isArray("new Array()")).to.be.false;
    });
});