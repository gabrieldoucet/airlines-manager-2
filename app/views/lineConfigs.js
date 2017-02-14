var _ = require('lodash');

angular.module('am2App')
.directive('lineConfigs', function () {
  return {
    templateUrl: './templates/lineConfigs',
    transclude: true,
    scope: {
      optiConfigs: '=data'
    },
    controller: ['$scope', '$filter', 'algo', function ($scope, $filter, algo) {
      $scope.open = true;
      $scope.optimised = false;
      $scope.optiObjects = [];

      $scope.headerClick = function () {
        $scope.open = !$scope.open;
      };

      $scope.getArrowClass = function () {
        return $scope.open ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-right";
      };

      $scope.optimise = function () {
        var objects = _.map($scope.optiObjects, function (obj) {
          return {_weight: obj.percent, _value: 1, key: obj.type};
        });
        $scope.bestCombi = algo.algo(objects);

        _.forEach($scope.bestCombi.objects, function (obj) {
          _.forEach($scope.optiConfigs, function (optiConfig) {
            if (_.isEqual(optiConfig.type, obj.key)) {
              optiConfig.count = obj._count;
            }
          });
        });
        console.log($scope.bestCombi);
        $scope.optimised = true;
      };

      $scope.selectOpti = function() {
        $scope.optiObjects = $filter('filter')($scope.optiConfigs, {checked: true});
      };

      $scope.headerClick = function () {
        $scope.open = !$scope.open;
      };
    }]
  }; 
});