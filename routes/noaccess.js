var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('error', { message: "noaccess error no access", error: { status: "adfdsg", stack: "assdfsd"} });
});

module.exports = router;
