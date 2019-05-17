var _ = require('lodash');

angular.module('am2App')
.factory('dataService', ['$http', function($http) {

  const HUB_URL = 'http://localhost:3000/hub'
  const LINE_URL = 'http://localhost:3000/line'
  const PLANE_URL = 'http://localhost:3000/plane'
  const PLANETYPE_URL = 'http://localhost:3000/planetype'

  const getHubs = function() {
    return $http({
        method: 'GET',
        url: HUB_URL
      }).then(function(res) {
        let hubs = _.sortBy(res.data, ['code']);
        return hubs;
      }).catch(function(error) {
        return [];
      });
  };

  const getLines = function() {
    return $http({
      method: 'GET',
      url: LINE_URL,
    }).then(function(res) {
      let lines = _.sortBy(res.data, ['from', 'to']);
      return lines;
    }).catch(function(error) {
      return [];
    });
  };

  const getPlanes = function() {
    return $http({
      method: 'GET',
      url: PLANE_URL,
    }).then(function(res) {
      let planes = _.sortBy(res.data, ['name']);
      return planes;
    }).catch(function(error) {
      return [];
    });
  };

  const getPlaneByName = function(planeName) {
    return $http({
      method: 'GET',
      url: PLANE_URL + '/' + planeName
    }).then(function(res) {
      let planes = _.sortBy(res.data, ['name']);
      return planes;
    }).catch(function(error) {
      return [];
    });
  };

  const getPlaneTypes = function(query) {
    return $http({
      method: 'GET',
      url: PLANETYPE_URL,
      data: query
    }).then(function(res) {
      planeTypes = _.sortBy(res.data, ['type']);
      return planeTypes;
    }).catch(function(err) {
      console.error(err);
      return [];
    });
  };

  const addNewLine = function(newLine) {
    console.log('Details of the new line to add:', newLine);
    return $http({
      method: 'POST',
      url: LINE_URL + '/' + newLine.from + '/' + newLine.to,
      data: newLine
    }).then(function(res) {
      console.log(res.data);
      return res.data;
    }).catch(function(err) {
      console.error(err);
      return false;
    });
  };


  const addNewPlane = function(newPlane) {
    console.log('Details of the new plane to add:', newPlane);
    return $http({
      method: 'POST',
      url: PLANE_URL + '/' + newPlane.name,
      data: newPlane
    }).then(function(res) {
      console.log(res.data);
      return res.data;
    }).catch(function(err) {
      console.error(err);
      return false;
    });
  };

  return {
    getHubs: getHubs,
    getLines: getLines,
    addNewLine: addNewLine,
    getPlanes: getPlanes,
    addNewPlane: addNewPlane,
    getPlaneByName: getPlaneByName,
    getPlaneTypes: getPlaneTypes,
    HUB_URL: HUB_URL,
    PLANE_URL: PLANE_URL
  };
}]);
