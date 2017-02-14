var _ = require('lodash');

angular.module('am2App')
.factory('calc', ['planesRefService', 'linesService', 'fleetService',
 function(planesRefService, linesService, fleetService) {
  var _ = require('lodash');
  var coeffs = {eco: 1, business: 1.8, first: 4.23};

  var roundForDuration = function (num) {
    var intPart = Math.floor(num);
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

  var decimalToHours = function(hoursDecimal) {
    hoursDecimal = roundForDuration(hoursDecimal);
    var hours = Math.floor(hoursDecimal);
    var minutesDecimal = ((hoursDecimal - hours) * 60);
    var minutes = Math.floor(minutesDecimal);
    var seconds = Math.floor( (minutesDecimal - minutes) * 60);
    var decDuration = _.round(hoursDecimal, 3);
    return {
      hours: hours,
      min: minutes,
      sec: seconds,
      dec: decDuration
    };
  };

  var getDuration = function (plane, line) {
    var speed = planesRefService.getSpeedFromType(plane.type);
    return line.distance / speed;
  }

  var getRotationDuration = function (plane, line) {
    var speed = planesRefService.getSpeedFromType(plane.type);
    return 2 * line.distance / speed + 2;
  }

  var getOptimisation = function (plane, line) {
    var demand = line.demand.eco + line.demand.business + line.demand.first;
    var pEco = line.demand.eco / demand;
    var pBusiness = line.demand.business / demand;
    var pFirst = line.demand.first / demand;

    var seats = planesRefService.getSeatsFromType(plane.type);

    var optiSeats = seats / (pEco + pBusiness * coeffs.business + pFirst * coeffs.first);
    var optiEco = _.round(pEco * optiSeats);
    var optiBusiness = _.round(pBusiness * optiSeats);
    var optiFirst = _.round(pFirst * optiSeats);
    var maxRotations = Math.floor(line.demand.eco / (2 * optiEco));

    var duration = getRotationDuration(plane, line);
    return {
      type: plane.type,
      config: {
        eco: optiEco,
        business: optiBusiness,
        first: optiFirst
      },
      remainingDemand: {
        eco: line.demand.eco - 2 * maxRotations * optiEco,
        business: line.demand.business - 2 * maxRotations * optiBusiness,
        first: line.demand.first - 2 * maxRotations * optiFirst
      },
      percent: _.round(2 * optiEco / line.demand.eco * 100, 2),
      maxRotations: maxRotations,
      duration: decimalToHours(duration),
    };
  };

  var isOptimised = function (plane, line) {
    var opti = getOptimisation(plane, line);
    var isOptiEco = Math.abs(opti.config.eco - plane.config.eco) <= 2;
    var isOptiBusiness = Math.abs(opti.config.business - plane.config.business) <= 2;
    var isOptiFirst = Math.abs(opti.config.first - plane.config.first) <= 2;
    return isOptiEco && isOptiBusiness && isOptiFirst;
  };

  return {
    getOptimisation: getOptimisation,
    isOptimised: isOptimised,
    getOptiLines: function (plane) {
      var optiLines = [];
      _.forEach(linesService.getLines(), function(line) {
        if (isOptimised(plane, line)) {
          optiLines.push(line);
        }
      });
      return optiLines;
    },
    getOptiPlanes: function (line) {
      var optiPlanes = [];
      _.forEach(fleetService.getFleet(), function(plane) {
        if (isOptimised(plane, line)) {
          optiPlanes.push(plane);
        }
      });
      return optiPlanes;
    },
    getAllOptis: function (line) {
      var allOptis = [];
      _.forEach(planesRefService.getPlanesRef(), function (plane) {
        if (plane.rayon > line.distance && plane.cat >= line.cat) {
          allOptis.push(getOptimisation(plane, line));
        }
      })
      allOptis = _.reverse(_.sortBy(allOptis, [function (opti) {return opti.percent * opti.maxRotations;}]));
      return allOptis;
    }
  }
}]);