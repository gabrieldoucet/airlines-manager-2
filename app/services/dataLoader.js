var _ = require('lodash');

angular.module('am2App')
  .factory('dataLoader', ['$http', 'planeService', 'linesService', 'planeSpecService', 'hubsService',
    function ($http, planeService, linesService, planeSpecService, hubsService) {

      var linesPromise = $http({method: 'POST', url: 'http://localhost:3000/data/lines'})
        .then(function (res) {
          var lines = linesService.getLines();
          if (_.isNil(lines)) {
            lines = res.data;
            linesService.setLines(lines);
          }
        });

      var planeSpecPromise = $http({method: 'POST', url: 'http://localhost:3000/data/planespecs'})
        .then(function (res) {
          var planesRef = planeSpecService.getPlanesRef();
          if (_.isNil(planesRef)) {
            planeSpecService.setPlanesRef(res.data);
          }
        });

      var planesPromise = $http({method: 'POST', url: 'http://localhost:3000/data/planes'})
        .then(function (res) {
          var fleet = planeService.getFleet();
          if (_.isNil(fleet)) {
            fleet = res.data;
            // Sorting lines by alphabetical order
            _.forEach(fleet, function (plane) {
              var lines = _.get(plane, 'lines');
              _.set(plane, 'lines', _.sortBy(lines));
            });
            planeService.setFleet(fleet);
          }
        });

      var hubsPromise = $http({method: 'POST', url: 'http://localhost:3000/data/hubs'})
        .then(function (res) {
          var hubs = hubsService.getHubs();
          if (_.isNil(hubs)) {
            hubs = res.data;
            hubsService.setHubs(hubs);
          }
        });

      return {
        linesPromise: linesPromise,
        planesRefPromise: planeSpecPromise,
        fleetPromise: planesPromise,
        hubsPromise: hubsPromise
      };
    }]);