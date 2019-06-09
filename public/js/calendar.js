const CONFIG = require('./settings.js');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);

//insert events to specific calendar with attendee
function insertEvent(calendarId, startDateTime, endDateTime, description, attendeeName, attendeeEmail) {
  let calId;
  switch (calendarId) {
  case '1':
    calId = CONFIG.calendarId.tyler;
    break;
  case '2':
    calId = CONFIG.calendarId.benita;
    break;
  case '3':
    calId = CONFIG.calendarId.justin;
    break;
  case '4':
    calId = CONFIG.calendarId.halie;
  }

  let event = {
    'start': {
      'dateTime': startDateTime
    },
    'end': {
      'dateTime': endDateTime
    },
    'timezone': 'America/Chicago',
    'location': 'BJ\'s Tattoo Haven, Kansas City, MO',
    'summary': 'Tattoo Appointment at BJ\'s',
    'status': 'confirmed',
    'description': description,
    'colorId': 1,
    'attendees': [
      {
        'email': attendeeEmail,
        'displayName': attendeeName
      }
    ]
  };

  let params = {
    sendNotifications: true
  };

  return cal.Events.insert(calId, event, params)
    .then(resp => {
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


async function busyCheck(calendarId, startTime, endTime) {
  let calId;
  switch (calendarId) {
  case '1':
    calId = CONFIG.calendarId.tyler;
    break;
  case '2':
    calId = CONFIG.calendarId.benita;
    break;
  case '3':
    calId = CONFIG.calendarId.justin;
    break;
  case '4':
    calId = CONFIG.calendarId.halie;
  }

  let resp = await cal.FreeBusy.query(calId, getParams(startTime, endTime, calId))
    .then(resp => {
      return resp;
    })
    .catch(err => {
      console.log('Error: checkBusy -' + err.message);
    });
  return resp;
}

function buildStartDateString(date, time) {
  var userDate = date + 'T';
  var userTime = time;
  var shopTimeZone = ':00-05:00';
  var dateString = userDate + userTime + shopTimeZone; // outputs 2019-06-07T10:08:00-05:00
  return dateString;
}

function buildEndDateString(date, time) {
  var userDate = date + 'T';
  var startTime = time.split(':');
  var startHour = startTime[0];
  var endTime = parseInt(startHour) + 2;
  var endTimeFormat = endTime + ':00';
  var shopTimeZone = ':00-05:00';
  var dateString = userDate + endTimeFormat + shopTimeZone; // outputs 2019-06-07T10:08:00-05:00
  return dateString;
}

module.exports.busyCheck = busyCheck;
module.exports.buildStart = buildStartDateString;
module.exports.buildEnd = buildEndDateString;
module.exports.addEvent = insertEvent;