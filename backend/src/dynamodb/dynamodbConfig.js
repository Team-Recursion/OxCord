const AWS = require('../../awsConfig');

const docClient = new AWS.DynamoDB.DocumentClient();
const dynamoDB = new AWS.DynamoDB();

module.exports = {
    dynamoDB: dynamoDB,
    docClient: docClient
};