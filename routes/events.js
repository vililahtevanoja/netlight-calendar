var express = require('express');
var router = express.Router();
var ical = require('ical');
const isset = require('isset');

var TIMEZONE = 'VTIMEZONE';
var EVENT = 'VEVENT';

// Add here the url of the calendars that you want to support
var calendars = {
 pop_corner: {
   url: 'http://outlook.office365.com/owa/calendar/4048201c9bac4cb0abe6d5c5865d8fc1@netlight.fi/7d24a835be974460901686ec348a52c613748629002781753650/calendar.ics',
 },
  internet_cafe: {
    url: 'http://outlook.office365.com/owa/calendar/17722c88f8fa46c4b213104744ca2d6f@netlight.fi/db804571ccbc42eb8c2077a294ad0b12225485023870966913/calendar.ics',
  }
}

/* GET users listing. */
router.get('/:calendar', function(req, res, next) {

  if (isset(calendars[req.params.calendar])) {

    var url = calendars[req.params.calendar].url;
    var response = [];
    ical.fromURL(url, {}, function(err, data) {
      for (var k in data){
        if (data.hasOwnProperty(k)) {
          var ev = data[k];
          if (ev.type === EVENT) {
            console.log("START", ev.start);
            console.log("END", ev.end);
            ev.title = ev.summary;
            response.push(ev);
          }
        }
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(response);
    });
  } else {
    res.send('Could not find calendar with name: ' + req.params.calendar);
  }

});

module.exports = router;
