const CONFIG = require('./settings.js');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);

// var {google} = require("googleapis");
// let privatekey = require('../../keyfile.json');

// // configure a JWT auth client
// let jwtClient = new google.auth.JWT(
//   privatekey.client_email,
//   null,
//   privatekey.private_key,
//   'https://www.googleapis.com/auth/calendar');
// //authenticate request
// jwtClient.authorize(function (err, tokens) {
//   if (err) {
//     console.log(err);
//     return;
//   } else {
//     console.log('Successfully connected!');
//   }
// });

//insert events to specific calendar with attendee
function insertEventWithAttendee(calendarId, startDateTime, endDateTime, description, attendeeName, attendeeEmail) {
  let event = {
    'start': {
      'dateTime': startDateTime
    },
    'end': {
      'dateTime': endDateTime
    },
    'timezone': 'America/Chicago',
    'location': 'BJ\s Tattoo Haven, Kansas City, MO',
    'summary': 'Tattoo Appointment at BJ\s',
    'status': 'confirmed',
    'description': description,
    'colorId': 1,
    'attendees': [
      {
        'email': attendeeEmail,
        'displayName': attendeeName
      }
    ],
    'sendNotifications': true
  };
  return cal.Events.insert(calendarId, event)
    .then(resp => {
      console.log('inserted event with attendee:');
      console.log(resp);
      return resp;
    })
    .catch(err => {
      console.log('Error: insertEventWithAttendee', err.message);
    });
}

function getParams(timeMin, timeMax, name) {
  let params = {
    timeMin: timeMin,
    timeMax: timeMax,
    items: [{ 'id': name }]
  };
  return params;
}
 
cal.FreeBusy.query(CONFIG.calendarId.tyler, getParams('2019-06-07T09:00:00-05:00', '2019-06-07T11:00:00-05:00', CONFIG.calendarId.tyler))
  .then(resp => {
    console.log('List of busy timings with events within defined time range: ');
    console.log(resp);
  })
  .catch(err => {
    console.log('Error: checkBusy -' + err.message);
  });

// module.exports = 