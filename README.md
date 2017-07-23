# Validator
Helper class that validates fields and has other helper functions such as isEmpty, isNumber, etc

Currently supports the following:
  - required
  - email
  - number
  - even
  - maxlen
  - minlen
  - maxvalue
  - minvalue
  - positive
  - value

### requires jquery to work

#Instalation
Simply include the script to your file: ``<script src="path/to/script"></script>``

#Usage
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

### Check projects tab to see roadmap for this library
