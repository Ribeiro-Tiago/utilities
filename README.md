# Current avaiable functions
  - [isValid](#isvalid)
  - [isEmpty](#isempty)
  - [isPositve](#ispositive)
  - [isEven](#iseven)
  - [isArray](#isarray)
  - [isObject](#isobject)
  - [isDOM](#isdom)
  - [Array.pushUnique](#pushunique)
  - [Array.removeIfExists](#removeifexists)
  - [Date.formatDate](#formatdate)

# Instalation
Simply download and include the script to your file: ``<script src="path/to/script"></script>``
If you want this lib to also handle validation errors (correctly) on isValid function, you must also download and include de css file ``<link rel="stylesheet" href="css/style.css">``

# Usage
Independetly of which enviorenment you're working on, all you need to do is call the object util.function, for example, `` util.isEmpty(value)`` 

## isValid
This function validates DOM fields or simple values. Some of the rules also require a rule value, for instance when you using maxvalue you have to specify what's the max value. Every rule has it's own error message, however you can send your own custom error message (showed below).
This function accepts either and object or an array of objects. This object contains the field / value to be validated, the rule, a custom message (optional), ruleValue (depends on the which rule we're applying) and optional (which is in itself optional)

Object composition: 
```sh
{
  field: DOM element or value,
  rule: validation rule (string),
  message: a custom message you want for validation errors (string),
  ruleValue: some rules require a rulevalue (see below) 
  optional: for the times when a value is optional but must meet certain criteria (boolean)
}
```
    

Currently supports the following rules:
  - [required](#required)
  - [number](#number)
  - [even](#even)
  - [maxvalue](#maxvalue)
  - [minvalue](#minvalue)
  - [positive](#positive)
  - [maxlen](#maxlen)
  - [minlen](#minlen)
  - [email](#email)
  - [equal](#equal)
  - [phone](#phone)

### Examples
There are several ways for you to validate what you need. You can:
   - validate only one field with one validation rule
   - validate only one field with multiple validation rule
   - validate multiple fields with one validation rule each
   - validate multiple fields with multiple validation rule each
   - validate multiple fields with one validation rule for some fields and multiple for others
You can also have a specific custom message for each validation rule

#### One field, one rule
```sh
util.isValid({
  input: value,
  rule: "required"
});
```

#### One field, multiple rules
```sh
util.isValid({
  input: value, 
  rule: ["required", "number"]
});
```

#### Multiple fields, one rule each
```sh
util.isValid([
  {input: value, rule: "required"},
  {input: value2, rule: "email"},
  {input: value3, rule: "even"}
]);
```

#### Multiple fields, multiple rules
```sh
util.isValid([
  {input: value, rule: ["required", "even"]},
  {input: value2, rule: ["email", "positive"]}
]);
```

#### Multiple fields, mixed rules
```sh
util.isValid([
  {input: value, rule: "required"},
  {input: value2, rule: ["email", "positive"]}
]);
```

#### Multiple rules with custom message each
```sh
util.isValid([
  {input: value, rule: "required"},
  {input: value2, rule: [
    {rule: "email", message: "Custom message"},
    {rule: "positive", message: "Custom message 2"} 
  ]}
]);
```

#### Rules with rule value
```sh
util.isValid([
  {input: value, rule: "maxvalue", ruleValue: 5},
  {input: value2, rule: "required", message: "something"},
  {input: value3, rule: "maxvalue", ruleValue: 5, message: "another something"},
  {input: value4, rule: [
    {rule: "minlen", message: "Custom message", ruleValue: 5},
    {rule: "positive", message: "Custom message 2"},
    {rule: "required"}
  ]}
]);
```

### required
Checks if the value has something
```sh
util.isValid({input: value, rule: "required"});
```

### number
Checks if the value is a number
```sh
util.isValid({input: value, rule: "number"});
```

### even
Checks if the value is a number and if it's an even number
```sh
util.isValid({input: value, rule: "even"});
```

### maxvalue
Checks if the value is lower than the given rule value
```sh
util.isValid({input: value, rule: "maxvalue", ruleValue: 5});
```

### minvalue
Checks if the value is higher than the given rule value
```sh
util.isValid({input: value, rule: "minvalue", ruleValue: 5});
```

### positive
Checks if the value is a number and if it's positive
```sh
util.isValid({input: value, rule: "maxvalue", ruleValue: 5});
```

### equal 
Checks if the value equals the value(s) from the rule value
```sh
util.isValid({input: value, rule: "equal", ruleValue: 5});
```
or 
```sh
util.isValid({input: value, rule: "equal", ruleValue: [5, 2, 3]});
```

### maxlen
Checks if the value length is lower than the given rule value
```sh
util.isValid({input: value, rule: "maxlen", ruleValue: 5});
```

### minlen
Checks if the value length is higher than the given rule value
```sh
util.isValid({input: value, rule: "minlen", ruleValue: 5});
```

### email
Checks if the value is a valid email
```sh
util.isValid({input: value, rule: "email"});
```

### phone
Checks if the value is a valid phone number, according to the cirteria set by the rule value
```sh
util.isValid({input: value, rule: "phone", ruleValue: ["### ### ###", "#########"]});
```
or 
```sh
util.isValid({input: value, rule: "phone", ruleValue: "#########"});
```

## isEmpty
Pretty self explanatory, checks if the value is empty. Returns true if it is and false otherwise
```sh
util.isEmpty(value) 
```

## isPositive
Checks if the value is numeric and positive. Returns true if it is and false otherwise
```sh
util.isPositive(value) 
```

## isEven
Checks if the value is numeric and even. Returns true if it is and false otherwise
```sh
util.isEven(value) 
```

## isArray
Checks if the value is an array. Returns true if it is and false otherwise
```sh
util.isArray(value) 
```

## isDOM
Checks if the value is an HTML DOM object. Returns true if it is and false otherwise
```sh
util.isDOM(value)
```

## isObject
Checks if the value is an object. Returns true if it is and false otherwise
```sh
util.isObject(value) 
```

## pushUnique
This is a Array.prototype function meaning it's only accessable through a instantiated array. This function checks if the value exists on the array and if it doesn't it'll push it in.
```sh
var arr = [1, 2, 3];
arr.pushUnique(2); // does nothing
arr.pushUnique(4); // adds 4 to the array
```

## removeIfExists
Also a prototype function. This one checks if an element exists in the array and if so, removes it.
```sh
var arr = [1, 2, 3];
arr.removeIfExists(2); // removes 2
arr.removeIfExists(4); // does nothing
```

## formatDate 
Can be used either on an instantiated object or not. Recieves a date (either string or Date) and returns it in EU, US or MySQL-ready format based on the type.
```sh
Date.formatDate(new Date(), type); 
```
or 
```sh
var d = new Date();
d.formatDate(type); 
```
Where type can be ``1 (EU format)``, ``2 (US format)`` or ``3 (database format)`` 


# MIT License
