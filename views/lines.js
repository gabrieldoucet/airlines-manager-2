var am2App = angular.module('am2App');

am2App.controller('linesController', ['$scope', 'linesService', 'fleetService', 'planesRefService', 'calc', 'classService',
  function linesController($scope, linesService, fleetService, planesRefService, calc, classService) {

  $scope.lines = linesService.getLines();
  $scope.selects = {};
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
    $scope.manualLine = {};
    $scope.selects.lineDetail = {};
  };

  // Monitor changes on line detail
  $scope.$watch('selects.lineDetail', function (newVal) {
    if (!_.isNil(newVal) && !_.isEmpty(newVal)) {
      $scope.manualLine = $scope.selects.lineDetail;
      $scope.lineDetail = [$scope.selects.lineDetail];
      $scope.similarLines = linesService.getSimilarLines($scope.selects.lineDetail);
      $scope.optiConfigs = calc.getAllOptis($scope.selects.lineDetail);
      $scope.optiPlanes = calc.getOptiPlanes($scope.selects.lineDetail);
    }
  }, true);

  $scope.getLineLineLabelClass = function(line1, line2) {
    return classService.getLineLineLabelClass(line1, line2);
  };

  $scope.getArrowClass = function () {
    if ($scope.showConfigs) {
      return "glyphicon glyphicon-chevron-down";
    } else {
      return "glyphicon glyphicon-chevron-right";
    }
  };

  $scope.$watch('lines', function () {
    // console.log($scope.lines);
  }, true);

  $scope.removeFirst = function(){
    $scope.lines = _.slice($scope.lines, 1);
    linesService.setLines($scope.lines);
  };
}]);