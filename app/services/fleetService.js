var _ = require('lodash');

angular.module('am2App')
.factory('fleetService', [function() {
  var fleet;
  return {
    setFleet: function (data) {
      data = _.sortBy(data, [function (plane) {return plane.name;}]);
      fleet = data;
    },
    getFleet: function () {
      return fleet;
    },
    getPlaneFromName: function (planeName) {
      var selection = _.filter(fleet, function (plane) {
        return _.isEqual(plane.name, planeName);
      });
      return selection[0];
    }
  }
}]);