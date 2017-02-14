var path = require('path');
var mongoose = require('mongoose');
var dbConnection = require(path.join(__dirname, '..', 'connection'));

// create schema for plane
var hubSchema = new mongoose.Schema({
  code: String,
  name: String,
  immat: [String]
});

//compile schema to model
module.exports = dbConnection.connection.model('hub', hubSchema);