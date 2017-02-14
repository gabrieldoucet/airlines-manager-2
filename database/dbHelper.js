var _ = require('lodash');
var path = require('path');

var Plane = require(path.join(__dirname, 'models', 'plane'));
var Line = require(path.join(__dirname, 'models', 'line'));
var Hub = require(path.join(__dirname, 'models', 'hub'));

var get = function (collectionName, callback) {
  if (_.isEqual(collectionName, 'planes')) {
    Plane.find({}, callback);
  } else if (_.isEqual(collectionName, 'hubs')) {
    Hub.find({}, callback);
  } else if (_.isEqual(collectionName, 'lines')) {
    Line.find({}, callback);
  }
}

module.exports = {
  get: get
};