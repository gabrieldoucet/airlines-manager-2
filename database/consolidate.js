var async = require('async');
var _     = require('lodash');
var path  = require('path');

var calcHelper = require(path.join(__dirname, 'calculationHelper'));
var dbHelper   = require(path.join(__dirname, 'dbHelper'));

var planes, lines, hubs, planeSpecs;
var map = {};

// Handles the ctrl+c in the terminal
process.on('SIGINT', function () {
  dbHelper.closeConnection(function () {
    process.exit(0);
  });
});

// Load all the collections into local variables
var loadData = function (callback) {
  async.series([
    // Get planes
    function (callback) {
      dbHelper.find('planes', {}, function (err, results) {
        planes = _.sortBy(results, ['name']);
        callback(err);
      });
    },

    // Get lines
    function (callback) {
      dbHelper.find('lines', {}, function (err, results) {
        lines = results;
        callback(err);
      });
    },

    // Get hubs
    function (callback) {
      dbHelper.find('hubs', {}, function (err, results) {
        hubs = results;
        callback(err);
      });
    },

    // Get the plane specifications
    function (callback) {
      dbHelper.find('planespecs', {}, function (err, results) {
        planeSpecs = results;
        callback(err);
      });
    }
  ], callback);
};

// Consolidates the database by adding the missing objects in the collections
var consolidate = function (callback) {
  async.series([
    loadData,

    // Initialise the map values
    function (callback) {
      _.forEach(lines, function (line) {
        var lineId = _.get(line, '_id');
        _.set(map, lineId, {id: lineId, planes: [], optis: {}});
      });
      callback();
    },

    // Compute the optimal configurations for each plane spec and adds them to the map
    function (callback) {
      console.log('Computing the optimal configurations...');
      _.forEach(lines, function (line) {
        console.log('  -> ' + line.from + '-' + line.to);
        var optis = [];
        _.forEach(planeSpecs, function (planeSpec) {
          if (planeSpec.rayon > line.distance) {
            console.log('    + ' + planeSpec.type);
            var opti = calcHelper.getOptimisation(planeSpec, line);
            optis.push(opti);
          }
        });
        optis      = _.sortBy(optis, ['percent']);
        var lineId = _.get(line, '_id');
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
          var query = {};
          if (!calcHelper.isHub(hubs, dest)) {
            query.from = plane.hub;
            query.to   = dest;
          } else {
            query.from = plane.hub < dest ? plane.hub : dest;
            query.to   = plane.hub < dest ? dest : plane.hub;
          }

          // Get corresponding line object
          dbHelper.find('lines', query, function (err, result) {
            var line = result[0];
            console.log('  -> ' + line.from + '-' + line.to);
            console.log('    + ' + plane.name);

            // Populate the hash map
            var lineId = _.get(line, '_id');
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
      console.log('Updating lines...');
      async.each(map, function (obj, callback) {
        dbHelper.update('lines', {_id: obj.id}, _.omit(obj, ['id']), {}, callback);
      }, callback);
    }], callback);
};

// Entry point
consolidate(function (err) {
  var exitCode = 0;
  if (err) {
    exitCode = -1;
    console.log('[ERROR]', err);
  }
  dbHelper.closeConnection(function () {
    process.exit(exitCode);
  });
});