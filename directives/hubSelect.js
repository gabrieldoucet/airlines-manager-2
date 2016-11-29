var am2App = angular.module('am2App');

am2App.directive('hubSelect', function () {
  return {
    templateUrl: './directives/hub-select.html',
    transclude: true,
    scope: {
      ngModel: '='
    },
    controller: ['$scope', 'hubsService', function ($scope, hubsService) {
      $scope.hubs = hubsService.getHubs();
    }]
  };
});