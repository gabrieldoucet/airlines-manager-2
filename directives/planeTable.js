var am2App = angular.module('am2App');

am2App.directive('planeTable', function () {
  return {
    templateUrl: './directives/plane-table.html',
    transclude: true,
    scope: {
      planes: '=',
      header: '@'
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
            plane = fleetService.getPlaneFromName(planeIn);
          }
          if (!_.isObject(lineIn)) {
            line = linesService.getLineFromTo(plane.hub, lineIn);
          }
          return classService.getPlaneLineLabelClass(plane, line);
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