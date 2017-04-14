var _ = require('lodash');

angular.module('am2App')
  .controller('fleetController', ['$scope', 'planeService', 'linesService', 'hubsService', 'calc', 'models',
    function fleetController($scope, planeService, linesService, hubsService, calc, models) {
      $scope.optiPlane = new models.Plane();

      $scope.$watch('optiPlane.type', function (newVal) {
        if (!_.isNil(newVal)) {
//      $scope.optiLines = calc.getOptiLines($scope.optiPlane);
          calc.getOptiLines($scope.optiPlane).then(function (data) {
            $scope.optiLines = data;
            console.log(data);
          });
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
      $scope.newPlane = new models.Plane();
      /*  $scope.$watch('newPlane.hub', function (newValue) {
       if (hubsService.isHub($scope.newPlane.hub)) {
       console.log($scope.newPlane);
       $scope.newPlane.availableLines = _.filter(linesService.getLines(), function (line) {
       return _.isEqual(line.from, newValue);
       });
       }
       }, true);*/

      // Get the whole fleet
      planeService.getPlanes().then(function (res) {
        $scope.fleet = res.data;
      });

      $scope.addToFleet = function () {
        // console.log($scope.avion);
        $scope.fleet.push($scope.newPlane);
      };

      $scope.$watch($scope.fleet, function () {
      }, true);

    }]);