const async         = require('async');
const fs            = require('fs');
const _             = require('lodash');
const path          = require('path');
const schemas       = require(path.join(__dirname, 'schemas'));
const connection    = require(path.join(__dirname, 'connection'));
const dbDescription = require(path.join(__dirname, 'description'));
const calcHelper    = require(path.join(__dirname, '..', 'helpers', 'calculationHelper'));

const getModel = function(collection) {
  'use strict';
  let Model = null;
  if (_.isEqual(collection, 'lines')) {
    return connection.model('Line', schemas.lineSchema);
  } else if (_.isEqual(collection, 'planes')) {
    return connection.model('Plane', schemas.planeSchema);
  } else if (_.isEqual(collection, 'hubs')) {
    return connection.model('Hub', schemas.hubSchema);
  } else if (_.isEqual(collection, 'planetypes')) {
    return connection.model('Planetype', schemas.planeTypeSchema);
  }
  return Model;
};

const find = function(collection, query, callback) {
  'use strict';
  let Model = getModel(collection);
  Model.find(query, function(err, results) {
    results = _.map(results, function(result) {
      return _.get(result, '_doc');
    });
    callback(err, results);
  });
};

const findPromise = function(collection, query) {
  'use strict';
  let Model = getModel(collection);
  var promise = Model.find(query).lean().exec();
  return promise;
};

const update = function(collection, query, update, options, callback) {
  'use strict';
  let Model = getModel(collection);
  Model.updateOne(query, update, options, callback);
};

const replaceOnePromise = function(collection, query, update, options) {
  'use strict';
  let Model = getModel(collection);
  var promise = Model.replaceOne(query, update, options);
  return promise;
};

const create = function(collection, objectToInsert) {
  'use strict';
  let Model = getModel(collection);
  return Model.create(objectToInsert);
};

const dumpCollections = function(callback) {
  'use strict';
  async.each(dbDescription, function(collectionDescription, callback) {
    let collection = _.get(collectionDescription, 'name');
    let file       = _.get(collectionDescription, 'file');
    find(collection, {}, function(err, results) {
      if (err) {
        callback(err);
      }
      let strResults = JSON.stringify(results, null, 2);
      let filePath   = path.join(__dirname, '..', 'dist', 'data', file);
      fs.writeFile(filePath, strResults, function(err) {
        if (err) {
          callback(err);
        } else {
          console.log([collection, 'has been written to', filePath].join(' '));
          callback();
        }
      });
    });
  }, callback);
};

const dump = function(callback) {
  async.series([
    consolidate,
    dumpCollections
  ], callback);
};

const closeConnection = function(callback) {
  console.log('Closing connection...');
  connection.close(callback);
};

module.exports = {
  find: find,
  findPromise: findPromise,
  closeConnection: closeConnection,
  update: update,
  dump: dump,
  create: create,
  replaceOnePromise: replaceOnePromise
};
