/**
 * Created by Gabriel on 17/04/2017.
 */

const program = require('commander');
const path    = require('path');

const dbHelper   = require(path.join(__dirname, '..', 'database', 'dbHelper'));

program
  .parse(process.argv);

// Handles the ctrl+c in the terminal
process.on('SIGINT', function() {
  dbHelper.closeConnection(function() {
    process.exit(0);
  });
});

// Entry point
dbHelper.consolidate(function(err) {
  'use strict';
  let exitCode = 0;
  if (err) {
    exitCode = -1;
    console.log('[ERROR]', err);
  }
  dbHelper.closeConnection(function() {
    process.exit(exitCode);
  });
});