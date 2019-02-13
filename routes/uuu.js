var express = require('express');
var router = express.Router();
const Users = require('../models/user');




router.post('/updateBusiness', function (req, res) {
    user.findOne({
        _id: req.body.UserId, authorizationId: 'not 5'
    }).exec(function (err, newBusiness) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            let businessDoc = {};
            businessDoc = req.body;
            business.update({ $set: businessDoc }).exec(function (err, busi) {
                if (err) {
                    console.error('GET Error: There was a problem retrieving: ' + err);
                    res.status(err.statusCode || 500).json(err);
                }
                else {
                    res.json(auth);
                }
            }
            )
        }
    })
})


router.get('/allBusiness', function (req, res, next) {
    business.find({}, function (err, business) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(business);
        }
    })
});
module.exports = router;