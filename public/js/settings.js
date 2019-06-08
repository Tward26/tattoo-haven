// Sample CalendarAPI settings
require('dotenv').config();
const SERVICE_ACCT_ID = 'manager@bjs-tattoo-haven.iam.gserviceaccount.com';
const key = JSON.parse(process.env.KEYFILE).private_key;
const TIMEZONE = 'America/Chicago';
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