angular.module('am2App')
.directive('hubSelect', function () {
  return {
    templateUrl: './templates/hubSelect',
    transclude: true,
    scope: {
      ngModel: '='
    },
    controller: ['$scope', 'hubsService', function ($scope, hubsService) {
      hubsService.getHubs().then(function (res) {
        $scope.hubs = res.data;
      });
    }]
  };
});