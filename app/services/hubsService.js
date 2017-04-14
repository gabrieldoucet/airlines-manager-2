var _ = require('lodash');

angular.module('am2App')
.factory('hubsService', ['$http', function ($http) {
  var hubs;

  var getHubs = function () {
    return $http({method: 'POST', url: 'http://localhost:3000/data/hubs'});
  };

  var setHubs = function (data) {
    hubs = data;
  };

  var isHub = function (iataCode) {
    var isHub = false;
    _.forEach(hubs, function (hub) {
      if (_.isEqual(hub.code, iataCode)) {
        isHub = true;
      }
    });
    return isHub;
  };

  var randomName = function(iataCode) {
    var regexArray = [];
    _.forEach(hubs, function (hub) {
      if (_.isEqual(hub.code, iataCode)) {
        regexArray = _.get(hub, 'immat');
      }
    });
    var regex;
    if (regexArray.length > 1) {
      var index = Math.floor(regexArray.length * Math.random());
      regex = new RegExp(regexArray[index])
    } else if (regexArray.length === 1) {
      regex = new RegExp(regexArray[0]);
    }
    return new RandExp(regex).gen();
  };

  return {
    setHubs: setHubs,
    getHubs: getHubs,
    isHub: isHub,
    randomName: randomName
  }
}]);