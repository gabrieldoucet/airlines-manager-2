am2App
  .factory('linesService', ['hubsService', function (hubsService) {
    var lines;

    var similarProportions = function (x, y) {
      var variation = (x - y) / x * 100;
      return Math.abs(variation) <= 5;
    };

    var isSimilar = function(line1, line2) {
      var demand1 = line1.demand.eco + line1.demand.business + line1.demand.first;
      var demand2 = line2.demand.eco + line2.demand.business + line2.demand.first;
      var similarEco = similarProportions(line1.demand.eco / demand1, line2.demand.eco / demand2);
      var similarBusiness = similarProportions(line1.demand.business / demand1, line2.demand.business / demand2);
      var similarFirst = similarProportions(line1.demand.first / demand1, line2.demand.first / demand2);
      return !_.isEqual(line1, line2) && similarEco && similarBusiness && similarFirst;
    };

    return {
      setLines: function (data) {
        data = _.sortBy(data, [function (line) {return line.from;}, function(line) {return line.to;}])
        lines = data;
      },
      getLines: function () {
        return lines;
      },
      getLineFromTo: function (origin, dest) {
        var resultLine;
        var originIsHub = hubsService.isHub(origin);
        var destIsHub = hubsService.isHub(dest);
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
      },
      getSimilarLines: function (sourceLine) {
        var similarLines = _.filter(lines, function (line) {
          return isSimilar(sourceLine, line);
        });
        return similarLines;
      },
      isSimilar: isSimilar
    };
  }]);