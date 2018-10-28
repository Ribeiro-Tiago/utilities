/* test cases for function isBoolean */

import { expect } from 'chai';
const util = require("../src/utilities");

describe('#isBoolean()', () => {
    it('should return true if the value is logical value', () => {
        expect(util.isBoolean(true)).to.be.true;
    });

    it('should return false if the value is the string "true"', () => {
        expect(util.isBoolean("true")).to.be.false;
    });

    it('should return false if the value is logical value"', () => {
        expect(util.isBoolean(false)).to.be.true;
    });

    it('should return false if the value is the string "false"', () => {
        expect(util.isBoolean("false")).to.be.false;
    });
});