const angular = require('angular');
angular.module('am2App')
  .directive('lineConfig', lineConfig);

function lineConfig() {
  return {
    templateUrl: './directives/lineConfig/line-config.html',
    transclude: true,
    scope: {
      line: '='
    },
    controller: lineConfigController,
    controllerAs: 'vm',
    bindToController: true
  };
};


lineConfigController.$inject = ['Popeye'];

function lineConfigController(Popeye) {
  const vm = this;
  vm.newPlane = {
    config: {}
  };

  vm.addNewPlane = function (opti) {
    let modal = Popeye.openModal({
      templateUrl: "./views/modals/modal-add-plane.html",
      controller: "ModalAddPlaneController as vm",
      resolve: {
        line: function() {
          return vm.line;
        },
        opti: function () {
          return opti;
        }
      }
    });
//    modalService.showNewPlaneModal();
  };
};
