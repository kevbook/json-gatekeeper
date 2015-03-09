
// Load up the tests
var jsonGatekeeper = require('../index');
var deepcopy = require('deepcopy');


var schema = {
  str1: {
    type: 'string',
    required: true,
    default: 'superman',
    format: ['trim','camelCase']
  },
  str2: {
    type: 'string',
    default: 'superman',
    format: ['trim','camelCase']
  },
  str3: {
    type: 'string',
    error: 'Crap man',
    format: ['trim','camelCase']
  },
  str4: {
    type: 'strings',
  },
  str5: {
    type: 'string',
    format: []
  },
  str6: {
    type: 'string',
    format: ['random stuff']
  },
  str7: {
    type: 'string',
    format: [ function(v){return v+'superman'} ]
  },


/******

  : {
    type: 'object',
    properties: {
      c: {
        type: 'string',
        format: ['trim','capitalize']
      },
      d: {
        type: 'string',
        required: true,
        default: 'damnddd',
        error: 'Name needed.'
      }
    }
  },
  f: {
    type: 'object',
    required: true,
    error: 'F failed man',
    properties: {
      g: {
        type: 'string',
        enum: ['cool', 'person']
      },
      d: {
        type: 'string',
        validate: ['isEmail']
      }
    }
  },
  num: {
    type: 'number',
    required: true,
    default: 1000.300,
    format: ['roundFloat']
  }
  ***/
};

function Schema() {
  return deepcopy(schema);
}


/**
 * Build Schema
 **/
require('./build')(Schema, jsonGatekeeper);




// // Gate the JSON object
// var dataJSON = {
//   a: 'Ran some',
//   f: {
//     a: new Date(),
//     g: 'person',
//     d: 'kevin@evin.com'
//   },
//   num: -20.103333,
//   stuff: {
//     grr: null,
//     city: '    jacksonville '
//   },
//   stuff2: 'Kevin sak'
// };

// var result = Schema.run(dataJSON);
// console.log(result);
