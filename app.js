var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var cors = require('cors');
var index = require('./routes/index');
var users = require('./routes/users');
var createCustomer = require('./ManageCustomer/addCustomer/addCustomer');
var getCustomers = require('./ManageCustomer/getCustomers/getCustomers');
var updateCustomer = require('./ManageCustomer/updateCustomer/updateCustomer');
var deleteCustomer = require('./ManageCustomer/deleteCustomer/deleteCustomer');

var createZone = require('./ManageZones/createZone/createZone');
var getZones = require('./ManageZones/getZones/getZones');

var app = express();

nunjucks.configure('views', { autoescape: true, express: app});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/users', users);

app.use('/addCustomer', createCustomer);
app.use('/getCustomers', getCustomers);
app.use('/updateCustomer', updateCustomer);
app.use('/deleteCustomer', deleteCustomer);

app.use('/createZone', createZone);
app.use('/getZones', getZones);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
