
// Load up the tests
var jsonGatekeeper = require('../index');


var schema = {
  first_name: {
    type: 'string',
    required: true,
    format: ['camelCase','trim']
  },
  second_name: {
    type: 'string',
    required: true,
    format: ['camelCase'],
    error: 'Crap failed, bro.'
  },
  address: {
    type: 'object',
    required: true,
    properties: {
      city: {
        type: 'string',
      },
      name: {
        type: 'string',
        required: true
      }
    }
  }
};

var Schema = jsonGatekeeper(schema);

// Gate the JSON object
var dataJSON = {
  address: {
    city: 'Kevin sdfdsf'
  }
};

var result = Schema.run(dataJSON);
console.log('------------------');
console.log(Schema)
console.log('--------result-------');
console.log(result);

