/**
 * Created by Gabriel on 26/12/2018.
 */
angular.module('am2App')
  .directive('listPlane', listPlane);

function listPlane() {
  return {
    templateUrl: './directives/listPlane/list-plane.html',
    scope: {
      planes: '=',
      title: '=',
      line: '=',
      choosePlane: '='
    },
    controller: listPlaneController,
    controllerAs: 'vm',
    bindToController: true
  };
};

listPlaneController.$inject = ['planeService'];

function listPlaneController(planeService) {
  const vm = this;
  vm.show = true;
  vm.toggle = function () {
    vm.show = !vm.show;
  }

  vm.isPlaneOptimised = function (plane) {
    return planeService.isOptimisedForLine(plane, vm.line);
  };
};
