var _ = require('lodash');

angular.module('am2App')
  .factory('planeSpecService', ['$http', function ($http) {
    var planesRef;

    var setPlanesRef = function (data) {
      planesRef = data;
    };

    var getPlaneSpecs = function (query) {
      return $http({method: 'POST', url: 'http://localhost:3000/data/planespecs', data: query});
    };

    var getSeatsFromType = function (type) {
      var seats = 0;
      _.forEach(planesRef, function (plane) {
        if (_.isEqual(plane.type, type)) {
          seats = plane.seats;
        }
      });
      return seats;
    };

    var getSpeedFromType = function (type) {
      var speed = 0;
      _.forEach(planesRef, function (plane) {
        if (_.isEqual(plane.type, type)) {
          speed = plane.speed;
        }
      });
      return speed;
    };

    return {
      setPlanesRef: setPlanesRef,
      getPlanesRef: getPlaneSpecs,
      getSeatsFromType: getSeatsFromType,
      getSpeedFromType: getSpeedFromType
    };
  }]);