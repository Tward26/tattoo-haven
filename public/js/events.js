const CONFIG = require('../config/Local-Settings');
const CalendarAPI = require('../src/CalendarAPI');
const cal = new CalendarAPI(CONFIG);
const calendarIdList = CONFIG.calendarId;

//adds artist calendars to a calendar list
function addExistingCalendarIntoCalendarList(calendarId) {
  let params = {
    summaryOverride: 'insert summary new',
    selected: true,
    hidden: false,
  };
  cal.CalendarList.insert(calendarId, params)
    .then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err.message);
    });
}

//get specific calendar from list
function getExistingCalendarInCalendarList(calendarId) {
  return cal.CalendarList.get(calendarId)
    .then(resp => {
      console.log(resp);
      return resp;
    }).catch(err => {
      console.log(err.message);
    });
}

//update specific calendar in calendar list
function updateCalendarInCalendarList(calendarId) {
  // Modifies user-specific calendar properties
  let params = {
    selected: true,
    summaryOverride: 'updated new calendar summary',
    hidden: false
  };

  cal.CalendarList.update(calendarId, params).then(resp => {
    console.log(resp);
  }).catch(err => {
    console.log(err.message);
  });
}

//insert events to specific calendar with attendee
function insertEventWithAttendee(calendarId, eventSummary, startDateTime, endDateTime, location, status, description, attendeeName, attendeeEmail) {
  let event = {
    'start': {
      'dateTime': startDateTime
    },
    'end': {
      'dateTime': endDateTime
    },
    'location': location,
    'summary': eventSummary,
    'status': status,
    'description': description,
    'colorId': 1,
    "attendees": [
      {
        "email": attendeeEmail,
        "displayName": attendeeName
      }
    ]
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
