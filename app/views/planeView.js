const _ = require('lodash');

angular.module('am2App')
  .directive('planeView', function () {
    return {
      templateUrl: './templates/planeView',
      transclude: true,
      scope: {
        plane: '=',
        line: '='
      },
      controller: ['$scope', 'lineService', 'urlService', function ($scope, lineService, urlService) {
        $scope.chooseDest = function (to) {
          if ($scope.plane) {
            lineService.getLineFromTo2($scope.plane.hub, to)
              .then(function (line) {
                $scope.line = line;
              });
          }
        };

        $scope.url = urlService.getPlaneUrl($scope.plane);
      }]
    };
  });
