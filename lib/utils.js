
var util = require('util');

exports.parseFnStr =  function(fnStr) {

  var matcher = fnStr.match(/\(.*?\)/);

  if (! (matcher && matcher.length)) {
    return {
      fn: fnStr,
      args: null
    };
  }

  return {
    fn: matcher.input.substring(0, matcher.index),
    args: matcher[0].replace(/[()]/gi,'').replace(/\s/gi,'').split(',')
  };

};

exports.throwError =  function() {
  var err = util.format.apply(util, arguments);
  throw new Error(err);
};


exports.errorMsg = function(node) {
  var args = Array.prototype.slice.call(arguments);
  args.shift();

  return {
    error: util.format.apply(util, args),
    key: node.key
  };
};
