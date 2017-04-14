/**
 * Created by Gabriel on 05/04/2017.
 */

angular.module('am2App')
  .controller('mockupController', ['$scope', 'calc', 'planeService', function ($scope, calc, planeService) {
    $scope.selectedLine  = null;
    $scope.selects       = {};
    $scope.manualLine = {};
    $scope.results = {};

    planeService.getPlanes().then(function (res) {
      $scope.planes = res.data;
    });

    $scope.similarLines  = ['SFO-CDG', 'SFO-LHR', 'SFO-AMS', 'SFO-ATH', 'SFO-ORY'];
    $scope.selectedPlane = {
      name: 'N65748',
      type: '787-9',
      hub: 'SFO',
      config: {eco: 180, business: 60, first: 20, cargo: 55},
      dests: ['LHR', 'DRW']
    };
    $scope.chooseLine    = function (line) {
      console.log(line);
      $scope.selects.selectedLine = line;
    };

    $scope.lineChoices = ['SFO-JFK', 'SFO-LHR', 'SFO-GVA', 'SFO-YUL', 'SFO-JNB', 'SFO-ATH'];

    $scope.getAllOptis = function () {
      console.log($scope.manualLine);
      var lala = calc.getAllOptis($scope.manualLine);
      console.log(lala);
      $scope.results.optis = lala;
      console.log($scope.results.optis);
    };
  }]);