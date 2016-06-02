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
var vars = require('./routes/vars');
var noaccess = require('./routes/noaccess');

var app = express();

var config = {};
try {
  config = JSON.parse(process.env.config);
} catch(exception) {
  console.log("Unable to load Heroku config variable, application may not work!");
}

app.haveAccess = function(req, res, next) {
  var environment = app.get('env');
  var request_ip = req.header('host');
  if (environment === 'production') {
    request_ip = req.header('x-forwarded-for');
  }

  var access_denied = { message: "Your IP is not in the whitelist", error: { status: "Error", stack: ""} }

  console.log("Request IP", request_ip);
  console.log("Allowed IP", config.allowedIPs);
  if (isset(config.allowedIPs) && isset(request_ip)) {
    if (config.allowedIPs.indexOf(request_ip) > -1) {
      console.log("Ip is allowed", config.allowedIPs);
      return next();
    }
    else {
      res.render('error', access_denied);
    }
  } else {
    res.render('error', access_denied);
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
app.use('/configs', vars);

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
