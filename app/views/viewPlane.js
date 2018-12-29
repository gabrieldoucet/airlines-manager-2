const _ = require('lodash');

angular.module('am2App')
  .directive('viewPlane', function() {
    return {
      templateUrl: './templates/viewPlane',
      transclude: true,
      scope: {
        plane: '=',
        line: '='
      },
      controller: ['$scope', 'lineService', 'urlService', function($scope, lineService, urlService) {
        $scope.chooseDest = function(to) {
          if ($scope.plane) {
            lineService.getLineFromTo($scope.plane.hub, to)
              .then(function(line) {
                $scope.line = line;
              });
          }
        };

        $scope.url = urlService.getPlaneUrl($scope.plane);
      }]
    };
  });
