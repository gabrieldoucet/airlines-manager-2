/**
 * Created by Gabriel on 05/04/2017.
 */

const _ = require('lodash');

angular.module('am2App')
  .controller('RootController', rootController);

rootController.$inject = ['calc', 'dataService'];

function rootController(calc, dataService) {
  const vm = this;
  vm.chooseLine = function (line) {
    vm.selects.line = line;
  };

  vm.choosePlane = function (plane) {
    vm.selects.plane = plane;
  };

  vm.selects = {
    manualInput: false
  };

  vm.getAllOptis = function () {
    dataService.getPlaneTypes().then(function (planeTypes) {
      let optis = _.map(planeTypes, function (planeType) {
        return calc.getOptimisation(planeType, vm.selects.line);
      });
      optis = _.sortBy(optis, ['percent']);
      console.log(optis);
      _.set(vm.selects.line, 'optis', optis);
    });
  };

  vm.toggleManual = function () {
    if (!vm.selects.manualInput) {
      vm.selects.lineClone = _.cloneDeep(vm.selects.line);
    } else {
      vm.selects.line = _.cloneDeep(vm.selects.lineClone);
    }
    vm.selects.manualInput = !vm.selects.manualInput;
    //MDL Text Input Cleanup
    function mdlCleanUp() {
      var mdlInputs = doc.querySelectorAll('.mdl-js-textfield');
      for (var i = 0, l = mdlInputs.length; i < l; i++) {
        console.log(mdlInputs[i]);
        mdlInputs[i].MaterialTextfield.checkDirty();
      }
    }
  };

  vm.reset = function () {
    vm.selects.line = _.cloneDeep(vm.selects.lineClone);
  };
};
