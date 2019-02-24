var express = require('express');
var router = express.Router();
const Groups = require('../models/group');
const Users = require('../models/user');



/** the user approve his connect to the group */
    // {
    //     "userId": "5c6edadfd365780017fb96ec",
    //         "groupId":"5c6efa990595a400173ae0bd",
    //         "auth":"5c6ea9761583090c5c4ba591"
    // }
router.put('/approveConnectToGroup', function (req, res) {
    let auth;
    if (req.body.newAuthorization) {
        auth = req.body.groups.newAuthorization;
    }
    else {
        auth = "5c6ea9761583090c5c4ba592";
    }
    Users.updateOne({ _id: req.body.userId },
        {
            $push: { groups: { groupId: req.body.groupId, authorizationId: req.body.auth } }
        }, function (err, attached) {
            if (err) {
                console.error('GET Error: There was a problem retrieving: ' + err);
                res.status(err.statusCode || 500).json(err);
            }
            else {
                res.json(attached);

            }
        });
    });

/* get all groups and tasks for user*/
router.post('/myTasks', function (req, res) {
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
router.post('/getUsersInGroup', function (req, res, next) {
    groupId1 = req.body._id;       
    Users.find( { 'groups.groupId': { $in: [groupId1] } }).populate({ path: 'groups.groupId'}).exec( function (err, usersInGroup) {
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

