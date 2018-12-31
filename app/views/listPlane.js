/**
 * Created by Gabriel on 26/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('listPlane', function() {
    return {
      templateUrl: './templates/listPlane',
      scope: {
        planes: '=',
        title: '=',
        line: '=',
        choosePlane: '='
      },

      controller: ['$scope', 'planeService', function($scope, planeService) {

        $scope.show = true;

        $scope.toggle = function () {
          $scope.show = !$scope.show;
        }

        $scope.isPlaneOptimised = function(plane) {
          return planeService.isOptimisedForLine(plane, $scope.line);
        };
      }]
    };
  });
