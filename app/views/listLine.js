/**
 * Created by Gabriel on 26/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('listLine', function() {
    return {
      templateUrl: './templates/listLine',
      scope: {
        title: '=',
        lines: '=',
        chooseLine: '='
      },

      controller: ['$scope', function($scope) {

        $scope.show = true;

        $scope.toggle = function() {
          $scope.show = !$scope.show;
        };

      }]
    };
  });
