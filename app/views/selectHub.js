/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('selectHub', function() {
    return {
      templateUrl: './templates/selectHub',
      scope: {
        hub: '='
      },
      controller: ['$scope', 'dataService', function($scope, dataService) {
        dataService.getHubs().then(function(hubs) {
          $scope.hubs = _.map(hubs, function(hub) {return hub.code});
        });
      }]
    };
  });
