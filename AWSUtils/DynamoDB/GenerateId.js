var AWS = require("aws-sdk");

var AWSRegion = require('../../config/config');

AWS.config.update({
  region: AWSRegion.LAMBDA_AWS_REGION
});

var docClient = new AWS.DynamoDB.DocumentClient();

function generateNewId (params, callBack){
  docClient.get(params, function(err, data){
    //console.log(Object.keys(data).length);
    if(err){
      console.log("Error generateNewId : "+JSON.stringify(err,null,2));
      callBack(err, data);
    }else if(Object.keys(data).length == 0){
      console.log("No Data found : "+JSON.stringify(data,null,2));
      var IdParamNew ={
          "TableName":AWSRegion.ID_TABLE,
          "Item":{
            type: params.Key.type,
            Id: AWSRegion.ID_DEFAULT
          }
      };
      docClient.put(IdParamNew, function(err,data){
        if(err){
          callBack(err,data);
        }else{
          //console.log("Setting the default Id");
          //console.log()
          data={
            Item:{
              Id : AWSRegion.ID_DEFAULT
            }
          };
          //console.log(data);
          callBack(err,data);
        }
      });
    }else{
      //console.log("Data found : "+JSON.stringify(data,null,2));
      var IdParamUpdate ={
          "TableName":AWSRegion.ID_TABLE,
          "Key":{
            type: params.Key.type,
          },
          UpdateExpression: "set Id=:num",
          ExpressionAttributeValues:{
              ":num": Number(data.Item.Id)+1
          },
          ReturnValues:"UPDATED_NEW"
      };
      docClient.update(IdParamUpdate, function(err, data){
        if(err){
          console.log(err);
        }else{
          console.log(data);
        }
      });
      callBack(err, data);
    }

  });
}

module.exports = { generateNewId };
