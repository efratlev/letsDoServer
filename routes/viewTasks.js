
var express = require('express');
var router = express.Router();
const Tasks = require('../models/task');

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


//view task  for searches
router.post('/viewTasks', function (req, res) {
  task.find({ _id: req.body.userId },
    { _id: req.body.groupId },
    { businessName: req.body.businessName },
    { status: req.body.status },
    { frequency: req.body.frequency },
    { priority: req.body.priority },
    { dateCreated: req.body.dateCreated },
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
module.exports = router;

