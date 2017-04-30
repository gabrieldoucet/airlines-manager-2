const _ = require('lodash');

angular.module('am2App')
  .factory('linesService', ['$http', 'hubsService', function ($http, hubsService) {
    let lines;
    const similarProportions = function (x, y) {
      const variation = (x - y) / x * 100;
      return Math.abs(variation) <= 5;
    };

    const isEqual = function (line1, line2) {
      const obj1 = _.pick(line1, ['from', 'to']);
      const obj2 = _.pick(line2, ['from', 'to']);
      return _.isEqual(obj1, obj2);
    };

    const isSimilar = function (line1, line2) {
      const demand1         = line1.demand.eco + line1.demand.business + line1.demand.first;
      const demand2         = line2.demand.eco + line2.demand.business + line2.demand.first;
      const similarEco      = similarProportions(line1.demand.eco / demand1, line2.demand.eco / demand2);
      const similarBusiness = similarProportions(line1.demand.business / demand1, line2.demand.business / demand2);
      const similarFirst    = similarProportions(line1.demand.first / demand1, line2.demand.first / demand2);
      return !isEqual(line1, line2) && similarEco && similarBusiness && similarFirst;
    };

    const setLines = function (data) {
      data  = _.sortBy(data, [function (line) {
        return line.from;
      }, function (line) {
        return line.to;
      }]);
      lines = data;
    };

    const getLines = function (query) {
      return $http({method: 'POST', url: 'http://localhost:3000/data/lines', data: query})
        .then(function (res) {
          return res;
        }).catch(function (data) {
        return $http.get('https://gdoucet-fr.github.io/am2/data/lines.json');
      });
    };

    const getLinesFromTo = function (origin, dest) {
      let resultLine    = null;
      const originIsHub = hubsService.isHub(origin);
      const destIsHub   = hubsService.isHub(dest);
      //console.log(origin, hubsService.isHub(origin));
      _.forEach(lines, function (line) {
        if (originIsHub && destIsHub) {
          if ((_.isEqual(origin, line.from) && _.isEqual(dest, line.to)) ||
            (_.isEqual(origin, line.to) && _.isEqual(dest, line.from))) {
            resultLine = line;
          }
        } else {
          if (_.isEqual(origin, line.from) && _.isEqual(dest, line.to)) {
            resultLine = line;
          }
        }
      });
      return resultLine;
    };

    const getSimilarLines = function (sourceLine) {
      return getLines().then(function (res) {
        const lines        = res.data;
        const similarLines = _.filter(lines, function (line) {
          return isSimilar(sourceLine, line);
        });
        return similarLines;
      });
    };

    return {
      setLines: setLines,
      getLines: getLines,
      getLineFromTo: getLinesFromTo,
      getSimilarLines: getSimilarLines,
      isSimilar: isSimilar
    };
  }]);