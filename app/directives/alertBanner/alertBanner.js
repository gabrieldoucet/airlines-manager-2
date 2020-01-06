const angular = require('angular');
angular.module('am2App')
  .directive('alertBanner', alertBanner);

function alertBanner() {
  return {
    templateUrl: './directives/alertBanner/alert-banner.html',
    scope: {},
    controller: alertBannerController,
    controllerAs: 'vm',
    bindToController: true
  };
};

alertBannerController.$inject = ['alertService'];

function alertBannerController(alertService) {
  const vm = this;
  vm.alert = {
    show: false,
    class: ''
  };

  vm.showAlert = function (type, message) {
    vm.alert.type = type;
    if (type === 0) {
      vm.alert.class = 'alert-success';
    } else if (type === 1) {
      vm.alert.class = 'alert-warning';
    } else if (type === 2) {
      vm.alert.class = 'alert-danger';
    }
    vm.alert.show = true;
    vm.message = message;
  };

  vm.hideAlert = function () {
    vm.alert.show = false;
  };

  alertService.register(vm.showAlert, vm.hideAlert);
};
