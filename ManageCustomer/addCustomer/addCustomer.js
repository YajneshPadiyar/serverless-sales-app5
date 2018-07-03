var express = require('express');
var router = express.Router();

var DynamoDBUtils = require('../../AWSUtils/DynamoDB/addItem');
var Config = require('../../config/config');
//console.log(DynamoDB);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Create Customer V1.0');
});

router.post('/', function(req, res, next) {
  //console.log("addCustomer : Post Method");
var response = {};
//console.log(req.body);

var internalRequest = {
    "TableName":Config.CUSTOMER_TABLE,
    "Item": req.body
};

DynamoDBUtils.addItem(internalRequest, function(err,data){
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
