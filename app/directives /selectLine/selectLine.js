/**
 * Created by Gabriel on 02/08/2017.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('selectLine', function() {
    return {
      templateUrl: './templates/selectLine',
      scope: {
        line: '='
      },
      controller: ['$scope', 'dataService', function($scope, dataService) {
        dataService.getLines().then(function(lines) {
          $scope.lines = lines;
        });
      }]
    };
  });
