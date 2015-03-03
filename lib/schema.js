
var _ = require('lodash'),
  validator = require('validator');


exports.types = [
  'string',
  'number',
  'object',
  'date',
  'null',
  'boolean',
  'array'
  // 'any'
];

exports.format = {
  string: {
    camelCase: _.camelCase,
    capitalize: _.capitalize,
    deburr: _.deburr,
    kebabCase: _.kebabCase,
    snakeCase: _.snakeCase,
    escape: _.escape,
    trim: function(val) { return val && val.trim() },
    upperCase: function(val) { return val && val.toUpperCase() },
    lowerCase: function(val) { return val && val.toLowerCase() },
  },
  number: {
    toInt: function(val) { return val && parseInt(val) }
  },
};

exports.validate = {
  string: [
    'isEmail',
    'isURL',
    'isAlpha',
    'isInt',
    'isFloat',
    'isHexadecimal',
    'isAlphanumeric',
    'isBase64',
    'isUUID',
    'isMongoId',
    'isUsername',
    'isFullname',
    'isPhoneNumber',
    'isLength',
    'isCreditCard'
  ],
  number: [
    'isMin',
    'isMax',
    'isInt',
    'isFloat'
  ],
  date: [
    'isAfter',
    'isBefore'
  ]
};
