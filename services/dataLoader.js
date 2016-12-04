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
  }]);