
var should = require('should');

module.exports = function(Schema, jsonGatekeeper) {

  describe('Build schema', function() {

    it('should error out, str4 key has a few errors', function() {
      var s = Schema();

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/str4/);
    });

    it('should error out, str5 key doesnt have proper format key - format array is empty', function() {
      var s = Schema();
      delete s.str4;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/array/i);
    });

    it('should error out, str6 key doesnt have proper format value', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.missing_type;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/format/i);
    });

    it('should error out, "wrong_type" key has wrong type', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.missing_type;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/type/i);
    });

    it('should error out, "missing_type" key has missing type', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/type/i);
    });

    it('should error out, number type has wrong default value', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number2;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, number has wrong format', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number1;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/format/i);
    });

    it('should error out, date type has wrong default value', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number1;
      delete s.number2;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, date type has wrong default value', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number1;
      delete s.number2;
      delete s.date2;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, date type has wrong default value', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number1;
      delete s.number2;
      delete s.date2;
      delete s.date3;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, boolean type has wrong default value', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number1;
      delete s.number2;
      delete s.date2;
      delete s.date3;
      delete s.date4;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });

    it('should error out, date type has wrong validate value', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number1;
      delete s.number2;
      delete s.date2;
      delete s.date3;
      delete s.date4;
      delete s.bool2;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/array/i);
    });

    it('should error out, date type has wrong validate value', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number1;
      delete s.number2;
      delete s.date2;
      delete s.date3;
      delete s.date4;
      delete s.bool2;
      delete s.date8;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/validate/i);
    });

    it('should error out, null type has wrong default', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number1;
      delete s.number2;
      delete s.date2;
      delete s.date3;
      delete s.date4;
      delete s.bool2;
      delete s.date8;
      delete s.date9;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/default/i);
    });



    // ******** Test ********/
    it('should work, returns an object with "schema" key', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;
      delete s.wrong_type;
      delete s.missing_type;
      delete s.number1;
      delete s.number2;
      delete s.date2;
      delete s.date3;
      delete s.date4;
      delete s.bool2;
      delete s.date8;
      delete s.date9;
      delete s.null1;

      jsonGatekeeper(s)
        .should
        .be.an.Object
        .have.keys('schema');
    });

  });

};
