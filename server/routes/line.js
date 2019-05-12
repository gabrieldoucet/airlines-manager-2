const express  = require('express');
const router   = new express.Router();
const _ = require('lodash');
const path     = require('path');
const dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

/* GET data from mongodb instance */
router.get('/', function(req, res) {
  'use strict';
  dbHelper.find('lines', {}, function(err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

/* GET data from mongodb instance */
router.post('/:from/:to', function(req, res) {
  'use strict';
  let from = _.get(req, ['params', 'from']);
  let to = _.get(req, ['params', 'to']);
  var newLine = _.get(req, ['body']);
  console.log('Line to add:', newLine);
  dbHelper.create('lines', newLine).then(function(newLine) {
    console.log('New line succesfully added', newLine);
    res.json(newLine);
  }).catch(function(error) {
    console.error('An error occurred', error);
    res.json({});
  });
});

module.exports = router;
