/**
 * Created by Gabriel on 05/04/2017.
 */

angular.module('am2App')
  .controller('mockupController', ['$scope', 'calc', 'planeService', 'linesService', function ($scope, calc, planeService, lineService) {
    $scope.selectedLine = null;
    $scope.selects      = {};
    $scope.manualLine   = {};
    $scope.results      = {};
    $scope.similarLines = [];

    planeService.getPlanes().then(function (res) {
      $scope.planes = res.data;
    });

    $scope.selectedPlane = {
      name: 'N65748',
      type: '787-9',
      hub: 'SFO',
      config: {eco: 180, business: 60, first: 20, cargo: 55},
      dests: ['LHR', 'DRW']
    };

    $scope.chooseLine    = function (line) {
      $scope.selects.selectedLine = line;
      lineService.getSimilarLines(line).then(function (data) {
        $scope.similarLines = data;
      });
      calc.getOptiPlanes(line).then(function (data) {
        $scope.optiPlanes = data
      })
    };

    lineService.getLines().then(function (res) {
      $scope.selects.lineChoices = res.data;
    });

    $scope.getAllOptis = function () {
      console.log($scope.manualLine);
      var lala = calc.getAllOptis($scope.manualLine);
      console.log(lala);
      $scope.results.optis = lala;
      console.log($scope.results.optis);
    };
  }]);