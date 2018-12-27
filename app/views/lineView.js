const _ = require('lodash');

angular.module('am2App')
  .directive('lineView', function () {
    return {
      templateUrl: './templates/lineView',
      transclude: true,
      scope: {
        plane: '=',
        line: '='
      },
      controller: ['$scope', 'lineService', 'calc', function ($scope, lineService, calc) {

        $scope.chooseLine = function (line) {
          $scope.line = line;
//          $scope.selects.manualLine   = line;
          return false;
        };

        $scope.$watch('line', function (line) {
          if (!_.isNil(line)) {

            // Get the similar lines
            lineService.getSimilarLines(line).then(function (data) {
              $scope.similarLines = data;
            });

            // Get the compatible planes
            calc.getCompatiblePlanes(line).then(function (data) {
              $scope.compatiblePlanes = data;
            });
          }
        }, true);

        $scope.choosePlane = function (plane) {
          $scope.plane = plane;
          return false;
        };
      }]
    };
  });
