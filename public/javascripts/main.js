/**
 * Created by maksim on 20/05/16.
 */
$(document).ready(function() {

  // page is now ready, initialize the calendar...

  $('#calendar1').fullCalendar({
    // put your options and callbacks here
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay',
      width: '500'
    },
    weekends: false,
    slotMinutes: 15,
    timezone: 'UTC',

    eventSources: [

      // your event source
      {
        url: '/events', // use the `url` property
        color: '#281B48',    // an option!
        textColor: 'white',  // an option!
      },

      //{
      //  url: '/items', // use the `url` property
      //  color: 'green',    // an option!
      //  textColor: 'white',  // an option!
      //},
    ]



    //events: '/events',
    //events: [
    //  {
    //    title  : 'event1',
    //    start  : '2016-05-01'
    //  },
    //  {
    //    title  : 'event2',
    //    start  : '2016-05-05',
    //    end    : '2016-05-07'
    //  },
    //  {
    //    "type": "VEVENT",
    //    "params": [],
    //    "uid": "040000008200E00074C5B7101A82E00800000000404294D19973D1010000000000000000100000002E236E30D88602438EED24AA0011891E",
    //    "summary": "Busy",
    //    "start": "2016-05-11T12:00:00.000Z",
    //    "end": "2016-05-11T13:00:00.000Z",
    //    "class": "PUBLIC",
    //    "priority": "5",
    //    "dtstamp": "20160520T114312Z",
    //    "transparency": "OPAQUE",
    //    "status": "CONFIRMED",
    //    "sequence": "1",
    //    "MICROSOFT-CDO-APPT-SEQUENCE": "1",
    //    "MICROSOFT-CDO-BUSYSTATUS": "BUSY",
    //    "MICROSOFT-CDO-INTENDEDSTATUS": "BUSY",
    //    "MICROSOFT-CDO-ALLDAYEVENT": "FALSE",
    //    "MICROSOFT-CDO-IMPORTANCE": "1",
    //    "MICROSOFT-CDO-INSTTYPE": "0",
    //    "MICROSOFT-DISALLOW-COUNTER": "FALSE",
    //    "title": "Busy",
    //    "color": 'yellow',
    //    textColor: 'black'
    //  },
    //  {
    //    title  : 'event12',
    //    start  : '2016-05-09T12:00:00.000Z',
    //    end    : '2016-05-09T15:00:00.000Z'
    //  },
    //  {
    //    title  : 'event3',
    //    start  : '2016-06-09T12:30:00',
    //    allDay : false // will make the time show
    //  }
    //],
        // an option!
      // an option!
  });

  $('#calendar2').fullCalendar({
    // put your options and callbacks here
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay',
      width: '50%'
    },
    weekends: false,
    slotMinutes: 15,
    timezone: 'UTC',

    eventSources: [

      {
        url: '/items', // use the `url` property
        color: 'green',    // an option!
        textColor: 'white',  // an option!
      },
    ]
  });



});