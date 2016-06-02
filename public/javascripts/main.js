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
  var refreshInterval = 5 * 60; // 5minutes

  var Calendar = Calendar || function() {
    this.eventResources = [];
    this.roomResources = [];
  };

  Calendar.prototype.fetchConfig = function() {
    return $.getJSON("/config.json", function(json) {
      aspectRatio = json.aspectRatio;
      minTime = json.minTime;
      maxTime = json.maxTime;
      timeFormat = json.timeFormat;
      refreshInterval = json.refreshInterval;
    });
  };

  Calendar.prototype.fetchCalendars = function() {
    var that = this;
    // Load calendars.json config file
    return $.getJSON("/calendars.json", function(json) {
      console.log("Calendars JSON", json);

      var calendars = json;
      for (var calendar in calendars){
        if (calendars.hasOwnProperty(calendar)) {
          var current = calendars[calendar];
          that.eventResources.push(
            {
              url: '/events/' + current.resourceId,
              color: color,
              textColor: textColor,
            }
          );
          that.roomResources.push(
            {
              id: current.resourceId,
              title: current.title,
            }
          )
        }
      }
    });
  };

  Calendar.prototype.init = function() {
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

      eventSources: this.eventResources,
      resourceLabelText: 'Rooms',
      resources: this.roomResources,

      eventAfterAllRender: function (view) {
        console.log('Events refreshed');
        $('#status').css('display', 'none');
        console.log(view);
      }

    });

    setInterval(function(){
      console.log("Refreshing calendar events");
      $('#calendar').fullCalendar('refetchEvents');
      $('#status').css('display', 'block');
    }, refreshInterval * 1000);
  };

  var NetlightCalendar = new Calendar();
  $.when(
    NetlightCalendar.fetchConfig(),
    NetlightCalendar.fetchCalendars()
  ).then(function() {
    NetlightCalendar.init();
  });


});