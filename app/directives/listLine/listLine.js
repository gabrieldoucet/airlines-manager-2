const angular = require('angular');
angular.module('am2App')
  .directive('listLine', listLine);

function listLine() {
  return {
    templateUrl: './directives/listLine/list-line.html',
    scope: {
      title: '=',
      lines: '=',
      chooseLine: '='
    },
    controller: listLineController,
    controllerAs: 'vm',
    bindToController: true
  };
};

function listLineController() {
  const vm = this;
  vm.show = true;

  vm.toggle = function () {
    vm.show = !vm.show;
  };
};
