const _ = require('lodash');

angular.module('am2App')
.factory('alertService', [function() {

  let show;
  let hide;

  const register = function(showCb, hideCb) {
    show = showCb;
    hide = hideCb;
  };

  const alertSuccess = function(message) {
    show(0, message);
  };

  const alertWarning = function(message) {
    show(1, message);
  };

  const alertError = function(message) {
    show(2, message);
  };

  const hideAlert = function() {
    hideCb();
  };

  return {
    alertSuccess: alertSuccess,
    alertWarning: alertWarning,
    alertError: alertError,
    hideAlert: hideAlert,
    register: register,
  };
}]);
