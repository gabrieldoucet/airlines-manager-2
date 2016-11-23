var am2App = angular.module('am2App');

am2App.controller('fleetController', ['$scope', 'fleetService', 'linesService', 'calc',
  function fleetController($scope, fleetService, linesService, calc) {
  $scope.fleet = fleetService.getFleet();

  $scope.addToFleet = function () {
    // console.log($scope.avion);
    $scope.fleet.push($scope.avion);
  }

  $scope.$watch($scope.fleet, function () {
  }, true);

  $scope.getClass = function (dest, plane) {
    var line = linesService.getLinesFromTo(plane.hub, dest);
    var opti = calc.getOptimisation(plane, line);
    var isOptimised = calc.isOptimised(opti, plane);
    if (isOptimised) {
      return "label label-success";      
    } else {
      return "label label-danger";      
    }
  }
}]);