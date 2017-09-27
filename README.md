# Still in development

# Current avaiable functions
  - [isValid](#isvalid)
  - [isEmpty](#isEmpty)
  - [isPositve](#ispositive)
  - [isEven](#iseven)
  - [isArray](#isarray)
  - [isObject](#isobject)
  - [Array.pushUnique](#pushunique)
  - [Array.removeIfExists](#removeifexists)
  - [Date.formatDate](#formatdate)

# Instalation
Simply download and include the script to your file: ``<script src="path/to/script"></script>``
If you want this lib to also handle validation errors (correctly) on isValid function, you must also download and include de css file ``<link rel="stylesheet" href="css/style.css">``

# Usage
Independetly of which enviorenment you're working on, all you need to do is call the object util.function, for example, `` util.isEmpty(value)`` 

## isValid
This function validates DOM fields or simple values. Some of the rules also require a rule value, for instance when you using maxvalue you have to specify what's the max value.

Currently supports the following rules:
  - [required](#required)
  - [number](#number)
  - [even](#even)
  - [maxvalue](#maxvalue)
  - [minvalue](#minvalue)
  - [positive](#positive)
  - [value](#value)
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

### postive
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


# MIT License

[Roadmap](https://github.com/Ribeiro-Tiago/utilities/projects/1)
