var path = require('path');
var mongoose = require('mongoose');
var dbConnection = require(path.join(__dirname, '..', 'connection'));

// create schema for plane
var planeSchema = new mongoose.Schema({
  name: String,
  type: String,
  hub: String,
  dests: [String],
  config: { eco: Number, business: Number, first: Number }
});

//compile schema to model
module.exports = dbConnection.connection.model('plane', planeSchema)