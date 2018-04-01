/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @description Helper class that has several utilitary functions such as field validation, isEmpty, isArray, etc
 * @see https://github.com/Ribeiro-Tiago/util
 * @copyright ISC license, 2017
 * @version 1.0.8
 */

/**
 * Helper class that has several utilitary functions such as field validation, isEmpty, isArray, etc
 */
(function(){
    'use strict'

    /**
     * Validates the recieved obj according the validation rules recieved
     * @param {array|object} obj - array or single object with obj (either DOM object or value) to be validated, validation rules and custom error messages (if the user wants)
     * example of what an object would look like: {'input': '}
     * @param {boolean} errorHandle - tells us if we're handling validation errors or not
     * @throws {Error} - throws this exception if arguments are empty
     * @return {boolean} - returns true if every input is valid and false if not
     */
    const isValid = function(obj, errorHandle){
        let handleErrors = ((typeof module !== 'undefined' && typeof module.exports !== 'undefined') || (typeof define === 'function' && define.amd)) ? false : (errorHandle || true);
        
        if (isEmpty(obj))
            throw new Error("Invalid arguments!");

        let errors = [];

        /**
         * Checks the validation rules for a certain input and validates it. If need be, adds new entry to errors array
         * @param {string} input - input to validate. Either DOM element or simple value
         * @param {string} rule - validation rule
         * @param {string} message - custom error message
         * @param {number} ruleValue - if the validation needs a value (e.g.: maxvalue, minvalue), this is that value
         * @throws {Error} - throws exception if rule is valid or one of the ruleValues isn't valid
         */
        const validate = function(input, rule, message, ruleValue, optional){
            let inputValue = (input.tagName) ? input.value : input[0].value;
            
            if (optional && isEmpty(inputValue))
                return true;

            if (rule === "required")
            {
                if (isEmpty(inputValue))
                {
                    errors.push({
                        error: message || "Required field!",
                        input: input
                    });
                }
            }

            else if (rule === "number")
            {
                if (!isNumber(inputValue))
                {
                    errors.push({
                        error: message || "Numeric field!",
                        input: input
                    });
                }
            }

            else if (rule === "even")
            {
                if (!isEven(inputValue))
                {
                    errors.push({
                        error: message || "Value must be even!",
                        input: input
                    });
                }
            }

            else if (rule === "maxvalue")
            {
                if (!isNumber(ruleValue))
                    throw new Error ("Error validating maxvalue: value isn't number!");

                if (parseInt(inputValue) > parseInt(ruleValue))
                {
                    errors.push({
                        error: message || "Value must be below " + ruleValue + "!",
                        input: input
                    });
                }
            }

            else if (rule === "minvalue")
            {
                if (!isNumber(ruleValue))
                    throw new Error ("Error validating maxvalue: value isn't number!");
                
                if (parseInt(inputValue) < parseInt(ruleValue))
                {
                    errors.push({
                        error: message || "Value must be above " + ruleValue + "!",
                        input: input
                    });
                }
            }

            else if (rule === "positive")
            {
                if (!isPositive(inputValue))
                {
                    errors.push({
                        error: message || "Field must be positive!",
                        input: input
                    });
                }
            }

            else if (rule === "equal")
            {
                let incorrectValue = function(value){
                    return (parseInt(inputValue) !== parseInt(value));
                }

                let different = (isObject(ruleValue)) ? ruleValue.every(incorrectValue) : incorrectValue(ruleValue);
                
                if (different)
                {
                    errors.push({
                        error: message || "Value must be one of the following: " + ruleValue + "!",
                        input: input
                    });
                }
            }

            else if (rule === "maxlen")
            {
                if (inputValue.length > ruleValue)
                {
                    errors.push({
                        error: message || "Maximum value length: " + ruleValue + "!",
                        input: input
                    });
                }
            }
            
            else if (rule === "minlen")
            {
                if (inputValue.length < ruleValue)
                {
                    errors.push({
                        error: message || "Minimum value length: " + ruleValue + "!",
                        input: input
                    });
                }
            }

            else if (rule === "email")
            {
                let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                
                if (!regex.test(inputValue))
                {
                    errors.push({
                        error: message || "Invalid email!",
                        input: input
                    });
                }
            }

            else if (rule === "phone")
            {
                let err = false;

                for (let index in ruleValue){
                    let format = ruleValue[index];
                    if (err)
                        break;

                    for (let i = 0; i < format.length; i++)
                    {
                        if (format[i] !== inputValue[i])
                        {
                            err = true;
                            errors.push({
                                error: message || "Values don't match!",
                                input: input
                            });
                            break;
                        }
                    }
                };
            }

            else 
                throw new Error("Invalid rule: !\n\tInput: " + input.name + "\n\tRule: " + rule);
        };

        /**
         * Goes through obj and rules and calls validate function
         * @param {object} item - object with values (field, rule, etc)
         */
        const parseObj = function(item){
            let rule = item.rule;
            let input = item.input;

            /**
             * Since the input can take up to 3 shapes, we must validate to see which one we're handling and 
             * act acording. If it's an array we've to go throught each one of it's elements, if it's an object
             * we've to access the object elements, if it's neither we simply send the respective values
             * @param {*} input - input we're preparing to validate 
             */
            const parseInput = function(input){
                if (isArray(rule))
                {
                    Array.prototype.forEach.call(rule, function(current, index){
                        validate(input, current.rule, current.message, current.value, current.optional);
                    });
                }
                else if (isObject(rule))
                    validate(input, rule.rule, rule.message, rule.value, rule.optional);
                else
                    validate(input, rule, item.message, item.value, item.optional);
            }
            
            // since it's now possible validate more than one input with the same rules we need 
            // check if we're hanlding a single input or several. If it's several we go throught 
            // each one of them and call the respective function. If not we simply call the function
            if (isArray(input))
            {
                Array.prototype.forEach.call(input, function(current){
                    parseInput(current);
                })
            }
            else 
                parseInput(input);
        }
        
        
        // since it's now possible to send both an array with all objects to be validated or just 
        // a single object to validate, we gotta check which one we're validating. If we're 
        // validating several inputs, we go throught each of them invidually and validate them
        // else we'll simply validate what we recieved
        if (isArray(obj))
        {
            Array.prototype.forEach.call(obj, function(item){
                parseObj(item);
            });
        }
        else
            parseObj(obj);

        // It's also possible that we don't want to handle the errors here, and wanna 
        // do it some other way, if so, we also gotta validate for that
        if (handleErrors)
        {
            // if there are no errors remove any existing error displaying DOM and return true,
            // indicating the inputs are valid
            if (isEmpty(errors))
            {
                removeValdiationErrors();
                return true;
            }

            // if not, we handle those DOM those errors and return false,
            // indicating the inputs aren't valid
            handleValidationErrors(errors);

            return false;   
        }
        
        return isEmpty(errors);
    };

    /**
     * Creates DOM elements to show validation errors to the user
     * @param {Object} errors - array with the errors: element that failed validation and error
     */
    const handleValidationErrors = function(errors){
        removeValdiationErrors();

        /**
         * Adds class has-error to each element group (parent) for css purposes and 
         * appends the error message to said parent.
         * If there's more than one validation error for the same field, this prevents
         * more than one error to be shown for that field at the same time
         * @param {string} parent 
         */
        let addValidationErrors = function(parent, err){
            if (parent.classList.contains("has-error")) 
            return;
            
            let span = document.createElement("span");
            parent.classList.add("has-error");
            
            span.innerHTML = err;
            parent.appendChild(span);
        }
        
        Array.prototype.forEach.call(errors, function(item, index){
            let getParent = (elem) => {
                return (util.isDOM(elem)) ? elem.parentElement : elem[0].parentElement;
            }

            if (isArray(item.input))
            {
                Array.prototype.forEach.call(item.input, function(input){
                    addValidationErrors(getParent(input), item.error);
                })
            }
            else 
                addValidationErrors(getParent(item.input), item.error);
        });
    };

    /**
     * Removes error DOM elements by removing error-wrapper elements and 
     * has-error class from parent elems
     */
    const removeValdiationErrors = function(){
        let elems = document.getElementsByClassName("error-span");
        
        for (let i = elems.length-1; i >= 0; i--){
            elems[i].parentElement.classList.remove("has-error");
            elems[i].remove();
        };
    };

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

        return value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
            throw new Error("Invalid date: ", date);

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
        isValid,
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
            isValid,
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