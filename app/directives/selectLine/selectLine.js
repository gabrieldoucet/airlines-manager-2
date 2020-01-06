const angular = require('angular');
const _ = require('lodash');

angular.module('am2App')
  .directive('selectLine', selectLine);

function selectLine() {
  return {
    templateUrl: './directives/selectLine/select-line.html',
    scope: {
      line: '='
    },
    controller: selectLineController,
    controllerAs: 'vm',
    bindToController: true
  };
};

selectLineController.$inject = ['dataService'];

function selectLineController(dataService) {
  const vm = this;
  dataService.getLines().then(function (lines) {
    vm.lines = lines;
  });
};
