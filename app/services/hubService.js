const _ = require('lodash');

angular.module('am2App')
  .factory('hubService', ['dataService', 'planeService', function(dataService, planeService) {

    const generateName = function(hubCode) {

      return dataService.getHubs().then(function(hubs) {
        // Get all the registration regular expressions for the country of the hub
        hubObject = _.find(hubs, function(hub) {
          return _.isEqual(hub.code, hubCode)
        });
        let regexArray = _.get(hubObject, 'immat');

        let regex;
        let index = 0;
        let name = '';
        if (regexArray.length > 1) { // If more that one registration form in the country, pick one randomly
          index = Math.floor(regexArray.length * Math.random());
        }
        regex = new RegExp(regexArray[index]);
        name = new RandExp(regex).gen();
        return name;
      });
    };

    // firstThingAsync()
    //   .then(function(result1) {
    //     return Promise.all([result1, secondThingAsync(result1)]);
    //   })
    //   .then(function(results) {
    //     // do something with results array: results[0], results[1]
    //   })
    //   .catch(function(err){ /* ... */ });

    const getRandomName = function(hubCode) {
      return generateName(hubCode).then(function(name) {
        return Promise.all([name, planeService.nameExists(name)]);
      }).then(function(results) {
        let name = results[0];
        let nameExists = [results][1];
        console.log('being called');
        if (!nameExists) {
          return name;
        } else {
          return 'error';
        }
      });
    };

    return {
      getRandomName: getRandomName
    };
  }]);
