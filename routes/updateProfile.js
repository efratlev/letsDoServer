var express = require('express');
var router = express.Router();
const Users = require('../models/user');


router.post('/updateProfile', function (req, res, next) {
    Users.findOne({ id: req.body.id }, function (err, user) {
        if (err) {
            console.log(err + ' couldnt delete');
        }
        else {
            let newDoc = {};
            newDoc = req.body;
            if (user) {
                Users.updateOne({ $set: newDoc }
                    , function (err, updateProfile) {
                        if (err) {
                            console.error('GET Error: There was a problem retrieving: ' + err);
                            res.status(err.statusCode || 500).json(err);
                            console.log("1");
                        }
                        else {
                            res.json(updateProfile);
                            console.log("2");
                        }
                    })
            }
            else {
                console.log("user is not exist 1");
            }
        }
    });
});
module.exports = router;