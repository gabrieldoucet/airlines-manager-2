const angular = require('angular');
angular.module('am2App')
  .directive('selectPlane', selectPlane);

function selectPlane() {
  return {
    templateUrl: './directives/selectPlane/select-plane.html',
    scope: {
      plane: '='
    },
    controller: selectPlaneController,
    controllerAs: 'vm',
    bindToController: true
  };
};

selectPlaneController.$inject = ['dataService'];

function selectPlaneController(dataService) {
  const vm = this;
  dataService.getPlanes().then(function (planes) {
    vm.planes = planes;
  });
};
