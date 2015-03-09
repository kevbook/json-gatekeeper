
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
      return Utils.throwError('@key: %s - required must be a Boolean.', node.key);


  if ( typeof node.default !== 'undefined' &&
       _.isString(node.default) === false
     )
      return Utils.throwError('@key: %s - default must be a String.', node.key);


  if ( (typeof node.format !== 'undefined' &&
        (_.isArray(node.format) === false ||
         ! node.format.length)
       ) ||
       (typeof node.enum !== 'undefined' &&
        (_.isArray(node.enum) === false ||
         ! node.enum.length)
       ) ||
       (typeof node.validate !== 'undefined' &&
        (_.isArray(node.validate) === false ||
         ! node.validate.length)
       )
     ) return Utils.throwError('@key: %s - must be an Array and not empty.', node.key);


  var _perform = [];

  _perform.push(Validators.string(node, _.isString));


  // Format
  if (node.format) {

    _.forEach(node.format, function(fn) {

      fn = Utils.parseFormatFnStr(node, fn);

      if (typeof fn === 'function') {
        _perform.push(fn);
      }

      else if (fn === null) {
        return Utils.throwError('@key: %s - format is invalid.', node.key);
      }

      else if (fn.fnStr && ! Schema.format.string[fn.fnStr]) {
        return Utils.throwError('@key: %s - format is invalid.', node.key);
      }

      else {

        if (fn.args) fn = Schema.format.string[fn.fnStr].apply(null, fn.args);
        else fn = Schema.format.string[fn.fnStr];
        _perform.push(fn);
      }
    });
  }


  // Enum
  if (node.enum) {
    _perform.push(Validators.enum(node));
  }

  // Validate
  if (node.validate) {

    _.forEach(node.validate, function(fn) {

      fn = Validators.validate(node, fn);

      if (fn.fnStr && !~_.indexOf(Schema.validate.string, fn.fnStr)) {
        return Utils.throwError('@key: %s - validate is invalid.', node.key);
      }

      _perform.push(fn.fn);
    });
  }

  output[node.key] = {};
  output[node.key]._perform = _perform;
  output[node.key].type = node.type;
  output[node.key].key = node.key;
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
 * Build out the schema node with type {Number}
 *
 **/
Build.number = function(node, output) {

  // Validate if schema options are correctly set
  if ( typeof node.required !== 'undefined' &&
       _.isBoolean(node.required) === false
     )
      return Utils.throwError('@key: %s - required must be a Boolean.', node.key);


  if ( typeof node.typeCast !== 'undefined' &&
       _.isBoolean(node.typeCast) === false
     )
      return Utils.throwError('@key: %s - required must be a Boolean.', node.key);


  if ( typeof node.default !== 'undefined' &&
       _.isFinite(node.default) === false
     )
      return Utils.throwError('@key: %s - default must be a Number.', node.key);


  if ( (typeof node.format !== 'undefined' &&
        (_.isArray(node.format) === false ||
         ! node.format.length)
       ) ||
       (typeof node.enum !== 'undefined' &&
        (_.isArray(node.enum) === false ||
         ! node.enum.length)
       ) ||
       (typeof node.validate !== 'undefined' &&
        (_.isArray(node.validate) === false ||
         ! node.validate.length)
       )
     ) return Utils.throwError('@key: %s - must be an Array and not empty.', node.key);


  var _perform = [];

  if (typeof node.typeCast === 'undefined' || node.typeCast) {
    _perform.push(Validators.typeCast(node));
  }


  _perform.push(Validators.number(node, _.isFinite));


  // Format
  if (node.format) {

    _.forEach(node.format, function(fn) {

      fn = Utils.parseFormatFnStr(node, fn);

      if (typeof fn === 'function') {
        _perform.push(fn);
      }

      else if (fn === null) {
        return Utils.throwError('@key: %s - format is invalid.', node.key);
      }

      else if (fn.fnStr && ! Schema.format.number[fn.fnStr]) {
        return Utils.throwError('@key: %s - format is invalid.', node.key);
      }

      else {

        if (fn.args) fn = Schema.format.number[fn.fnStr].apply(null, fn.args);
        else fn = Schema.format.number[fn.fnStr];
        _perform.push(fn);
      }
    });
  }


  // Enum
  if (node.enum) {
    _perform.push(Validators.enum(node));
  }


  // Validate
  if (node.validate) {

    _.forEach(node.validate, function(fn) {

      fn = Validators.validate(node, fn);

      if (fn.fnStr && !~_.indexOf(Schema.validate.number, fn.fnStr)) {
        return Utils.throwError('@key: %s - validate is invalid.', node.key);
      }

      _perform.push(fn.fn);
    });
  }


  output[node.key] = {};
  output[node.key]._perform = _perform;
  output[node.key].type = node.type;
  output[node.key].key = node.key;
};


/**
 * @scope: private
 * Build out the schema node with type {Date}
 *
 **/
Build.date = function(node, output) {

  // Validate if schema options are correctly set
  if ( typeof node.required !== 'undefined' &&
       _.isBoolean(node.required) === false
     )
      return Utils.throwError('@key: %s - required must be a Boolean.', node.key);


  if ( typeof node.typeCast !== 'undefined' &&
       _.isBoolean(node.typeCast) === false
     )
      return Utils.throwError('@key: %s - required must be a Boolean.', node.key);


  if ( typeof node.default !== 'undefined' &&
       _.isDate(node.default) === false
     )
      return Utils.throwError('@key: %s - default must be a Number.', node.key);


  if ( typeof node.validate !== 'undefined' &&
        (_.isArray(node.validate) === false ||
         ! node.validate.length)
     ) return Utils.throwError('@key: %s - must be an Array and not empty.', node.key);


  var _perform = [];

  if (typeof node.typeCast === 'undefined' || node.typeCast) {
    _perform.push(Validators.typeCast(node));
  }


  _perform.push(Validators.date(node, _.isDate));


  // Validate
  if (node.validate) {

    _.forEach(node.validate, function(fn) {

      fn = Validators.validate(node, fn);

      if (fn.fnStr && !~_.indexOf(Schema.validate.date, fn.fnStr)) {
        return Utils.throwError('@key: %s - validate is invalid.', node.key);
      }

      _perform.push(fn.fn);
    });
  }

  output[node.key] = {};
  output[node.key]._perform = _perform;
  output[node.key].type = node.type;
  output[node.key].key = node.key;
};


/**
 * @scope: private
 * Build out the schema node with type {Boolean}
 *
 **/
Build.boolean = function(node, output) {

  // Validate if schema options are correctly set
  if ( typeof node.required !== 'undefined' &&
       _.isBoolean(node.required) === false
     )
      return Utils.throwError('@key: %s - required must be a Boolean.', node.key);


  if ( typeof node.typeCast !== 'undefined' &&
       _.isBoolean(node.typeCast) === false
     )
      return Utils.throwError('@key: %s - required must be a Boolean.', node.key);


  if ( typeof node.default !== 'undefined' &&
       _.isBoolean(node.default) === false
     )
      return Utils.throwError('@key: %s - default must be a Number.', node.key);


  var _perform = [];

  if (typeof node.typeCast === 'undefined' || node.typeCast) {
    _perform.push(Validators.typeCast(node));
  }


  _perform.push(Validators.boolean(node, _.isBoolean));

  output[node.key] = {};
  output[node.key]._perform = _perform;
  output[node.key].type = node.type;
  output[node.key].key = node.key;
};


/**
 * @scope: private
 * Build out the schema node with type {Null}
 *
 **/
Build.null = function(node, output) {

  // Validate if schema options are correctly set
  if ( typeof node.required !== 'undefined' &&
       _.isBoolean(node.required) === false
     )
      return Utils.throwError('@key: %s - required must be a Boolean.', node.key);


  if ( typeof node.default !== 'undefined' &&
       _.isNull(node.default) === false
     )
      return Utils.throwError('@key: %s - default must be a Number.', node.key);


  var _perform = [];

  _perform.push(Validators.null(node, _.isNull));

  output[node.key] = {};
  output[node.key]._perform = _perform;
  output[node.key].type = node.type;
  output[node.key].key = node.key;
};


/**
 * @scope: private
 * Walk through the JSON structure
 *
 **/
Build.walk = function(schema, output) {

  _.forEach(schema, function(node, key) {

    // Normalize the type
    node.type = node.type && node.type.toLowerCase();

    if (node.type && ~_.indexOf(Schema.types, node.type)) {

      // Add a key property to the node
      node.key = key;

      switch (node.type) {
        case 'array':

        case 'object':
          if (!_.isPlainObject(node.properties))
            return Utils.throwError('@key: %s - properties key is missing.', key);

          Build['object'](node, output);

          // Recurse through children
          return Build.walk(node.properties, output[key].properties);

        default:
          return Build[node.type](node, output);
      };
    }

    else
      return Utils.throwError('@key: %s - missing or invalid.', key);
  });

  return output;
};


module.exports = function(schema) {
  return Build.walk(schema, {});
};
