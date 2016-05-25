/**
 * Created by maksim on 20/05/16.
 */
$(document).ready(function() {

  var aspectRatio = 0.95;
  var minTime = "06:00:00";
  var maxTime = "20:00:00";
  var defaultView = 'agendaDay';
  var timeFormat = 'HH:mm';
  var color = '#281B48';
  var textColor = 'white';

  // page is now ready, initialize the calendar...

  $('#calendar1').fullCalendar({
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
    timezone: 'UTC',

    eventSources: [

      // your event source
      {
        url: '/events/pop_corner', // use the `url` property
        color: color,    // an option!
        textColor: textColor,  // an option!
      },
    ]

  });

  $('#calendar2').fullCalendar({
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
    timezone: 'UTC',

    eventSources: [

      {
        url: '/events/internet_cafe', // use the `url` property
        color: color,    // an option!
        textColor: textColor,  // an option!
      },
    ]
  });



});