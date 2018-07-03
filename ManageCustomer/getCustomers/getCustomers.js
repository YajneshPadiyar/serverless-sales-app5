var express = require('express');
var router = express.Router();

var DynamoDBUtils = require('../../AWSUtils/DynamoDB/getItems');
var Config = require('../../config/config');
//console.log(DynamoDB);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Get Customer V1.0');
});

router.post('/', function(req, res, next) {
  //console.log("addCustomer : Post Method");
var response = {};
//console.log(req.body);

var internalRequest = {
  TableName: Config.CUSTOMER_TABLE,
  IndexName: Config.CUSTOMER_LINE_ID_INDEX,
  KeyConditionExpression: Config.SEARCH_STRING_GET_CUSTOMER,
  ExpressionAttributeValues: {
    ":LINEID": req.body.LINE_ID
  }
}

//console.log((internalRequest));
DynamoDBUtils.getItems(internalRequest, function(err,data){
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
});
//await x
//console.log("Result");

});

module.exports = router;
