/**
 * Created by Gabriel on 02/08/2017.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('nameGen', function() {
    return {
      transclude: true,
      scope: {
        hub: '=',
        name: '='
      },
      controller: ['$scope', 'hubService', 'planeService', function($scope, hubService, planeService) {

        $scope.newPlane = {};

        $scope.$watch('hub', function(newVal, oldVal) {
          if (!_.isNil(newVal)) {
            hubService.getRandomName($scope.hub).then(function(name) {
              $scope.name = name;
            }).catch(function(error) {
              console.log(error);
            });
          }
        }, true);
      }]
    };
  });
