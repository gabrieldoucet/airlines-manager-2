const _ = require('lodash');

angular.module('am2App')
  .factory('lineService', ['dataService', function(dataService) {

    const similarProportions = function(x, y) {
      const variation = (x - y) / x * 100;
      return Math.abs(variation) <= 5;
    };

    const isEqual = function(line1, line2) {
      const obj1 = _.pick(line1, ['from', 'to']);
      const obj2 = _.pick(line2, ['from', 'to']);
      return _.isEqual(obj1, obj2);
    };

    const isSimilar = function(line1, line2) {
      const demand1         = line1.demand.eco + line1.demand.business + line1.demand.first;
      const demand2         = line2.demand.eco + line2.demand.business + line2.demand.first;
      const similarEco      = similarProportions(line1.demand.eco / demand1, line2.demand.eco / demand2);
      const similarBusiness = similarProportions(line1.demand.business / demand1, line2.demand.business / demand2);
      const similarFirst    = similarProportions(line1.demand.first / demand1, line2.demand.first / demand2);
      return !isEqual(line1, line2) && similarEco && similarBusiness && similarFirst;
    };

    const getLinesFromTo = function(origin, dest) {
      let query = {from: origin, to: dest};
      return dataService.getLines(query).then(function(lines) {
          return lines[0];
      }).catch(function() {
        return null;
      });
    };

    const getSimilarLines = function(sourceLine) {
      return dataService.getLines().then(function(lines) {
        const similarLines = _.filter(lines, function(line) {
          return isSimilar(sourceLine, line);
        });
        return similarLines;
      });
    };

    const getCompatiblePlanes = function(line) {

      return dataService.getPlanes().then(function(planes) {

        // Get the compatible plane types for the selected line
        let typeMap = {};
        _.forEach(_.get(line, 'optis'), function(bestPlane) {
          _.set(typeMap, _.get(bestPlane, 'type'), true);
        });

        // Get all compatible planes for the line, even the ones not optimised
        let compatiblePlanes = _.filter(planes, function(plane) {
          return _.get(typeMap, _.get(plane, 'type'), false);
        });

        // Keep those who are not already assigned to the line
        let compatiblePlanesNotAssigned = _.xorBy(compatiblePlanes, line.planes, 'name');

        // Return the planes, sorted by name
        return _.sortBy(compatiblePlanesNotAssigned, ['name']);
      });
    };

    return {
      getLineFromTo: getLinesFromTo,
      getSimilarLines: getSimilarLines,
      isSimilar: isSimilar,
      getCompatiblePlanes: getCompatiblePlanes
    };
  }]);
