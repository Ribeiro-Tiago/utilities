/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @description Helper script that has several utilitary functions such as isEmpty, isArray, formatDate, etc
 * @see https://github.com/Ribeiro-Tiago/utilities
 * @copyright MIT license, 2017
 * @version 1.1.3
 */
declare interface Window {
    util: any;
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
//# sourceMappingURL=utilities.d.ts.map