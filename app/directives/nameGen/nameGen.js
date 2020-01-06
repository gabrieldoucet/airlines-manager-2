const angular = require('angular');
const _ = require('lodash');

angular.module('am2App')
  .directive('nameGen', nameGen);

function nameGen() {
  return {
    transclude: true,
    scope: {
      hub: '=',
      name: '='
    },
    controller: nameGenController,
    controllerAs: 'vm',
    bindToController: true
  };
};

nameGenController.$inject = ['$scope', 'hubService'];

function nameGenController($scope, hubService) {
  const vm = this;
  vm.newPlane = {};

  $scope.$watch('hub', function (newVal) {
    if (!_.isNil(newVal)) {
      hubService.getRandomName(vm.hub).then(function (name) {
        vm.name = name;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, true);
};
