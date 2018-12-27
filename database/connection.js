var mongoose = require('mongoose');
var connectOptions = {
  dbName: 'am2',
  useNewUrlParser: true,
  loggerLevel: 'warn'
};

mongoose.connect('mongodb://127.0.0.1:27017', connectOptions, function(err) {
  if (err) {
    console.err(err);
  } else {
    console.log('Connected to mongodb');
  }
});

// connect to database
module.exports = mongoose.connection;
