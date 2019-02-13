var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//var uristring ='mongodb://family:mongo.123@firstcluster-shard-00-00-4hqi1.mongodb.net:27017,firstcluster-shard-00-01-4hqi1.mongodb.net:27017,firstcluster-shard-00-02-4hqi1.mongodb.net:27017/test?ssl=true&replicaSet=firstCluster-shard-0&authSource=admin&retryWrites=true';// 'mongodb://efratlvn:mongo.123@cluster0-shard-00-00-ylhvf.azure.mongodb.net:27017,cluster0-shard-00-01-ylhvf.azure.mongodb.net:27017,cluster0-shard-00-02-ylhvf.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';


//mongoose.connect(uristring);
// Get Mongoose to use the global promise library
//mongoose.Promise = global.Promise;
//Get the default connection
//var db = mongoose.connection;

/* mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.error('ERROR connecting to: ' + uristring + '. !' + err);
  } else {
  console.log('Succeeded connected to: ' + uristring);
  }
  }) */

var mongoose = require('mongoose');
mongoose.connect('mongodb://family:staytogether@firstcluster-shard-00-00-4hqi1.mongodb.net:27017,firstcluster-shard-00-01-4hqi1.mongodb.net:27017,firstcluster-shard-00-02-4hqi1.mongodb.net:27017/test?ssl=true&replicaSet=firstCluster-shard-0&authSource=admin&retryWrites=true');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection -----------------error:'));
db.once('open', function () {
  console.log('cololololo!!!!!!!!!!!!!');
});


//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
