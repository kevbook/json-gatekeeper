
var should = require('should');

module.exports = function(Schema, jsonGatekeeper) {

  describe('Build schema', function() {

    // ******** Test ********/
    it('should error out, str4 key has a few errors', function() {
      var s = Schema();

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/str4/);
    });


    // ******** Test ********/
    it('should error out, str5 key has a doesnt have proper format key', function() {
      var s = Schema();
      delete s.str4;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/array/i);
    });


    // ******** Test ********/
    it('should error out, str6 key has a doesnt have proper format value', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;

      (function() {
        jsonGatekeeper(s)
      })
      .should
      .throwError(/format/i);
    });


    // ******** Test ********/
    it('should work, returns an object with "schema" key', function() {
      var s = Schema();
      delete s.str4;
      delete s.str5;
      delete s.str6;

      jsonGatekeeper(s)
        .should
        .be.an.Object
        .have.keys('schema');
    });


  });


};
