/* test cases for function isEmpty */

import { expect } from 'chai';
const util = require("../src/utilities");

describe('#isEmpty()', () => {
    it('should return true if no value provided', () => {
        expect(util.isEmpty()).to.be.true;
    });

    it('should return true if the value provided is an empty array', () => {
        expect(util.isEmpty([])).to.be.true;
    });

    it('should return true if the value provided is an empty object', () => {
        expect(util.isEmpty({})).to.be.true;
    });

    it('should return true if the value provided is an empty string', () => {
        expect(util.isEmpty("")).to.be.true;
    });

    it('should return false if the value is something', () => {
        expect(util.isEmpty("some value")).to.be.false;
    });

    it('should return false if the value is number 0', () => {
        expect(util.isEmpty(0)).to.be.false;
    });

    it('should return false if the value is string "0"', () => {
        expect(util.isEmpty("0")).to.be.false;
    });

    it('should return false if the value is a date object', () => {
        expect(util.isEmpty(new Date())).to.be.false;
    });
});