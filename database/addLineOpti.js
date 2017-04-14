/**
 * Created by Gabriel on 12/04/2017.
 */
var path     = require('path');
var dbHelper = require(path.join(__dirname, 'dbHelper'));
var async    = require('async');
var _        = require('lodash');

var coeffs = {eco: 1, business: 1.8, first: 4.23};

var planeSpecs = [];
var lines      = [];
var lineObjs   = [];

// Handle the ctrl+c un the terminal
process.on('SIGINT', function () {
  dbHelper.closeConnection(function () {
    process.exit(0);
  });
});

var roundForDuration = function (num) {
  var intPart     = Math.floor(num);
  var decimalPart = num - intPart;
  if (decimalPart > 0 && decimalPart < 0.25) {
    decimalPart = 0.25;
  } else if (decimalPart > 0.25 && decimalPart < 0.50) {
    decimalPart = 0.50;
  } else if (decimalPart > 0.50 && decimalPart < 0.75) {
    decimalPart = 0.75;
  } else if (decimalPart > 0.75) {
    decimalPart = 0;
    intPart += 1;
  }
  return intPart + decimalPart;
};

var decimalToHours = function (hoursDecimal) {
  hoursDecimal       = roundForDuration(hoursDecimal);
  var hours          = Math.floor(hoursDecimal);
  var minutesDecimal = ((hoursDecimal - hours) * 60);
  var minutes        = Math.floor(minutesDecimal);
  var seconds        = Math.floor((minutesDecimal - minutes) * 60);
  var decDuration    = _.round(hoursDecimal, 3);
  return {
    hours: hours,
    min: minutes,
    sec: seconds,
    dec: decDuration
  };
};

var getRotationDuration = function (speed, line) {
  return 2 * line.distance / speed + 2;
};

var getOptimisation = function (planeSpec, line) {
  var seats = _.get(planeSpec, 'seats');
  var planeSpeed = _.get(planeSpec, 'speed');

  var demand    = line.demand.eco + line.demand.business + line.demand.first;
  var pEco      = line.demand.eco / demand;
  var pBusiness = line.demand.business / demand;
  var pFirst    = line.demand.first / demand;

  var optiSeats    = seats / (pEco + pBusiness * coeffs.business + pFirst * coeffs.first);
  var optiEco      = _.round(pEco * optiSeats);
  var optiBusiness = _.round(pBusiness * optiSeats);
  var optiFirst    = _.round(pFirst * optiSeats);

  var duration = getRotationDuration(planeSpeed, line);
  return {
    type: _.get(planeSpec, 'type'),
    config: {
      eco: optiEco,
      business: optiBusiness,
      first: optiFirst
    },
    percent: _.round(2 * optiEco / line.demand.eco * 100, 2),
    duration: decimalToHours(duration)
  };
};

async.series([
  // Get lines
  function (callback) {
    dbHelper.find('lines', {}, function (err, results) {
      lines = results;
      callback(err);
    });
  },

  // Get the plane specifications
  function (callback) {
    dbHelper.find('planespecs', {}, function (err, results) {
      planeSpecs = results;
      callback(err);
    });
  },

  // Compute the optimal configurations for each plane spec
  function (callback) {
    _.forEach(lines, function (line) {
      var optis = [];
      _.forEach(planeSpecs, function (planeSpec) {
        if (planeSpec.rayon > line.distance) {
          var opti = getOptimisation(planeSpec, line);
          optis.push(opti);
        }
      });
      var optiObj = {};
      _.set(optiObj, 'id', _.get(line, '_id'));
      _.set(optiObj, 'optis', optis);
      lineObjs.push(optiObj);
    });
    callback();
  },

  function (callback) {
    // Updating the database for each line
    async.each(lineObjs, function (obj, callback) {
      dbHelper.update('lines', {_id: obj.id}, {optis: obj.optis}, {}, callback);
    }, function (err) {
      callback(err);
    });
  }], function (err) {
  if (err) {
    console.log('Error:', err);
  }
  dbHelper.closeConnection(function () {
    process.exit(0);
  });
});