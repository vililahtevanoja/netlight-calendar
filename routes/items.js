var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('jeah! this is cool!123');
});

module.exports = router;
