const _ = require('lodash');

angular.module('am2App')
  .factory('planeService', ['$http', function ($http) {
    let planes;

    const setPlanes = function (data) {
      data  = _.sortBy(data, [function (plane) {
        return plane.name;
      }]);
      planes = data;
    };

    const getPlaneFromName = function (planeName) {
      const selection = _.filter(planes, function (plane) {
        return _.isEqual(plane.name, planeName);
      });
      return selection[0];
    };

    const getPlanes = function (query) {
      return $http({method: 'POST', url: 'http://localhost:3000/data/planes', data: query})
        .then(function (res) {
          planes = res.data;
          return res;
        })
        .catch(function (data) {
          return $http.get('https://gdoucet-fr.github.io/am2/data/planes.json');
        });

      //// TODO
      //return $http({method: 'GET', url: 'https://gdoucet-fr.github.io/am2/data/planes.json'})
      //  .then(function (res) {
      //    hubs = res.data;
      //    return res;
      //  })
    };

    const nameExists = function (planeName) {
      let plane = getPlaneFromName(planeName);
      return _.isNil(plane);
    };

    return {
      setPlanes: setPlanes,
      getPlanes: getPlanes,
      getPlaneFromName: getPlaneFromName,
      nameExists: nameExists
    };
  }]);
