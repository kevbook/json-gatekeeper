
var _ = require('lodash');

exports.types = [
  'string',
  'number',
  'boolean',
  'object',
  'array',
  'date',
  // 'null',
  // 'any'
];

exports.formats = {
  string: {
    camelCase: _.camelCase,
    capitalize: _.capitalize,
    deburr: _.deburr,
    kebabCase: _.kebabCase,
    snakeCase: _.snakeCase,
    trim: function(val) { return val && val.trim() },
    upperCase: function(val) { return val && val.toUpperCase() },
    lowerCase: function(val) { return val && val.toLowerCase() },
  },
  number: {
    parseInt: _.parseInt
  }
};
