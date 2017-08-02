/**
 * Created by Gabriel on 02/08/2017.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('lineSelect', function () {
    return {
      templateUrl: './templates/lineSelect',
      transclude: true,
      scope: {
        select: '=',
        disabled: '='
      },
      controller: ['$scope', 'lineService', function ($scope, lineService) {
        lineService.getLines().then(function (res) {
          $scope.lines = _.sortBy(res.data, ['from', 'to']);
        });
      }]
    };
  });