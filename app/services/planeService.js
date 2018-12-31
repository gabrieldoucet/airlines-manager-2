const _ = require('lodash');

angular.module('am2App')
  .factory('planeService', ['dataService', 'calc', function(dataService, calc) {

    // Should return true is a plane is found
    const nameExists = function(planeName) {
      return dataService.getPlanes({name: planeName}).then(function(planes) {
        return !_.isNil(planes[0]);
      });
    };

    const isOptimisedForLine = function(plane, line) {

      const bestPlanes = _.get(line, 'optis');
      const bestPlane = _.find(bestPlanes, function(bestPlane) {
        return _.isEqual(_.get(plane, 'type'), _.get(bestPlane, 'type'));
      });
      if (!_.isNil(bestPlane)) {
        let optimised = calc.compareToBestPlane(plane, bestPlane);
        return optimised;
      } else {
        return false;
      }
    };

    const getOptiLines = function(plane) {
      return dataService.getLines().then(function(lines) {
        let optiLines = _.filter(lines, function(line) {
          return isOptimisedForLine(plane, line);
        });
        return optiLines;
      });
    };

    return {
      nameExists: nameExists,
      isOptimisedForLine: isOptimisedForLine,
      getOptiLines: getOptiLines
    };
  }]);
