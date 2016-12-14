var am2App = angular.module('am2App', ['ui.router']);

am2App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/lines');
$urlRouterProvider.when('/fleet','/fleet/detail');
$urlRouterProvider.when('/tools','/tools/name');

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
    .state('root.fleet.optim', {
      url: '/optim',
      views: {
        'tabviewFleet': {
          templateUrl: 'views/fleet-optim.html'
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
    .state('root.tools', {
      url: '/tools',
      views: {
        '@': {
          templateUrl: 'views/tools.html',
          controller: 'toolsController'
        }
      },
      resolve: {
        promiseObj: 'dataLoader'
      }
    })
    .state('root.tools.name', {
      url: '/name',
      views: {
        'tabviewTools': {
          templateUrl: 'views/tools-name.html'
        }
      }
    })
}]);