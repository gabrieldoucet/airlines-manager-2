var _ = require('lodash');

angular.module('am2App')
.directive('nameGen', function () {
  return {
    templateUrl: './templates/nameGen',
    transclude: true,
    scope: {
      ngModel: '='
    },
    controller: ['$scope', 'fleetService', 'hubsService', function ($scope, fleetService, hubsService) {
      $scope.$watch('hub', function (newValue) {
        //if (hubsService.isHub($scope.hub)) {
          var nameAlreadyUsed = true;
          while (nameAlreadyUsed) {
            nameAlreadyUsed = false;
            var name = hubsService.randomName($scope.hub);
            _.forEach(fleetService.getFleet(), function (plane) {
              if (_.isEqual(plane.name, name)) {
                nameAlreadyExists = true;
              }
            });
          }
          console.log(name);
          $scope.name = name;
        //}
      });
    }]
  };
});