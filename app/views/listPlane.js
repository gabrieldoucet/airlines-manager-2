/**
 * Created by Gabriel on 26/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('listPlane', function () {
    return {
      templateUrl: './templates/listPlane',
      transclude: true,
      scope: {
        plane: '=',
        planes: '=',
        title: '=',
        line: '='
      },

      controller: ['$scope', 'calc', function ($scope, calc) {

        $scope.show = true;

        $scope.toggle = function () {
          $scope.show = !$scope.show;
        };

        $scope.choosePlane = function (plane) {
          console.log($scope.plane);
          $scope.plane = plane;
          console.log($scope.plane);
        };

        $scope.isPlaneOptimised = function (plane) {
          return calc.isOptimised(plane, $scope.line);
        };

      }]
    };
  });
