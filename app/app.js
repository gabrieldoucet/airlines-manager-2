require('jquery');
require('angular');
require('angular-ui-router');
var _ = require('lodash');

angular.module('am2App', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/lines');
  $urlRouterProvider.when('/fleet','/fleet/detail');
  $urlRouterProvider.when('/tools','/tools/name');

  $stateProvider
    .state('root', {
      abstract: true,
      views: {
        'header': {
          templateUrl: 'templates/header'
        }
      }
    })
    .state('root.accueil', {
      url: '/accueil',
      views: {
        '@': {
           templateUrl: 'templates/accueil'
        }
      }
    })
    .state('root.fleet', {
      url: '/fleet',
      views: {
        '@': {
          templateUrl: 'templates/fleet',
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
          templateUrl: 'templates/fleetDetail'
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
          templateUrl: 'templates/lines',
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
          templateUrl: 'templates/tools',
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
          templateUrl: 'templates/toolsName'
        }
      }
    })
}]);

require('./lib/randexp.min.js');

require('./services/algorithmic.js');
require('./services/calc.js');
require('./services/classService.js');
require('./services/dataLoader.js');
require('./services/fleetService.js');
require('./services/hubsService.js');
require('./services/linesService.js');
require('./services/models.js');
require('./services/planesService.js');

require('./views/fleet.js');
require('./views/hubSelect.js');
require('./views/lineConfigs.js');
require('./views/lines.js');
require('./views/lineSelect.js');
require('./views/lineTable.js');
require('./views/nameGen.js');
require('./views/planeLabel.js');
require('./views/planeTable.js');
require('./views/tools.js');
require('./views/typeSelect.js');