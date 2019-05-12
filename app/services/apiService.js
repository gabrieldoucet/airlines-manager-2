const _ = require('lodash');

angular.module('am2App')
.factory('apiService', ['$http', function($http) {

  const API_URL = 'http://localhost:8002/api'

  const getLineFromOriginAndDest = function(origin, destination) {
    let data = {from: origin, to: destination};
    console.log('Will POST the following data:', data);
    return $http({
      method: 'POST',
      url: API_URL + '/get-line-from-origin-dest',
      data: data
    }).then(function(res) {
      let line = res.data;
      return line;
    }).catch(function(error) {
      return {};
    });
  };

  return {
    getLineFromOriginAndDest: getLineFromOriginAndDest
  };
}]);
