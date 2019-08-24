/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('modalAddPlane', function() {
    return {
      templateUrl: './templates/modalAddPlane',
      transclude: true,
      scope: {
        newPlane:  '='
      },
      controller: ['$scope', 'dataService', 'modalService', 'alertService', function($scope, dataService, modalService, alertService) {

        $scope.newPlane = $scope.newPlane || {};
        $scope.invalidFeedback = {};

        $scope.addPlane = function() {
          var amId = $scope.newPlane.amID;
          if (_.isNil(amId) || _.isEqual(amId, '')) {
            $scope.invalidFeedback.amID = true;
          } else {
            $scope.invalidFeedback.amID = false;
            modalService.hideNewPlaneModal();
            dataService.addNewPlane($scope.newPlane).then(function(newPlane) {
              modalService.hideNewPlaneModal();
              $scope.clear();
              let alertMessage = 'Plane ' + newPlane.name + ' has successfully been added';
              console.log(alertMessage, newPlane);
              alertService.alertSuccess(alertMessage);
            }).catch(function(error) {
              console.error('An error occurred while trying to add the plane');
              console.log(error);
            });
          }
        };

        $scope.clear = function() {
          $scope.newPlane = {config: {}};
          $scope.invalidFeedback = {};
        };

      }]
    };
  });