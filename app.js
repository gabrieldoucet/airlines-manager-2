var am2App = angular.module('am2App', ['ui.router']);

am2App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/accueil');
$urlRouterProvider.when('/fleet','/fleet/detail');
$urlRouterProvider.when('/lines','/lines/detail');

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
    .state('root.fleet', {
      url: '/fleet',
      views: {
        '@': {
          templateUrl: 'views/fleet.html',
          controller: 'fleetController'
        }
      },
      resolve: {
        promiseObj: 'dataLoader'
      }
    })
    .state('root.fleet.add', {
      url: '/add',
      views: {
        'tabviewFleet': {
          templateUrl: 'views/fleet-add.html'
        }
      }
    })
    .state('root.fleet.detail', {
      url: '/detail',
      views: {
        'tabviewFleet': {
          templateUrl: 'views/fleet-detail.html'
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
      },
      resolve: {
        promiseObj: 'dataLoader'
      }
    })
   .state('root.lines.add', {
      url: '/add',
      views: {
        'tabviewLines': {
          templateUrl: 'views/lines-add.html'
        }
      }
    })
    .state('root.lines.detail', {
      url: '/detail',
      views: {
        'tabviewLines': {
          templateUrl: 'views/lines-detail.html'
        }
      }
    })
}]);