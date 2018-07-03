var AWS = require("aws-sdk");

var Config = require('../../config/config');

var GenerateId = require('./GenerateId');

AWS.config.update({
  region: Config.LAMBDA_AWS_REGION
});

var docClient = new AWS.DynamoDB.DocumentClient();

function addItem (params,callBack)  {
  //console.log(params);
  var IdParam = {
    TableName: Config.ID_TABLE,
    Key:{
      type: Config.ID_MAPPING[params.TableName]
    }
  };
  GenerateId.generateNewId(IdParam, function(err,data){
    //console.log(err);
    //console.log(data);
    if(err){
      callBack(err,data);
    }else{
      params.Item.REF_ID = Number(data.Item.Id)+1;
      docClient.put(params, function(err,data){
          callBack(err,data);
        });
    }

  });

}

module.exports = {addItem};
