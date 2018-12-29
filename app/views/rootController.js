/**
 * Created by Gabriel on 05/04/2017.
 */

const _ = require('lodash');

angular.module('am2App')
  .controller('rootController', ['$scope', 'calc', 'dataService',
    function($scope, calc, dataService) {

      $scope.chooseLine = function(line) {
        $scope.selects.line = line;
      };

      $scope.choosePlane = function(plane) {
        $scope.selects.plane = plane;
      };

      $scope.selects = {manualInput: false};

      $scope.getAllOptis = function() {
        dataService.getPlaneTypes().then(function(planeTypes) {
          let optis        = _.map(planeTypes, function(planeType) {
            return calc.getOptimisation(planeType, $scope.selects.line);
          });
          optis            = _.sortBy(optis, ['percent']);
          console.log(optis);
          _.set($scope.selects.line, 'optis', optis);
        });
      };

      $scope.toggleManual = function() {
        if (!$scope.selects.manualInput) {
          $scope.selects.lineClone = _.cloneDeep($scope.selects.line);
        } else {
          $scope.selects.line = _.cloneDeep($scope.selects.lineClone);
        }
        $scope.selects.manualInput = !$scope.selects.manualInput;
        //MDL Text Input Cleanup
        function mdlCleanUp() {
          var mdlInputs = doc.querySelectorAll('.mdl-js-textfield');
          for (var i = 0, l = mdlInputs.length; i < l; i++) {
            console.log(mdlInputs[i]);
            mdlInputs[i].MaterialTextfield.checkDirty();
          }
        }
      };

      $scope.reset = function() {
        $scope.selects.line = _.cloneDeep($scope.selects.lineClone);
      };
    }]);
