var express = require('express');
var router = express.Router();
const Groups = require('../models/group');
const Users = require('../models/user');


//create new group for the user
router.post('/newGroup', function (req, res) {
    var group = req.body.groupName;
    // var groups = {
    //     //"tasks": [],
    //    // "_id": "5c520ad3fa0cb5617089b53d",
    //     "groupName": req.body.groupName
    //     //"__v": 0
    // };
    Users.findOne({
        _id: req.body._id
    }).exec(function (err, user) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            if (!user) {
                console.log("you must be a user before creating group");
            }
            else {
                Groups.create({ groupName: group }, function (err, newGroup) {
                    if (err) {
                        console.error('GET Error: There was a problem retrieving: ' + err);
                        res.status(err.statusCode || 500).json(err);
                    }
                    else {
                        //res.json(newGroup);
                        console.log("added group");
                        user.updateOne({ $push: { groups: { groupId: newGroup } } }, { new: true }, function (err, userAsManager) {
                            if (err) {
                                console.error('GET Error: There was a problem retrieving: ' + err);
                                res.status(err.statusCode || 500).json(err);
                            }
                            else {
                                res.json(newGroup._doc);
                                console.log("added group to username: " + req.body.userName);
                            }
                        })
                    }
                })

            }

        }
    });
});

//get all exist groups
router.get('/', function (req, res, next) {
    Groups.find({}, function (err, groups) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(groups);
        }
    })
});


module.exports = router;

