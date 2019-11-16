const AWS = require('aws-sdk');

AWS.config.update({
    // accessKeyId: "abcde",
    // secretAccessKey: "abcde",
    // region: "us-west-2",
    // endpoint: "http://localhost:8000"
    region: "us-east-2",
    accessKeyId: "AKIAQIEC4EV7KV3SKAE4",
    secretAccessKey: "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",
});

AWS.config.apiVersions = {
    apigatewayv2: '2018-11-29',
    // other service API versions
};

module.exports = AWS;