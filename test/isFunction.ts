/* test cases for function isFunction */

import { expect } from 'chai';
const util = require("../src/utilities");

describe('#isFunction()', () => {
    it('should return true if the value is an arrow function', () => {
        expect(util.isFunction(() => { })).to.be.true;
    });

    it('should return true if the value is a function declaration', () => {
        expect(util.isFunction(function something() { })).to.be.true;
    });

    it('should return true if the value is a function declaration stored in a variable', () => {
        const func = function () { };

        expect(util.isFunction(func)).to.be.true;
    });

    it('should return true if the value is an arrow function stored in a variable', () => {
        const func2 = () => { };

        expect(util.isFunction(func2)).to.be.true;
    });


    it('should throw error if the value is empty', () => {
        expect(() => util.isFunction()).to.throw(Error);
    });
});