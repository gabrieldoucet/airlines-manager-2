var path = require('path');
var mongoose = require('mongoose');
var dbConnection = require(path.join(__dirname, '..', 'connection'));

// create schema for plane
var lineSchema = new mongoose.Schema({
  from: String,
  to: String,
  distance: Number,
  prices: {eco: Number, business: Number, first: Number, cargo: Number},
  demand: {eco: Number, business: Number, first: Number, cargo: Number},
  cat: Number
});

//compile schema to model
module.exports = dbConnection.connection.model('line', lineSchema);