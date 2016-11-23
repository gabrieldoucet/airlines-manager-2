var am2App = angular.module('am2App');

am2App.controller('linesController', ['$scope', 'linesService', 'fleetService', 'planesRefService', 'calc',
  function linesController($scope, linesService, fleetService, planesRefService, calc) {

  $scope.lines = linesService.getLines();

  // Table show or hide
  $scope.open = true;

  $scope.headerClick = function () {
    $scope.open = !$scope.open;
  };

  $scope.getGlyphiconClass = function () {
    if ($scope.open) {
      return "glyphicon glyphicon-chevron-down";
    } else {
      return "glyphicon glyphicon-chevron-right";
    }
  }

  $scope.$watch($scope.lines, function () {
    // console.log($scope.lines);
  }, true);

  $scope.removeFirst = function(){
    $scope.lines = _.slice($scope.lines, 1);
    linesService.setLines($scope.lines);
  }

  $scope.getClass = function (line, planeName) {
    var plane = fleetService.getPlaneFromName(planeName);
    var opti = calc.getOptimisation(plane, line);
    var isOptimised = calc.isOptimised(opti, plane);
    if (isOptimised) {
      return "label label-success";      
    } else {
      return "label label-danger";      
    }
  }

  $scope.selectLine = function (line) {
    $scope.selectedLine = line;
    $scope.similarLines = linesService.getSimilarLines($scope.selectedLine);
  }
/*
  $scope.selectedLine = {
    "from": "JFK",
    "to": "ATL",
    "distance": 1222,
    "demand": {
      "eco": 1231,
      "business": 640,
      "first": 283
    },
    "planes": ["JFK-320-0009", "JFK-320-0008", "JFK-320-0006"]
  }; */

}]);