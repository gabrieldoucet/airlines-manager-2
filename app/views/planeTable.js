var _ = require('lodash');

angular.module('am2App')
.directive('planeTable', function () {
  return {
    templateUrl: './templates/planeTable',
    transclude: true,
    scope: {
      planes: '=',
      header: '@',
      ngModel: '=',
      enableSelect: '='
    },
    controller: ['$scope', 'linesService', 'calc', 'classService',
      function ($scope, linesService, calc, classService) {

        $scope.open = true;

        $scope.headerClick = function () {
          $scope.open = !$scope.open;
        };

        $scope.getArrowClass = function () {
          return $scope.open ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-right";
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
          return classService.getPlaneLineLabelClass(plane, line);
        };

        $scope.selectPlane = function (plane) {
          if ($scope.enableSelect) {
            $scope.ngModel = plane;
          }
        };
        /*
        $scope.getPlaneLineLabelClass = function(plane, dest) {
          var line = linesService.getLineFromTo(plane.hub, dest);
          return classService.getPlaneLineLabelClass(plane, line);
        } */
      }
    ]
  };
});