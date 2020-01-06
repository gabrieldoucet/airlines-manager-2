const angular = require('angular');
const _ = require('lodash');

angular.module('am2App')
  .directive('selectHub', selectHub);

function selectHub() {
  return {
    templateUrl: './directives/selectHub/select-hub.html',
    scope: {
      hub: '='
    },
    controller: selectHubController,
    controllerAs: 'vm',
    bindToController: true
  };
};
selectHubController.$inject = ['dataService'];

function selectHubController(dataService) {
  const vm = this;
  dataService.getHubs().then(function (hubs) {
    vm.hubs = _.map(hubs, function (hub) {
      return hub.code
    });
  });
};
