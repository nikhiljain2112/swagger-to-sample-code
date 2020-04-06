'use strict';

const swaggerToPostman = require('swagger2-postman2-parser');

const {getSnippet} = require('./getCodeSnippet');
const {is_url, checkForLanguageSupport} = require('./requestHandler');
const request = require('request');

const generateCode = async (swagger, languages) => {
    let swaggerData;
    switch (getSwaggerParamType(swagger)) {
        case 'URL':
            swaggerData = await getSwaggerFromUrl(swagger);
            break;
        case 'STRING':
            swaggerData = JSON.parse(swagger);
            break;
        case 'OBJECT':
            swaggerData = swagger;
            break;
        default:
            throw 'Unsupported value for swagger'
    }

    const supportedLanguages = checkForLanguageSupport(languages);
    const swaggerConverted = swaggerToPostman.convert(swaggerData);
    return getCodeSnippet(swaggerConverted.collection.item, [], supportedLanguages);
};

const getSwaggerParamType = swagger => is_url(swagger) ? 'URL' : (typeof swagger === 'string' ? 'STRING' : (typeof swagger === 'object' && swagger !== null) ? 'OBJECT' : null);

const getSwaggerFromUrl = url => new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
        if (!error) {
            resolve(body);
        } else {
            reject('Error while fetching swagger using source url');
        }
    });
});


const getCodeSnippet = (items, sampleCodes, supportedLanguages) => {
    items.forEach((item) => {
        if (item.item) {
            getCodeSnippet(item.item, sampleCodes, supportedLanguages);
        } else {
            getSnippet(item, supportedLanguages, (e, code) => {
                sampleCodes.push(code);
            });
        }
    });
    return sampleCodes;
};

module.exports = {
    generateCode,
    getSwaggerParamType,
    getCodeSnippet,
    getSwaggerFromUrl

};
