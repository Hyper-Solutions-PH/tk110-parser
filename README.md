# TK-110-Parser

NodeJS Parser for TK-110 GPS Tracker

My GPS Tracker looks like this:

![TK-110 GPS Tracker](./tracker.jpg)

There is lot of cheap GPS Trackers on Aliexpress like this one: [http://bit.ly/tk110-tracker](http://bit.ly/tk110-tracker)

You can verify and/or dump packets from your GPS to make sure that format is correct my using Linux server on real (external) IP in this way:

1. On Server run:
`nc -l -p 10000`

2. Configure your GPS to send data to your server IP and port 10000. Please, refer manual for HowTo.

3. Wait some time and you should get lines like this:

`(087072203411BP05352887072203411160318A5027.1953N03025.4878E003.1202440000.0001000000L000450AB)(087072203411BR00160318A5027.1950N03025.4631E003.0202455000.0001000000L000450AB)(087072203411BR00160318A5027.1946N03025.4578E001.9202510000.0001000000L000450AB)(087072203411BR00160318A5027.1962N03025.4604E002.5202525000.0001000000L000450AB)
`

If yes - you fine. This module can help you parse this data.

##### Usage:

```javascript
const tk110 = require('./index.js');

let rawString = '(008238008589BO010141129A2302.7532N07232.2461E000.0092142349.381000000AL000000F1)';

let result = tk110.parse(rawString);

console.log('* Result: ', result);
```

##### Your result should look like this:

```json
{
	"status": true,
	"trackerId": "008238008589",
	"lat": 23.045886666666668,
	"long": 72.537435,
	"speed": 0,
	"date": "2014-11-29",
	"time": "09:21:42",
	"direction": 349.38,
	"mileage": 0,
	"flags": {
  		"power": 1,
	  	"ignition": 0
  }
}
```

#### Please note:

* Power: 1 - Works from Battery, 0 - Works from External power supply. // Not all trackers has internal battery.

* Ignition: 1 - On, 0 - Off // Usually this cheap trackers don't have any connection to ignition status and will always show 0.


##### Special thanks to:

[Sahaj GPS Tracker](http://www.vehicletrackingsystem.in/blog/tk103-gps-vehicle-tracker-parsing-packets/)

