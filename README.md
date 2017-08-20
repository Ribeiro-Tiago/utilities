# Still in development

# Current avaiable functions
  - isValid
  - isEmpty
  - isPositve
  - isEven
  - isArray
  - isObject

# isValid
Function that validates fields

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

## Instalation
Simply include the script to your file: ``<script src="path/to/script"></script>``

## Usage
Validator recieves a boolean argument (defaults to true) that tells the validator if we want to handle the errors (add DOM elements with error message) or just return the result of the validation.
```sh
var validator = new Validator(false);
validator.validateFields([{field: "field", rule: "rule" }]);
validator.isEmpty(value);
```

```sh
  function validateFields(fields);
  fields is an array of objects with the following composition:
  {
    field: input selector,
    rule: string / array with the validation rules,
    message: custom message you might wanna send
  }
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
