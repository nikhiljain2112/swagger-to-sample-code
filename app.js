const {generateCode} = require('./lib/generateCode');

generateCode('https://petstore.swagger.io/v2/swagger.json', ['nodejs'])
    .then(result => console.log(JSON.stringify(result)));
