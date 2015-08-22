'use strict';

var PORT, express, logger, cookieParser, bodyParser, routes, app, dotenv, fs;

express = require('express');
logger = require('morgan');
bodyParser = require('body-parser');
dotenv = require('dotenv');
fs = require('fs');

if (fs.existsSync('.env')) {
  dotenv.load();
}

routes = require('./routes/index');

app = express();
PORT = process.env.PORT || 8001;

app.set('port', PORT);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use(express.static(path.join(__dirname, 'build')));
app.use('/', express.static('public/build'));
app.use('/bower_components', express.static('public/bower_components'));

// routes definition
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (process.env.NODEJS_ENV === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function () {
  console.log('Listening on: http://localhost:' + app.get('port'));
});

module.exports = app;
