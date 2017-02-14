var _ = require('lodash');

//require mongoose model defines in models/plane.js
//var Plane = require("./models/plane");

/*
var planes = require('../data/fleet.json');
_.forEach(planes, function (plane) {
  //create new model
  var planeModel = new Plane(plane);
  planeModel.save( function (err) {
    if (err) {
      return err;
    } else {
      console.log("Plane saved");
    }
  });
}); */

//require mongoose model defines in models/plane.js
var Line = require("./models/line");

var lines = require('../data/lines.json');
_.forEach(lines, function (line) {
  //create new model
  var lineModel = new Line(line);
  lineModel.save( function (err) {
    if (err) {
      return err;
    } else {
      console.log("Line saved");
    }
  });
});

/*
var dbHelper = require(path.join(__dirname, 'dbHelper'));
dbHelper.get('planes', function (err, results) {
  console.log(results);
}); */