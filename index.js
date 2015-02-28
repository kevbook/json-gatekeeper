
var _ = require('lodash'),
  buildSchema = require('./lib/build_schema'),
  runSchema = require('./lib/run_schema');


function Gatekeeper(schema) {
  this.schema = buildSchema(schema);
};

Gatekeeper.prototype.run = function(input) {
  return runSchema(this.schema, input);
};

module.exports = function(schema) {
  if (!_.isPlainObject(schema))
    throw new Error('schema is either missing or is not a valid object.');

  return new Gatekeeper(schema);
};
