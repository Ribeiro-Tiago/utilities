# Current avaiable functions
  - [isEmpty](#isempty)
  - [isPositive](#ispositive)
  - [isEven](#iseven)
  - [isArray](#isarray)
  - [isObject](#isobject)
  - [isDOM](#isdom)
  - [isString](#isstring)
  - [isFunction](#isfunction)
  - [isNumber](#isnumber)
  - [isBoolean](#isboolean)
  - [escapeString](#escapestring)
  - [Array.pushUnique](#pushunique)
  - [Array.removeIfExists](#removeifexists)
  - [Date.formatDate](#formatdate)

# Instalation
You can either download and include the script to your file: ``<script src="path/to/script"></script>`` manually or you can use ecmascript 6's ``require("utilities-js")`` 

# Usage
Depending on your development environment you may need to call `` util. `` or use the functions directly. For instance if you're on browser and node you need to do `` util.isEmpty(value) `` but on react native you can import each function seperately:  `` import { isEmpty } from "utilities-js"; `` and then `` isEmpty(value) `` .

## isEmpty
Pretty self explanatory, checks if the value is empty.
Returns true if it is and false otherwise.
```javascript
util.isEmpty(value) 
```

## isPositive
Checks if the value is numeric and positive.
Throws an Error if the value isn't a number.
Returns true if it is and false otherwise.
```javascript
util.isPositive(value) 
```

## isEven
Checks if the value is numeric and even.
Throws an Error if the value isn't a number
Returns true if it is and false otherwise.
```javascript
util.isEven(value) 
```

## isArray
Checks if the value is an array.
Throws Error if value is empty
Returns true if it is and false otherwise.
```javascript
util.isArray(value) 
```

## isDOM
Checks if the value is a HTML DOM object.
Throws Error if value is empty
Returns true if it is and false otherwise.
```javascript
util.isDOM(value)
```

## isObject
Checks if the value is an object.
Throws an Error if the value is empty.
Returns true if it is and false otherwise.
```javascript
util.isObject(value) 
```

## isFunction
Checks if the value is a function.
Throws an Error if the value is empty.
Returns true if it is and false otherwise.
```javascript
util.isFunction(value) 
```

## isNumber
Checks if the value is a number.
Throws Error if value is empty
Returns true if it is and false otherwise.
```javascript
util.isNumber(value) 
```

## isBoolean
Checks if the value is boolean.
Throws Error if value is empty
Returns true if it is and false otherwise.
```javascript
util.isBoolean(value) 
```

## escapeString
Sanitizes a string, escaping special characters, double and single quotation marks and removing white spaces at the start and end of the string.
Throws an Error if the value is not a string.
Returns escaped string.
```javascript
util.isObject(value) 
```

## pushUnique
This is a Array.prototype function meaning it's only accessable through a instantiated array. 
This function checks if the value exists on the array and if it doesn't it'll push it in.
Returns false if the value is in the array and true otherwise.
```javascript
var arr = [1, 2, 3];
arr.pushUnique(2); // does nothing
arr.pushUnique(4); // adds 4 to the array
```

## removeIfExists
Also a prototype function. This one checks if an element exists in the array and if so, removes it.
Returns nothing.
```javascript
var arr = [1, 2, 3];
arr.removeIfExists(2); // removes 2
arr.removeIfExists(4); // does nothing
```

## formatDate 
Can be used either on an instantiated object or not. 
Formats a date to either EU, US or MySQL-ready. Can return date and time or date only. The seperator can be specified to either "/" or "-"
Returns the formated date
Throws an Error if the date is empty or if the date was invalid and couldn't create a date instance with the received date.
```javascript
Date.formatDate(new Date(), type, withTime, seperator); 
```
or 
```javascript
var d = new Date();
d.formatDate(type); 
```
Where:
type = ``1 (EU format)``, ``2 (US format)`` or ``3 (database format)`` 
withTime = ``true`` or ``false``, defaulting to ``true``
seperator = ``/`` or ``-``, defaulting to ``/``


# MIT License