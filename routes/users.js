var express = require('express');
var router = express.Router();
const Users = require('../models/user');
const Groups = require('../models/group');


/* create new user*/
router.post('/createNewUser', function (req, res) {
    var newUser = req.body;
    Users.findOne({ userName: newUser.userName }).exec(function (err, user) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            if (!user) {
                Users.create(newUser, function (err, createUser) {
                    if (err) {
                        console.error('GET Error: There was a problem retrieving: ' + err);
                        res.status(err.statusCode || 500).json(err);
                    }
                    else {
                        res.json(createUser);
                    }
                })
            }
            else {
                res.send("user already exists");
            }

        }
    })
});

/* delete a user by userName*/
router.delete('/deleteUser', function (req, res, next) {
    Users.deleteOne({ userName: req.body.userName }, function (err, obj) {
        if (err) {
            console.log(err + ' couldnt delete the user : ' + userName);
        }
        else {
            res.json(obj);
        }
    });
});

/* GET all users */
router.get('/', function (req, res, next) {
    Users.find({}).exec(function (err, users) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(users);
        }
    })
});
//pass to group
/* get  groups for user by user Id */
router.get('/usersGroups/:id', function (req, res, next) {
    Users.findById(req.params.id).populate('groups.groupId').exec(function (err, user) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(user);
        }
    })
});



/* return all users with their groups details*/
router.get('/getAllGroupsForAllUsers', function (req, res, next) {
    Users.find({}).populate('groups.groupId').exec(function (err, users) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(users);
        }
    })
});

//  create new user 
//it is duplicate
//can be deleted
router.post('/', function (req, res, next) {
    Users.create(req.body, function (err, user) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(user);
        }
    })
});


//get groups for user 
//check if work
//it is duplicate
//can be deleted
router.get('/getGroups', function (req, res, next) {
    Users.findOne({ _id: req.params.id }).populate('groups').exec(function (err, user) {
        if (err) {
            res.status('400');
        }
        else {
            if (user) {
                res.json(user);
            }
        }
    })
});
//it is duplicate
//can be deleted
router.get('/getGroups', function (req, res, next) {
    //Users.findOne({_id:req.body.id},function(err, user) {
    //router.get('/getGroups/:id', function (req, res, next) {
    //ClientModel.findOne().populate('fk_user').exec(function(err, c) {
    Users.findOne({ _id: req.params.id }).populate('groups').exec(function (err, user) {
        //Users.findOne({ _id: req.body.id }, { select: groups }).populate('groups').exec(function (err, user) {
        ///Users.findById( req.param.iid , { select: groups }).populate('groups').exec(function (err, user) {
        // Users.findOne({_id:req.body.id},function(err, user) {
        //Users.findOne({_id:req.body.id},function(err, user) {
        if (err) {
            res.status('400');
        }
        else {
            if (user) {
                res.json(user);
            }
        }
    })
});
// not in use
router.post('/login', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'abc' && password === '123456') {
        res.json(true);
    }
    else {
        res.json(false);
    }
});

// get all group of a user
// router.post('/getGroupsForUser', function (req, res, next) {
//   Users.findOne(req.body._id, function (err, user) {
//     if (err) {
//       res.status('400');
//     }
//     else {
//       res.json(user);
//       if (user) {
//         user.find({Groups}, function (err, users) {
//           if (err) {
//             res.status('400');
//           }
//           else {
//             res.json(users);
//             // res.json([{ username: 'gggg', useraddress: 'hyutyf' }, { username: 'gggg', useraddress: 'hyutyf' }]);
//           }
//         })
//       }
//     }
//   })
// });


module.exports = router;
