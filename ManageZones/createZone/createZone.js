var express = require('express');
var router = express.Router();

var DynamoDBUtils = require('../../AWSUtils/DynamoDB/addItem');
var Config = require('../../config/config');

router.get('/', function(req, res, next) {
  res.send('Create Zone V1.0');
});

router.post('/', function(req, res, next) {
  var response = {};

  var internalRequest =  {
    "TableName": Config.ZONE_TABLE,
    "Item": req.body
  };

  //internalRequest.Item.ZONE_TYPE = Config.ZONE_TYPE;
  //internalRequest.Item.ZONE_ID = Config.ZONE_TYPE;
  console.log(internalRequest);
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
});

module.exports = router;
