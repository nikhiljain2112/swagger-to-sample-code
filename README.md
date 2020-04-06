# swagger-to-sample-code
Generates pseudo codes in different programming languages from api specification (swagger). It generates postman collection from swagger json and generate sample codes from collection.

### Example
```javascript
const generateCode = require('swagger-to-sample-code');

generateCode('https://petstore.swagger.io/v2/swagger.json', ['nodejs', 'java'])
    .then(result => console.log(result))
    .catch(e => console.log(e));

// you can also pass Swagger JSON or String in place of Swagger url.
```

### Sample Response

```json
[
  {
    "method": "uploads an image",
    "samples": [
      {
        "lang": "nodejs",
        "source": "var request = require('request');\nvar options = {\n   'method': 'POST',\n   'url': 'https://petstore.swagger.io/v2/pet/:petId/uploadImage',\n   'headers': {\n      'Accept': 'application/json',\n      'Content-Type': 'multipart/form-data'\n   },\n   formData: {\n      'additionalMetadata': '{{additionalMetadata}}',\n      'file': '{{file}}'\n   }\n};\nrequest(options, function (error, response) { \n   if (error) throw new Error(error);\n   console.log(response.body);\n});\n"
      }
    ]
  },
  {
    "method": "Find pet by ID",
    "samples": [
      {
        "lang": "nodejs",
        "source": "var request = require('request');\nvar options = {\n   'method': 'GET',\n   'url': 'https://petstore.swagger.io/v2/pet/:petId',\n   'headers': {\n      'Accept': 'application/json, application/xml',\n      'api_key': '{{api_key}}'\n   }\n};\nrequest(options, function (error, response) { \n   if (error) throw new Error(error);\n   console.log(response.body);\n});\n"
      }
    ]
  }]
```

### Language Support
nodejs, php, java, python, curl, csharp, go, JavaScript, c, powershell, Ruby, shell

