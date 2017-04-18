require('jquery');
require('angular');
require('angular-ui-router');
require('material-design-lite');

const _ = require('lodash');

angular.module('am2App', []);

require('./lib/randexp.min.js');

require('./services/algorithmic.js');
require('./services/calc.js');
require('./services/classService.js');
require('./services/planeService.js');
require('./services/hubsService.js');
require('./services/linesService.js');
require('./services/models.js');
require('./services/planeSpecService.js');

/*require('./views/fleet.js');
require('./views/hubSelect.js');
require('./views/lineConfigs.js');
require('./views/lines.js');
require('./views/lineSelect.js');
require('./views/lineTable.js');
require('./views/nameGen.js');
require('./views/planeLabel.js');
require('./views/planeTable.js');
require('./views/tools.js');
require('./views/typeSelect.js');*/

require('./views/mockup.js');