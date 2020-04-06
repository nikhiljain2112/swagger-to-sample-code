const assert = require('assert');
const {checkForLanguageSupport, is_url} = require('../lib/requestHandler');


describe('checkForLanguageSupport function tests', function () {
  describe('language list is empty or not an array', function () {
    it('should throw error, if language list is empty', function () {
      try {
        checkForLanguageSupport([]);
      } catch (e) {
        assert.equal(e, 'please pass at least one language');
        assert.equal(typeof e, 'string');
      }
    });

    it('should throw error, if language list is not an array', function () {
      try {
        checkForLanguageSupport({'nodejs': 'java'});
      } catch (e) {
        assert.equal(e, 'please pass at least one language');
        assert.equal(typeof e, 'string');
      }
    });

    it('should throw error, if non of the languages passed are supported ', function () {
      try {
        checkForLanguageSupport(['pascal']);
      } catch (e) {
        assert.equal(e, 'none of the languages passed supported at this moment');
        assert.equal(typeof e, 'string');
      }
    });

    it('should return list of matched languages, if at least one supported language is passed ', function () {

      const matchedList = checkForLanguageSupport(['java', 'pascal']);
      assert.equal(matchedList.length, 1);

    });

  });
});
