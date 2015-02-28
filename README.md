json-gatekeeper
========

A JSON schema validator and sanitizer for node.js.

#### Note: This is a work in progress, not ready.

#### Usage
```js
var jsonGatekeeper = require('json-gatekeeper');

var schema = {
  name: {
    type: 'string',
    required: true,
    format: ['camelCase']
  },
  address: {
    type: 'object',
    required: true,
    properties: {
      city: {
        type: 'string',
      }
      name: {
        type: 'string',
        required: true
      }
    }
  }
 };

// Step 1: Build schema
var Schema = jsonGatekeeper.build(schema);

// Gate the JSON object
var dataJSON = {};
var result = Schema.run(dataJSON);
```

#### Types Available:
* __string__
* __number__
* __boolean__
* __date__ (constructor === Date)
* __object__ (constructor === Object)
* __array__ (constructor === Array)


#### Type:
**String** Validate for type {String}
```
  * required {Boolean} (default = false)
  * default {String} (If required=true, and key doesnt exist, default value is used, all other sanitizers and validations are skipped)
  * format {Array} ['trim','upperCase'] (performed in order)
  * enum {Array} (permored after format)
  * validate {Array} ['isEmail', 'isAlpha'] (performed in order)
  * error {String} - Common override error message for the key

  **format options available**
  1. camelCase https://lodash.com/docs#camelCase
  2. capitalize https://lodash.com/docs#capitalize
  3. deburr https://lodash.com/docs#deburr
  4. kebabCase https://lodash.com/docs#kebabCase
  5. snakeCase https://lodash.com/docs#snakeCase
  6. trim
  7. upperCase
  8. lowerCase
  9. phoneNumber - Removes all formatting/spaces, and outputs just numbers

  **validate options available**
  1. isEmail
  2. isURL
  3. isAlpha
  4. isNumeric
  5. isAlphanumeric
  5. isBase64
  6. isUUID
  7. isMongoId
  8. isUsername
  9. isFullname
  10. isPhoneNumber
  11. isLength(min[,max])
```

**Object** Validate for type {Object}
```
  * required {Boolean} (default = false)
  * error {String} - Common override error message for the key
```

**Number** Validate for type {Number}
```
  * required {Boolean} (default = false)
  * default {String} (If required=true, and key doesnt exist, default value is used, all other sanitizers and validations are skipped)
  * format {Array} ['parseInt'] (performed in order)
  * min {Number} Checks for min (permored after sanitize)
  * max {Number} Checks for max (permored after sanitize)
  * enum {Array} (permored after sanitize)
  * validate {Array} ['doSomething'] (performed in order)

  **format options available**
  1. parseInt

  **validate options**
```

