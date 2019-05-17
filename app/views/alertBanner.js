/**
 * Created by Gabriel on 26/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('alertBanner', function() {
    return {
      templateUrl: './templates/alertBanner',
      scope: {
      },
      controller: ['$scope', 'alertService', function($scope, alertService) {

        $scope.alert = {
          show : false,
          class: ''
        };

        $scope.showAlert = function(type, message) {
          $scope.alert.type = type;
          if (type === 0) {
            $scope.alert.class = 'alert-success';
          } else if (type === 1) {
            $scope.alert.class = 'alert-warning';
          } else if (type === 2) {
            $scope.alert.class = 'alert-danger';
          }
          $scope.alert.show = true;
          $scope.message = message;
        };

        $scope.hideAlert = function() {
          $scope.alert.show = false;
        };

        alertService.register($scope.showAlert, $scope.hideAlert);

      }]
    };
  });
