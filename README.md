json-gatekeeper
========

A JSON schema validator and sanitizer for node.js.
__Note: This is a work in progress, not ready.__

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
        type: 'string'
      }
      name: {
        type: 'string',
        required: true,
        error: 'City needed.'
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
* __null__
* __array__ (constructor === Array)


##### String Validate for type {String}
  * required `{Boolean} (default = false)`
  * default `{String} (If required=true, and key doesnt exist, default value is used, all other sanitizers and validations are skipped)`
  * format `{Array} ['trim','upperCase'] (performed in order)`
  * enum `{Array} (permored after format)`
  * validate `{Array} ['isEmail', 'isAlpha'] (performed in order)`
  * error `{String} - Common override error message for the key`

__format options available__
  1. camelCase https://lodash.com/docs#camelCase
  2. capitalize https://lodash.com/docs#capitalize
  3. deburr https://lodash.com/docs#deburr
  4. kebabCase https://lodash.com/docs#kebabCase
  5. snakeCase https://lodash.com/docs#snakeCase
  6. escape https://lodash.com/docs#escape
  7. trim
  8. upperCase
  9. lowerCase
  10. phoneNumber - Removes all formatting/spaces, and outputs just numbers. Eg. (800) 123-4567 -> 8001234567

__validate options available__
  1. isEmail
  2. isURL
  3. isAlpha - (a-zA-Z)
  4. isInt
  5. isFloat
  6. isHexadecimal
  7. isAlphanumeric - letters and numbers
  8. isBase64
  9. isUUID(version) - 3, 4 or 5
  10. isMongoId - must be a string
  11. isUsername
  12. isFullname
  13. isPhoneNumber
  14. isLength(min[,max])
  15. isCreditCard

##### Object Validate for type {Object}
  * required `{Boolean} (default = false)`
  * error `{String} - Common override error message for the key`

##### Number Validate for type {Number}
  * required `{Boolean} (default = false)`
  * default `{String} (If required=true, and key doesnt exist, default value is used, all other sanitizers and validations are skipped)`
  * typeCast `{Boolean} (default = true)`
  * format `{Array} ['toInt'] (performed in order)`
  * enum `{Array} (permored after format)`
  * validate `{Array} ['isMin(9)'] (performed in order)`
  * error `{String} - Common override error message for the key`

__format options available__
  1. toInt - Type casts to Integer if Float

__validate options__
  1. isMin(min)
  2. isMax(max)
  3. isInt
  4. isFloat

##### Date Validate for type {Date}
  * required `{Boolean} (default = false)`
  * default `{Date} (If required=true, and key doesnt exist, default value is used, all other sanitizers and validations are skipped)`
  * typeCast `{Boolean} (default = true)`
  * validate `{Array} ['isAfter(10-12-1984)'] (performed in order)`
  * error `{String} - Common override error message for the key`

__validate options__
  1. isAfter([date]) - defaults to now
  2. isBefore([date]) - defaults to now

##### Boolean Validate for type {Boolean}
  * required `{Boolean} (default = false)`
  * default `{Boolean} (If required=true, and key doesnt exist, default value is used, all other sanitizers and validations are skipped)`
  * typeCast `{Boolean} (default = true)`
  * error `{String} - Common override error message for the key`

##### Null Validate for type {null}
  * required `{Boolean} (default = false)`
  * default `{Null} (If required=true, and key doesnt exist, default value is used, all other sanitizers and validations are skipped)`
  * error `{String} - Common override error message for the key`

