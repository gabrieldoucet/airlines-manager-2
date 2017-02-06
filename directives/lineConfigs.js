var am2App = angular.module('am2App');

am2App.
  directive('lineConfigs', function () {
    return {
      templateUrl: './directives/line-configs.html',
      transclude: true,
      scope: {
        optiConfigs: '=data'
      },
      controller: ['$scope', '$filter', 'algo', function ($scope, $filter, algo) {
        $scope.open = true;
        $scope.knapsackOptis = [];

        $scope.headerClick = function () {
          $scope.open = !$scope.open;
        };

        $scope.getArrowClass = function () {
          return $scope.open ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-right";
        };

        $scope.optimise = function () {
          var objects = _.map($scope.knapsackOptis, function (opti) {
            return {type: opti.type, weight: opti.percent, value: 1};
          });
          $scope.bestCombi = algo.algo(objects);
        };

        $scope.selectOpti = function() {
          $scope.knapsackOptis = $filter('filter')($scope.optiConfigs, {checked: true});
        };

        $scope.headerClick = function () {
          $scope.open = !$scope.open;
        };
      }]
    }; 
  });