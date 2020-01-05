require('jquery');
require('angular');
require('angular-ui-router');

const _ = require('lodash');

angular.module('am2App', []);

require('./lib/randexp.min.js');

require('./services/algorithmic.js');
require('./services/calc.js');
//require('./services/classService.js'); Not needed at the moment
require('./services/dataService.js');
require('./services/apiService.js');
require('./services/hubService.js');
require('./services/lineService.js');
require('./services/models.js');
require('./services/planeService.js');
require('./services/planeTypeService.js');
require('./services/urlService.js');
require('./services/modalService.js');
require('./services/alertService.js');

require('./views/rootController.js');
require('./views/modalAddHub.js');
require('./views/modalAddLine.js');
require('./views/modalAddPlane.js');
require('./directives/nameGen/nameGen.js');
require('./directives/lineConfig/lineConfig.js');
require('./directives/listLine/listLine.js');
require('./directives/listPlane/listPlane.js');
require('./directives/navbar/navbar.js');
require('./directives/selectHub/selectHub.js');
require('./directives/selectLine/selectLine.js');
require('./directives/selectPlane/selectPlane.js');
require('./directives/selectPlanetype/selectPlanetype.js');
require('./directives/viewLine/viewLine.js');
require('./directives/viewPlane/viewPlane.js');
require('./directives/alertBanner/alertBanner.js');
