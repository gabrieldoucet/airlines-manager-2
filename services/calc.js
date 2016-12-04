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
      var maxRotations = Math.floor(line.demand.eco / (2 * optiEco));

      var speed = planesRefService.getSpeedFromType(plane.type);
      var duration = 2 * line.distance / speed;
      return {
        type: plane.type,
        eco: optiEco,
        business: optiBusiness,
        first: optiFirst,
        maxRotations: maxRotations,
        duration: duration
      };
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