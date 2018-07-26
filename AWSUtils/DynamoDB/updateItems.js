var AWS = require("aws-sdk");

var AWSRegion = require('../../config/config');

AWS.config.update({
  region: AWSRegion.LAMBDA_AWS_REGION
});

var docClient = new AWS.DynamoDB.DocumentClient();

function updateItems (params,callBack)  {
  //console.log(params);
  docClient.update(params, function(err,data){
    callBack(err,data);
  });
}

module.exports = {updateItems};
