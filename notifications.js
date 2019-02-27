var express = require('express');
var router = express.Router();
const Tasks = require('./models/task');

var admin = require('firebase-admin');

var serviceAccount = require('./cer/firebase');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://letsdo-5d29d.firebaseio.com"
});
router.get('/:message', function (req, res) {
    sendNotif(req.params.message);
    res.json({ status: 'WORKS' });
});

var message = {
    "webpush": {
        "notification": {
            "title": "Important message",
            "body": "Some task need to be done today",
            "icon": "https://raw.githubusercontent.com/efratlev/letsDoClient/master/public/favicon.ico"
        }
    },
    token: 'dRTr0xHSuoI:APA91bHG2ElDd1Nat7GwLr7O_An4DqJwKXENj91pH6KibjaKrYswAURrBMTiDYtoU0mJ74NHuoijIZfauyn99D7Cu_cxdUeVn8BcNmqK1DG-Uwm59Udz2zxexfIAvnGkIy4UPG3Hq3RT'
};



//setInterval(sendNotif, 1000 * 60 * 5);

function sendNotif(message) {
    console.log('in send notif');
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    Tasks.find({ targetDate: { $gte: start, $lt: end } }).populate('assignedTo').exec(function (err, tasks) {
        if (err) {
            console.log(err + ' couldnt delete');
        }
        else {
            //console.log(tasks);
            let array = [];
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i]._doc.assignedTo._doc.token && array.indexOf(tasks[i]._doc.assignedTo._doc.token) === -1) {
                    array.push(tasks[i]._doc.assignedTo._doc.token);
                }
            }
            if (array.length) {
                admin.messaging().sendToDevice(array, {
                    "notification": {
                        "title": "Let's do",
                        "body": message || "Click to explore your messages",
                        "icon": "https://raw.githubusercontent.com/efratlev/letsDoClient/master/public/favicon.ico",
                        "click_action": "http://localhost:3000/MyTasks"
                    }
                }).then(function (response) {
                    // See the MessagingDevicesResponse reference documentation for
                    // the contents of response.
                    console.log('Successfully sent message:', response);
                })
                    .catch(function (error) {
                        console.log('Error sending message:', error);
                    });
            }
        }
    });
}

// admin.messaging().send(message)
//     .then((response) => {
//         // Response is a message ID string.
//         console.log('Successfully sent message:', response);
//     })
//     .catch((error) => {
//         console.log('Error sending message:', error);
//     });
const notifications = function () { };
module.exports = router;
