/**
 * Created by Gabriel on 02/08/2017.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('selectLine', function () {
    return {
      templateUrl: './templates/selectLine',
      scope: {
        line: '='
      },
      controller: ['$scope', 'lineService', function ($scope, lineService) {
        lineService.getLines().then(function (res) {
          $scope.lines = _.sortBy(res.data, ['from', 'to']);
        });
      }]
    };
  });
