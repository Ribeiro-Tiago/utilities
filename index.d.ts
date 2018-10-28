/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @description Helper script that has several utilitary functions such as isEmpty, isArray, formatDate, etc
 * @see https://github.com/Ribeiro-Tiago/utilities
 * @copyright MIT license, 2017
 * @version 1.1.4
 */
declare module "utilities-js";
declare interface Window {
    util: {
        isNumber: Function;
        isEmpty: Function;
        isPositive: Function;
        isEven: Function;
        isArray: Function;
        isObject: Function;
        isDOM: Function;
        isString: Function;
        isFunction: Function;
        isBoolean: Function;
        escapeString: Function;
    };
}
declare function isEmpty(value: any): boolean;
declare function isNumber(value: any): boolean;
declare function isEmpty(value: any): boolean;
declare function isPositive(value: number): boolean;
declare function isEven(value: number): boolean;
declare function isArray(value: any): boolean;
declare function isDOM(value: any): boolean;
declare function isObject(value: any): boolean;
declare function isString(value: any): boolean;
declare function isFunction(value: any): boolean;
declare function escapeString(value: string): string;
declare function isBoolean(value: any): boolean;
declare function pushUnique(arr: any[], value: any): boolean;
declare function removeIfExists(arr: any[], value: any): void;
declare function formatDate(date: Date | string, format: number, withTime: boolean, seperator: string): string;
