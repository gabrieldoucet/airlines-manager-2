const _ = require('lodash');

angular.module('am2App')
  .factory('planeTypeService', [function() {

    const getSeatsFromType = function(type) {
      let seats = 0;
      _.forEach(planesRef, function(plane) {
        if (_.isEqual(plane.type, type)) {
          seats = plane.seats;
        }
      });
      return seats;
    };

    const getSpeedFromType = function(type) {
      let speed = 0;
      _.forEach(planesRef, function(plane) {
        if (_.isEqual(plane.type, type)) {
          speed = plane.speed;
        }
      });
      return speed;
    };

    return {
      getSeatsFromType: getSeatsFromType,
      getSpeedFromType: getSpeedFromType
    };
  }]);
