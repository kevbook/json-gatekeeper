
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
  wrong_type: {
    type: 'crap'
  },
  missing_type: {
    required: true
  },
  number1: {
    type: 'number',
    required: true,
    default: 'superman',
    format: ['trim','camelCase']
  },
  number2: {
    type: 'number',
    required: true,
    default: -123.4444,
    format: ['trim','camelCase']
  },
  number3: {
    type: 'number',
    required: true,
    default: -123.4444,
    format: ['toInt']
  },
  number4: {
    type: 'number'
  },
  date1: {
    type: 'date',
    required: true
  },
  date2: {
    type: 'date',
    required: true,
    default: 'sss'
  },
  date3: {
    type: 'date',
    required: true,
    default: '10-1-2015'
  },
  date4: {
    type: 'date',
    required: true,
    default: Date.parse('10-1-2015')
  },
  date5: {
    type: 'date',
    required: true,
    default: new Date('10-1-2015')
  },
  date6: {
    type: 'date',
    required: true,
    default: new Date('10-1-2015'),
    typeCast: true
  },
  date7: {
    type: 'date',
    required: true,
    default: new Date('10-1-2015'),
    typeCast: true,
    format: []
  },
  bool1: {
    type: 'boolean',
    required: true
  },
  bool2: {
    type: 'boolean',
    required: true,
    default: 'super'
  },
  bool3: {
    type: 'boolean',
    required: true,
    default: false
  },
  bool4: {
    type: 'boolean',
    required: true,
    default: false,
    typeCast: true,
    format: 'sss'
  },
  bool5: {
    type: 'boolean',
    required: true,
    default: false,
    typeCast: true,
    validate: 'sss'
  },
  date8: {
    type: 'date',
    required: true,
    default: new Date('10-1-2015'),
    typeCast: true,
    format: [],
    validate: 'sss'
  },
  date9: {
    type: 'date',
    required: true,
    default: new Date('10-1-2015'),
    typeCast: true,
    format: [],
    validate: ['sss']
  },
  date10: {
    type: 'date',
    required: true,
    default: new Date('10-1-2014'),
    typeCast: true,
    format: [],
    validate: ['isAfter()']
  },
  null1: {
    type: 'null',
    required: true,
    default: false,
    validate: 'sss'
  },
  null2: {
    type: 'null',
    required: true,
    default: null
  },
  obj1: {
    type: 'object'
  },
  obj2: {
    type: 'object',
    properties: 'sss'
  },
  obj3: {
    type: 'object',
    properties: {}
  },
  obj4: {
    type: 'object',
    properties: {
      str1: {
        type: 'crap'
      }
    }
  },
  obj5: {
    type: 'object',
    properties: {
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
      null2: {
        type: 'null',
        required: true,
        default: null
      },
      date10: {
        type: 'date',
        required: true,
        default: new Date('10-1-2015'),
        typeCast: true,
        format: [],
        validate: ['isAfter()']
      },
      number3: {
        type: 'number',
        required: true,
        default: -123.4444,
        format: ['toInt']
      }
    }
  },
};

function Schema() {
  return deepcopy(schema);
}


/**
 * Build Schema
 **/
require('./build')(Schema, jsonGatekeeper);
require('./run')(Schema, jsonGatekeeper);


// var result = Schema.run(dataJSON);
// console.log(result);
