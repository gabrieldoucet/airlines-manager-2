var am2App = angular.module('am2App');

am2App.directive('typeSelect', function () {
  return {
    templateUrl: './directives/type-select.html',
    transclude: true,
    scope: {
      expenses: '='
    },
    controller: ['$scope', 'planesRefService', function ($scope, planesRefService) {
      $scope.planes = planesRefService.getPlanesRef();
    }]
  };
});