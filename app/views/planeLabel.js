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
    controller: ['$scope', 'planeService', 'linesService', 'classService',
    function ($scope, planeService, linesService, classService) {
      $scope.plane = planeService.getPlaneFromName($scope.planeName);

      $scope.showDetail = false;

      $scope.toggleDetail = function () {
        $scope.showDetail = !$scope.showDetail;
      };

      $scope.getPlaneLineLabelClass = function (planeIn, lineIn) {
        var plane = planeIn;
        var line = lineIn;
        if (!_.isObject(planeIn)) {
          plane = planeService.getPlaneFromName(planeIn);
        }
        if (!_.isObject(lineIn)) {
          line = linesService.getLineFromTo(plane.hub, lineIn);
        }
        return 'label label-primary';
//        return classService.getPlaneLineLabelClass(plane, line);
      };
    }]
  }; 
});