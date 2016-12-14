var am2App = angular.module('am2App');

am2App.directive('lineTable', function () {
  return {
    templateUrl: './directives/line-table.html',
    transclude: true,
    scope: {
      lines: '=',
      header: '@',
      ngModel: '=',
      enableSelect: '='
    },
    controller: ['$scope', 'fleetService', 'linesService', 'calc', 'classService',
      function ($scope, fleetService, linesService, calc, classService) {
        $scope.open = true; 

        $scope.headerClick = function () {
          $scope.open = !$scope.open;
        };

        $scope.getArrowClass = function () {
          return $scope.open ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-right";
        }

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

        $scope.selectLine = function (line) {
          if ($scope.enableSelect) {
            $scope.ngModel = line;
          }
        }
      }
    ]
  };
});