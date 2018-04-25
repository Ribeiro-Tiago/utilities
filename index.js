/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @version 1.1.2
 */
(function(){"use strict";const a=function(n){if(b(n))throw new Error("Expected param 1 of isNumber to be something, null was received");let o=new RegExp(/^[0-9]+$/);return o.test(parseInt(n))},b=function(n){return void 0===n||""===n||"null"===(n+"").toLocaleLowerCase()||"undefined"===n||"object"==typeof n&&0===Object.keys(n).length},c=function(n){if(!a(n))throw Error("Value isn't a number!");return 0<=n},e=function(n){if(!a(n))throw new Error("Value isn't a number");return 0==n%2},f=function(n){if(b(n))throw new Error("Expected param 1 of isArray to be something, null was received");return"[object Array]"===Object.prototype.toString.call(n)},g=function(n){if(b(n))throw new Error("Expected param 1 of isDOM to be something, null was received");return-1!==Object.prototype.toString.call(n).indexOf("HTML")},h=function(n){if(b(n))throw new Error("Expected param 1 of isObject to be something, null was received");return"[object Object]"===Object.prototype.toString.call(n)},i=n=>{return"string"==typeof n},j=n=>{if(b(n))throw new Error("Expected param 1 of isFunction to be something, null was received");return"[object Function]"===Object.toString.call(n)||"function"==typeof n},k=n=>{if(!i(n))throw new Error(`Expected param 0 of escapeString to be a string but ${typeof n} received}`);return n.trim().replace(/[*+?^${}()|[\]\\]/,"\\$&").replace(/["']/g,"$&")},l=n=>{if(b(n))throw new Error("Expected param 1 of isBoolean to be something, null was received");return"boolean"==typeof n};Array.prototype.pushUnique=function(n){return!this.inArray(n)&&(this.push(n),!0)},Array.prototype.removeIfExists=function(n){if(!b(n)){let o=this.indexOf(n);-1===o||this.splice(o,1)}},Date.formatDate=function(n,o,p=!0,q="/"){if(!a(o))throw new Error(`Expected param 2 of FormatDate to be a integer. Received ${typeof o} instead`);if(!l(p))throw new Error(`Expected param 3 of FormatDate to be a boolean. Received ${typeof p} instead`);if("/"!==q&&"-"!==q)throw new Error(`Expected param 4 of FormatDate to be a \"/\" or \"-\". Received ${q} instead`);try{let r=n instanceof Date?n:new Date(n),s=10>r.getDate()?`0${r.getDate()}`:r.getDate(),t=10>r.getMonth()?`0${r.getMonth()+1}`:r.getMonth()+1,u=10>r.getHours()?`0${r.getHours()}`:r.getHours(),v=10>r.getMinutes()?`0${r.getMinutes()}`:r.getMinutes(),w=p?`${u}:${v}   `:"";return 1===o?`${w} ${s}${q}${t}${q}${r.getFullYear()}`.trim():2===o?`${w} ${t}${q}${s}${q}${r.getFullYear()}`.trim():`${w} ${r.getFullYear()}${q}${t}${q}${s}`.trim()}catch(r){throw new Error("Invalid date: ",r.message)}},Date.prototype.formatDate=function(n,o=!0){Date.formatDate(this,n,o)};const m={isNumber:a,isEmpty:b,isPositive:c,isEven:e,isArray:f,isObject:h,isDOM:g,isString:i,isFunction:j,isBoolean:l,escapeString:k};"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=m:"undefined"!=typeof navigator&&"ReactNative"==navigator.product?module.exports={isNumber:a,isEmpty:b,isPositive:c,isEven:e,isArray:f,isObject:h,isDOM:g,isString:i,isFunction:j,isBoolean:l,escapeString:k}:"function"==typeof define&&define.amd?define([],function(){return m}):window.util=m})();