
var _ = require('lodash');

function Run(){};

/**
 * @scope: private
 * Validate the node
 *
 **/
Run.validateItem = function(node, input, output, opts) {

  // Aggressive stop
  if ( typeof input === 'undefined' ||
       typeof input[node.key] === 'object'
     ) return;


  // The actual input item
  var Input = input[node.key];

  // Perform actions
  _.forEach(node._perform, function(fn) {

    var result = fn(Input);

    // Validators
    if (typeof result.check !== 'undefined') {

      if (result.stop) {

        opts.errors.push(result.error);
        opts.error = true;
        return false;
      }
    }

    // Format
    // else if (typeof result.val !== 'undefined') {

    // }

    // if (res.stop) return false;
  });
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
        Run.validateItem(node, input[node.key], output, opts);

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
  opts.error = false, opts.errors = [];

  // Build a fresh copy of the opts
  opts = JSON.parse(JSON.stringify(opts));

  return {
    data: Run.walk(schema, input, {}, opts),
    error: opts.error,
    errors: opts.errors
  };
};
