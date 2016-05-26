/**
 * Created by maksim on 20/05/16.
 */
$(document).ready(function() {
  // Page is now ready, setup variables and initialize the calendar...
  var aspectRatio = 4.0;
  var minTime = "06:00:00";
  var maxTime = "21:00:00";
  var defaultView = 'timelineDay';
  var timeFormat = 'HH:mm';
  var color = '#281B48';
  var textColor = 'white';
  var refreshInterval = 60 * 5; // 5minutes

  $.getJSON("/config.json", function(json) {
    aspectRatio = json.aspectRatio;
    minTime = json.minTime;
    maxTime = json.maxTime;
    timeFormat = json.timeFormat;
    refreshInterval = json.refreshInterval;
  });

  // Load calendars.json config file
  $.getJSON("/calendars.json", function(json) {
    console.log("Calendars JSON", json);

    var calendars = json;
    var eventResources = [];
    var roomResources = [];
    for (var calendar in calendars){
      if (calendars.hasOwnProperty(calendar)) {
        var current = calendars[calendar];
        eventResources.push(
          {
            url: '/events/' + current.resourceId,
            color: color,
            textColor: textColor,
          }
        );
        roomResources.push(
          {
            id: current.resourceId,
            title: current.title,
          }
        )
      }
    }

    $('#calendar').fullCalendar({
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      // put your options and callbacks here
      header: {
        left: '',
        center: '',
        right: '',
      },
      nowIndicator: true,
      weekends: false,

      handleWindowResize: true,
      defaultView: defaultView,
      aspectRatio: aspectRatio,

      slotLabelFormat: timeFormat,
      minTime: minTime,
      maxTime: maxTime,

      ignoreTimezone: false,
      timezone: 'local',

      eventSources: eventResources,
      resourceLabelText: 'Rooms',
      resources: roomResources

    });

    setInterval(function(){$('#calendar').fullCalendar('refetchEvents')}, refreshInterval * 1000);

  });


});