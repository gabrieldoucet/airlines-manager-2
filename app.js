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
          templateUrl: 'views/flotte.html'
        }
      }
    })
}]);