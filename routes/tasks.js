var express = require('express');
var router = express.Router();
const Tasks = require('../models/task');
const Users = require('../models/user');
const Groups = require('../models/group');

//password: req.body.password
// ,authorizationId:'not 1'



//create a new task
router.post('/newTask', function (req, res) {
    Users.findOne({ userName: req.body.userName }).exec(function (err, user) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            if (user) {
                Tasks.create({
                    taskName: req.body.taskName,
                    description: req.body.description,
                    //dateCreated: req.body.dateCreated,
                    dateCreated: Date.now(),
                    assignedTo: req.body.assignedId,
                    // addedBy: req.body.addedBy,
                    addedBy: req.body._id,
                    priority: req.body.priority,
                    frequency: req.body.frequency,
                    status: req.body.status,
                    comments: req.body.comments,
                    businessName: req.body.businessName
                }, function (err, newTask) {
                    if (err) {
                        console.error('GET Error: There was a problem retrieving: ' + err);
                        res.status(err.statusCode || 500).json(err);
                        console.log("1");
                    }
                    else {
                        res.json(newTask);
                        console.log("2");
                    }
                })
            }
            else {
                res.send("there is no user1");
                console.log("there is no user2");
            }
        }
    })
});

//delete a task by id
router.delete('/deleteTask', function (req, res, next) {
    Tasks.deleteOne({ id: req.body.id }, function (err, obj) {
        if (err) {
            console.log(err + ' couldnt delete');
        }
        else {
            res.json(obj);
        }
    });
});

//cancel task chcking autorithation
router.route('/cancelTask').post(function (req, res) {
    user.findOne({
        _id: req.body.UserId, authorizationId: 'not 2'
    }).exec(function (err, newTask) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            task.delete({
                _Id: req.body.taskId
            }).exec(function (err, newTask) {
                if (err) {
                    console.error('GET Error: There was a problem retrieving: ' + err);
                    res.status(err.statusCode || 500).json(err);
                }
                else {
                    res.json(task);
                }
            }
            )
        }
    })
})
//update task
router.post('/updateTask', function (req, res, next) {
    Tasks.findOne({ id: req.body.id }, function (err, task) {
        if (err) {
            console.log(err + ' couldnt delete');
        }
        else {
            let newDoc = {};
            if (req.body.taskName) {
                newDoc.taskName = req.body.taskName;
            }
            if (req.body.description) {
                newDoc.description = req.body.description;
            }
            if (req.body.assignedTo) {
                newDoc.assignedTo = req.body.assignedTo;
            }
            if (req.body.priority) {
                newDoc.priority = req.body.priority;
            }
            if (req.body.frequency) {
                newDoc.frequency = req.body.frequency;
            }
            if (req.body.status) {
                newDoc.status = req.body.status;
            }
            if (req.body.comments) {
                newDoc.comments = req.body.comments;
            }
            if (req.body.businessName) {
                newDoc.businessName = req.body.businessName;
            }
            //newDoc=req.body;
            if (task) {
                Tasks.updateOne({ $set: newDoc }, function (err, updateTask) {
                    if (err) {
                        console.error('GET Error: There was a problem retrieving: ' + err);
                        res.status(err.statusCode || 500).json(err);
                        console.log("1");
                    }
                    else {
                        res.json(updateTask);
                        console.log("2");
                    }
                })
            }
            else {
                console.log("task is not exist 1");
            }
            //res.json(task);
        }
    });
});

//view task  for searches
//use populate 
router.post('/viewTasks', function (req, res) {
    Users.find({ _id: req.body.userId },
        { _id: req.body.groupId },
        { businessName: req.body.businessName },
        //the statuse as to be an array
        { status: $in(req.body.status) },
        //the frequency as to be an array
        { frequency: in$(req.body.frequency) },
        //the priority as to be an array
        { priority: $in(req.body.priority) },
        //the dateCreated as to be a date
        { dateCreated: $gt(req.body.dateCreated) },
        { targetDate: $et(req.body.EqualTargetDate) },
        { targetDate: $lt(req.body.targetDate) },
        { assignedTo: req.body.assignedTo },
        {
            addedBy: req.body.addedBy
        }).exec(function (err, viewTasks) {
            if (err) {
                console.error('GET Error: There was a problem retrieving: ' + err);
                res.status(err.statusCode || 500).json(err);
            }
            else {
                res.json(tasks);
            }
        });
});

//  get all task for all the user's group
// try deep populate(with path.....and , ) 
//can try .populate.populate

router.get('/getGroups', function (req, res, next) {
    Users.findOne({ _id: req.params.id }).populate('groups').exec(function (err, groups) {
        if (err) {
            res.status('400');
        }
        else {
            if (groups) {
                console.log("the user is exist in one or more groups");

                res.json(groups);

            }
            else {
                console.log("the user isn't exist in ay group");
            }
        }
    })
});

//get all tasks
router.get('/', function (req, res, next) {
    Tasks.find({}, function (err, tasks) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(tasks);
        }
    })
});

//get filtered tasks
router.post('/filter', function (req, res, next) {
    let conditions={};
    if (req.body.priority){
        conditions.priority=priority;
    }
    Tasks.find(conditions, function (err, tasks) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(tasks);
        }
    })
});
module.exports = router;
