/**
 * Created by Gabriel on 02/08/2017.
 */
/**
 * Created by Gabriel on 02/08/2017.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('nameGen', function () {
    return {
      templateUrl: './templates/nameGen',
      transclude: true,
      scope: {
        select: '=',
        disabled: '='
      },
      controller: ['$scope', 'hubService', function ($scope, hubService) {
        hubService.getHubs().then(function (res) {
          $scope.hubs = _.sortBy(res.data, ['code']);
        });
      }]
    };
  });