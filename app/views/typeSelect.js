angular.module('am2App')
.directive('typeSelect', function () {
  return {
    templateUrl: './templates/typeSelect',
    transclude: true,
    scope: {
      ngModel: '='
    },
    controller: ['$scope', 'planesRefService', function ($scope, planesRefService) {
      $scope.planes = planesRefService.getPlanesRef();
    }]
  };
});