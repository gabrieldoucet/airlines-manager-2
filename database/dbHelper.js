var _ = require('lodash');
var path = require('path');
var schemas = require(path.join(__dirname, 'schemas'));
var connection = require(path.join(__dirname, 'connection'));

var get = function (collectionName, callback) {
  if (_.isEqual(collectionName, 'planes')) {
    Plane.find({}, callback);
  } else if (_.isEqual(collectionName, 'hubs')) {
    Hub.find({}, callback);
  } else if (_.isEqual(collectionName, 'lines')) {
    Line.find({}, callback);
  }
};

var getModel = function (collection) {
  var Model = null;
  if (_.isEqual(collection, 'lines')) {
    Model = new connection.model('Line', schemas.lineSchema);
  } else if (_.isEqual(collection, 'planes')) {
    Model = new connection.model('Plane', schemas.planeSchema);
  } else if (_.isEqual(collection, 'hubs')) {
    Model = new connection.model('Hubs', schemas.hubSchema);
  }
  return Model;
};

var find = function (collection, query, callback) {
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
  get : get,
  find : find,
  closeConnection : closeConnection,
  update : update
};