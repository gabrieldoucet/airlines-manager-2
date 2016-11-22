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
      }
    })
    .state('root.lines', {
      url: '/lines',
      views: {
        '@': {
          templateUrl: 'views/lines.html',
          controller: 'linesController'
        }
      }
    })
}]);

am2App
  .factory('loader', ['$http', function($http) {
    return function(path, callback) {
      var myPromise = $http.get(path).then(callback);
    }
  }]);