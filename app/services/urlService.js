const _ = require('lodash');

angular.module('am2App')
  .factory('urlService', [function() {
      let planeUrl = "https://www.airlines-manager.com/aircraft/show/";

      const getPlaneUrl = function(plane) {
        if (!_.isNil(plane)) {
          return planeUrl + plane.amID;
        }
      };

      return {
        getPlaneUrl: getPlaneUrl
      };
  }]);
