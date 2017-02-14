angular.module('am2App')
.directive('hubSelect', function () {
  return {
    templateUrl: './templates/hubSelect',
    transclude: true,
    scope: {
      ngModel: '='
    },
    controller: ['$scope', 'hubsService', function ($scope, hubsService) {
      $scope.hubs = hubsService.getHubs();
    }]
  };
});