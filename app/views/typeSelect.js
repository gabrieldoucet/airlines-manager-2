angular.module('am2App')
.directive('typeSelect', function () {
  return {
    templateUrl: './templates/typeSelect',
    transclude: true,
    scope: {
      ngModel: '='
    },
    controller: ['$scope', 'planeSpecService', function ($scope, planeSpecService) {
      planeSpecService.getPlanesRef().then(function (res) {
        $scope.planes = res.data;
      });
    }]
  };
});