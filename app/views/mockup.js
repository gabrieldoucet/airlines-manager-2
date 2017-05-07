/**
 * Created by Gabriel on 05/04/2017.
 */

const _ = require('lodash');

angular.module('am2App')
  .controller('mockupController', ['$scope', 'calc', 'planeService', 'lineService', 'planeSpecService', 'hubService',
    function ($scope, calc, planeService, lineService, planeSpecService, hubService) {
      $scope.selects = {manualInput: false};
      $scope.results = {};

      $scope.$watch('selects.selectedLine', function (line) {
        if (!_.isNil(line)) {
          lineService.getSimilarLines(line).then(function (data) {
            $scope.results.similarLines = data;
          });
          calc.getOptiPlanes(line).then(function (data) {
            $scope.results.optiPlanes = data;
          });
        }
      }, true);

      $scope.chooseLine = function (line) {
        $scope.selects.selectedLine = line;
        $scope.selects.manualLine   = line;
        return false;
      };

      $scope.choosePlane = function (plane) {
        $scope.selects.selectedPlane = plane;
        return false;
      };

      lineService.getLines().then(function (res) {
        $scope.selects.lineChoices = _.sortBy(res.data, ['from', 'to']);
      });

      planeService.getPlanes().then(function (res) {
        $scope.selects.planeChoices = _.sortBy(res.data, ['name']);
      });

      hubService.getHubs().then(function (res) {
        $scope.selects.hubChoices = _.sortBy(res.data, ['name']);
      });

      $scope.getPlaneIcon = function (plane) {
        if (calc.isOptimised(plane, $scope.selects.selectedLine)) {
          return 'done';
        } else {
          return '';
        }
      };

      $scope.getPlaneClass = function (plane) {
        let defaultClass = 'mdl-button mdl-js-button mdl-js-ripple-effect';
        if (calc.isOptimised(plane, $scope.selects.selectedLine)) {
          return [defaultClass, 'mdl-button--primary'].join(' ');
        } else {
          return defaultClass;
        }
      };


      $scope.getAllOptis = function () {
        planeSpecService.getPlanesRef().then(function (res) {
          const planeSpecs = res.data;
          let optis        = _.map(planeSpecs, function (planeSpec) {
            return calc.getOptimisation(planeSpec, $scope.selects.selectedLine);
          });
          optis            = _.sortBy(optis, ['percent']);
          _.set($scope.selects.selectedLine, 'optis', optis);
        });
      };

      $scope.toggleManual = function () {
        if (!$scope.selects.manualInput) {
          $scope.selects.selectedLineClone = _.cloneDeep($scope.selects.selectedLine);
        } else {
          $scope.selects.selectedLine = _.cloneDeep($scope.selects.selectedLineClone);
        }
        $scope.selects.manualInput = !$scope.selects.manualInput;
      };

      $scope.getPlaneName = function () {
        console.log($scope.selects.hub);
        let name;
        let nameAlreadyUsed = true;
        while (nameAlreadyUsed) {
          nameAlreadyUsed = false;
          name            = hubService.randomName($scope.selects.hub);
          _.forEach($scope.selects.planeChoices, function (plane) {
            if (_.isEqual(plane.name, name)) {
              nameAlreadyExists = true;
            }
          });
        }
        $scope.results.planeName = name;
      };

      $scope.reset = function () {
        $scope.selects.selectedLine = _.cloneDeep($scope.selects.selectedLineClone);
      };
    }]);