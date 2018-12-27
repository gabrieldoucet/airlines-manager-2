/**
 * Created by Gabriel on 26/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('selectPlane', function () {
    return {
      templateUrl: './templates/selectPlane',
      scope: {
        plane: '='
      },
      controller: ['$scope', 'planeService', function ($scope, planeService) {
        planeService.getPlanes().then(function (res) {
          $scope.planes = _.sortBy(res.data, ['name']);
        });
      }]
    };
  });
