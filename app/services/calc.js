const _ = require('lodash');

angular.module('am2App')
  .factory('calc', [ function() {

      const coeffs = {eco: 1, business: 1.8, first: 4.23};
      const optiThreshold = 3;

      const compareToBestPlane = function(plane, bestPlane) {
        if (_.isNil(bestPlane)) {
          return false;
        } else {
          const isOptiEco      = Math.abs(bestPlane.config.eco - plane.config.eco) <= optiThreshold;
          const isOptiBusiness = Math.abs(bestPlane.config.business - plane.config.business) <= optiThreshold;
          const isOptiFirst    = Math.abs(bestPlane.config.first - plane.config.first) <= optiThreshold;
          return isOptiEco && isOptiBusiness && isOptiFirst;
        }
      };

      const roundForDuration = function(num) {
        'use strict';
        let intPart     = Math.floor(num);
        let decimalPart = num - intPart;
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

      const stringFormatNumber = function(num) {
        if (num < 10) {
          return '0' + num.toString();
        } else {
          return num.toString();
        }
      };

      const decimalToHours = function(hoursDecimal) {
        'use strict';
        hoursDecimal       = roundForDuration(hoursDecimal);
        let hours          = Math.floor(hoursDecimal);
        let minutesDecimal = ((hoursDecimal - hours) * 60);
        let minutes        = Math.floor(minutesDecimal);
        let seconds        = Math.floor((minutesDecimal - minutes) * 60);
        let decDuration    = _.round(hoursDecimal, 3);
        let asString       = hours + 'h' + stringFormatNumber(minutes);
        return {
          hours: hours,
          min: minutes,
          sec: seconds,
          dec: decDuration,
          asString: asString
        };
      };

      const getRotationDuration = function(speed, line) {
        return 2 * line.distance / speed + 2;
      };

      const getOptimisation = function(planeType, line) {
        const seats      = _.get(planeType, 'seats');
        const planeSpeed = _.get(planeType, 'speed');

        const demand    = line.demand.eco + line.demand.business + line.demand.first;
        const pEco      = line.demand.eco / demand;
        const pBusiness = line.demand.business / demand;
        const pFirst    = line.demand.first / demand;

        const optiSeats    = seats / (pEco + pBusiness * coeffs.business + pFirst * coeffs.first);
        const optiEco      = _.round(pEco * optiSeats);
        const optiBusiness = _.round(pBusiness * optiSeats);
        const optiFirst    = _.round(pFirst * optiSeats);

        const duration = getRotationDuration(planeSpeed, line);
        return {
          type: _.get(planeType, 'type'),
          config: {
            eco: optiEco,
            business: optiBusiness,
            first: optiFirst
          },
          percent: _.round(2 * optiEco / line.demand.eco * 100, 2),
          duration: decimalToHours(duration)
        };
      };

      return {
        compareToBestPlane: compareToBestPlane,
        getOptimisation: getOptimisation
      };
    }]);
