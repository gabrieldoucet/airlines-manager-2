var _ = require('lodash');

angular.module('am2App')
  .controller('linesController', ['$scope', 'linesService', 'planeService', 'planeSpecService', 'calc', 'classService',
    function linesController($scope, linesService, planeService, planeSpecService, calc, classService) {

      linesService.getLines().then(function (res) {
        $scope.lines = res.data;
      });

      $scope.selects    = {notManual: false};
      $scope.manualLine = {};

      $scope.$watch('manualLine', function (newVal) {
        if (!_.isEmpty(newVal)) {
          $scope.selects.manual = true;
        } else {
          $scope.selects.manual = false;
        }
      }, true);

      $scope.submitManual = function () {
        $scope.selects.lineDetail = $scope.manualLine;
      };

      $scope.resetManual = function () {
        $scope.manualLine         = {};
        $scope.selects.lineDetail = {};
        $scope.selects.notManual  = false;
      };

      // Monitor changes on line detail
      $scope.$watch('selects.lineDetail', function (newVal) {
        if (!_.isNil(newVal) && !_.isEmpty(newVal)) {
          $scope.selects.notManual = true;
          $scope.lineDetail        = [$scope.selects.lineDetail];

          linesService.getSimilarLines($scope.selects.lineDetail).then(function (data) {
            $scope.similarLines = data;
          });

          $scope.optiConfigs = _.get(newVal, 'optis');

          calc.getOptiPlanes($scope.selects.lineDetail).then(function (data) {
            $scope.optiPlanes = data;
          });
        }
      }, true);

      $scope.getLineLineLabelClass = function (line1, line2) {
        return classService.getLineLineLabelClass(line1, line2);
      };

      $scope.getArrowClass = function () {
        if ($scope.showConfigs) {
          return 'glyphicon glyphicon-chevron-down';
        } else {
          return 'glyphicon glyphicon-chevron-right';
        }
      };

      $scope.$watch('lines', function () {
        // console.log($scope.lines);
      }, true);

      $scope.removeFirst = function () {
        $scope.lines = _.slice($scope.lines, 1);
        linesService.setLines($scope.lines);
      };
    }]);