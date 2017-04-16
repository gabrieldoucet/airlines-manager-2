/**
 * Created by Gabriel on 16/04/2017.
 */

var path     = require('path');
var dbHelper = require(path.join(__dirname, 'dbHelper'));
var async    = require('async');
var _        = require('lodash');

var coeffs = {eco: 1, business: 1.8, first: 4.23};

var planeSpecs = [];
var lines      = [];
var lineObjs   = [];

// Handle the ctrl+c un the terminal
process.on('SIGINT', function () {
  dbHelper.closeConnection(function () {
    process.exit(0);
  });
});

dbHelper.find('lines', {}, function (err, results) {
  console.log(results);
});

dbHelper.find('lines', {to: 'SYD'}, function (err, results) {
  console.log(results);
});