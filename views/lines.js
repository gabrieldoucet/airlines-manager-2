var am2App = angular.module('am2App');

am2App.controller('linesController', ['$scope', 'linesService', 'fleetService', 'planesRefService', 'calc', 'classService',
  function linesController($scope, linesService, fleetService, planesRefService, calc, classService) {

  $scope.lines = linesService.getLines();

  // Get data back from children directives
  $scope.selects = {};
  $scope.$watch('selects.lineOptim', function (newVal) {
    if (!_.isNil(newVal)) {
      $scope.planes = calc.getOptiPlanes($scope.selects.lineOptim);      
      $scope.allOptis = calc.getAllOptis($scope.selects.lineOptim);
    }
  }, true);

  $scope.$watch('selects.lineDetail', function (newVal) {
    if (!_.isNil(newVal)) {
      $scope.similarLines = linesService.getSimilarLines($scope.selects.lineDetail);
    }
  }, true);

  $scope.getPlaneLineLabelClass = function (planeIn, lineIn) {
    var plane = planeIn;
    var line = lineIn;
    if (!_.isObject(planeIn)) {
      plane = fleetService.getPlaneFromName(planeIn);
    }
    if (!_.isObject(lineIn)) {
      line = linesService.getLineFromTo(plane.hub, lineIn);
    }
    return classService.getPlaneLineLabelClass(plane, line);
  };

  $scope.getLineLineLabelClass = function(line1, line2) {
    return classService.getLineLineLabelClass(line1, line2);
  };

  $scope.showConfigs = false;

  $scope.configsHeaderClick = function () {
    $scope.showConfigs = !$scope.showConfigs;
  };

  $scope.getArrowClass = function () {
    if ($scope.showConfigs) {
      return "glyphicon glyphicon-chevron-down";
    } else {
      return "glyphicon glyphicon-chevron-right";
    }
  };


  $scope.$watch($scope.lines, function () {
    // console.log($scope.lines);
  }, true);

  $scope.removeFirst = function(){
    $scope.lines = _.slice($scope.lines, 1);
    linesService.setLines($scope.lines);
  };
}]);