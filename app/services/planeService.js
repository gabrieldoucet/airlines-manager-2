var _ = require('lodash');

angular.module('am2App')
.factory('planeService', ['$http', function ($http) {
  var fleet;

  var setFleet = function (data) {
    data = _.sortBy(data, [function (plane) {return plane.name;}]);
    fleet = data;
  };

  var getFleet = function () {
    return fleet;
  };

  var getPlaneFromName =  function (planeName) {
    var selection = _.filter(fleet, function (plane) {
      return _.isEqual(plane.name, planeName);
    });
    return selection[0];
  };

  var getPlanes = function () {
    return $http({method: 'POST', url: 'http://localhost:3000/data/planes'});
  };

  return {
    setFleet: setFleet,
    getFleet: getFleet,
    getPlaneFromName: getPlaneFromName,
    getPlanes: getPlanes
  }
}]);