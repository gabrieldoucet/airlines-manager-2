/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('modalAddPlane', function() {
    return {
      templateUrl: './templates/modalAddPlane',
      controller: ['$scope', function($scope) {

        $scope.addPlane = function() {
          $scope.newPlane.hub = $scope.hub.code;
          $scope.newPlane.type = $scope.planeType.type;
          console.log($scope.newPlane);
        };

        $scope.reset = function () {
          $scope.newPlane = {};
        };
      }]
    };
  });
