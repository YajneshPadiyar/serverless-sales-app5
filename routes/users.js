var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addCustomer', function(req, res, next) {
  var response = {
    reqbody : req.body
  }
  res.send(  response  );
});

module.exports = router;
