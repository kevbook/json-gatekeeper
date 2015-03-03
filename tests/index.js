
// Load up the tests
var jsonGatekeeper = require('../index');


var schema = {
  a: {
    type: 'string',
    required: true,
    default: 'superman',
    format: ['trim','camelCase']
  },
  b: {
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
  }
};

var Schema = jsonGatekeeper(schema);

// Gate the JSON object
var dataJSON = {
  a: 'Ran some',
  f: {
    a: new Date(),
    g: 'person',
    d: 'kevin@evin.com'
  },
  stuff: {
    grr: null,
    city: '    jacksonville '
  },
  stuff2: 'Kevin sak'
};

var result = Schema.run(dataJSON);
console.log(result);
