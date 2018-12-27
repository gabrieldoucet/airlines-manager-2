/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('selectHub', function () {
    return {
      templateUrl: './templates/selectHub',
      scope: {
        hub: '='
      },
      controller: ['$scope', 'hubService', function ($scope, hubService) {
        hubService.getHubs().then(function (res) {
          $scope.hubs = _.sortBy(res.data, ['code']);
        });
      }]
    };
  });
