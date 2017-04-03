var mongoose = require('mongoose');

// connect to database
module.exports = mongoose.connect('mongodb://127.0.0.1:27017/am2Test', function(err) {
  if (err) {
    console.err(err);
  } else {
    console.log('Connected to mongodb');
  }
});