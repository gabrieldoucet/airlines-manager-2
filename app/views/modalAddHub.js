/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('modalAddHub', function() {
    return {
      templateUrl: './templates/modalAddHub',
      transclude: true,
      scope: {},
      controller: ['$scope', function($scope) {

        $scope.addHub = function() {
          console.log($scope.newHub);
        };

        $scope.reset = function() {
          $scope.newHub = {};
        };
      }]
    };
  });
