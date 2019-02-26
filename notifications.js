var express = require('express');
var router = express.Router();

var admin = require('firebase-admin');

var serviceAccount = require('./cer/firebase');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://letsdo-5d29d.firebaseio.com"
});

admin.messaging().sendToDevice(registrationToken, {
    data: {
      score: '850',
      time: '2:45'
    }
  })
  .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
    console.log('Successfully sent message:', response);
  })
  .catch(function(error) {
    console.log('Error sending message:', error);
  });

const notifications = function () { };
module.exports = notifications;
