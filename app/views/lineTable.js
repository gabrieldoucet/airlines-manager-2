var _ = require('lodash');

angular.module('am2App')
.directive('lineTable', function () {
  return {
    templateUrl: './templates/lineTable',
    transclude: true,
    scope: {
      lines: '=',
      header: '@',
      ngModel: '=',
      enableSelect: '=',
      enableAdd: '='
    },
    controller: ['$scope', 'planeService', 'linesService', 'calc', 'classService',
      function ($scope, planeService, linesService, calc, classService) {
        $scope.open = true; 

        $scope.headerClick = function () {
          $scope.open = !$scope.open;
        };

        $scope.showAdd = function () {
          console.log('add clicked');
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

        $scope.selectLine = function (line) {
          if ($scope.enableSelect) {
            $scope.ngModel = line;
          }
        }
      }
    ]
  };
});