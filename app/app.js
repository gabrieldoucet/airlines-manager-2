require('jquery');
require('angular');
require('angular-ui-router');

const _ = require('lodash');

angular.module('am2App', []);

require('./lib/randexp.min.js');

require('./services/algorithmic.js');
require('./services/calc.js');
require('./services/classService.js');
require('./services/hubService.js');
require('./services/lineService.js');
require('./services/models.js');
require('./services/planeService.js');
require('./services/planeTypeService.js');
require('./services/urlService.js');

require('./views/mockup.js');
require('./views/modalAddHub.js');
require('./views/modalAddLine.js');
require('./views/modalAddPlane.js');
require('./views/nameGen.js');
require('./views/lineView.js');
require('./views/lineConfigs.js');
require('./views/listPlane.js');
require('./views/planeView.js');
require('./views/selectHub.js');
require('./views/selectLine.js');
require('./views/selectPlane.js');
require('./views/selectPlaneType.js');
