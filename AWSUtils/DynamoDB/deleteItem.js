var AWS = require("aws-sdk");

var AWSRegion = require('../../config/config');

AWS.config.update({
  region: AWSRegion.LAMBDA_AWS_REGION
});

var docClient = new AWS.DynamoDB.DocumentClient();

function deleteItem (params,callBack)  {
  //console.log(params);
  docClient.delete(params, function(err,data){
    callBack(err,data);
  });
}

module.exports = {deleteItem};
