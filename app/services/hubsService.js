const _ = require('lodash');

angular.module('am2App')
  .factory('hubsService', ['$http', function ($http) {
    let hubs;

    const getHubs = function () {
      return $http({method: 'POST', url: 'http://localhost:3000/data/hubs'})
        .then(function (res) {
          return res;
        })
        .catch(function (data) {
          return $http.get('https://gdoucet-fr.github.io/am2/data/hubs.json');
        });
    };

    const setHubs = function (data) {
      hubs = data;
    };

    const isHub = function (iataCode) {
      let isHub = false;
      _.forEach(hubs, function (hub) {
        if (_.isEqual(hub.code, iataCode)) {
          isHub = true;
        }
      });
      return isHub;
    };

    const randomName = function (iataCode) {
      let regexArray = [];
      _.forEach(hubs, function (hub) {
        if (_.isEqual(hub.code, iataCode)) {
          regexArray = _.get(hub, 'immat');
        }
      });
      let regex;
      if (regexArray.length > 1) {
        const index = Math.floor(regexArray.length * Math.random());
        regex       = new RegExp(regexArray[index]);
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
    };
  }]);