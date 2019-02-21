/*  <reference path="login.js" /> */
var express = require('express');
var router = express.Router();
const Users = require('../models/user');

// login user by userName and id
router.post('/', function (req, res) {    
    Users.findOne({ userName: req.body.username, password: req.body.password }).exec(function (err, user) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
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
