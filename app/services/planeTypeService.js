const _ = require('lodash');

angular.module('am2App')
  .factory('planeTypeService', ['$http', function ($http) {
    let planeTypes;

    const setPlaneTypes = function (data) {
      planeTypes = data;
    };

    const getPlaneTypes = function (query) {
      return $http({method: 'POST', url: 'http://localhost:3000/data/planetypes', data: query})
        .then(function (res) {
          planeTypes = res.data;
          return res;
        })
        .catch(function (data) {
          return $http.get('https://gdoucet-fr.github.io/am2/data/planespecs.json');
        });

      //// TODO
      //return $http({method: 'GET', url: 'https://gdoucet-fr.github.io/am2/data/planespecs.json'})
      //  .then(function (res) {
      //    hubs = res.data;
      //    return res;
      //  });
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
      setPlaneTypes: setPlaneTypes,
      getPlaneTypes: getPlaneTypes,
      getSeatsFromType: getSeatsFromType,
      getSpeedFromType: getSpeedFromType
    };
  }]);
