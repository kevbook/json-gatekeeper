
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

  describe('Build schema', function() {

    it('should error out, str4 key has a few errors', function() {
      var s = cleanup( Schema(), 'str4' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/str4/);
    });

    it('should error out, str5 key doesnt have proper format key - format array is empty', function() {
      var s = cleanup( Schema(), 'str5' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/array/i);
    });

    it('should error out, str6 key doesnt have proper format value', function() {
      var s = cleanup( Schema(), 'str6' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/format/i);
    });

    it('should error out, "wrong_type" key has wrong type', function() {
      var s = cleanup( Schema(), 'wrong_type' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/type/i);
    });

    it('should error out, "missing_type" key has missing type', function() {
      var s = cleanup( Schema(), 'missing_type' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/type/i);
    });

    it('should error out, number type has wrong default value', function() {
      var s = cleanup( Schema(), 'number1' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, number has wrong format', function() {
      var s = cleanup( Schema(), 'number2' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/format/i);
    });

    it('should error out, date type has wrong default value', function() {
      var s = cleanup( Schema(), 'date2' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, date type has wrong default value', function() {
      var s = cleanup( Schema(), 'date3' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, date type has wrong default value', function() {
      var s = cleanup( Schema(), 'date4' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, boolean type has wrong default value', function() {
      var s = cleanup( Schema(), 'bool2' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, date type has wrong validate value', function() {
      var s = cleanup( Schema(), 'date8' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/array/i);
    });

    it('should error out, date type has wrong validate value', function() {
      var s = cleanup( Schema(), 'date9' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/validate/i);
    });

    it('should error out, null type has wrong default', function() {
      var s = cleanup( Schema(), 'null1' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, object type doesnt have properties key', function() {
      var s = cleanup( Schema(), 'obj1' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/properties/i);
    });

    it('should error out, object type doesnt have a valid properties key', function() {
      var s = cleanup( Schema(), 'obj2' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/properties/i);
    });

    it('should error out, object type - child doesnt have a valid type', function() {
      var s = cleanup( Schema(), 'obj4' );

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/type/i);
    });

    it('should work, returns an object with "schema" key', function() {
      var s = cleanup( Schema() );

      jsonGatekeeper(s)
        .should
        .be.an.Object
        .have.keys('schema');
    });

  });

};
