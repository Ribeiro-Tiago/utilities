/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @description Helper script that has several utilitary functions such as isEmpty, isArray, formatDate, etc
 * @see https://github.com/Ribeiro-Tiago/utilities
 * @copyright MIT license, 2017
 * @version 1.1.3
 */
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
declare interface Date {
    formatDate(type: number, withTime: boolean, seperator: string): string;
}
declare interface DateConstructor {
    formatDate(date: Date | String, type: number, withTime: boolean, seperator: string): string;
}
declare interface Array<T> {
    pushUnique(value: any): boolean;
    removeIfExists(value: any): void;
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
//# sourceMappingURL=utilities.d.ts.map