var AWS = require("aws-sdk");

var AWSRegion = require('../../config/config');

var GenerateId = require('./GenerateId');

AWS.config.update({
  region: AWSRegion.LAMBDA_AWS_REGION
});

var docClient = new AWS.DynamoDB.DocumentClient();

function getItems (params,callBack)  {
  //console.log(params);
  docClient.query(params, function(err,data){
    callBack(err,data);
  });
}

module.exports = {getItems};
