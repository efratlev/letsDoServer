/*  <reference path="login.js" /> */
var express = require('express');
var router = express.Router();
const Users = require('../models/user');

// login user by userName and id
router.post('/login', function (req, res) {
    let pass = req.body.password;
    Users.findOne({ userName: req.body.userName, password: pass }).exec(function (err, user) {
        if (err) {
            console.error('GET Error: There was ka problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            res.json(user);
            console.log("yes, the user exists return all the user's details --message from login ");
        }
    }
    );
});

module.exports = router;