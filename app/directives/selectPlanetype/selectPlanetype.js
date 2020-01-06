const angular = require('angular');
const _ = require('lodash');

angular.module('am2App')
  .directive('selectPlaneType', selectPlanetype);

function selectPlanetype() {
  return {
    templateUrl: './directives/selectPlanetype/select-planetype.html',
    scope: {
      planeType: '='
    },
    controller: selectPlanetypeController,
    controllerAs: 'vm',
    bindToController: true
  };
};

selectPlanetypeController.$inject = ['dataService'];

function selectPlanetypeController(dataService) {
  const vm = this;
  dataService.getPlaneTypes().then(function (planeTypes) {
    vm.planeTypes = _.map(planeTypes, function (planeType) {
      return planeType.type;
    });
  });
};
