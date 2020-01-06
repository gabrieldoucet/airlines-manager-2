const _ = require('lodash');

angular.module('am2App')
  .directive('viewLine', viewLine);

function viewLine() {
  return {
    templateUrl: './directives/viewLine/view-line.html',
    scope: {
      line: '=',
      chooseLine: '=',
      choosePlane: '='
    },
    controller: viewLineController,
    controllerAs: 'vm',
    bindToController: true
  };
};

viewLineController.$inject = ['$scope', 'lineService'];

function viewLineController($scope, lineService) {
  const vm = this;
  $scope.$watch('vm.line', function (line) {
    if (!_.isNil(line)) {

      // Get the similar lines
      lineService.getSimilarLines(line).then(function (data) {
        vm.similarLines = data;
      });

      // Get the compatible planes
      lineService.getCompatiblePlanes(line).then(function (data) {
        console.log(data);
        vm.compatiblePlanes = data;
      });
    }
  }, true);
};
