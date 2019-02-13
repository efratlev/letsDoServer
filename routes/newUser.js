var express = require('express');
var router = express.Router();
const Users = require('../models/user');


//create new user
router.post('/newUser', function (req, res) {
    var newUser = req.body;
    Users.findOne({ userName: newUser.userName }).exec(function (err, user) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            if (!user) {
                Users.create(newUser, function (err, createdUser) {
                    if (err) {
                        console.error('GET Error: There was a problem retrieving: ' + err);
                        res.status(err.statusCode || 500).json(err);
                    }
                    else {
                        res.json(createdUser);
                    }
                })
            }
            else {
                res.send("user already exists");
                console.log("user already exists");
            }

        }
    })
});
module.exports = router;
