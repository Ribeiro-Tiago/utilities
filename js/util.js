/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @description Helper class that has several utilitary functions such as field validation, isEmpty, isArray, etc
 * @see https://github.com/Ribeiro-Tiago/util
 * @copyright MIT license, 2017
 * @version 1.0.0
 */

/**
 * Helper class that has several utilitary functions such as field validation, isEmpty, isArray, etc
 */
(function(){
    'use strict'

    var self = this;

    /**
     * Validates the recieved obj according the validation rules recieved
     * @param {array|object} obj - array or single object with obj (either DOM object or value) to be validated, validation rules and custom error messages (if the user wants)
     * example of what an object would look like: {'input': '}
     * @param {boolean} errorHandle - tells us if we're handling validation errors or not
     * @throws {Error} - throws this exception if arguments are empty
     * @return {boolean} - returns true if every input is valid and false if not
     */
    var isValid = function(obj, errorHandle){
        var handleErrors = (typeof module !== 'undefined' && typeof module.exports !== 'undefined') ? false : (true || errorHandle);

        if (self.isEmpty(obj))
            throw new Error("Invalid arguments!");

        var errors = [];

        /**
         * Checks the validation rules for a certain input and validates it. If need be, adds new entry to errors array
         * @param {string} input - input to validate. Either DOM element or simple value
         * @param {string} rule - validation rule
         * @param {string} message - custom error message
         * @param {number} ruleValue - if the validation needs a value (e.g.: maxvalue, minvalue), this is that value
         * @throws {Error} - throws exception if rule is valid or one of the ruleValues isn't valid
         */
        var validate = function(input, rule, message, ruleValue, optional){
            var isinputDOM = (input.tagName);
            var inputValue = (isinputDOM) ? input.value : input;
            
            if (optional && self.isEmpty(inputValue))
                return true;

            if (rule === "required")
            {
                if (self.isEmpty(inputValue))
                {
                    errors.push({
                        error: message || "Required field!",
                        input: input
                    });
                }
            }

            else if (rule === "number")
            {
                if (!self.isNumber(inputValue))
                {
                    errors.push({
                        error: message || "Numeric field!",
                        input: input
                    });
                }
            }

            else if (rule === "even")
            {
                if (!self.isEven(inputValue))
                {
                    errors.push({
                        error: message || "Value must be even!",
                        input: input
                    });
                }
            }

            else if (rule === "maxvalue")
            {
                if (!self.isNumber(ruleValue))
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
                if (!self.isNumber(ruleValue))
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
                if (!self.isPositive(inputValue))
                {
                    errors.push({
                        error: message || "Field must be positive!",
                        input: input
                    });
                }
            }

            else if (rule === "value")
            {
                var incorrectValue = function(value){
                    return (parseInt(inputValue) !== parseInt(value));
                }

                var different = (self.isObject(ruleValue)) ? ruleValue.every(incorrectValue) : incorrectValue(ruleValue);
                
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
                var regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                
                if (!regex.test(inputValue))
                {
                    errors.push({
                        error: message || "Invalid email!",
                        input: input
                    });
                }
            }

            else if (rule === "equal")
            {
                var tmp = (ruleValue.tagName) ? ruleValue.value : ruleValue;
                
                if (inputValue !== tmp.value)
                {
                    errors.push({
                        error: message || "Values don't match!",
                        input: [input, tmp]
                    });
                }
            }

            else if (rule === "phone")
            {
                var err = false;

                for (var index in ruleValue){
                    var format = ruleValue[index];
                    if (err)
                        break;

                    for (var i = 0; i < format.length; i++)
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
        var parseObj = function(item){
            var rule = item.rule;
            var input = item.input;

            /**
             * Since the input can take up to 3 shapes, we must validate to see which one we're handling and 
             * act acording. If it's an array we've to go throught each one of it's elements, if it's an object
             * we've to access the object elements, if it's neither we simply send the respective values
             * @param {*} input - input we're preparing to validate 
             */
            var parseInput = function(input){
                if (self.isArray(rule))
                {
                    Array.prototype.forEach.call(rule, function(current, index){
                        validate(input, current.rule, current.message, current.value, current.optional);
                    });
                }
                else if (self.isObject(rule))
                    validate(input, rule.rule, rule.message, rule.value, rule.optional);
                else
                    validate(input, rule, item.message, item.optional);
            }
            
            // since it's now possible validate more than one input with the same rules we need 
            // check if we're hanlding a single input or several. If it's several we go throught 
            // each one of them and call the respective function. If not we simply call the function
            if (self.isArray(input))
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
        if (self.isArray(obj))
        {
            Array.prototype.forEach.call(obj, function(item){
                parseObj(item);
            });
        }
        else
            parseObj(obj);

        // If the input is DOM we're gonna check for error handling 
        // (creating DOM elements representing the erro on the screen)
        // beacuse if the input happens to be a value we've no element 
        // append those errors to
        if (isFieldDOM)
        {
            // It's also possible that we don't want to handle the errors here, and wanna 
            // do it some other way, if so, we also gotta validate for that
            if (handleErrors)
            {
                // if there are no errors remove any existing error displaying DOM and return true,
                // indicating the inputs are valid
                if (self.isEmpty(errors))
                {
                    removeValdiationErrors();
                    return true;
                }

                // if not, we handle those DOM those errors and return false,
                // indicating the inputs aren't valid
                handleValidationErrors(errors);

                return false;   
            }
        }
        
        return self.isEmpty(errors);
    }

    /**
     * Creates DOM elements to show validation errors to the user
     * @param {Object} errors - array with the errors: element that failed validation and error
     */
    var handleValidationErrors = function(errors){
        removeValdiationErrors();

        /**
         * Adds class has-error to each element group (parent) for css purposes and 
         * appends the error message to said parent.
         * If there's more than one validation error for the same field, this prevents
         * more than one error to be shown for that field at the same time
         * @param {string} parent 
         */
        var addValidationErrors = function(parent, err){
            if (parent.classList.has("error-wrapper") || parent.classList.has("has-error"))
                return;
            
            var div = document.createElement("div");
            var span = document.createElement("span");
            
            div.classList.add("error-wrapper");
            parent.classList.add("has-error");
            span.innerHTML = err;

            div.appendChild(span);
            parent.appendChild(div);
        }
        
        Array.prototype.forEach.call(errors, function(item, index){
            if (self.isArray(item.field))
            {
                Array.prototype.forEach.call(item.field, function(field){
                    addValidationErrors(field.parentElement, item.error);
                })
            }
            else 
                addValidationErrors(item.field.parentElement, item.error);
        });
    }

    /**
     * Removes error DOM elements by removing error-wrapper elements and 
     * has-error class from parent elems
     */
    var removeValdiationErrors = function(){
        var elems = document.getElementsByClassName("error-wrapper");
        
        for (i = elems.length-1; i >= 0; i--)
        {
            elems[i].remove();
        }

        document.getElementsByClassName("has-error").forEach(function(elem){
            elem.classList.remove("has-error");
        });
    }

    /**
     * Validates value to check if it's number only
     * @param {*} value - value to validate
     * @return {boolean} - true if it's number only, false if not
     */
    var isNumber = function(value){
        var regex = new RegExp(/^[0-9]+$/);
        return (regex.test(parseInt(value)));
    }

    /**
     * Checks if the recieved value is empty
     * @param {*} value - value to check
     * @return {boolean} true if it's empty and false if not
     */
    var isEmpty = function(value){
        return (value === void 0 || value === "" || value === null || String(value).toLocaleLowerCase() === "null" || value === "undefined" || (typeof value === "object" && Object.keys(value).length === 0));
    }

    /**
     * Checks if a number is positive
     * @param {number} value - value validating
     * @throws {Error} - throws exception if value isn't number
     * @return {boolean} true if it's positive and false if not
     */
    var isPositive = function(value){
        if (!isNumber(value))
            throw Error("Value isn't a number!");

        return (value >= 0);
    }

    /**
     * Validates recieved value to see if it's even or not
     * @param {number} value - value to validate
     * @throws {Error} - throws exception if value isn't number
     * @return {boolean} true if it's even, false if not
     */
    var isEven = function(value){
        if (!isNumber(value))
            throw new Error("Value isn't a number");
            
        return (value % 2 === 0);
    }

    /**
     * Validates recieved value to see if it's an array
     * @param {Array} value - value to validate
     * @throws {Error} - throws exception if is empty
     * @return {boolean} true if it's array, false if not
     */
    var isArray = function(value){
        if (this.isEmpty(value))
            throw new Error("Value is empty!");
        
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    /**
     * Validates recieved value to see if it's an array
     * @param {number} value - value to validate
     * @throws {Error} - throws exception if is empty
     * @return {boolean} true if it's object, false if not
     */
    var isObject = function(value){
        if (this.isEmpty(value))
            throw new Error("Value is empty!");

        return typeof value === "object";
    }

    // aggregades all functions in an objecto to export to the respective "platform"
    var util = {
        isValid,
        isNumber,
        isEmpty,
        isPositive,
        isEven,
        isArray,
        isObject
    };
    
    // add support for Node, Browser and AMD
    // node js 
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = util;
    }

    // AMD
    else if (typeof define === 'function' && define.amd) {
        define([], function() {
            return util;
        });
    }

    // browser
    else {
        window.util = util;
    }
})(); 