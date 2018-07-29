var express = require('express');
var router = express.Router();

var DynamoDBUtils = require('../../AWSUtils/DynamoDB/deleteItem');
var Config = require('../../config/config');
//console.log(DynamoDB);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Delete Customer V1.0');
});

router.post('/', function(req, res, next) {
  //console.log("addCustomer : Post Method");
var response = {};
//console.log(req.body);

var reqData = req.body.REF_ID;
var expressAttribValues = {
  ":val": reqData
};
var conditionExpress = "REF_ID = :val";
//console.log(updateExpress);
//console.log(expressAttribValues);
var internalRequest = {
  TableName: Config.CUSTOMER_TABLE,
  Key: {
    REF_ID: req.body.REF_ID
  },
  ConditionExpression: conditionExpress,
  ExpressionAttributeValues: expressAttribValues,
  ReturnValues:"ALL_OLD"
}

//console.log((internalRequest));
DynamoDBUtils.deleteItem(internalRequest, function(err,data){
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
