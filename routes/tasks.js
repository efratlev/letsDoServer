var express = require('express');
var router = express.Router();
const Tasks = require('../models/task');
const Users = require('../models/user');
const Groups = require('../models/group');

/*  get all tasks for a group*/
router.post('/getAllGroupsTasks', function (req, res, next) {
    Groups.findOne({ _id: req.body.groupId }).populate({path:'tasks',populate:'task'}).exec(function (err, tasksForGroup) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(tasksForGroup);
       
        }
    });
});

/* update task */
router.put('/updateTask', function (req, res) {
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
    Tasks.update({ _id: req.body._id }, { $set: newDoc }, function (err, task) {
        if (err) {
            console.log(err + ' couldnt delete');
        }
        else {
            res.json(task);
        }
    });
});

/* create a new task  to existt group by user */
router.post('/newTask', function (req, res) {
    Users.findOne({ _id: req.body.userId }).exec(function (err, user) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            if (user) {
                Tasks.create({
                    taskName: req.body.taskName,
                    description: req.body.description,
                    dateCreated: Date.now(),
                    assignedTo: req.body.assignedId,
                    addedBy: req.body.userId,
                    priority: req.body.priority,
                    frequency: req.body.frequency,
                    status: req.body.status,
                    comments: req.body.comments,
                    businessName: req.body.businessName
                }, function (err, newTask) {
                    if (err) {
                        console.error('GET Error: There was a problem retrieving: ' + err);
                        res.status(err.statusCode || 500).json(err);
                    }
                    else {
                        Groups.update({ _id: req.body.groupId }, { $push: { tasks: newTask._id } }, function (err, groupWithNewYask) {
                            // Groups.update({_id: req.body.groupId}, { $push: { tasks: req.body.taskId }}, function(err, groupWithNewYask) {
                            if (err) {
                                res.send(err);
                            }
                            res.send(groupWithNewYask);
                        });
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




/*get all tasks*/
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
/*get task by id*/
router.get('/id', function (req, res, next) {
    Tasks.find({ _id: req.body._id }, function (err, tasks) {
        if (err) {
            res.status('400');
        }
        else {
            res.json(tasks);
        }
    })
});

/* add task to group */
router.put('/bsd', function (req, res) {
    Groups.update({ _id: req.body.groupId }, { $push: { tasks: req.body.taskId } }, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});

// //update task
// router.post('/updateTask', function (req, res, next) {
//     Tasks.findOne({ id: req.body.id }, function (err, task) {
//         if (err) {
//             console.log(err + ' couldnt delete');
//         }
//         else {
//             let newDoc = {};
//             if (req.body.taskName) {
//                 newDoc.taskName = req.body.taskName;
//             }
//             if (req.body.description) {
//                 newDoc.description = req.body.description;
//             }
//             if (req.body.assignedTo) {
//                 newDoc.assignedTo = req.body.assignedTo;
//             }
//             if (req.body.priority) {
//                 newDoc.priority = req.body.priority;
//             }
//             if (req.body.frequency) {
//                 newDoc.frequency = req.body.frequency;
//             }
//             if (req.body.status) {
//                 newDoc.status = req.body.status;
//             }
//             if (req.body.comments) {
//                 newDoc.comments = req.body.comments;
//             }
//             if (req.body.businessName) {
//                 newDoc.businessName = req.body.businessName;
//             }
//             //newDoc=req.body;
//             if (task) {
//                 Tasks.updateOne({ $set: newDoc }, function (err, updateTask) {
//                     if (err) {
//                         console.error('GET Error: There was a problem retrieving: ' + err);
//                         res.status(err.statusCode || 500).json(err);
//                         console.log("1");
//                     }
//                     else {
//                         res.json(updateTask);
//                         console.log("2");
//                     }
//                 })
//             }
//             else {
//                 console.log("task is not exist 1");
//             }
//             //res.json(task);
//         }
//     });
// });


//password: req.body.password
// ,authorizationId:'not 1'
module.exports = router;
