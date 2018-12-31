const _ = require('lodash');

angular.module('am2App')
  .directive('viewLine', function() {
    return {
      templateUrl: './templates/viewLine',
      scope: {
        line: '=',
        chooseLine: '=',
        choosePlane: '='
      },
      controller: ['$scope', 'lineService', function($scope, lineService) {

        $scope.$watch('line', function(line) {
          if (!_.isNil(line)) {

            // Get the similar lines
            lineService.getSimilarLines(line).then(function(data) {
              $scope.similarLines = data;
            });

            // Get the compatible planes
            lineService.getCompatiblePlanes(line).then(function(data) {
              $scope.compatiblePlanes = data;
            });
          }
        }, true);
      }]
    };
  });
