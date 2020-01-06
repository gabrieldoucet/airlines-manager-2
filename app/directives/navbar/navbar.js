const angular = require('angular');
angular.module('am2App')
  .directive('navbar', navbar);

function navbar() {
  return {
    templateUrl: './directives/navbar/navbar.html',
    scope: {
      title: '='
    },
    controller: navbarController,
    controllerAs: 'vm',
    bindToController: true
  };
};

navbarController.$inject = ['Popeye'];

function navbarController(Popeye) {
  const vm = this;
  vm.showNewPlaneModal = function () {
    let modal = Popeye.openModal({
      templateUrl: "./views/modals/modal-add-plane.html",
      resolve: {
        line: function() {
          return null;
        },
        opti: function() {
          return null;
        }
      },
      controller: "ModalAddPlaneController as vm",
    });
  };
};
