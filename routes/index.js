var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var groupsRouter = require('./groups');
var tasksRouter = require('./tasks');
var loginRouter = require('./login');
var sendEmail = require('./sendEmail');
var invitationRouter = require('./invitations');
//var newUserRouter = require('./newUser');
//var newTaskRouter = require('./newTask');
//var viewTaskRouter = require('./viewTasks');
//var newGroupRouter = require('./newGroup');
//var updateProfileRouter = require('./updateProfile');

router.use('/users', usersRouter);
router.use('/groups', groupsRouter);
router.use('/tasks', tasksRouter);
router.use('/login', loginRouter);
//router.use('/groups', newGroupRouter);
router.use('/sendEmail', sendEmail);
router.use('/invitations', invitationRouter);
//router.use('/updateProfile', updateProfileRouter);
//router.use('/newUser', newUserRouter);
//router.use('/newTask', newTaskRouter);
//router.use('/viewTasks', viewTaskRouter);



// delete

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ project: 'bsd'});
});

router.post('/', function (req, res, next) {
    res.json({ name: 'bbbbbbbbbb', address: 'cccccccc' });
});

module.exports = router;
