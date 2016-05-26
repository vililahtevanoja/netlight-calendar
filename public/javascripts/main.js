/**
 * Created by maksim on 20/05/16.
 */
$(document).ready(function() {

  var aspectRatio = 5.0;
  var minTime = "06:00:00";
  var maxTime = "20:00:00";
  var defaultView = 'timelineDay';
  var timeFormat = 'HH:mm';
  var color = '#281B48';
  var textColor = 'white';
  var refreshInterval = 60 * 5; // 5minutes

  // page is now ready, initialize the calendar...

  // Variable calendars is global and is loaded from the calendars.js file
  $.getJSON("/calendars.json", function(json) {
    console.log(json); // this will show the info it in firebug console

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
            title: current.title
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
      handleWindowResize: false,
      defaultView: defaultView,
      aspectRatio: aspectRatio,
      weekends: false,
      axisFormat: timeFormat,
      minTime: minTime,
      maxTime: maxTime,
      timezone: 'UTC+3',

      eventSources: eventResources,
      resourceLabelText: 'Rooms',
      resources: roomResources

    });

    setInterval(function(){$('#calendar').fullCalendar('refetchEvents')}, refreshInterval * 1000);

    //$('#calendar2').fullCalendar({
    //  schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    //  // put your options and callbacks here
    //  header: {
    //    left: '',
    //    center: '',
    //    right: '',
    //
    //  },
    //  handleWindowResize: false,
    //  defaultView: defaultView,
    //  aspectRatio: aspectRatio,
    //  weekends: false,
    //  axisFormat: timeFormat,
    //  minTime: minTime,
    //  maxTime: maxTime,
    //  timezone: 'UTC',
    //
    //  eventSources: [
    //
    //    {
    //      url: '/events/internet_cafe', // use the `url` property
    //      color: color,    // an option!
    //      textColor: textColor,  // an option!
    //    },
    //  ]
    //});

    setTimelineRec();
    setInterval(function () {
      $('.timeline').remove();
      setTimelineRec();
    }, 5000);

    $(window).on('resize', function () {
      $('.timeline').remove();
      setTimelineRec();
    });

  });

  function setTimelineRec(view) {
    // Get the div where the line will be shown.
    var parentDivAux = jQuery(".fc-time-area.fc-widget-content").children().children().children().children();
    var parentDiv = jQuery();
    for (var i = 0; i < parentDivAux.length; i++) {
      // Need only (i think so) the fc-bg, cause fc-content is defined on multiple occasions and line would be painted multiple times.
      if (parentDivAux[i].className === "fc-bg") {
        parentDiv.push(parentDivAux[i]);
      }
    }

    var timeline = parentDiv.children(".timeline").children();
    if (timeline.length == 0) { //if timeline isn't there, add it
      timeline = jQuery("<hr>").addClass("timeline");

      // My calendar starts at 9 am and finishes at 9 pm, so I get the total amount of seconds from midnight to 9 am and from 9 am to 9 pm
      var secondsHourMin = 9 * 3600;

      var totalSeconds = 12 * 3600 ;

      // Get the width of the div where the line will be painted
      var widthAux = jQuery(".fc-time-area.fc-widget-content").children().children().children();
      var width = widthAux.width();

      // We obtain the current time/date to know where we should draw the vertical line
      var curTime = new Date();
      var curSeconds = (curTime.getHours() * 60 * 60) + (curTime.getMinutes() * 60) + curTime.getSeconds() - secondsHourMin;
      var percentOfDay = curSeconds / totalSeconds; //totalSeconds = 12 hours

      // Calculate the margin with a known width and the actual percentOfDay
      var margin = (percentOfDay * width);

      // Margin is applied and finally I prepend the timeline.
      timeline.css({
        left: margin + "px",
        height: "100%",
        width: 1 + "px"
      });

      parentDiv.prepend(timeline);
    }

  }


});