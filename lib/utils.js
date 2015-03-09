
var _ = require('lodash'),
  util = require('util');


exports.throwError =  function() {
  var err = util.format.apply(util, arguments);
  throw new Error(err);
};


exports.errorMsg = function(node) {

  var err = {
    message: node.error || util.format.apply(util, _.rest(arguments)) || 'Error occured.'
  };

  if (node.key) err.key = node.key;
  return err;
};


exports.parseFormatFnStr =  function(node, fnStr) {

  // For custom function
  if (typeof fnStr === 'function') return fnStr;
  else if (typeof fnStr !== 'string') return null;

  // For String
  var matcher = fnStr.match(/\(.*?\)/);

  if (matcher && matcher.length) {

    // Parse args
    fnStr = matcher.input.substring(0, matcher.index);

    // Parse if args is an object
    var args = matcher[0].replace(/[()]/gi,'').replace(/\s/gi,'').split(',');

    args = _.map(args, function(arg) {

      try {
        arg = JSON.parse(arg)
      }
      catch(e) {

        // Account for if the type and argument is a date
        if (node.type === 'date' && !isNaN(Date.parse(arg))) {
          arg = new Date(arg)
        }
      }
      return arg;
    });


    if (args && args.length) {

      return {
        fnStr: fnStr,
        args: args
      }
    }
  }

  return { fnStr: fnStr };
};
