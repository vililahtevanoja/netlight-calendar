var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express3' });
});

router.get('/calendar1', function(req, res, next) {
  res.render('calendar1', { title: 'Express3' });
});

router.get('/calendar2', function(req, res, next) {
  res.render('calendar2', { title: 'Express3' });
});

module.exports = router;
