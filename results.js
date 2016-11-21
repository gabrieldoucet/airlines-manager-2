var am2App = angular.module('AM2App', []);

am2App.directive('results', function () {
  return {
    templateUrl: './directives/rowExpense.html',
    transclude: true,
    scope: {
      expense: '=',
      filter: '='
    },
    link: function ($scope) {
    }