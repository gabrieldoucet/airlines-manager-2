var path     = require('path');
var dbHelper = require(path.join(__dirname, 'dbHelper'));
var async    = require('async');
var _        = require('lodash');

var planes, lines, hubs;
var map = {};

process.on('SIGINT', function () {
  dbHelper.closeConnection(function () {
    process.exit(0);
  });
});

/*dbHelper.findOne('lines', {from : 'JFK', to : 'CDG'}, function(err, result) {
 console.log(result);
 });*/

async.series([
  // Get planes
  function (callback) {
    dbHelper.find('planes', {}, function (err, results) {
      planes = results;
      callback(err);
    });
  },

  // Get lines
  function (callback) {
    dbHelper.find('lines', function (err, results) {
      lines = results;
      callback(err);
    });
  },

  // Get hubs
  function (callback) {
    dbHelper.find('hubs', function (err, results) {
      hubs = results;
      callback(err);
    });
  },

  // Add planes to lines
  function (callback) {
    // For all the planes
    async.each(planes, function (plane, callback) {
      // For all the destinations of the plane
      async.each(plane.dests, function (dest, callback) {
        var query = {};
        // Build the {to: , from: } query
        if (!isHub(dest)) {
          query.from = plane.hub;
          query.to   = dest;
        } else {
          query.from = plane.hub < dest ? plane.hub : dest;
          query.to   = plane.hub < dest ? dest : plane.hub;
        }

        // Get corresponding line object
        dbHelper.find('lines', query, function (err, result) {
          var line = result[0];

          // Populate a hash map {lineId: [plane]}
          if (_.isUndefined(_.get(map, line._id))) {
            _.set(map, line._id, []);
          }
          map[line._id].push(plane);
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
    console.log('Updating lines');

    // Async objects
    var objs = [];
    _.forEach(map, function (planes, lineId) {
      planes  = _.sortBy(planes, ['name']);
      var obj = {id: lineId, planes: planes};
      objs.push(obj);
    });

    // Updating the database for each line
    async.each(objs, function (obj, callback) {
      dbHelper.update('lines', {_id: obj.id}, {planes: obj.planes}, {}, callback);
    }, function (err) {
      callback(err);
    });
  }], function (err) {
  var returnCode = 0;
  if (err) {
    console.log('[error]', err);
    returnCode = -1;
  }

  dbHelper.closeConnection(function () {
    process.exit(returnCode);
  });
});

var isHub = function (code) {
  var found = false;
  _.forEach(hubs, function (hub) {
    if (_.isEqual(hub.code, code)) {
      found = true;
    }
  });
  return found;
};