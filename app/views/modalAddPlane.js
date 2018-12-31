/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('modalAddPlane', function() {
    return {
      templateUrl: './templates/modalAddPlane',
      transclude: true,
      scope: {},
      controller: ['$scope', function($scope) {

        $scope.newPlane = {};

        $scope.addPlane = function() {
          $scope.newPlane.hub = $scope.hub.code;
          $scope.newPlane.type = $scope.planeType.type;
          console.log('New plane details:', $scope.newPlane);
        };

        $scope.reset = function() {
          $scope.newPlane = {};
        };
      }]
    };
  });
