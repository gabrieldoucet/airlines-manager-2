/**
 * Created by Gabriel on 10/09/2017.
 */

const program = require('commander');
const path    = require('path');
const _       = require('lodash');

const dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

const params = {};
program
  .arguments('<from> <to> <planeType>')
  .action(function(from, to, planeType) {
    params.from = from;
    params.to   = to;
    params.type = planeType;
  })
  .parse(process.argv);

// Handles the ctrl+c in the terminal
process.on('SIGINT', function() {
  dbHelper.closeConnection(function() {
    process.exit(0);
  });
});

// Entry point
dbHelper.find('lines', {from: params.from, to: params.to} , function(err, results) {
  let exitCode = 0;
  if (err) {
    exitCode = -1;
    console.log('[ERROR]', err);
  }
  let line = results[0];
  if (_.isEmpty(line)) {
    console.log('Line not found');
  } else {
    let optis = _.filter(line.optis, function(opti) {
      return _.isEqual(opti.type, params.type);
    });
    let opti = optis[0];
    if (_.isEmpty(opti)) {
      console.log('Configuration not available');
    } else {
      let config = opti.config;
      console.log('---------');
      console.log(`Configuration ${params.type} for ${params.from}-${params.to}`);
      console.log(`Eco: ${config.eco} Business: ${config.business} First: ${config.first} Cargo: ${config.cargo}`);
      console.log('---------');
    }
  }

  dbHelper.closeConnection(function() {
    process.exit(exitCode);
  });
});