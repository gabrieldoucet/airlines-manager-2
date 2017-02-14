angular.module('am2App')
.directive('lineSelect', function () {
  return {
    templateUrl: './templates/lineSelect',
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