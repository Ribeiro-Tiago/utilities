/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @description Helper script that has several utilitary functions such as isEmpty, isArray, formatDate, etc
 * @see https://github.com/Ribeiro-Tiago/utilities
 * @copyright MIT license, 2017
 * @version 1.1.3
 */

declare interface Window {
    util: any
}

/* interface for Date.prototype.function */
declare interface Date {
    formatDate(type: number, withTime: boolean, seperator: string): string;
}

/* interface for Date.function */
declare interface DateConstructor {
    formatDate(date: Date | String, type: number, withTime: boolean, seperator: string): string;
}

declare interface Array<T> {
    pushUnique(value: any): boolean;
    removeIfExists(value: any): void;
}

(function () {
    /**
     * Validates value to check if it's number only
     * @param {*} value - value to validate
     * @return {boolean} - true if it's number only, false if not
     */
    const isNumber = (value: any): boolean => {
        if (isEmpty(value))
            throw new Error("Expected param 1 of isNumber to be something, null was received");

        return (new RegExp(/^[0-9]+$/).test(value));
    };

    /**
     * Checks if the recieved value is empty
     * @param {*} value - value to check
     * @return {boolean} true if it's empty and false if not
     */
    const isEmpty = (value: any): boolean => {
        return (value === void 0 || value === "" || String(value).toLocaleLowerCase() === "null" || value === "undefined" || (typeof value === "object" && Object.keys(value).length === 0));
    };

    /**
     * Checks if a number is positive
     * @param {number} value - value validating
     * @throws {Error} - throws exception if value isn't number
     * @return {boolean} true if it's positive and false if not
     */
    const isPositive = (value: number): boolean => {
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
    const isEven = (value: number): boolean => {
        if (!isNumber(value))
            throw new Error("Value isn't a number");

        return (value % 2 === 0);
    };

    /**
     * Validates recieved value to see if it's an array
     * @param {*} value - value to validate
     * @return {boolean} true if it's array, false if not
     */
    const isArray = (value: any): boolean => {
        if (isEmpty(value))
            throw new Error("Expected param 1 of isArray to be something, null was received");

        return Object.prototype.toString.call(value) === '[object Array]';
    };

    /**
     * Validates recieved value to see if it's an array
     * @param {DOM} value - value to validate
     * @return {boolean} true if it's array, false if not
     */
    const isDOM = (value: any): boolean => {
        if (isEmpty(value))
            throw new Error("Expected param 1 of isDOM to be something, null was received");

        return Object.prototype.toString.call(value).indexOf("HTML") !== -1;
    };

    /**
     * Validates recieved value to see if it's an array
     * @param {*} value - value to validate
     * @throws {Error} - throws exception if is empty
     * @return {boolean} true if it's object, false if not
     */
    const isObject = (value: any): boolean => {
        if (isEmpty(value))
            throw new Error("Expected param 1 of isObject to be something, null was received");

        return Object.prototype.toString.call(value) === '[object Object]';
    };

    /**
     * Checks whether or not the received value is a string
     * @param {*} value - value to be checked
     * @return {boolean} - returns true if the value is array and false otherwise
     */
    const isString = (value: any): boolean => typeof value === "string";

    /**
     * Checks whether or not the received value is a function
     * @param {*} value - value to be checked
     * @return {boolean} - returns true if the value is object and false otherwise
     */
    const isFunction = (value: any): boolean => {
        if (isEmpty(value))
            throw new Error("Expected param 1 of isFunction to be something, null was received");

        return Object.toString.call(value) === '[object Function]' || typeof value === "function";
    };

    /**
     * Trims string edges and replaces all unsafe characters the escaped version (adds \\)
     * @param {string} value - value to be checked
     * @return {string} - returns escaped string
     */
    const escapeString = (value: string): string => {
        if (!isString(value))
            throw new Error(`Expected param 0 of escapeString to be a string but ${typeof value} received}`);

        return value.trim().replace(/[*+?^${}()|[\]\\]/, "\\$&").replace(/["']/g, "\$&");;
    };

    /**
     * Checks if received value is boolean by comparing the type of value to type of the logical value "true"
     * @param {*} value - value to be checked
     * @throws {Error} if the value is empty 
     * @return {boolean} - true if it's boolean and false if not
     */
    const isBoolean = (value: any): boolean => {
        if (isEmpty(value)) {
            throw new Error("Expected param 1 of isBoolean to be something, null was received");
        }

        return (typeof (value) == typeof (true));
    };

    /**
     * Pushes the new value to an array only if that value doesn't exist yet
     * @param {*} value - value to be inserted 
     * @return {boolean} - true if it didn't exist and we managed to push, false otherwise
     */
    Array.prototype.pushUnique = function (value: any): boolean {
        // @ts-ignore
        if (this.includes(value))
            return false;

        this.push(value);

        return true;
    };

    /**
     * Checks to see if the value exists in the array and if so removes it
     * @param {*} value - value to check
     */
    Array.prototype.removeIfExists = function (value: any): void {
        if (isEmpty(value))
            return;

        let index = this.indexOf(value);

        if (index === -1)
            return;

        this.splice(index, 1);
    };

    /**
     * Formats the recieved date to EU, US or database format
     * @param {string|date} date - date in string or date we're formating
     * @param {number} format - indicates if we're returning the date in EU, US or database format.
     * 1 > EU | 2 > US | 3 > database
     * @param {boolean} withTime - tells us if we want to return the datetime or just date. Defaults to true
     * @param {string} seperator - tells us if we want the seperator to be "/" or "-". Defaults to "/"
     * @throws {Error} if type isn't integer, withTime isn't boolean or seperator isn't "/" or "-"
     * @return {string} - returns a string with the formatted date
     */
    Date.formatDate = (date: Date | string, format: number, withTime: boolean = true, seperator: string = "/"): string => {
        if (!isNumber(format)) {
            throw new Error(`Expected param 2 of FormatDate to be a integer. Received ${typeof format} instead`);
        }

        if (!isBoolean(withTime)) {
            throw new Error(`Expected param 3 of FormatDate to be a boolean. Received ${typeof withTime} instead`);
        }

        if (seperator !== "/" && seperator !== "-") {
            throw new Error(`Expected param 4 of FormatDate to be a \"/\" or \"-\". Received ${seperator} instead`);
        }

        try {
            let d = (date instanceof Date) ? date : new Date(date);

            let day = (d.getDate() < 10) ? `0${d.getDate()}` : d.getDate();
            let month = (d.getMonth() < 10) ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
            let hour = (d.getHours() < 10) ? `0${d.getHours()}` : d.getHours();
            let minute = (d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes();
            let time = (withTime) ? `${hour}:${minute}   ` : "";

            if (format === 1)
                return `${time} ${day}${seperator}${month}${seperator}${d.getFullYear()}`.trim();
            else if (format === 2)
                return `${time} ${month}${seperator}${day}${seperator}${d.getFullYear()}`.trim();
            else
                return `${time} ${d.getFullYear()}${seperator}${month}${seperator}${day}`.trim();
        }
        catch (ex) {
            throw new Error(`Invalid date: ${ex.message}`);
        }
    }

    /**
     * Calls static format date method
     */
    Date.prototype.formatDate = function (type: number, withTime: boolean = true, seperator: string = "/") {
        return Date.formatDate(this, type, withTime, seperator);
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
        isBoolean,
        escapeString
    };

    // add support for Node, React, Browser and AMD
    // node js 
    // @ts-ignore
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        // @ts-ignore
        module.exports = utilities;
    }

    // react
    else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
        // @ts-ignore
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
            isBoolean,
            escapeString
        };
    }

    // AMD 
    // @ts-ignore
    else if (typeof define === 'function' && define.amd) {
        // @ts-ignore
        define([], function () {
            return utilities;
        });
    }

    // browser
    else {
        window.util = utilities;
    }
})(); 