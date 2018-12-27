const _ = require('lodash');

angular.module('am2App')
  .factory('hubService', ['$http','planeService', function($http, planeService) {
    let hubs;

    const getHubs = function() {
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/data/hubs'
        })
        .then(function(res) {
          hubs = res.data;
          return res;
        })
        .catch(function(data) {
          return $http.get('https://gdoucet-fr.github.io/am2/data/hubs.json');
        });

      // TODO
      //return $http({method: 'GET', url: 'https://gdoucet-fr.github.io/am2/data/hubs.json'})
      //  .then(function (res) {
      //    hubs = res.data;
      //    return res;
      //  });
    };

    const isHub = function(iataCode) {
      let isHub = false;
      _.forEach(hubs, function(hub) {
        if (_.isEqual(hub.code, iataCode)) {
          isHub = true;
        }
      });
      return isHub;
    };

    const generateName = function(hubCode) {

      // Get all the registration regular expressions for the country
      let regexArray = [];
      _.forEach(hubs, function(hub) {
        if (_.isEqual(hub.code, hubCode)) {
          regexArray = _.get(hub, 'immat');
        }
      });

      let regex;
      if (regexArray.length > 1) { // If more that one registration form in the country, pick one randomly
        const index = Math.floor(regexArray.length * Math.random());
        regex = new RegExp(regexArray[index]);
      } else if (regexArray.length === 1) {
        regex = new RegExp(regexArray[0]);
      }
      let name = new RandExp(regex).gen();
      return name;
    };

    const getRandomName = function(hubCode) {
      let name = generateName(hubCode);
      let validName = planeService.nameExists(name);
      if (validName) {
        return name;
      } else {
        return 'error';
      }
    };

    return {
      getHubs: getHubs,
      isHub: isHub,
      getRandomName: getRandomName
    };
  }]);
