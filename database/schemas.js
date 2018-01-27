/**
 * Created by Gabriel on 30/03/2017.
 */

const mongoose = require('mongoose');

const hubSchema = new mongoose.Schema({
  code: String,
  name: String,
  immat: [String]
});

const planeSchema = new mongoose.Schema({
  name: String,
  type: String,
  hub: String,
  dests: [String],
  config: {eco: Number, business: Number, first: Number, cargo: Number},
  amID: Number
});

const durationSchema = new mongoose.Schema({
  hours: Number,
  min: Number,
  sec: Number,
  dec: Number,
  asString: String
});

const optiSchema = new mongoose.Schema({
  type: String,
  config: {
    eco: Number,
    business: Number,
    first: Number,
    cargo: Number
  },
  percent: Number,
  duration: durationSchema
});

const lineSchema = new mongoose.Schema({
  from: String,
  to: String,
  distance: Number,
  prices: {eco: Number, business: Number, first: Number, cargo: Number},
  demand: {eco: Number, business: Number, first: Number, cargo: Number},
  planes: [planeSchema],
  optis: [optiSchema],
  amID: Number
});

const planeSpecSchema = new mongoose.Schema({
  type: String,
  seats: Number,
  rayon: Number,
  conso: Number,
  speed: Number,
  tonnage: Number
});

module.exports = {
  hubSchema: hubSchema,
  lineSchema: lineSchema,
  planeSchema: planeSchema,
  planeSpecSchema: planeSpecSchema
};