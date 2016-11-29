var am2App = angular.module('am2App');

am2App.directive('nameGen', function () {
  return {
    templateUrl: './directives/name-gen.html',
    transclude: true,
    scope: {
      ngModel: '='
    },
    controller: ['$scope', 'fleetService', 'hubsService', function ($scope, fleetService, hubsService) {
      $scope.$watch('hub', function (newValue) {
        if (hubsService.isHub($scope.hub)) {
          var occurrences = 0;
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
          $scope.name = name;
        }
      });
    }]
  };
});