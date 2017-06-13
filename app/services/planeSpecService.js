const _ = require('lodash');

angular.module('am2App')
  .factory('planeSpecService', ['$http', function ($http) {
    let planesRef;

    const setPlanesRef = function (data) {
      planesRef = data;
    };

    const getPlaneSpecs = function (query) {
      //return $http({method: 'POST', url: 'http://localhost:3000/data/planespecs', data: query})
      //  .then(function (res) {
      //    return res;
      //  })
      //  .catch(function (data) {
      //    return $http.get('https://gdoucet-fr.github.io/am2/data/planespecs.json');
      //  });

      // TODO
      return $http({method: 'GET', url: 'https://gdoucet-fr.github.io/am2/data/planespecs.json'})
        .then(function (res) {
          hubs = res.data;
          return res;
        });
    };

    const getSeatsFromType = function (type) {
      let seats = 0;
      _.forEach(planesRef, function (plane) {
        if (_.isEqual(plane.type, type)) {
          seats = plane.seats;
        }
      });
      return seats;
    };

    const getSpeedFromType = function (type) {
      let speed = 0;
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