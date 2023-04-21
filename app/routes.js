//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();
const fileUpload = require('express-fileupload');
var AWS = require('aws-sdk');
const axios = require('axios');
router.use(fileUpload());
let result;
let totalUploadedRecords;

// Add your routes here
// Run this code when a form is submitted to 'juggling-balls-answer'
router.post('/doLogin', function (req, res) {
  // Make a variable and give it the value from 'how-many-balls'
  var username = req.session.data['emailRIN'];
  var password = req.session.data['password'];

  // Check whether the variable matches a condition
  if (username == 'user@gmail.com' && password == 'password') {
    // Send user to next page
    res.redirect('/doLoginUser');
  } else if (username == 'admin@nfws.com' && password == 'password') {
    // Send user to Admin page
    res.redirect('/doLoginAdmin');
  } else {
    res.redirect('/login');
  }
});

async function convertExcelFileToJsonUsingXlsx() {
  let addresses = [];
  const response = await fetch('http://127.0.0.1:5000/convert', {
    method: 'POST',
  });
  const data = await response.json();
  return data;
}

function toHoursAndMinutes(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
   return {h: hours, m: minutes, s: seconds};
}

router.get('/bulk-upload-address-view', async function (request, response) {
  //   let addresses = response.data
  // response.locals.addresses = addresses
  // var dice = Math.ceil(Math.random()*6)
  //     response.locals.dice = dice
  try {
    const addresses = await convertExcelFileToJsonUsingXlsx();
    console.log('addresses in routes', addresses);
    response.locals.addresses = addresses.data;
    response.render('bulk-upload-address-view');
  } catch (err) {
    console.log(err);
  }
});

router.get('/import-file', function (req, res) {
  res.locals.data = {
    name: result.filename,
  };
  res.render('import-file');
});

async function getTableData() {
  AWS.config.update({
    region: 'eu-west-2',
  });
  const dynamodbClient = new AWS.DynamoDB.DocumentClient();
  try {
    const data = await dynamodbClient.scan({ TableName: 'NFWS_ADDRESSES', Limit: 1 }).promise();
    return data;
  } catch (error) {
    console.log('error', error);
    return error;
  }
}

router.get('/address-view', async function (request, response) {
  try {
    // const data = await getTableData();
    const data = {
      Items: [
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
        {
          BUILDING_NAME: '',
          DEPENDENT_LOCALITY: '',
          OS_MATCHING_SCORE: 0.9,
          BUILDING_NUMBER: '21',
          LON: -3.5401052,
          UPRN: '10000880821',
          UID: 1681102556282,
          UPDATE_DATE: '2023-04-10T04:55:56.830Z',
          OS_MATCHING_RESULT: 1,
          Y_COORDINATE: 528959,
          X_COORDINATE: 300715,
          POST_TOWN: 'WORKINGTON',
          ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
          MATCHING_RATING: 1,
          POSTCODE: 'CA14 4AG',
          UDPRN: '3920692',
          LAT: 54.6459313,
        },
      ],
      Count: 45,
      ScannedCount: 45,
      LastEvaluatedKey: { UID: 1681102556282 },
    };
    response.locals.addresses = data['Items'];
    response.locals.addresses = data['Items'];
    response.render('address-view');
  } catch (err) {
    console.log(err);
  }
});

router.get('/match-view', async function (req, res) {
  let fullMatch = 0;
  let partialMatch = 0;
  let noMatch = 0;
  try {
    const apiUrl = `http://127.0.0.1:5000/getMatchingRating`;
    var response = await axios.get(apiUrl);
    const jsonData = await response.json();
    for await (const data of jsonData) {
      // console.log(data.MATCHING_RATING)
      if (data.MATCHING_RATING === 1) {
        ++partialMatch;
      } else if (data.MATCHING_RATING === 2) {
        ++fullMatch;
      } else {
        ++noMatch;
      }
    }
    res.locals.data = { fullMatch, partialMatch, noMatch, name: result.filename };
    res.render('match-view');
  } catch (err) {
    console.log(err);
  }
});

router.post('/uc01/upload-file-nav', async function (request, response) {
  try {
    var option = request.session.data['upload-your-addresses'];
    console.log(option);
    if (option === 'Upload with CSV file') {
      response.redirect('/uc01/csv-file-upload');
    } else {
      response.redirect('/uc01/upload-options');
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/uc01/reading', function (req, res) {
  const str = req.files['file-upload-1'].data.toString('utf8');
  const fileHeadersColumns = str.trim().split('\n');
  const headerColumns = fileHeadersColumns[0].trim().split(',');
  const fileHeadersColumnsLength = headerColumns.length;
  let fileUploadValidation = '';
  if (fileHeadersColumnsLength === 1) {
    if (headerColumns[0] === 'UPRN' || headerColumns[0] === 'ADDRESS') {
      fileUploadValidation = 'File Verified';
    } else {
      fileUploadValidation = 'File Not Verified';
    }
  } else if (fileHeadersColumnsLength === 4) {
    if (
      headerColumns[0] === 'BUILDING_NUMBER' &&
      headerColumns[1] === 'THOROUGHFARE_NAME' &&
      headerColumns[2] === 'POST_TOWN' &&
      headerColumns[3] === 'POSTCODE'
    ) {
      fileUploadValidation = 'File Verified';
    } else {
      fileUploadValidation = 'File Not Verified';
    }
  } else {
    fileUploadValidation = 'File Not Verified';
  }

  res.locals.data = {
    ...req.files['file-upload-1'],
    rows: str.trim().split('\n').length - 1,    
  };
  totalUploadedRecords = str.trim().split('\n').length - 1;
  result = {
    filename: req.files['file-upload-1'].name,
    rows: str.trim().split('\n').length - 1,
    validation: fileUploadValidation,
  };
  console.log('STR :', headerColumns);
  console.log('STR length :', fileHeadersColumnsLength);
  console.log('Validation Error :', fileUploadValidation);
  // console.log(result)
  res.render('uc01/reading');
});

router.get('/uc01/confirmation', function (req, res) {
  console.log(result);
  res.locals.data = result;
  res.render('uc01/confirmation');
});

router.get('/uc01/results', async function (req, res) {
  console.log(result);

  let fullMatch = 0;
  let partialMatch = 0;
  let noMatch = 0;
  try {
    const apiUrl = `http://127.0.0.1:5000/getMatchingRating`;
    var response = await axios.get(apiUrl);
    const jsonData = await response.data.filter(d => d.CSV_FILENAME === result.filename);
    for (const data of jsonData) {
      if (data.MATCHING_RATING === 1) {
        ++partialMatch;
      } else if (data.MATCHING_RATING === 2) {
        ++fullMatch;
      } else {
        ++noMatch;
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.locals.data = {
    fullMatch,
    partialMatch,
    noMatch,
    filename: result.filename,
    duration: toHoursAndMinutes((totalUploadedRecords)*((8*60)/1000))
  };
   res.render('uc01/results');
});

router.get('/uc01/preview-result-fully', async function (req, res) {
  res.locals.data = {
    filename: result.filename,
  };

  res.render('uc01/preview-result-fully');
});

router.get('/uc01/preview-result-partially', async function (req, res) {
  res.locals.data = {
    filename: result.filename,
  };

  res.render('uc01/preview-result-partially');
});

router.get('/uc01/preview-result-no-match', async function (req, res) {
  res.locals.data = {
    filename: result.filename,
  };

  res.render('uc01/preview-result-no-match');
});

// router.get('/uc01/preview-result', async function (req, res) {
//   const data = {
//     Items: [
//       {
//         ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
//         OS_MATCHING_SCORE: 0.9,
//         Y_COORDINATE: 528959,
//         X_COORDINATE: 300715,
//       },
//       {
//         OS_MATCHING_SCORE: 0.9,
//         Y_COORDINATE: 528959,
//         X_COORDINATE: 300715,
//         ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
//       },
//       {
//         OS_MATCHING_SCORE: 0.9,
//         Y_COORDINATE: 528959,
//         X_COORDINATE: 300715,
//         ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
//       },
//       {
//         OS_MATCHING_SCORE: 0.9,
//         Y_COORDINATE: 528959,
//         X_COORDINATE: 300715,
//         ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
//       },
//       {
//         OS_MATCHING_SCORE: 0.9,
//         Y_COORDINATE: 528959,
//         X_COORDINATE: 300715,
//         ADDRESS: '21, HALL PARK VIEW, WORKINGTON, CA14 4AG',
//       },
//     ],
//   };
//   res.locals.addresses = data['Items'];
//   res.render('uc01/preview-result');
// });
