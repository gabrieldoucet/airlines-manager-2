var _ = require('lodash');

angular.module('am2App')
.directive('planeLabel', function () {
  return {
    templateUrl: './templates/planeLabel',
    transclude: true,
    scope: {
      planeName: '=title',
      line: '='
    },
    controller: ['$scope', 'fleetService', 'linesService', 'classService',
    function ($scope, fleetService, linesService, classService) {
      $scope.plane = fleetService.getPlaneFromName($scope.planeName);

      $scope.showDetail = false;

      $scope.toggleDetail = function () {
        $scope.showDetail = !$scope.showDetail;
      };

      $scope.getPlaneLineLabelClass = function (planeIn, lineIn) {
        var plane = planeIn;
        var line = lineIn;
        if (!_.isObject(planeIn)) {
          plane = fleetService.getPlaneFromName(planeIn);
        }
        if (!_.isObject(lineIn)) {
          line = linesService.getLineFromTo(plane.hub, lineIn);
        }
        return classService.getPlaneLineLabelClass(plane, line);
      };
    }]
  }; 
});