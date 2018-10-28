/* test cases for function isObject */

import { expect } from 'chai';
const util = require("../src/utilities");

describe('#isObject()', () => {
    it('should return true if the value is a an empty object', () => {
        expect(util.isObject({})).to.be.true;
    });

    it('should return true if the value is a non empty object', () => {
        expect(util.isObject({ value: "something" })).to.be.true;
    });

    it('should return true if the value is a not an object', () => {
        expect(util.isObject("Clearly not an object")).to.be.false;
    });
});