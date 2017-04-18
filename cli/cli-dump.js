/**
 * Created by Gabriel on 18/04/2017.
 */

const async   = require('async');
const program = require('commander');
const fs      = require('fs');
const _       = require('lodash');
const path    = require('path');

const dbDescription = require(path.join(__dirname, '..', 'database', 'description'));
const dbHelper      = require(path.join(__dirname, '..', 'database', 'dbHelper'));

program
  .parse(process.argv);

async.series([
  function (callback) {
    fs.mkdir(path.join(__dirname, '..', 'data'), callback);
  },

  function (callback) {
    async.each(dbDescription, function (collectionDescription, callback) {
      let collection = _.get(collectionDescription, 'name');
      let file       = _.get(collectionDescription, 'file');
      dbHelper.find(collection, {}, function (err, results) {
        if (err) {
          callback(err);
        }
        let strResults = JSON.stringify(results, null, 2);
        let filePath   = path.join(__dirname, '..', 'data', file);
        fs.writeFile(filePath, strResults, function (err) {
          if (err) {
            callback(err);
          } else {
            console.log([collection, 'has been written to', filePath].join(' '));
            callback();
          }
        });
      });
    }, callback);
  }], function (err) {
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