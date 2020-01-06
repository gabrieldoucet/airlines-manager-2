/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .controller('ModalAddPlaneController', modalAddPlaneController);

modalAddPlaneController.$inject = ['dataService', 'alertService', 'Popeye', 'line', 'opti'];

function modalAddPlaneController(dataService, alertService, Popeye, line, opti) {
  const vm = this;
  vm.newPlane = {};
  if (!_.isNil(opti)) {
    vm.newPlane.config = {
      eco: opti.config.eco,
      business: opti.config.business,
      first: opti.config.first,
      cargo: opti.config.cargo
    };
    vm.newPlane.type = opti.type
  }
  if (!_.isNil(line)) {
    vm.newPlane.dests = [line.to];
    vm.newPlane.hub = line.from;
  }

  vm.invalidFeedback = {};

  vm.addPlane = function () {
    var amId = vm.newPlane.amID;
    if (_.isNil(amId) || _.isEqual(amId, '')) {
      vm.invalidFeedback.amID = true;
    } else {
      vm.invalidFeedback.amID = false;
      dataService.addNewPlane(vm.newPlane).then(function (newPlane) {
        vm.clear();
        let alertMessage = 'Plane ' + newPlane.name + ' has successfully been added';
        console.log(alertMessage, newPlane);
        alertService.alertSuccess(alertMessage);
        Popeye.closeCurrnetModal();
      }).catch(function (error) {
        console.error('An error occurred while trying to add the plane');
        console.log(error);
      });
    }
  };

  vm.clear = function () {
    vm.newPlane = {
      config: {}
    };
    vm.invalidFeedback = {};
  };
};
