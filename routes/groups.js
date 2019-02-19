var express = require('express');
var router = express.Router();
const Groups = require('../models/group');
const Users = require('../models/user');



/* get all groups and tasks for user*/
router.get('/ff', function (req, res) {
    Users.find({ _id: req.body.id }).populate({ path: 'groups.groupId', populate: { path: 'tasks', populate: 'task' } }).exec(function (err, group) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            res.json(group);
        }
    });
});






/*create new group for the user*/
router.post('/newGroup', function (req, res) {
    var newGroup = req.body.group;
    // var groups = {
    //     //"tasks": [],
    //    // "_id": "5c520ad3fa0cb5617089b53d",
    //     "groupName": req.body.groupName
    //     //"__v": 0
    // };
    Users.findOne({ _id: req.body.userId }).exec(function (err, user) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            if (!user) {
                console.log("you must be a user before creating group");
            }
            else {
                Groups.create(newGroup, function (err, newGroup) {
                    if (err) {
                        console.error('GET Error: There was a problem retrieving: ' + err);
                        res.status(err.statusCode || 500).json(err);
                    }
                    else {
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
  //Users.populate( groupId ,{ "path": "groups.groupId" }, function (err, usersInGroup) {
    // Groups.find({ groupId }.populate('userName'), function (err, usersInGroup) {
// get all users in specipic group
router.get('/getUsersInGroup', function (req, res, next) {
    groupId1 = req.body._id;       
    Users.find( { 'groups.groupId': { $in: [groupId1] } }).populate({ path: 'groups.groupId', populate: { path: 'tasks', populate: 'task' } }).exec( function (err, usersInGroup) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(usersInGroup);
        }
    });
});
/*get group by id*/
router.get('/r/', function (req, res, next) {
    Groups.findOne({ _id: req.body.groupId }, function (err, groups) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(groups);
        }
    })
});
/*get all exist groups*/
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

