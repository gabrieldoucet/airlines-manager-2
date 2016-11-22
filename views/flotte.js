var am2App = angular.module('am2App');

am2App.controller('fleetController', ['$scope', 'loader', function fleetController($scope, loader) {
  $scope.fleet = [];

  $scope.loadFleet = function () {
    loader('flotte.json', function(res) {
      var fleet = res.data;

      // Sorting lines by alphabetical order
      _.forEach(fleet, function (plane) {
        var lines = _.get(plane, 'lines');
        _.set(plane, 'lines', _.sortBy(lines));
      })
      $scope.fleet = fleet;
    });
  }

  $scope.addToFleet = function () {
    console.log($scope.avion);
    $scope.fleet.push($scope.avion);
  }

  $scope.$watch($scope.fleet, function () {
    console.log($scope.fleet);
  }, true);

  $scope.loadFleet();
}]);