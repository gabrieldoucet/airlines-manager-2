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
require('./services/hubService.js');
require('./services/lineService.js');
require('./services/models.js');
require('./services/planeSpecService.js');

require('./views/mockup.js');