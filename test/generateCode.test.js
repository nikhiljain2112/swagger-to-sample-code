const assert = require('assert');
const {generateCode, getSwaggerParamType} = require('../lib/generateCode');
const mockSwagger = require('./mock_swagger');

describe('getSwaggerParamType function tests', function () {
    describe('should return correct type of param on passing different values for it', function () {
        it('should return STRING on passing string value', function () {
            const type = getSwaggerParamType('{type: string, id:newId}');
            assert.equal(type, 'STRING');
        });

        it('should return OBJECT on passing json value', function () {
            const type = getSwaggerParamType({type: 'string', id: 'newId'});
            assert.equal(type, 'OBJECT');
        });

        it('should return URL on passing url value', function () {
            const type = getSwaggerParamType('https://google.com');
            assert.equal(type, 'URL');
        });

        it('should return null on passing null value', function () {
            const type = getSwaggerParamType(null);
            assert.equal(type, null);
        });
    });
});

describe('generateCode function tests', function () {
    it('should return sample codes for passed swagger (json) in given languages', async function () {
        generateCode(mockSwagger, ['nodejs'])
            .then(function (codes) {
                assert.equal(codes[0].samples.length, 1);
            })
    });

    it('should return sample codes for passed swagger (string) in given languages', async function () {
        generateCode(JSON.stringify(mockSwagger), ['nodejs'])
            .then(function (codes) {
                assert.equal(codes[0].samples.length, 1);
            })
    });

    it('should return sample codes for passed swagger (url) in given languages', async function () {
        generateCode('https://petstore.swagger.io/v2/swagger.json', ['nodejs'])
            .then(function (codes) {
                assert.equal(codes[0].samples.length, 1);
            })
            .catch(function (e) {
                assert.equal(typeof e, 'object');
            })
    });

    it('should return error if swagger param value in invalid', async function () {
        generateCode(null, ['nodejs'])
            .catch(function (e) {
                assert.equal(typeof e, 'string');
            })
    });

    it('should return error if swagger url is invalid', async function () {
        generateCode('https://ghgghghghghghggg.com', ['nodejs'])
            .catch(function (e) {
                assert.equal(typeof e, 'string');
            })
    });
});
