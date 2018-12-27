/**
 * Created by Gabriel on 02/08/2017.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('nameGen', function () {
    return {
      transclude: true,
      scope: {
        hub: '=',
        name: '='
      },
      controller: ['$scope', 'hubService', 'planeService', function ($scope, hubService, planeService) {
        $scope.$watch('hub', function (newVal, oldVal) {
          if (!_.isNil(newVal)) {
            $scope.name = hubService.getRandomName($scope.hub.code);
          }
        }, true);
      }]
    };
  });
