/**
 * Created by Gabriel on 26/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('selectPlaneType', function() {
    return {
      templateUrl: './templates/selectPlaneType',
      scope: {
        planeType: '='
      },
      controller: ['$scope', 'dataService', function($scope, dataService) {
        dataService.getPlaneTypes().then(function(planeTypes) {
          $scope.planeTypes = _.map(planeTypes, function(planeType) {return planeType.type;});
        });
      }]
    };
  });
