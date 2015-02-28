
var _ = require('lodash'),
  Utils = require('./utils');


/**
 * @scope: private
 * Build out the node validator with type {String}
 *
 **/
exports.string = function(node) {

  if (node.required) {

    return function(val) {

      var ret = {
        error: Utils.errorMsg(node, '%s is required.', node.key)
      };

      if (typeof val === 'string') {
        ret.check = true;
        ret.stop = false;
      }
      else if (typeof val === 'undefined') {
        if (node.default) {
          ret.check = true;
          ret.stop = false;
          ret.val = def;
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

      if (typeof val === 'string') {
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
        ret.check = ret.stop = true;
      }
      else if (_.isPlainObject(val)) {
        ret.check = true;
        ret.stop = false;
      }
      else {
        ret.check = ret.stop = true;
      }

      return ret;
    };
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
    ret.check = ~_.indexOf(node.enum, val);
    ret.stop = !ret.check;
    ret.error = Utils.errorMsg(node, '%s is invalid.', node.key)

    return ret;
  };
};


exports.validate = {

};
