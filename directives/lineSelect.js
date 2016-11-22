var am2App = angular.module('am2App');

am2App.directive('lineSelect', function () {
  return {
    templateUrl: './directives/line-select.html',
    transclude: true,
    scope: {
      expenses: '='
    },
    controller: ['$scope', 'loader', function ($scope, loader) {
      $scope.lines = [];
      loader('lines.json', function(res) {
        console.log(res.data);
        $scope.lines = res.data;
      });
    }]
  };
});