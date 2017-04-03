/**
 * Created by Gabriel on 30/03/2017.
 */

var mongoose = require('mongoose');

var hubSchema = new mongoose.Schema({
  code: String,
  name: String,
  immat: [String]
});

var planeSchema = new mongoose.Schema({
  name: String,
  type: String,
  hub: String,
  dests: [String],
  config: { eco: Number, business: Number, first: Number }
});

var lineSchema = new mongoose.Schema({
  from: String,
  to: String,
  distance: Number,
  prices: {eco: Number, business: Number, first: Number, cargo: Number},
  demand: {eco: Number, business: Number, first: Number, cargo: Number},
  cat: Number,
  planes: [String]
});

module.exports = {
  hubSchema: hubSchema,
  lineSchema: lineSchema,
  planeSchema: planeSchema
};