# netlight-calendar

To setup:
>npm install

>bower install

>npm install -g foreman

>npm install -g nodemon

To run:
>npm run start

To emulate heroku:
>npm run heroku

Create a new local .env file in the project root and add the following content:
>config={"aspectRatio": 4,"minTime": "06:00:00","maxTime": "21:00:00","timeFormat": "HH:mm","refreshInterval": 60,"allowedIPs": ["localhost:5000"]}

>calendars={ "pop_corner": { "title": "Pop Corner", "url": "http://outlook.office365.com/owa/calendar/abc/calendar.ics", "resourceId": "pop_corner" }, "internet_cafe": { "title": "Internet Cafe", "url": "http://outlook.office365.com/owa/calendar/xyz/calendar.ics", "resourceId": "internet_cafe" } }

and add your calendar urls and info
