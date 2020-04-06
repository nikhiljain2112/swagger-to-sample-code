const sdk = require('postman-collection');
const codegen = require('postman-code-generators');

const {LANGUAGE_MAP} = require('../constants');

const getCodeSnippet = (item, languages, cb) => {
  const request = new sdk.Request(item.request); //using postman sdk to create request
  const options = {
    indentCount: 3,
    indentType: 'Space',
    trimRequestBody: false,
    followRedirect: true
  };

  const codeList = [];

  languages.forEach((lang) => {
    const variant = LANGUAGE_MAP[lang] && LANGUAGE_MAP[lang].variant[0];
    codegen.convert(lang, variant, request, options, (error, snippet) => {
      if (error) {
        cb(`Error while generating code for ${lang} using variant ${variant}`, null);
      }

      codeList.push({
        lang,
        source: snippet
      })
    });
  });

  cb(null, {
    method: item.name || item.id,
    samples: codeList
  })
};

module.exports = {
  getSnippet: getCodeSnippet
};
