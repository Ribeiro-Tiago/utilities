/**
 * @author Tiago Ribeiro - www.tiago-ribeiro.com
 * @requires jquery, ES6
 * @description Helper class to valida fields. Currently validates for required, email, number, even, maxvalue, minvalue,
 * positive, is a certain value, maxlen and minlen.
 * @see https://github.com/Ribeiro-Tiago/validator
 * @copyright MIT license, 2017
 * @version 1.0.0
 */

'use strict'

/**
 * Helper class to validate fields. It also has helper validation funcions such as isEmpty, isNumber
 * Currently supports the followe validations: required, email, number, even, maxvalue, minvalue,
 * positive, is a certain value, maxlen and minlen.
 * @param {boolean} errors - tells us if we're handling validation errors or not
 * 
 * @property {boolean} handleErrors - tells us if we're handling validation errors or not. Defaults to true
 * @property {function} validateField - function that validates fields
 */
function Validator(errors) {
    var handleErrors = true || errors;
    var self = this;
    /**
     * Validates the recieved fields according the validation rules recieved
     * @param {array} fields - array with fields (selector) to be validated, validation rules and custom error messages (if the user wants)
     * @throws {Error} - throws this exception if arguments are empty
     * @return {boolean} - returns true if every field is valid and false if not
     */
    this.validateFields = function(fields){
        if (self.isEmpty(fields))
            throw new Error("Invalid arguments!");

        var errors = [];

        /**
         * Checks the validation rules for a certain field and validates it. If need be, adds new entry to errors array
         * @param {string} field - field to validate
         * @param {*} rule - validation rule
         * @param {string} message - custom error message
         * @param {number} ruleValue - if the validation needs a value (e.g.: maxvalue, minvalue), this is that value
         * @throws {Error} - throws exception if rule is valid or one of the ruleValues isn't valid
         */
        var validate = function(field, rule, message, ruleValue){
            field = field[0];

            if (rule === "required")
            {
                if (self.isEmpty(field.value))
                {
                    errors.push({
                        error: message || "Required field!",
                        field: field
                    });
                }
            }

            else if (rule === "number")
            {
                if (!self.isNumber(field.value))
                {
                    errors.push({
                        error: message || "Numeric field!",
                        field: field
                    });
                }
            }

            else if (rule === "even")
            {
                if (!self.isEven(field.value))
                {
                    errors.push({
                        error: message || "Value must be even!",
                        field: field
                    });
                }
            }

            else if (rule === "maxvalue")
            {
                if (!self.isNumber(ruleValue))
                    throw new Error ("Error validating maxvalue: value isn't number!");

                if (parseInt(field.value) > parseInt(ruleValue))
                {
                    errors.push({
                        error: message || "Value must be below " + ruleValue + "!",
                        field: field
                    });
                }
            }

            else if (rule === "minvalue")
            {
                if (!self.isNumber(ruleValue))
                    throw new Error ("Error validating maxvalue: value isn't number!");
                
                if (parseInt(field.value) < parseInt(ruleValue))
                {
                    errors.push({
                        error: message || "Value must be above " + ruleValue + "!",
                        field: field
                    });
                }
            }

            else if (rule === "positive")
            {
                if (!self.isPositive(field.value))
                {
                    errors.push({
                        error: message || "Field must be positive!",
                        field: field
                    });
                }
            }

            else if (rule === "value")
            {
                var different;
                var incorrectValue = function(value){
                    return (parseInt(field.value) !== parseInt(value));
                }

                if (typeof ruleValue === "object")
                    different = ruleValue.every(incorrectValue);
                else 
                    different = incorrectValue(ruleValue);
                
                if (different)
                {
                    errors.push({
                        error: message || "Value must be one of the following: " + ruleValue + "!",
                        field: field
                    });
                }
            }

            else if (rule === "maxlen")
            {
                if (field.value.length > ruleValue)
                {
                    errors.push({
                        error: message || "Maximum value length: " + ruleValue + "!",
                        field: field
                    });
                }
            }
            
            else if (rule === "minlen")
            {
                if (field.value.length < ruleValue)
                {
                    errors.push({
                        error: message || "Minimum value length: " + ruleValue + "!",
                        field: field
                    });
                }
            }

            else if (rule === "email")
            {
                var regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                
                if (!regex.test(field.value))
                {
                    errors.push({
                        error: message || "Invalid email!",
                        field: field
                    });
                }
            }

            else 
                throw new Error("Invalid rule: !\n\tField: " + field.name + "\n\tRule: " + rule);
        };
        
        fields.forEach(function(item, index){
            var rule = item.rule;
            var field = $(item.field);
            
            if (typeof rule === "object")
            {
                rule.forEach(function(itm, index){

                    if (typeof itm === "object")
                        validate(field, itm.rule, itm.message, itm.value);                    
                    else
                        validate(field, itm, itm.message, null);
                });
            }
            else
                validate(field, rule, item.message, (rule === "maxvalue" || rule === "minvalue" || "value") ? item.value : null);
        });

        if (handleErrors)
        {
            if (self.isEmpty(errors))
            {
                removeValdiationErrors();
                return true;
            }

            handleValidationErrors(errors);

            return false;   
        }
        else
            return self.isEmpty(errors);
    }

    /**
     * Creates DOM elements to show validation errors to the user
     * @param {Object} errors - array with the errors: element that failed validation and error
     */
    var handleValidationErrors = function(errors){
        removeValdiationErrors();
        
        errors.forEach(function(item, index){
            var parent = $(item.field).parent();

            // If there's more than one validation error for the same field, this prevents
            // more than one error to be shown for that field at the same time
            if (parent.hasClass("error-wrapper") || parent.hasClass("has-error"))
                return;
            
            parent.addClass("has-error");
            parent.append($("<div class='error-wrapper'><span>" + item.error + "</span></div>"));
        });
    }

    /**
     * Removes error DOM elements
     */
    var removeValdiationErrors = function(){
        var elements = $(".error-wrapper");
        var current, parent;

        for (var i = elements.length - 1; i >= 0; i--) {
            current = elements[i];
            parent = current.parentElement;

            current.removeClass("error-wrapper");
            parent.removeClass("has-error");
            parent.appendChild(current.childNodes[0]);
            parent.removeChild(current);
        }
    }
};

/**
 * Validates value to check if it's number only
 * @param {*} value - value to validate
 * @return {boolean} - true if it's number only, false if not
 */
Validator.prototype.isNumber = function(value){
    var regex = new RegExp(/^[0-9]+$/);
    return (regex.test(parseInt(value)));
}

/**
 * Checks if the recieved value is empty
 * @param {*} value - value to check
 * @return {boolean} true if it's empty and false if not
 */
Validator.prototype.isEmpty = function(value){
    return (value === void 0 || value === "" || value === null || (typeof value === "object" && Object.keys(value).length === 0));
}

/**
 * Checks if a number is positive
 * @param {number} value - value validating
 * @throws {Error} - throws exception if value isn't number
 * @return {boolean} true if it's positive and false if not
 */
Validator.prototype.isPositive = function(value){
    if (!isNumber(value))
        throw Error("Value isn't a number!");

    return (value >= 0);
}

/**
 * Validates recieved value to see if it's even or not
 * @param {number} value - value to validate
 * @return {boolean} true if it's even, false if not
 */
Validator.prototype.isEven = function(value){
    if (!isNumber(value))
        throw new Error("Value isn't a number");
        
    return (value % 2 === 0);
}