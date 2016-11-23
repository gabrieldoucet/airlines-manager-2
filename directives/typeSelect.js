var am2App = angular.module('am2App');

am2App.directive('typeSelect', function () {
  return {
    templateUrl: './directives/type-select.html',
    transclude: true,
    scope: {
      expenses: '='
    },
    controller: ['$scope', 'loader', function ($scope, loader) {
      $scope.planes = [];
      loader('planes.json', function(res) {
        $scope.planes = res.data;
      });
    }]
  };
});