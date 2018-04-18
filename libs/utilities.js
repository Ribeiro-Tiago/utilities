/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @description Helper class that has several utilitary functions such as isEmpty, isArray, formatDate, etc
 * @see https://github.com/Ribeiro-Tiago/util
 * @copyright MIT license, 2017
 * @version 1.1.0
 */

(function(){
    'use strict'

    /**
     * Validates value to check if it's number only
     * @param {*} value - value to validate
     * @return {boolean} - true if it's number only, false if not
     */
    const isNumber = function(value){
        let regex = new RegExp(/^[0-9]+$/);
        return (regex.test(parseInt(value)));
    };

    /**
     * Checks if the recieved value is empty
     * @param {*} value - value to check
     * @return {boolean} true if it's empty and false if not
     */
    const isEmpty = function(value){
        return (value === void 0 || value === "" || value === null || String(value).toLocaleLowerCase() === "null" || value === "undefined" || (typeof value === "object" && Object.keys(value).length === 0));
    };

    /**
     * Checks if a number is positive
     * @param {number} value - value validating
     * @throws {Error} - throws exception if value isn't number
     * @return {boolean} true if it's positive and false if not
     */
    const isPositive = function(value){
        if (!isNumber(value))
            throw Error("Value isn't a number!");

        return (value >= 0);
    };

    /**
     * Validates recieved value to see if it's even or not
     * @param {number} value - value to validate
     * @throws {Error} - throws exception if value isn't number
     * @return {boolean} true if it's even, false if not
     */
    const isEven = function(value){
        if (!isNumber(value))
            throw new Error("Value isn't a number");
            
        return (value % 2 === 0);
    };

    /**
     * Validates recieved value to see if it's an array
     * @param {Array} value - value to validate
     * @return {boolean} true if it's array, false if not
     */
    const isArray = function(value){
        return Object.prototype.toString.call(value) === '[object Array]';
    };

    /**
     * Validates recieved value to see if it's an array
     * @param {Array} value - value to validate
     * @return {boolean} true if it's array, false if not
     */
    const isDOM = function(value){
        return Object.prototype.toString.call(value) === '[object HTMLInputElement]';
    };

    /**
     * Validates recieved value to see if it's an array
     * @param {number} value - value to validate
     * @throws {Error} - throws exception if is empty
     * @return {boolean} true if it's object, false if not
     */
    const isObject = function(value){
        if (isEmpty(value))
            throw new Error("Value is empty!");

        return Object.prototype.toString.call(value) === '[object Object]';
    };

    /**
     * Checks whether or not the received value is a string
     * @param {*} value - value to be checked
     * @return {boolean} - returns true if the value is array and false otherwise
     */
    const isString = (value) => {
        return typeof value === "string";
    };

    /**
     * Checks whether or not the received value is a function
     * @param {*} value - value to be checked
     * @return {boolean} - returns true if the value is object and false otherwise
     */
    const isFunction = (value) => {
        if (isEmpty(value))
            throw new Error("Value is empty!");

        return Object.toString.call(value) === '[object Function]' || typeof value === "function";
    };

    /**
     * Trims string edges and replaces all unsafe characters the escaped version (adds \\)
     * @param {string} value - value to be checked
     * @return {string} - returns escaped string
     */
    const escapeString = (value) => {
        if (!isString(value))
            throw new Error(`Expected param 0 of escapeString to be a string but ${typeof value} received}`);

        return value.trim().replace(/[*+?^${}()|[\]\\]/, "\\$&").replace(/["']/g, "\$&");;
    }

    /**
     * Pushes the new value to an array only if that value doesn't exist yet
     * @param {*} value - value to be inserted 
     * @return {boolean} - true if it didn't exist and we managed to push, false otherwise
     */
    Array.prototype.pushUnique = function(value) {
        if (this.inArray(value)) return false;
        this.push(value);
        return true;
    };

    /**
     * Checks to see if the value exists in the array and if so removes it
     * @param {*} value - value to check
     */
    Array.prototype.removeIfExists = function(value) {
        if (isEmpty(value)) return;
        let index = this.indexOf(value);
        if (index === -1) return;
        this.splice(index, 1);
    };

    /**
     * Formats the recieved date to EU, US or database format
     * @param {string|date} date - date in string or date we're formating
     * @param {integer} format - indicates if we're returning the date in EU, US or database format.
     * 1 > EU | 2 > US | 3 > database
     * @return {string} - returns a string with the formatted date
     */
    Date.formatDate = function(date, type){
        if (util.isEmpty(date))
            throw new Error("Date is empty: ", date);

        try {
            let d = (date instanceof Date) ? date : new Date(date);
        }
        catch(ex){
            throw new Error("Invalid date: ", ex.message);
        }

        let day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
        let month = (d.getMonth() < 10) ? "0" + d.getMonth() : d.getMonth();
        let hour = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
        let minute = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
        let time = hour + ":" + minute + "  ";

        if (type === 1)
            return time + day + "/" + month + "/" + d.getFullYear()
        else if (type === 2)
            return time + month + "/" + day + "/" + d.getFullYear();
        else
            return time + d.getFullYear() + "/" + month + "/" + day;
    }

    /**
     * Calls static format date method
     */
    Date.prototype.formatDate = function(type){
        Date.formatDate(this, type);
    }

    // aggregades all functions in an objecto to export to the respective "platform"
    const utilities = {
        isNumber,
        isEmpty,
        isPositive,
        isEven,
        isArray,
        isObject,
        isDOM,
        isString,
        isFunction,
        escapeString
    };
    
    // add support for Node, React, Browser and AMD
    // node js 
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = utilities;
    }

    // react
    else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative'){
        module.exports = {
            isNumber,
            isEmpty,
            isPositive,
            isEven,
            isArray,
            isObject,
            isDOM,
            isString,
            isFunction,
            escapeString
        };
    }

    // AMD
    else if (typeof define === 'function' && define.amd) {
        define([], function() {
            return utilities;
        });
    }

    // browser
    else {
        window.util = utilities;
    }
})(); 