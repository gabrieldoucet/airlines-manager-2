var am2App = angular.module('am2App', ['ui.router']);

am2App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise("/accueil");

  $stateProvider
    .state('root', {
      abstract: true,
      views: {
        'header': {
          templateUrl: 'layout/header.html'
        }
      }
    })
    .state('root.accueil', {
      url: '/accueil',
      views: {
        '@': {
           templateUrl: 'views/accueil.html'
        }
      }
    })
    .state('root.calculs', {
      url: '/calculs',
      views: {
        '@': {
          templateUrl: 'views/calculs.html',
          controller: 'calculsController'
        }
      }
    })
    .state('root.flotte', {
      url: '/flotte',
      views: {
        '@': {
          templateUrl: 'views/flotte.html',
          controller: 'fleetController'
        }
      },
      resolve: {
        promiseObj2: 'loader2'
      }
    })
    .state('root.lines', {
      url: '/lines',
      views: {
        '@': {
          templateUrl: 'views/lines.html',
          controller: 'linesController'
        }
      },
      resolve: {
        promiseObj2: 'loader2'
      }
    })
}]);

am2App
  .factory('loader', ['$http', function($http) {
    return function(path, callback) {
      var myPromise = $http.get(path).then(callback);
    }
  }]);

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
  .factory('linesService', function() {
    var lines;
    return {
      setLines: function (data) {
        lines = data;
      },
      getLines: function () {
        return lines;
      },
      getLinesFromTo: function(origin, dest) {
        var resultLine;
        _.forEach(lines, function (line) {
          if (_.isEqual(origin, line.from) && _.isEqual(dest, line.to)) {
            resultLine = line;
          }
        });
        return resultLine;
      }
    }
  })

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
  .factory('loader2', ['$http', 'fleetService', 'linesService', 'planesRefService',
    function($http, fleetService, linesService, planesRefService) {
    return {
      linesPromise: $http({method: 'GET', url: 'lines.json'})
        .then(function (res) {
          var lines = linesService.getLines();
          if (_.isNil(lines)) {
            linesService.setLines(res.data);  
          }
          return ;
        }),
      planesRefPromise: $http({method: 'GET', url: 'planes.json'})
        .then(function (res) {
          var planesRef = planesRefService.getPlanesRef();
          if (_.isNil(planesRef)) {
            planesRefService.setPlanesRef(res.data);  
          }
          return ;
        }),
      fleetPromise: $http({method: 'GET', url: 'flotte.json'})
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
        })
    }
  }])