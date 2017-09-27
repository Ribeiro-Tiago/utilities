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
  - required
  - number
  - even
  - maxvalue
  - minvalue
  - positive
  - value
  - maxlen
  - minlen
  - email
  - equal
  - phone

## Examples
There are several ways for you to validate what you need. You can:
   - validate only one field with one validation rule
   - validate only one field with multiple validation rule
   - validate multiple fields with one validation rule each
   - validate multiple fields with multiple validation rule each
   - validate multiple fields with one validation rule for some fields and multiple for others
You can also have a specific custom message for each validation rule

### one field, one rule
```sh
  util.isValid({
    input: value,
    rule: "required"
  });
```

### one field, multiple rules
```sh
  util.isValid({
    input: value, 
    rule: ["required", "number"]
  });
```

### multiple fields, one rule each
```sh
  util.isValid([
    {input: value, rule: "required"},
    {input: value2, rule: "email"},
    {input: value3, rule: "even"}
  ]);
```

### multiple fields, multiple rules
```sh
  util.isValid([
    {input: value, rule: ["required", "even"]},
    {input: value2, rule: ["email", "positive"]}
  ]);
```

### multiple fields, mixed rules
```sh
  util.isValid([
    {input: value, rule: "required"},
    {input: value2, rule: ["email", "positive"]}
  ]);
```

### multiple rules with custom message each
```sh
  util.isValid([
    {input: value, rule: "required"},
    {input: value2, rule: [
      {rule: "email", message: "Custom message"},
      {rule: "positive", message: "Custom message 2"} 
    ]}
  ]);
```

### rules with rule value
```sh
  util.isValid([
    {input: value, rule: "maxvalue", ruleValue: 5},
    {input: value, rule: "required", message: "something"},
    {input: value, rule: "maxvalue", ruleValue: 5, message: "another something"},
    {input: value2, rule: [
      {rule: "minlen", message: "Custom message", ruleValue: 5},
      {rule: "positive", message: "Custom message 2"},
      {rule: "required"}
    ]}
  ]);
```

## Examples

Simple validator example
```sh
<script>
  var validator = new Validator();
  validator.validateFields([{field: "#name", rule: "required"}, {field: "#email", rule: ["required", "email"]}]);
</script>

<input type="text" id="name"/>
<input type="text" class="email"/>
```

Example using validator helper functions

```sh
<script>
  var validator = new Validator();
  function test(args){
      if (validator.isEmpty(args)) 
        return true;
      else
        return false;
  }
</script>
```

Example with ruleValue and custom message

```sh
<script>
  var validator = new Validator();
  validator.validateFields([{field: "#age", rule: ["required", "number", "positive", {rule: "maxvalue", value: "120", message: "Come on, you're not that old!"}]}]);
</script>

<input type="text" id="age"/>
```

### MIT License

[Roadmap](https://github.com/Ribeiro-Tiago/utilities/projects/1)
