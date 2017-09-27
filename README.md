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
Validator recieves a boolean argument (defaults to true) that tells the validator if we want to handle the errors (add DOM elements with error message) or just return the result of the validation.

# isValid
This function validates DOM fields or simple values

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
   - validate only one field with one 

```sh

```

```sh
  
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
