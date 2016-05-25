var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'main' });
});

router.get('/calendar1', function(req, res, next) {
  res.render('calendar1', { title: 'calendar1' });
});

router.get('/calendar2', function(req, res, next) {
  res.render('calendar2', { title: 'calendar2' });
});

module.exports = router;
