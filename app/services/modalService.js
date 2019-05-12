const _ = require('lodash');

angular.module('am2App')
.factory('modalService', ['$http', function($http) {

  const showNewPlaneModal = function() {
    $("#modalAddPlane").modal({show: true, focus: true});
  };

  const hideNewPlaneModal = function() {
    $("#modalAddPlane").modal('hide');
  };

  const showNewLineModal = function() {
    $("#modalAddLine").modal({show: true, focus: true});
  };

  const hideNewLineModal = function() {
    $("#modalAddLine").modal('hide');
  };

  return {
    showNewPlaneModal: showNewPlaneModal,
    hideNewPlaneModal: hideNewPlaneModal,
    showNewLineModal: showNewLineModal,
    hideNewLineModal: hideNewLineModal
  };
}]);
