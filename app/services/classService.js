var _ = require('lodash');

angular.module('am2App')
.factory('classService', ['calc', 'lineService', function (calc, lineService) {
  var getPlaneLineLabelClass = function (plane, line) {
    //if (calc.isOptimised(plane, line)) {
    if (true) {
      return "label label-success";
    } else {
      var planeDests = plane.dests;
      var planeLines = [];
      _.forEach(plane.dests, function (dest) {
        planeLines.push(linesService.getLineFromTo(plane.hub, dest));
      });
      var similarLines = linesService.getSimilarLines(line);
      if (!_.isEmpty(_.intersection(similarLines, planeLines))) {
        return "label label-warning";
      } else {
        return "label label-danger";
      }
    }
  };

  var getLineLineLabelClass = function (line1, line2) {
    if (linesService.isSimilar(line1, line2)) {
      return "label label-primary";
    } else {
      return "label label-default"
    }
  };

  var getPlanePlaneLabelClass = function (plane1, plane2) {};

  return {
    getPlaneLineLabelClass: getPlaneLineLabelClass,
    getLineLineLabelClass: getLineLineLabelClass
  };
}]);