const async         = require('async');
const fs            = require('fs');
const _             = require('lodash');
const path          = require('path');
const schemas       = require(path.join(__dirname, 'schemas'));
const connection    = require(path.join(__dirname, 'connection'));
const dbDescription = require(path.join(__dirname, 'description'));
const calcHelper    = require(path.join(__dirname, '..', 'helpers', 'calculationHelper'));

const getModel = function (collection) {
  'use strict';
  let Model = null;
  if (_.isEqual(collection, 'lines')) {
    return connection.model('Line', schemas.lineSchema);
  } else if (_.isEqual(collection, 'planes')) {
    return connection.model('Plane', schemas.planeSchema);
  } else if (_.isEqual(collection, 'hubs')) {
    return connection.model('Hub', schemas.hubSchema, 'hubs');
  } else if (_.isEqual(collection, 'planetypes')) {
    return connection.model('Planetype', schemas.planeTypeSchema);
  }
  return Model;
};

const find = function (collection, query, callback) {
  'use strict';
  let Model = getModel(collection);
  Model.find(query, function (err, results) {
    results = _.map(results, function (result) {
      return _.get(result, '_doc');
    });
    callback(err, results);
  });
};

const update = function (collection, query, update, options, callback) {
  'use strict';
  let Model = getModel(collection);
  Model.update(query, update, options, callback);
};

/**
 * Consolidates the database by adding the missing objects in the collections
 */
const consolidate = function (callback) {
  'use strict';
  let planes     = [];
  let lines      = [];
  let hubs       = [];
  let planeTypes = [];
  let map        = {};

  async.series([
    // Get planes
    function (callback) {
      find('planes', {}, function (err, results) {
        planes = _.sortBy(results, ['name']);
        callback(err);
      });
    },

    // Get lines
    function (callback) {
      find('lines', {}, function (err, results) {
        lines = results;
        callback(err);
      });
    },

    // Get hubs
    function (callback) {
      find('hubs', {}, function (err, results) {
        hubs = results;
        callback(err);
      });
    },

    // Get the plane specifications
    function (callback) {
      find('planetypes', {}, function (err, results) {
        planeTypes = results;
        callback(err);
      });
    },

    // Initialise the map values
    function (callback) {
      _.forEach(lines, function (line) {
        let lineId = _.get(line, '_id');
        _.set(map, lineId, {id: lineId, planes: [], optis: {}});
      });
      callback();
    },

    // Compute the optimal configurations for each plane spec and adds them to the map
    function (callback) {
      console.log('Computing the optimal configurations...');
      _.forEach(lines, function (line) {
        console.log('  -> ' + line.from + '-' + line.to);
        let optis = [];
        _.forEach(planeTypes, function (planeType) {
          if (planeType.rayon > line.distance) {
            console.log('    + ' + planeType.type);
            let opti = calcHelper.getOptimisation(planeType, line);
            optis.push(opti);
          }
        });
        optis      = _.sortBy(optis, ['percent']);
        let lineId = _.get(line, '_id');
        _.set(map, [lineId, 'optis'], optis);
      });
      callback();
    },

    // Add planes to lines
    function (callback) {
      console.log('');
      console.log('Adding plane objects to lines...');
      // For all the planes
      async.each(planes, function (plane, callback) {
        // For all the destinations of the plane
        async.each(plane.dests, function (dest, callback) {

          // Build a {to: XXX, from: XXX} query
          let query = {};
          if (!calcHelper.isHub(hubs, dest)) {
            query.from = plane.hub;
            query.to   = dest;
          } else {
            query.from = plane.hub < dest ? plane.hub : dest;
            query.to   = plane.hub < dest ? dest : plane.hub;
          }

          // Get corresponding line object
          find('lines', query, function (err, result) {
            let line = result[0];
            console.log('  -> ' + line.from + '-' + line.to);
            console.log('    + ' + plane.name);

            // Populate the hash map
            let lineId = _.get(line, '_id');
            (_.get(map, [lineId, 'planes'])).push(plane);
            callback(err);
          });
        }, function (err) {
          callback(err);
        });
      }, function (err) {
        callback(err);
      });
    },

    // Update objects
    function (callback) {
      console.log('');
      console.log('Updating lines...');
      async.each(map, function (obj, callback) {
        update('lines', {_id: obj.id}, _.omit(obj, ['id']), {}, callback);
      }, callback);
    }], callback);
};

const dumpCollections = function (callback) {
  'use strict';
  async.each(dbDescription, function (collectionDescription, callback) {
    let collection = _.get(collectionDescription, 'name');
    let file       = _.get(collectionDescription, 'file');
    find(collection, {}, function (err, results) {
      if (err) {
        callback(err);
      }
      let strResults = JSON.stringify(results, null, 2);
      let filePath   = path.join(__dirname, '..', 'dist', 'data', file);
      fs.writeFile(filePath, strResults, function (err) {
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

const dump = function (callback) {
  async.series([
    consolidate,
    dumpCollections
  ], callback);
};

const closeConnection = function (callback) {
  console.log('Closing connection');
  connection.close(callback);
};

module.exports = {
  find: find,
  closeConnection: closeConnection,
  update: update,
  consolidate: consolidate,
  dump: dump
};
