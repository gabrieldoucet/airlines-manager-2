var _ = require('lodash');

angular.module('am2App')
.factory('dataService', ['$http', function($http) {

  const DATA_URL = 'http://localhost:3000/data'

  const getHubs = function() {
    return $http({
        method: 'POST',
        url: DATA_URL + '/hubs'
      }).then(function(res) {
        let hubs = _.sortBy(res.data, ['code']);
        return hubs;
      }).catch(function(data) {
        return $http.get('https://gdoucet-fr.github.io/am2/data/hubs.json');
      });

    // TODO
    //return $http({method: 'GET', url: 'https://gdoucet-fr.github.io/am2/data/hubs.json'})
    //  .then(function(res) {
    //    hubs = res.data;
    //    return res;
    //  });
  };

  const getLines = function(query) {
    return $http({
      method: 'POST',
      url: DATA_URL + '/lines',
      data: query
    }).then(function(res) {
      let lines = _.sortBy(res.data, ['from', 'to']);
      return lines;
    }).catch(function(data) {
      return $http.get('https://gdoucet-fr.github.io/am2/data/lines.json');
    });

    // TODO
    //return $http({method: 'GET', url: 'https://gdoucet-fr.github.io/am2/data/lines.json'})
    //  .then(function(res) {
    //    lines = res.data;
    //    return res;
    //  });
  };

  const getPlanes = function(query) {
    return $http({
      method: 'POST',
      url: DATA_URL + '/planes',
      data: query
    }).then(function(res) {
      let planes = _.sortBy(res.data, ['name']);
      return planes;
    }).catch(function(data) {
      return $http.get('https://gdoucet-fr.github.io/am2/data/planes.json');
    });

    //// TODO
    //return $http({method: 'GET', url: 'https://gdoucet-fr.github.io/am2/data/planes.json'})
    //  .then(function(res) {
    //    hubs = res.data;
    //    return res;
    //  })
  };

  const getPlaneTypes = function(query) {
    return $http({
      method: 'POST',
      url: DATA_URL + '/planetypes',
      data: query
    }).then(function(res) {
      planeTypes = _.sortBy(res.data, ['type']);
      return planeTypes;
    }).catch(function(err) {
      console.error(err);
      return [];
//      return $http.get('https://gdoucet-fr.github.io/am2/data/planespecs.json');
    });

    //// TODO
    //return $http({method: 'GET', url: 'https://gdoucet-fr.github.io/am2/data/planespecs.json'})
    //  .then(function(res) {
    //    hubs = res.data;
    //    return res;
    //  });
  };

  return {
    getHubs: getHubs,
    getLines: getLines,
    getPlanes: getPlanes,
    getPlaneTypes: getPlaneTypes
  };
}]);
