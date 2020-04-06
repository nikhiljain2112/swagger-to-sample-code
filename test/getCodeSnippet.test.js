const assert = require('assert');
const {getSnippet} = require('../lib/getCodeSnippet');
const mock_request = require('./mock_postman_req');


describe('getSnippet function tests', function () {
  it('should generate sample code if request and languages are valid', function (done) {
    getSnippet(mock_request, ['java'], function (e, d) {
      assert.equal(d.method, 'Create user');
      assert.equal(d.samples.length, 1);
      done();
    });
  });

  it('should throw error if request is not valid ', function (done) {
    getSnippet(mock_request, ['invalid'], function (e, d) {
      assert.equal(e, 'Error while generating code for invalid using variant undefined');
      done();
    });
  });

});
