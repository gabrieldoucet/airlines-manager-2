var _ = require('lodash');
var path = require('path');
var schemas = require(path.join(__dirname, 'schemas'));
var connection = require(path.join(__dirname, 'connection'));

var getModel = function (collection) {
  var Model = null;
  if (_.isEqual(collection, 'lines')) {
    Model = new connection.model('Line', schemas.lineSchema);
  } else if (_.isEqual(collection, 'planes')) {
    Model = new connection.model('Plane', schemas.planeSchema);
  } else if (_.isEqual(collection, 'hubs')) {
    Model = new connection.model('Hub', schemas.hubSchema);
  } else if (_.isEqual(collection, 'planeSpecs')) {
    Model = new connection.model('PlaneSpec', schemas.planeSpecSchema);
  }
  return Model;
};

var find = function (collection, query, callback) {
  var Model = getModel(collection);
  Model.find(query, function (err, results) {
    callback(err, results);
  });
};

var findOne = function (collection, query, callback) {
  var Model = getModel(collection);
  Model.find(query, function (err, results) {
    callback(err, results);
  });
};

var update = function (collection, query, update, options, callback) {
  var Model = getModel(collection);
  Model.update(query, update, options, callback)
};

var closeConnection = function (callback) {
  console.log('Closing connection');
  connection.disconnect(callback);
};

module.exports = {
  find : find,
  findOne : findOne,
  closeConnection : closeConnection,
  update : update
};