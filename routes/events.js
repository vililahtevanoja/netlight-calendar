var express = require('express');
var router = express.Router();
var ical = require('ical');

var TIMEZONE = 'VTIMEZONE';
var EVENT = 'VEVENT';

/* GET users listing. */
router.get('/', function(req, res, next) {
  var months = months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var pop_corner_url = 'http://outlook.office365.com/owa/calendar/4048201c9bac4cb0abe6d5c5865d8fc1@netlight.fi/7d24a835be974460901686ec348a52c613748629002781753650/calendar.ics';
  var response = [];
  ical.fromURL(pop_corner_url, {}, function(err, data) {
    for (var k in data){
      if (data.hasOwnProperty(k)) {
        var ev = data[k];
        if (ev.type === EVENT) {
          console.log("START", ev.start);
          console.log("END", ev.end);
          ev.title = ev.summary;
          //ev.start = JSON.stringify(ev.start)
            //.replace(/T/, ' ')    // replace T with a space
            //.replace(/"/, '')
            //.replace(/\..+/, ''); // delete the dot and everything after
          //ev.end = JSON.stringify(ev.end)
          //  .replace(/T/, ' ')    // replace T with a space
          //  .replace(/"/, '')
          //  .replace(/\..+/, ''); // delete the dot and everything after
          response.push(ev);
        }

        //console.log(ev);
        //
        //console.log("Conference",
        //  ev.summary,
        //  'is in',
        //  ev.location,
        //  'START:', ev.start, 'END:', ev.stop);
      }
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(response);
  });

});

module.exports = router;
