// Client ID and API key from the Developer Console
var CLIENT_ID = '515691578208-vi6vc60j28biaopfa9ph26u1jobas5jp.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDyQy3odjccdiQ7lbDJ0j8dd6sp5ah5RmU';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    getTatCalendarId(event);
    // console.log(calendarID);
    // createEvent(calendarID, event);
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */

function getTatCalendarId() {
  gapi.client.calendar.calendarList.list({}).then(function (response) {
    const calList = response.result.items;
    let calendarId = null;
    for (let i = 0; i < calList.length; i++) {
      if (calList[i].summary === ('Tattoo' || 'tattoo')) {
        calendarId = calList[i].id;
      }
    }
    createEvent(calendarId, makeEvent('Tyler Ward', 'Butterfly', 't.ward26@gmail.com'));
  });
}

function createEvent(calendarId, event) {
  let request = gapi.client.calendar.events.insert({
    'calendarId': calendarId,
    'resource': event,
    'sendNotifications': true
  });

  request.execute(function (event) {
    if (event.status === 'confirmed') {
      //replace with Modal
      alert('Appointment Confirmed');
    }
  });
}

//make start date and time dynamic fields
function makeEvent(artist, idea, clientEmail) {
  let description = 'Appointment with ' + artist + ' for ' + idea;
  var event = {
    'summary': 'Tattoo Appointment',
    'location': 'BJ\'s Tattoo Haven, Kansas City, MO',
    'description': description,
    'start': {
      'dateTime': '2019-06-07T09:00:00',
      'timeZone': 'America/Chicago'
    },
    'end': {
      'dateTime': '2019-06-07T17:00:00',
      'timeZone': 'America/Chicago'
    },
    'attendees': [{
      'email': clientEmail
    }]
  };
  return event;
}

