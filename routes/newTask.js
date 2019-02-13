var express = require('express');
var router = express.Router();
const Tasks = require('../models/task');
const Users = require('../models/user');

//password: req.body.password
// ,authorizationId:'not 1'



//create a new takk
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
router.post('/cancelTask',function (req, res) {
    user.findOne({
        _id: req.body.UserId, authorizationId: 'not 2'
    }).exec(function (err, newTask) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            task.delete({ _Id: req.body.taskId
            }).exec(function (err, newTask) {
                if (err) {
                    console.error('GET Error: There was a problem retrieving: ' + err);
                    res.status(err.statusCode || 500).json(err);
                }
                else{
                    res.json(task);
                }
            }
         )}
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
                Tasks.updateOne({ $set: newDoc }
                    //     {
                    //     taskName: req.body.taskName,
                    //     description: req.body.description,
                    //     //dateCreated: req.body.dateCreated,
                    //     dateCreated: Date.now(),
                    //     assignedTo: req.body.assignedId,
                    //     // addedBy: req.body.addedBy,
                    //     priority: req.body.priority,
                    //     frequency: req.body.frequency,
                    //     status: req.body.status,
                    //     comments: req.body.comments,
                    //     businessName: req.body.businessName
                    // }
                    , function (err, updateTask) {
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
module.exports = router;