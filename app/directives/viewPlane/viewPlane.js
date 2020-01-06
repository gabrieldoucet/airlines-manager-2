const angular = require('angular');
const _ = require('lodash');

angular.module('am2App')
  .directive('viewPlane', viewPlane);

function viewPlane() {
  return {
    templateUrl: './directives/viewPlane/view-plane.html',
    transclude: true,
    scope: {
      plane: '=',
      chooseLine: '='
    },
    controller: viewPlaneController,
    controllerAs: 'vm',
    bindToController: true
  };
};

viewPlaneController.$inject = ['lineService'];

function viewPlaneController(lineService) {
  const vm = this;
  vm.chooseDestination = function (to) {
    if (!_.isNil(vm.plane)) {
      lineService.getLineFromOriginAndDest(vm.plane.hub, to).then(function (line) {
        console.log('Will select line:', line);
        vm.chooseLine(line);
      });
    }
  };
};
