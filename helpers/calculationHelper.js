/**
 * Created by Gabriel on 12/04/2017.
 */
var _        = require('lodash');
var coeffs = {eco: 1, business: 1.8, first: 4.23};

var isHub = function (hubs, code) {
  var found = false;
  _.forEach(hubs, function (hub) {
    if (_.isEqual(hub.code, code)) {
      found = true;
    }
  });
  return found;
};

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

var stringFormatNumber = function (num) {
  if (num < 10) {
    return '0' + num.toString();
  } else {
    return num.toString();
  }
};

var decimalToHours = function (hoursDecimal) {
  hoursDecimal       = roundForDuration(hoursDecimal);
  var hours          = Math.floor(hoursDecimal);
  var minutesDecimal = ((hoursDecimal - hours) * 60);
  var minutes        = Math.floor(minutesDecimal);
  var seconds        = Math.floor((minutesDecimal - minutes) * 60);
  var decDuration    = _.round(hoursDecimal, 3);
  var asString         = hours + 'h' + stringFormatNumber(minutes);
  return {
    hours: hours,
    min: minutes,
    sec: seconds,
    dec: decDuration,
    asString: asString
  };
};

var getRotationDuration = function (speed, line) {
  return 2 * line.distance / speed + 2;
};

var getOptimisation = function (planeSpec, line) {
  var seats      = _.get(planeSpec, 'seats');
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

module.exports = {
  getOptimisation: getOptimisation,
  isHub: isHub
};