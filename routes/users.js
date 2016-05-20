var express = require('express');
var router = express.Router();
var ical = require('ical');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var months = months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var pop_corner_url = 'http://outlook.office365.com/owa/calendar/4048201c9bac4cb0abe6d5c5865d8fc1@netlight.fi/7d24a835be974460901686ec348a52c613748629002781753650/calendar.ics';
  var response = 'jeje';
  ical.fromURL(pop_corner_url, {}, function(err, data) {
    for (var k in data){
      if (data.hasOwnProperty(k)) {
        var ev = data[k];
        response += ev.summary + ' - ';
        console.log("Conference",
          ev.summary,
          'is in',
          ev.location,
          'on the', ev.start, 'of', months[ev.start]);
      }
    }
    res.send("wtf?" + response);
  });

});

module.exports = router;
