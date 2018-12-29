const _ = require('lodash');

angular.module('am2App')
  .directive('lineConfigs', function() {
    return {
      templateUrl: './templates/lineConfigs',
      transclude: true,
      scope: {
        line: '='
      },
      controller: ['$scope', function($scope) {
      }]
    };
  });