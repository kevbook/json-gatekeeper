
var _ = require('lodash'),
  Utils = require('./utils'),
  validator = require('validator');


/**
 * @scope: private
 * Build out the node validator with type {String}
 *
 **/
exports.string =
exports.number =
exports.date =
exports.boolean =
exports.null = function(node, typeCheck) {

  if (node.required) {

    return function(val) {

      var ret = {
        error: Utils.errorMsg(node, '%s is required.', node.key)
      };

      if (typeCheck(val) === true) {
        ret.check = true;
        ret.stop = false;
      }
      else if (typeof val === 'undefined') {
        if (typeof node.default !== 'undefined') {
          ret.check = true;
          ret.stop = true;
          ret.val = node.default;
        } else {
          ret.check = false;
          ret.stop = true;
        }
      } else {
        ret.check = false;
        ret.stop = true;
        ret.error = Utils.errorMsg(node, '%s is invalid.', node.key)
      }

      return ret;
    };
  }

  else {

    return function(val) {

      var ret = {
        error: Utils.errorMsg(node, '%s is invalid.', node.key)
      };

      if (typeCheck(val) === true) {
        ret.check = true;
        ret.stop = false;
      }
      else if (typeof val === 'undefined') {
        ret.check = ret.stop = true;
      }
      else {
        ret.check = false;
        ret.stop = true;
      }

      return ret;
    };
  }
};


/**
 * @scope: private
 * Build out the node validator with type {Object}
 *
 **/
exports.object = function(node) {

  if (node.required) {

    return function(val) {

      var ret = {
        error: Utils.errorMsg(node, '%s is required.', node.key)
      };

      if (typeof val === 'undefined') {
        ret.check = false;
        ret.stop = true;
      }
      else if (_.isPlainObject(val)) {
        ret.check = true;
        ret.stop = false;
      }
      else {
        ret.check = false;
        ret.stop = true;
        ret.error = Utils.errorMsg(node, '%s is invalid.', node.key)
      }

      return ret;
    };
  }

  else {

    return function(val) {

      var ret = {
        error: Utils.errorMsg(node, '%s is invalid.', node.key)
      };

      if (typeof val === 'undefined') {
        ret.check = true;
        ret.stop = true;
      }
      else if (_.isPlainObject(val)) {
        ret.check = true;
        ret.stop = false;
      }
      else {
        ret.check = false;
        ret.stop = true;
        ret.error = Utils.errorMsg(node, '%s is invalid.', node.key)
      }

      return ret;
    };
  }
};


/**
 * @scope: private
 * Build out the node type cast method
 *
 **/
exports.typeCast = function(node) {

  if (node.type === 'number') {

    return function(val) {
      return val && Number(val);
    };
  }

  else if (node.type === 'boolean') {

    return function(val) {
      if (typeof val === 'undefined' ||
          typeof val === 'boolean') return val;

      val = String(val).trim();
      return (val === '1' || val === 'true');
    };
  }

  else if (node.type === 'date') {

    return function(val) {
      return val ? new Date(val) : undefined;
    }
  }
};


/**
 * @scope: private
 * Build out the node enum validator
 *
 **/
exports.enum = function(node) {

  return function(val) {
    var ret = {};
    ret.check = !!~_.indexOf(node.enum, val);
    ret.stop = !ret.check;
    ret.error = Utils.errorMsg(node, '%s is invalid.', node.key);
    ret.error.type = 'enum';

    return ret;
  };
};


/**
 * @scope: private
 * Build out the node validate methods
 *
 **/
exports.validate =  function(node, fnStr) {

  // For custom function
  if (typeof fnStr === 'function') return fnStr;

  // For regExp
  if (_.isRegExp(fnStr)) {

    return function(val) {
      var ret = {};

      ret.check = fnStr.test(val);
      ret.stop = !ret.check;
      ret.error = Utils.errorMsg(node, '%s is invalid.', node.key)
      ret.error.type = 'regExp';

      return ret;
    };
  }

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
        fn: function(val) {
          var Args = args.slice();
          Args.unshift(val);

          var ret = {};
          ret.check = validator[fnStr].apply(null, Args);
          ret.stop = !ret.check;
          ret.error = Utils.errorMsg(node, '%s is invalid.', node.key)
          ret.error.type = fnStr;

          return ret;
        }
      };
    }
  }


  return {
    fnStr: fnStr,
    fn: function(val) {
      var ret = {};
      ret.check = validator[fnStr](val);
      ret.stop = !ret.check;
      ret.error = Utils.errorMsg(node, '%s is invalid.', node.key)
      ret.error.type = fnStr;

      return ret;
    }
  };
};
