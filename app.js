var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
const isset = require('isset');

var routes = require('./routes/index');
var events = require('./routes/events');
var items = require('./routes/items');
var noaccess = require('./routes/noaccess');

var app = express();

var config = {};
try {
  contents = fs.readFileSync('./config/config.json');
  config = JSON.parse(contents);
} catch(exception) {
  console.log("config.json file not found! Trying to load Heroku config variable");
  config = process.env.config;

  console.log("PROCESS CONFIG", config);

  //var err = new Error('Config could not be loaded, exiting!');
  //err.status = 403;
  //throw exception;
  //next(err);

}

app.haveAccess = function(req, res, next) {

  // do any checks you want to in here

   //CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
   //you can do this however you want with whatever variables you set up

  var request_ip = req.header('x-forwarded-for');
  console.log("CONF X-FORWARD", config.allowedIPs, request_ip);
  if (isset(config.allowedIPs) && isset(request_ip)) {
    if (config.allowedIPs.indexOf(request_ip) > -1) {
      console.log("IN ARRAY", config.allowedIPs);
      return next();
    }
    else {
      res.render('error', { message: "jeah error no access", error: { status: "adfdsg", stack: "assdfsd"} });
    }
  } else {
    res.render('error', { message: "12321jeah error no access", error: { status: "adfdsg", stack: "assdfsd"} });
    //res.render('error', { message: "jeah error no access", error: { status: "adfdsg", stack: "assdfsd"} });
  }


};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', app.haveAccess, routes);
app.use('/noaccess', noaccess);
app.use('/events', events);
app.use('/items', items);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log("HEADER", req.headers);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log("HEADER", req.headers);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
