var _ = require('lodash');

angular.module('am2App')
.factory('hubsService', function () {
  var hubs;
  return {
    setHubs: function (data) {
      hubs = data;
    },
    getHubs: function () {
      return hubs;
    },
    isHub: function (iataCode) {
      var isHub = false;
      _.forEach(hubs, function (hub) {
        if (_.isEqual(hub.code, iataCode)) {
          isHub = true;
        }
      });
      return isHub;
    },
    randomName: function(iataCode) {
      var regexArray;
      _.forEach(hubs, function (hub) {
        if (_.isEqual(hub.code, iataCode)) {
          regexArray = _.get(hub, 'immat');
        }
      })
      var regex;
      if (regexArray.length > 1) {
        var index = Math.floor(regexArray.length * Math.random());
        regex = new RegExp(regexArray[index])
      } else if (regexArray.length === 1) {
        regex = new RegExp(regexArray[0]);
      }
      return new RandExp(regex).gen();
    }
  }
});