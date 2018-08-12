var AWS = require("aws-sdk");

var AWSRegion = require('../../config/config');


AWS.config.update({
  region: AWSRegion.LAMBDA_AWS_REGION
});

var docClient = new AWS.DynamoDB.DocumentClient();

function getItemScan (params,callBack)  {
  //console.log(params);
  docClient.scan(params, function(err,data){
    //console.log(data);
    callBack(err,data);
  });
}

module.exports = {getItemScan};
