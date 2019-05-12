/**
 * Created by Gabriel on 29/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('navigation', function() {
    return {
      templateUrl: './templates/navigation',
      scope: {
        title: '='
      },
      controller: ['$scope', 'modalService', function($scope, modalService) {
        $scope.showNewPlaneModal = function() {
          modalService.showNewPlaneModal();
        };

      }]
    };
  });
