var express = require('express');
var router = express.Router();

/* GET config vars. */
router.get('/config', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var json_object = JSON.parse(process.env.config);
    res.send(JSON.stringify(json_object));
});

/* GET calendar vars. */
router.get('/calendars', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var json_object = JSON.parse(process.env.calendars);
  res.send(JSON.stringify(json_object));
});

module.exports = router;
