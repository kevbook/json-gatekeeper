
var _ = require('lodash'),
  buildSchema = require('./lib/build_schema'),
  runSchema = require('./lib/run_schema'),
  deepFreeze = require('deep-freeze-strict');


function Gatekeeper(schema) {
  this.schema = buildSchema(schema);
};

Gatekeeper.prototype.run = function(input) {
  return runSchema(this.schema, input);
};

module.exports = function(schema) {
  if (!_.isPlainObject(schema))
    throw new Error('schema is either missing or is not a valid object.');

  // Deep freeze the result object
  return deepFreeze(new Gatekeeper(schema));
};
