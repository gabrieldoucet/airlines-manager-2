var am2App = angular.module('am2App');

am2App.
  directive('lineConfigs', function () {
    return {
      templateUrl: './directives/line-configs.html',
      transclude: true,
      scope: {
        optiConfigs: '=data'
      },
      controller: ['$scope', function ($scope) {
        $scope.open = true;

        $scope.headerClick = function () {
          $scope.open = !$scope.open;
        };

        $scope.getArrowClass = function () {
          return $scope.open ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-right";
        };
      }]
    }; 
  });