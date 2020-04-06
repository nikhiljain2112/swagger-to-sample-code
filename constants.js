const LANGUAGE_MAP = {
    nodejs: {
        variant: ['request', 'Native', 'Unirest']
    },
    php: {
        variant: ['curl', 'HTTP_Request2', 'pecl_http']
    },
    java: {
        variant: ['OkHttp', 'Unirest']
    },
    python: {
        variant: ['Requests', 'http.client']
    },
    csharp: {
        variant: ['RestSharp']
    },
    curl: {
        variant: ['curl']
    },
    go: {
        variant: ['Native']
    },
    JavaScript: {
        variant: ['Fetch', 'jQuery', 'XHR']
    },
    c: {
        variant: ['libcurl']
    },
    powershell: {
        variant: ['RestMethod']
    },
    Ruby: {
        variant: ['Net::HTTP']
    },
    shell: {
        variant: ['wget', 'Httpie', 'URLSession']
    }
};

//add or remove more languages from above map to generate code
const SUPPORTED_LANGUAGES = ['nodejs', 'php', 'java', 'python', 'curl', 'csharp', 'go', 'JavaScript', 'c', 'powershell', 'Ruby', 'shell'];

module.exports = {
    LANGUAGE_MAP,
    SUPPORTED_LANGUAGES
};
