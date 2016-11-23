var am2App = angular.module('am2App');

am2App.directive('lineSelect', function () {
  return {
    templateUrl: './directives/line-select.html',
    transclude: true,
    scope: {
      expenses: '='
    },
    controller: ['$scope', 'linesService', function ($scope, linesService) {
      $scope.lines = linesService.getLines();
    }]
  };
});