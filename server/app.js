require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const index = require('./routes/index');
const templates = require('./routes/templates');
const hub = require('./routes/hub');
const line = require('./routes/line');
const plane = require('./routes/plane');
const planetype = require('./routes/planetype');
const api = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /dist
app.use(favicon(path.join(__dirname, '..', 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/templates', templates);
app.use('/hub', hub);
app.use('/line', line);
app.use('/plane', plane);
app.use('/planetype', planetype);
app.use('/api', api);

app.get('/', function (req, res) {
  return res.sendFile(path.join(__dirname, '..', 'dist', 'views', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  'use strict';
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
