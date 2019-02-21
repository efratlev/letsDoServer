var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const Users = require('../models/user');

router.post('/', function (req, res, next) {
    var bodyReq = req.body;
    Users.findOne({ email: bodyReq.to }).exec(function (err, user) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            //פה צריך לבוא חלק שמוסיף ליוזר הזמנה
            //כדי שכשהוא יכנס לדף הזמנות שלו הוא יראה שהזמינו אותו ויוכל לאשר
            //זה מורכב יותר אני חושבת
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'todoletsdo@gmail.com',
                    pass: 'letsdotodo'
                }
            });

            var mailOptions = {
                from: 'todoletsdo@gmail.com',
                to: bodyReq.to,
                subject: "Let's Do",
                html: "<div><h4> <b>" + bodyReq.from + "</b> has invited you to collaborate on the <b>" + bodyReq.groupName + "</b></h4>" +
                    "<br/>" +
                    "<p>You can accept or decline this invitation.</p>" +
                    "<form action='http://localhost:3000/Login'>" +
                    "<input type='submit' value='View Invitation' />" +
                    "</form>" +
                    "</div>",
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.sendStatus(200);
                }
            });
        }
    }
    );
});

module.exports = router;