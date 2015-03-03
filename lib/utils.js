
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

exports.parseFnStr = function(str) {

  var matcher = str.match(/\(.*?\)/);

  if (matcher && matcher.length)
    str = matcher.input.substring(0, matcher.index);

  return str;
};
