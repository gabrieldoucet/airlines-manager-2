/**
 * Created by Gabriel on 16/12/2018.
 */

const _ = require('lodash');

angular.module('am2App')
  .directive('modalAddLine', function() {
    return {
      templateUrl: './templates/modalAddLine',
      transclude: true,
      scope: {},
      controller: ['$scope', 'dataService', 'modalService', 'alertService', function($scope, dataService, modalService, alertService) {

          var fields = ['distance', 'amID', 'from', 'to', 'demand.eco', 'demand.business',
                        'demand.first', 'demand.cargo', 'prices.eco', 'prices.business', 'prices.first', 'prices.cargo'];
          $scope.newLine = {demand: {}, prices: {}};
          $scope.invalidFeedback = {};

          var isNilOrEmpty = function(value) {
            return _.isNil(value) || _.isEqual(value, '');
           };

          var checkLine = function() {
            var booleans = [];
            _.forEach(fields, function(field) {
              var newLineAttribute = _.get($scope.newLine, field);
              var val = isNilOrEmpty(newLineAttribute);
              _.set($scope.invalidFeedback, field, val);
              booleans.push(!val);
            });
            var finalVal = _.reduce(booleans, function(accu, bool) {
              return accu && bool;
            }, booleans[0]);
            return finalVal;
          };

          $scope.addLine = function() {
            var check = checkLine();
            if (check) {
              dataService.addNewLine($scope.newLine).then(function(newLine) {
                modalService.hideNewLineModal();
                $scope.clear();
                console.log('New line has been succesfully added.', newLine);
                var alertMessage = 'The line ' + newLine.from + '-' + newLine.to + ' has successfully been added';
                alertService.alertSuccess(alertMessage);
              }).catch(function(error) {
                console.error('An error occurred while trying to add the line');
                console.log(error);
              });
            }
          };

          $scope.clear = function() {
            $scope.newLine = {};
          };
      }]
    };
  });
