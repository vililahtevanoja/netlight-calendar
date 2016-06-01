var express = require('express');
var router = express.Router();
var ical = require('ical');
var fs = require("fs");
const isset = require('isset');

var contents = null;
try {
  contents = fs.readFileSync('./config/calendars.json');
  var calendars = JSON.parse(contents);
} catch(exception) {
  console.log("calendars.json file not found or could not be parsed!");
}

var TIMEZONE = 'VTIMEZONE';
var EVENT = 'VEVENT';

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
            ev.title = ev.summary;
            ev.resourceId = calendars[req.params.calendar].resourceId;
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
