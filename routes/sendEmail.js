var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function (req, res, next) {
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'todoletsdo@gmail.com',
        pass: 'letsdotodo'
    }
    });

    var bodyReq=req.body;

    var mailOptions = {
    from: 'todoletsdo@gmail.com',
    to: bodyReq.to,
    subject: "Let's Do",
    text: "this email is from lets' Do app. "+bodyReq.from+" invited you to be part of the group. to approve it click http://localhost:4000",
    html: '<b>Hello world ?</b>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
        res.sendStatus(500);
    } else {
        console.log('Email sent: ' + info.response);
        res.sendStatus(200);
    }
    });
});

module.exports = router;