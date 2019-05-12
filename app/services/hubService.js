const _ = require('lodash');

angular.module('am2App')
  .factory('hubService', ['$http', 'dataService', 'planeService', function($http, dataService, planeService) {

    const getHubByCode = function(code) {
      return $http({
          method: 'GET',
          url: dataService.HUB_URL + '/' + code
        }).then(function(res) {
          let hub = res.data;
          return hub;
        }).catch(function(error) {
          return {};
        });
    };

    const generateName = function(hubCode) {

      return getHubByCode(hubCode).then(function(hubObject) {
        // Get all the registration regular expressions for the country of the hub
        let regexArray = _.get(hubObject, 'immat');
        let regex;
        let index = 0;
        let name = '';
        if (regexArray.length > 1) { // If more that one registration form in the country, pick one randomly
          index = Math.floor(regexArray.length * Math.random());
        }
        regex = new RegExp(regexArray[index]);
        name = new RandExp(regex).gen();
        console.log(regex, name);
        return name;
      }).catch(function(error) {
        console.log(error);
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
        let nameExists = results[1];
        if (!nameExists) {
          return name;
        } else {
          return 'error';
        }
      });
    };

    return {
      getRandomName: getRandomName,
      getHubByCode: getHubByCode
    };
  }]);
