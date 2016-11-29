var am2App = angular.module('am2App');

am2App.controller('fleetController', ['$scope', 'fleetService', 'linesService', 'hubsService', 'calc',
  function fleetController($scope, fleetService, linesService, hubsService, calc) {
  
  $scope.optiPlane = new Plane();

  $scope.$watch('optiPlane.type', function (newVal) {
    if (!_.isNil(newVal)) {
      $scope.optiLines = calc.getOptiLines($scope.optiPlane);
    }
  });
  /*
  $scope.toggleLabelClass = function (dest) {
    if (_.includes($scope.newPlane.destinations, dest)) {
      return "label label-primary";
    } else {
      return "label label-default";
    }
  }

  $scope.selectLine = function (dest) {
    if (!_.includes($scope.newPlane.destinations, dest)) {
      $scope.newPlane.destinations.push(dest);
    } else {
      $scope.newPlane.destinations = _.filter($scope.newPlane.destinations, function (planeDest) {
        return !_.isEqual(planeDest, dest);
      });
    }
  } */

  // Adding a plane
  $scope.newPlane = new Plane();
  $scope.$watch('newPlane.hub', function (newValue) {
    if (hubsService.isHub($scope.newPlane.hub)) {
      console.log($scope.newPlane);
      $scope.newPlane.availableLines = _.filter(linesService.getLines(), function (line) {
        return _.isEqual(line.from, newValue);
      });
    }
  }, true);

  // The whole fleet
  $scope.fleet = fleetService.getFleet();

  $scope.addToFleet = function () {
    // console.log($scope.avion);
    $scope.fleet.push($scope.newPlane);
  }

  $scope.$watch($scope.fleet, function () {
  }, true);

}]);