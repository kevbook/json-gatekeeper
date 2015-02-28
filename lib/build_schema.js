
var _ = require('lodash'),
  Schema = require('./schema'),
  Validators = require('./validators'),
  Utils = require('./utils');


function Build(){};

/**
 * @scope: private
 * Build out the schema node with type {String}
 *
 **/
Build.string = function(node, output) {

  // Validate if schema options are correctly set
  if ( typeof node.required !== 'undefined' &&
       _.isBoolean(node.required) === false
     )
      return Utils.throwError('@key: %s - required must be a Boolean.', key);


  if ( typeof node.default !== 'undefined' &&
       typeof node.default !== 'string'
     )
      return Utils.throwError('@key: %s - default must be a String.', key);


  if ( typeof node.format !== 'undefined' &&
       _.isArray(node.format) === false
     )
      return Utils.throwError('@key: %s - format must be an Array.', key);


  if ( typeof node.enum !== 'undefined' &&
       _.isArray(node.enum) === false
     )
      return Utils.throwError('@key: %s - enum must be an Array.', key);


  if ( typeof node.validate !== 'undefined' &&
       _.isArray(node.validate) === false
     )
      return Utils.throwError('@key: %s - validate must be an Array.', key);


  var _perform = [];

  _perform.push(Validators.string(node));


  // Format
  if (node.format) {

    _.forEach(node.format, function(fn) {

      fn = Utils.parseFnStr(fn);

      if (!Schema.formats.string[fn.fn]) {
        return Utils.throwError('@key: %s - format is invalid.', fn, node.key);
      }

      // ToDo: If there are args, build an optimized function
      // if (fn.args) {}

      _perform.push(Schema.formats.string[fn.fn]);
    });
  }


  // Enum
  if (node.enum) {
    _perform.push(Validators.enum(node));
  }

  output[node.key] = {};
  output[node.key]._perform = _perform;
  output[node.key].type = node.type;
  output[node.key].key = node.key;

  // * validate {Array} ['isEmail'] (performed in order)
};


/**
 * @scope: private
 * Build out the schema node with type {Object}
 *
 **/
Build.object = function(node, output) {

  // Validate if schema options are correctly set
  if ( typeof node.required !== 'undefined' &&
       _.isBoolean(node.required) === false
     )
      return Utils.throwError('@key: %s - required must be a Boolean.', node.key);


  var _perform = [];

  _perform.push(Validators.object(node));

  output[node.key] = {};
  output[node.key]._perform = _perform;
  output[node.key].type = node.type;
  output[node.key].key = node.key;
  output[node.key].properties = {};
};


/**
 * @scope: private
 * Walk through the JSON structure
 *
 **/
Build.walk = function(schema, output) {

  _.forEach(schema, function(node, key) {

    if (node.type && ~_.indexOf(Schema.types, node.type)) {

      // Add a key property to the node
      node.key = key;

      switch (node.type) {
        case 'array':

        case 'object':
          if (!_.isPlainObject(node.properties))
            return Utils.throwError('@key: %s - properties key is missing.', node.type, key);

          Build['object'](node, output);

          // Recurse through children
          return Build.walk(node.properties, output[key].properties);

        default:
          return Build[node.type](node, output);
      };
    }

    else
      return Utils.throwError('@key: %s - missing or invalid.', node.type, key);
  });

  return output;
};


module.exports = function(schema) {
  return Build.walk(schema, {});
};
