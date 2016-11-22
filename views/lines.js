var am2App = angular.module('am2App');

am2App.controller('linesController', ['$scope', 'loader', function linesController($scope, loader) {
  $scope.lines = [];
  $scope.line = {
    "from": "JFK",
    "to": "ATL",
    "distance": 1222,
    "demand": {
      "eco": 1231,
      "business": 640,
      "first": 283
    },
    "planes": ["JFK-320-0009", "JFK-320-0008", "JFK-320-0006"]
  };

  $scope.getSimilarLines = function () {

    var similar = function (x, y) {
      var variation = (x - y) / x * 100;
      return Math.abs(variation) <= 5;
    }

    var sourceDemand = $scope.line.demand.eco + $scope.line.demand.business + $scope.line.demand.first;
    var proportions = {
      eco: $scope.line.demand.eco / sourceDemand,
      business: $scope.line.demand.business / sourceDemand,
      first: $scope.line.demand.first / sourceDemand
    };
    var similarLines = _.filter($scope.lines, function (line) {
      var targetDemand = line.demand.eco + line.demand.business + line.demand.first;
      var similarEco = similar(proportions.eco, line.demand.eco / targetDemand);
      var similarBusiness = similar(proportions.business, line.demand.business / targetDemand);
      var similarFirst = similar(proportions.first, line.demand.first / targetDemand);
      if (similarEco && similarBusiness && similarFirst) {
        console.log(proportions.eco, proportions.business, proportions.first);
        console.log(line.demand.eco / targetDemand, line.demand.business / targetDemand, line.demand.first / targetDemand);
      }
      return similarEco && similarBusiness && similarFirst;
    });
//    $scope.lines = similarLines;
    console.log(similarLines);
  };

  $scope.loadLines = function () {
    loader('lines.json', function(res) {
      var lines = res.data;
      $scope.lines = lines;
      $scope.getSimilarLines();
    });
  }

  $scope.$watch($scope.lines, function () {
    console.log($scope.lines);
  }, true);

  $scope.loadLines();
  $scope.getSimilarLines();
}]);