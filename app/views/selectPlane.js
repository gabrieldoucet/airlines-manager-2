/**
 * Created by Gabriel on 26/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('selectPlane', function() {
    return {
      templateUrl: './templates/selectPlane',
      scope: {
        plane: '='
      },
      controller: ['$scope', 'dataService', function($scope, dataService) {
        dataService.getPlanes().then(function(planes) {
          $scope.planes = planes;
        });
      }]
    };
  });
