// Sample CalendarAPI settings
const SERVICE_ACCT_ID = 'manager@bjs-tattoo-parlo-1559680213543.iam.gserviceaccount.com';
const key = require('./keyfile.json').private_key;
const TIMEZONE = 'UTC-05:00';
const CALENDAR_ID = {
  'tyler': 'lcv48g3bba5v733l5r4ce7lr8k@group.calendar.google.com',
  'justin': '2q2ufifmpqebeqgeu0g35h3qro@group.calendar.google.com',
  'benita': 'c1mg84967v8q85p650i9ecnvpo@group.calendar.google.com',
  'halie': '3sf70ugsc4m62pvngjgbvgjrbs@group.calendar.google.com'
};

module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.timezone = TIMEZONE;
module.exports.calendarId = CALENDAR_ID;
module.exports.key = key;