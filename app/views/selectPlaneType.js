/**
 * Created by Gabriel on 26/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('selectPlaneType', function () {
    return {
      templateUrl: './templates/selectPlaneType',
      scope: {
        planeType: '='
      },
      controller: ['$scope', 'planeTypeService', function ($scope, planeTypeService) {
        planeTypeService.getPlaneTypes().then(function (res) {
          $scope.planeTypes = _.sortBy(res.data, ['type']);
        });
      }]
    };
  });
