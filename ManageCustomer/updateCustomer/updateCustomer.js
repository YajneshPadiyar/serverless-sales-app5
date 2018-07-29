var express = require('express');
var router = express.Router();

var DynamoDBUtils = require('../../AWSUtils/DynamoDB/updateItems');
var Config = require('../../config/config');
//console.log(DynamoDB);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Update Customer V1.0');
});

router.post('/', function(req, res, next) {
  //console.log("addCustomer : Post Method");
var response = {};
//console.log(req.body);

var reqData = req.body.data;
var setInitial = "set ";
var removeInitial = "remove ";
var setUpdateExpress = setInitial;
var removeUpdateExpress = removeInitial;
var expressAttribValues = {};
var updateExpress = "";
for(data in reqData){
  if(reqData[data] != ""){
    if(setUpdateExpress == setInitial) {
      setUpdateExpress += data+"=:"+data;
    }else{
      setUpdateExpress += ", "+data+"=:"+data;
    }
    expressAttribValues[":"+data] = reqData[data];
  }else{
    if(removeUpdateExpress == removeInitial) {
      removeUpdateExpress += data;
    }else{
      removeUpdateExpress += ", "+data;
    }
  }
}

if(removeUpdateExpress == removeInitial ){
  updateExpress = setUpdateExpress;
}else{
  updateExpress = setUpdateExpress+" "+ removeUpdateExpress;
}
//console.log(updateExpress);
//console.log(expressAttribValues);
var internalRequest = {
  TableName: Config.CUSTOMER_TABLE,
  Key: {
    REF_ID: req.body.REF_ID
  },
  UpdateExpression: updateExpress,
  ExpressionAttributeValues: expressAttribValues,
  ReturnValues:"UPDATED_NEW"
}

console.log((internalRequest));
DynamoDBUtils.updateItems(internalRequest, function(err,data){
  //console.log("Inside Callback");
  //console.log(err);
  if(err){
    response = {
      status: false,
      err
    }
  }else{
    response = {
      status: true,
      data
    }
  }
  //req.body="NoValue";
  res.send(  response  );
});//*/
});

module.exports = router;
