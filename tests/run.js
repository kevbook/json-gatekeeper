
var should = require('should'),
  _ = require('lodash');

function cleanup(s, except) {
  // List of invalid keys
  var invalidKeys = ['str4','str5','str6','wrong_type','missing_type','number1','number2','date2','date3','date4','bool2','date8','date9','null1','obj1','obj2','obj4'];

  return _.forEach(s, function(i,key) {
    if (~invalidKeys.indexOf(key) && except != key)
      delete s[key];
  }) && s;
}

module.exports = function(Schema, jsonGatekeeper) {

  describe('Run schema validation', function() {

    var s = cleanup( Schema() );

    it('Required keys should error out.' , function() {
      s = jsonGatekeeper(s)
      var data = {};

      var result = s.run(data);

    });

  });

};
