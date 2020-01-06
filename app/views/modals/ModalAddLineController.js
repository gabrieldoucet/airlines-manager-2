/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .controller('ModalAddLineController', modalAddLineController);

modalAddLineController.$inject = ['dataService', 'alertService'];

function modalAddLineController(dataService, alertService) {
  const vm = this;
  const fields = ['distance', 'amID', 'from', 'to', 'demand.eco', 'demand.business',
    'demand.first', 'demand.cargo', 'prices.eco', 'prices.business', 'prices.first', 'prices.cargo'
  ];

  vm.newLine = {
    demand: {},
    prices: {}
  };
  vm.invalidFeedback = {};

  const isNilOrEmpty = function (value) {
    return _.isNil(value) || _.isEqual(value, '');
  };

  const checkLine = function () {
    var booleans = [];
    _.forEach(fields, function (field) {
      var newLineAttribute = _.get(vm.newLine, field);
      var val = isNilOrEmpty(newLineAttribute);
      _.set(vm.invalidFeedback, field, val);
      booleans.push(!val);
    });
    var finalVal = _.reduce(booleans, function (accu, bool) {
      return accu && bool;
    }, booleans[0]);
    return finalVal;
  };

  vm.addLine = function () {
    var check = checkLine();
    if (check) {
      dataService.addNewLine(vm.newLine).then(function (newLine) {
        vm.clear();
        console.log('New line has been succesfully added.', newLine);
        var alertMessage = 'The line ' + newLine.from + '-' + newLine.to + ' has successfully been added';
        alertService.alertSuccess(alertMessage);
        vm.close();
      }).catch(function (error) {
        console.error('An error occurred while trying to add the line');
        console.log(error);
      });
    }
  };

  vm.clear = function () {
    vm.newLine = {};
  };

  vm.close = function() {
    Popeye.closeCurrentModal();
  };
};
