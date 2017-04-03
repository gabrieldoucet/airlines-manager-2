var path     = require('path');
var dbHelper = require(path.join(__dirname, 'database', 'dbHelper'));
var async    = require('async');
var _        = require('lodash');

var planes, lines, hubs;
var map = {};

process.on('SIGINT', function () {
  dbHelper.closeConnection(function () {
    process.exit(0);
  });
});

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
    async.each(planes, function (plane, callback) {
      async.each(plane.dests, function (dest, callback) {
        var query = {};
        if (!isHub(dest)) {
          query.from = plane.hub;
          query.to   = dest;
        } else {
          query.from = plane.hub < dest ? plane.hub : dest;
          query.to   = plane.hub < dest ? dest : plane.hub;
        }
        dbHelper.find('lines', query, function (err, result) {
          var line = result[0];
          if (_.isUndefined(_.get(map, line._id))) {
            _.set(map, line._id, []);
          }
          map[line._id].push(plane.name);
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
    var objs = [];
    _.forEach(map, function (value, key) {
      var obj = {id : key, planes : value};
      objs.push(obj);
    });

    async.each(objs, function (obj, callback) {
      dbHelper.update('lines', {_id : obj.id}, {planes : obj.planes}, {}, callback);
    }, function (err) {
      callback(err)
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