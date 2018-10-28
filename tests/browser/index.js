! function () {
    var e = function (e) {
            if (t(e)) throw new Error("Expected param 1 of isNumber to be something, null was received");
            return !isNaN(e)
        },
        t = function (e) {
            return void 0 === e || "" === e || "null" === String(e).toLocaleLowerCase() || "undefined" === e || "object" == typeof e && 0 === Object.keys(e).length
        },
        r = function (e) {
            return "string" == typeof e
        },
        n = function (e) {
            if (t(e)) throw new Error("Expected param 1 of isBoolean to be something, null was received");
            return typeof e == typeof !0
        },
        o = {
            isNumber: e,
            isEmpty: t,
            isPositive: function (t) {
                if (!e(t)) throw Error("Value isn't a number!");
                return t >= 0
            },
            isEven: function (t) {
                if (!e(t)) throw new Error("Value isn't a number");
                return t % 2 == 0
            },
            isArray: function (e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            isObject: function (e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            },
            isDOM: function (e) {
                if (t(e)) throw new Error("Expected param 1 of isDOM to be something, null was received");
                return -1 !== Object.prototype.toString.call(e).indexOf("HTML")
            },
            isString: r,
            isFunction: function (e) {
                if (t(e)) throw new Error("Expected param 1 of isFunction to be something, null was received");
                return "[object Function]" === Object.toString.call(e) || "function" == typeof e
            },
            isBoolean: n,
            pushUnique: function (e, t) {
                return !e.includes(t) && (e.push(t), !0)
            },
            removeIfExists: function (e, r) {
                if (!t(r)) {
                    var n = e.indexOf(r); - 1 !== n && e.splice(n, 1)
                }
            },
            formatDate: function (t, r, o, i) {
                if (void 0 === o && (o = !0), void 0 === i && (i = "/"), !e(r)) throw new Error("Expected param 2 of FormatDate to be a integer. Received " + typeof r + " instead");
                if (!n(o)) throw new Error("Expected param 3 of FormatDate to be a boolean. Received " + typeof o + " instead");
                if ("/" !== i && "-" !== i) throw new Error('Expected param 4 of FormatDate to be a "/" or "-". Received ' + i + " instead");
                try {
                    var a = t instanceof Date ? t : new Date(t),
                        u = a.getDate() < 10 ? "0" + a.getDate() : a.getDate(),
                        c = a.getMonth() < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1,
                        f = a.getHours() < 10 ? "0" + a.getHours() : a.getHours(),
                        s = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes(),
                        p = o ? f + ":" + s + "   " : "";
                    return 1 === r ? (p + " " + u + i + c + i + a.getFullYear()).trim() : 2 === r ? (p + " " + c + i + u + i + a.getFullYear()).trim() : (p + " " + a.getFullYear() + i + c + i + u).trim()
                } catch (e) {
                    throw new Error("Invalid date: " + e.message)
                }
            },
            escapeString: function (e) {
                if (!r(e)) throw new Error("Expected param 0 of escapeString to be a string but " + typeof e + " received}");
                return e.trim().replace(/[*+?^${}()|[\]\\]/, "\\$&").replace(/["']/g, "$&")
            }
        };
    "undefined" != typeof module && void 0 !== module.exports || "undefined" != typeof navigator && "ReactNative" == navigator.product ? module.exports = o : "function" == typeof define && define.amd ? define([], function () {
        return o
    }) : window.util = o
}();