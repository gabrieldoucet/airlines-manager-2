/**
 * Created by Gabriel on 18/04/2017.
 */

const async   = require('async');
const program = require('commander');
const fs      = require('fs');
const _       = require('lodash');
const path    = require('path');

const dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

program
  .parse(process.argv);

async.series([
  function (callback) {
    fs.mkdir(path.join(__dirname, '..', 'dist', 'data'), function (err) {
      if (_.isEqual(err.code, 'EEXIST')) {
        console.log('Directory already exists. Creation was ignored.');
        callback();
      } else {
        callback(err);
      }
    });
  },
  dbHelper.dump
], function (err) {
  'use strict';
  let exitCode = 0;
  if (err) {
    exitCode = -1;
    console.log('An error occurred');
    console.log(err);
  }
  dbHelper.closeConnection(function () {
    process.exit(exitCode);
  });
});