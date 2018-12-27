/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('modalAddLine', function () {
    return {
      templateUrl: './templates/modalAddLine',
      controller: ['$scope', function ($scope) {

          $scope.addLine = function () {
            $scope.newLine.from = $scope.hub.code;
            console.log($scope.newLine);
          };

          $scope.reset = function () {
            $scope.newLine = {};
          };
      }]
    };
  });
