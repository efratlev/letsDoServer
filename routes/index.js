var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var groupsRouter = require('./groups');
var tasksRouter = require('./tasks');
var newUserRouter = require('./newUser');
var loginRouter = require('./login');
var newTaskRouter = require('./newTask');
var viewTaskRouter = require('./viewTasks');
var newGroupRouter = require('./newGroup');
var updateProfileRouter = require('./updateProfile');


router.use('/users', usersRouter);
router.use('/groups', groupsRouter);
router.use('/tasks', tasksRouter);
router.use('/newUser', newUserRouter);
router.use('/login', loginRouter);
router.use('/newTask', newTaskRouter);
router.use('/viewTasks', viewTaskRouter);
router.use('/groups', newGroupRouter);
router.use('/updateProfile', updateProfileRouter);


// delete

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ name: 'gggg', address: 'hyutyf' });
});

router.post('/', function (req, res, next) {
    res.json({ name: 'bbbbbbbbbb', address: 'cccccccc' });
});

module.exports = router;
