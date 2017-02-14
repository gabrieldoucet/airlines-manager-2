var mongoose = require("mongoose");

// connect to database
var connection = mongoose.connect('mongodb://127.0.0.1:27017/am2');

module.exports = {
  connection: connection
}