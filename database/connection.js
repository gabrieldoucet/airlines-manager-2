var _ = require('lodash');
var mongoose = require('mongoose');

var connectOptions = {
  useNewUrlParser: true,
  loggerLevel: 'warn'
};

if (_.isEqual(process.env.NODE_ENV, 'prod')) {
  _.set(connectOptions,'dbName', 'am2-prod');
} else {
  _.set(connectOptions,'dbName', 'am2-dev');
}

mongoose.connect('mongodb://127.0.0.1:27017', connectOptions, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to mongodb');
  }
});

// connect to database
module.exports = mongoose.connection;
