/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .controller('ModalAddHubController', modalAddHubController);

function modalAddHubController() {
  const vm = this;
  vm.newHub = {};

  vm.addHub = function () {
    console.log('New hub details:', vm.newHub);
  };

  vm.reset = function () {
    vm.newHub = {};
  };
};
