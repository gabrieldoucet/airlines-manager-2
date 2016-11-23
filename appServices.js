am2App
  .factory('hubsService', function () {
    var hubs;
    return {
      setHubs: function (data) {
        hubs = data;
      },
      getHubs: function () {
        return hubs;
      },
      isHub: function (iataCode) {
        var isHub = false;
        _.forEach(hubs, function (hub) {
          if (_.isEqual(hub.code, iataCode)) {
            isHub = true;
          }
        });
        return isHub;
      }
    }
  });

am2App
  .factory('fleetService', function() {
    var fleet;
    return {
      setFleet: function (data) {
        fleet = data;
      },
      getFleet: function () {
        return fleet;
      },
      getPlaneFromName: function (planeName) {
        var selection = _.filter(fleet, function (plane) {
          return _.isEqual(plane.name, planeName);
        });
        return selection[0];
      }
    }
  })

am2App
  .factory('linesService', ['hubsService', function (hubsService) {
    var lines;
    return {
      setLines: function (data) {
        lines = data;
      },
      getLines: function () {
        return lines;
      },
      getLinesFromTo: function (origin, dest) {
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
        var isSimilar = function (x, y) {
          var variation = (x - y) / x * 100;
          return Math.abs(variation) <= 5;
        };

        var sourceDemand = sourceLine.demand.eco + sourceLine.demand.business + sourceLine.demand.first;
        var proportions = {
          eco: sourceLine.demand.eco / sourceDemand,
          business: sourceLine.demand.business / sourceDemand,
          first: sourceLine.demand.first / sourceDemand
        };
        var similarLines = _.filter(lines, function (line) {
          var targetDemand = line.demand.eco + line.demand.business + line.demand.first;
          var similarEco = isSimilar(proportions.eco, line.demand.eco / targetDemand);
          var similarBusiness = isSimilar(proportions.business, line.demand.business / targetDemand);
          var similarFirst = isSimilar(proportions.first, line.demand.first / targetDemand);
          return !_.isEqual(line, sourceLine) && similarEco && similarBusiness && similarFirst;
        });
        return similarLines;
      }
    }
  }])

am2App
  .factory('planesRefService', function() {
    var planesRef;
    return {
      setPlanesRef: function (data) {
        planesRef = data;
      },
      getPlanesRef: function () {
        return planesRef;
      },
      getSeatsFromType: function(type) {
        var seats = 0;
        _.forEach(planesRef, function (plane) {
          if (_.isEqual(plane.type, type)) {
             seats = plane.seats;
          }
        });
        return seats;
      }
    }
  })

am2App
  .factory('calc', ['planesRefService', function(planesRefService) {
    var coeffs = {eco: 1, business: 1.8, first: 4.23};
    return {
      getOptimisation: function (plane, line) {
        var demand = line.demand.eco + line.demand.business + line.demand.first;
        var pEco = line.demand.eco / demand;
        var pBusiness = line.demand.business / demand;
        var pFirst = line.demand.first / demand;
        var seats = planesRefService.getSeatsFromType(plane.type);
        var optiSeats = seats / (pEco + pBusiness * coeffs.business + pFirst * coeffs.first);
        var optiEco = _.round(pEco * optiSeats);
        var optiBusiness = _.round(pBusiness * optiSeats);
        var optiFirst = _.round(pFirst * optiSeats);
        return {eco: optiEco, business: optiBusiness, first: optiFirst};
      },
      isOptimised: function (opti, plane) {
        var isOptiEco = Math.abs(opti.eco - plane.config.eco) <= 3;
        var isOptiBusiness = Math.abs(opti.business - plane.config.business) <= 3;
        var isOptiFirst = Math.abs(opti.first - plane.config.first) <= 3;
        return isOptiEco && isOptiBusiness && isOptiFirst;
      }
    }
  }]);

am2App
  .factory('dataLoader', ['$http', 'fleetService', 'linesService', 'planesRefService', 'hubsService', 
    function($http, fleetService, linesService, planesRefService, hubsService) {
    return {
      linesPromise: $http({method: 'GET', url: './data/lines.json'})
        .then(function (res) {
          var lines = linesService.getLines();
          if (_.isNil(lines)) {
            linesService.setLines(res.data);  
          }
          return ;
        }),
      planesRefPromise: $http({method: 'GET', url: './data/planes.json'})
        .then(function (res) {
          var planesRef = planesRefService.getPlanesRef();
          if (_.isNil(planesRef)) {
            planesRefService.setPlanesRef(res.data);  
          }
          return ;
        }),
      fleetPromise: $http({method: 'GET', url: './data/fleet.json'})
        .then(function (res) {
          var fleet = fleetService.getFleet();
          if (_.isNil(fleet)) {
            var fleet = res.data;
            // Sorting lines by alphabetical order
            _.forEach(fleet, function (plane) {
              var lines = _.get(plane, 'lines');
              _.set(plane, 'lines', _.sortBy(lines));
            })
            fleetService.setFleet(fleet);  
          }
          return ;
        }),
      hubsPromise: $http({method: 'GET', url: './data/hubs.json'})
        .then(function (res) {
          var hubs = hubsService.getHubs();
          if (_.isNil(hubs)) {
            var hubs = res.data;
            hubsService.setHubs(hubs);  
          }
          return ;
        })
    }
  }])