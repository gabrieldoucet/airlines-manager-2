var am2App = angular.module('am2App');

am2App.directive('lineSelect', function () {
  return {
    templateUrl: './directives/line-select.html',
    transclude: true,
    scope: {
      select: '=',
      disabled: '='
    },
    controller: ['$scope', 'linesService', function ($scope, linesService) {
      $scope.lines = linesService.getLines();
    }]
  };
});