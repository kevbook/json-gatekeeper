
var _ = require('lodash');

function Run(){};

/**
 * @scope: private
 * Validate the node
 *
 **/
Run.validateItem = function(node, input, output, opts) {

  // Aggressive stop
  if (typeof input === 'undefined') return;

  // The actual input item
  var Input = input[node.key],
    valid = true;


  // Perform actions
  _.forEach(node._perform, function(fn) {

    var result = fn(Input);

    // Validators
    if (typeof result.check !== 'undefined') {

      if (result.stop) {
        opts.errors.push(result.error);

        // Flag as invalid and exit the loop
        valid = false;
        return false;
      }
    }

    // Format
    // else if (typeof result.val !== 'undefined') {

    // }

    // if (res.stop) return false;
  });

  // Assign value if all checks passed
  if (valid) {
    output[node.key] = Input;
  }
};


/**
 * @scope: private
 * Walk through the JSON structure
 *
 **/
Run.walk = function(schema, input, output, opts) {

  _.forEach(schema, function(node) {

    switch (node.type) {
      case 'array':
        break;

      case 'object':
        Run.validateItem(node, input, output, opts);

        // Recurse through children
        output[node.key] = output[node.key] || {};
        Run.walk(node.properties, input, output[node.key], opts);
        break;

      default:
        Run.validateItem(node, input, output, opts);
    };

  });

  return output;
};


module.exports = function(schema, input, opts) {

  opts = opts || {};
  opts.errors = [];

  // Build a fresh copy of the opts
  opts = JSON.parse(JSON.stringify(opts));
  var data = Run.walk(schema, input, {}, opts);

  return {
    data: data,
    error: !!opts.errors.length,
    errors: opts.errors
  };
};
