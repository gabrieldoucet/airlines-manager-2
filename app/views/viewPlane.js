const _ = require('lodash');

angular.module('am2App')
  .directive('viewPlane', function() {
    return {
      templateUrl: './templates/viewPlane',
      transclude: true,
      scope: {
        plane: '=',
        chooseLine: '='
      },
      controller: ['$scope', 'lineService', function($scope, lineService) {

        $scope.chooseDestination = function(to) {
          if (!_.isNil($scope.plane)) {
            lineService.getLineFromTo($scope.plane.hub, to).then(function(line) {
              $scope.chooseLine(line);
            });
          }
        };
      }]
    };
  });
