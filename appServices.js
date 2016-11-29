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
      },
      randomName: function(iataCode) {
        var regexArray;
        _.forEach(hubs, function (hub) {
          if (_.isEqual(hub.code, iataCode)) {
            regexArray = _.get(hub, 'immat');
          }
        })
        var regex;
        if (regexArray.length > 1) {
          var index = Math.floor(regexArray.length * Math.random());
          regex = new RegExp(regexArray[index])
        } else if (regexArray.length === 1) {
          regex = new RegExp(regexArray[0]);
        }
        return new RandExp(regex).gen();
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
  .factory('calc', ['planesRefService', 'linesService', 'fleetService',
   function(planesRefService, linesService, fleetService) {
    var coeffs = {eco: 1, business: 1.8, first: 4.23};

    var getOptimisation = function (plane, line) {
      var demand = line.demand.eco + line.demand.business + line.demand.first;
      var pEco = line.demand.eco / demand;
      var pBusiness = line.demand.business / demand;
      var pFirst = line.demand.first / demand;
      var seats = planesRefService.getSeatsFromType(plane.type);
      var optiSeats = seats / (pEco + pBusiness * coeffs.business + pFirst * coeffs.first);
      var optiEco = _.round(pEco * optiSeats);
      var optiBusiness = _.round(pBusiness * optiSeats);
      var optiFirst = _.round(pFirst * optiSeats);
      var maxRotations = Math.floor(line.demand.eco / optiEco);
      return {type: plane.type, eco: optiEco, business: optiBusiness, first: optiFirst, maxRotations: maxRotations};
    };

    var isOptimised = function (plane, line) {
      var opti = getOptimisation(plane, line);
      var isOptiEco = Math.abs(opti.eco - plane.config.eco) <= 2;
      var isOptiBusiness = Math.abs(opti.business - plane.config.business) <= 2;
      var isOptiFirst = Math.abs(opti.first - plane.config.first) <= 2;
      return isOptiEco && isOptiBusiness && isOptiFirst;
    };

    return {
      getOptimisation: getOptimisation,
      isOptimised: isOptimised,
      getOptiLines: function (plane) {
        var optiLines = [];
        _.forEach(linesService.getLines(), function(line) {
          if (isOptimised(plane, line)) {
            optiLines.push(line);
          }
        });
        return optiLines;
      },
      getOptiPlanes: function (line) {
        var optiPlanes = [];
        _.forEach(fleetService.getFleet(), function(plane) {
          if (isOptimised(plane, line)) {
            optiPlanes.push(plane);
          }
        });
        return optiPlanes;
      },
      getAllOptis: function (line) {
        var allOptis = [];
        _.forEach(planesRefService.getPlanesRef(), function (plane) {
          allOptis.push(getOptimisation(plane, line));
        })
        return allOptis;
      }
    }
  }]);

am2App
  .factory('classService', ['calc', 'linesService', function (calc, linesService) {
    var getPlaneLineLabelClass = function (plane, line) {
      if (calc.isOptimised(plane, line)) {
        return "label label-success";
      } else {
        return "label label-danger";
      }
    };

    var getLineLineLabelClass = function (line1, line2) {
      if (linesService.isSimilar(line1, line2)) {
        return "label label-primary";
      } else {
        return "label label-default"
      }
    };

    var getPlanePlaneLabelClass = function (plane1, plane2) {};

    return {
      getPlaneLineLabelClass: getPlaneLineLabelClass,
      getLineLineLabelClass: getLineLineLabelClass
    };
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