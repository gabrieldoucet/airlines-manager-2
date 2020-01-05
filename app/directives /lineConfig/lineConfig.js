const _ = require('lodash');

angular.module('am2App')
  .directive('lineConfigs', function() {
    return {
      templateUrl: './templates/lineConfigs',
      transclude: true,
      scope: {
        line: '='
      },
      controller: ['$scope', 'hubService', 'modalService', function($scope, hubService, modalService) {

        $scope.newPlane = {
          config: {}
        };

        $scope.addNewPlane = function(opti) {
          $scope.newPlane.config.eco = opti.config.eco;
          $scope.newPlane.config.business = opti.config.business;
          $scope.newPlane.config.first = opti.config.first ;
          $scope.newPlane.config.cargo = opti.config.cargo;
          $scope.newPlane.dests = [$scope.line.to];
          $scope.newPlane.hub = $scope.line.from;
          $scope.newPlane.type = opti.type;
          modalService.showNewPlaneModal();
        };
      }]
    };
  });
