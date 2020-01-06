require('jquery');
require('angular');
require('angular-ui-router');
require('angular-popeye');
require('popper.js');
require('bootstrap');
require('./lib/randexp.min.js');
angular.module('am2App', ['pathgather.popeye']);

/* -- Services -- */
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

/* -- Controllers -- */
require('./views/RootController.js');
require('./views/modals/modalAddLineController.js');
require('./views/modals/ModalAddPlaneController.js');
require('./views/modals/ModalAddHubController.js');

/* -- Directives -- */
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
