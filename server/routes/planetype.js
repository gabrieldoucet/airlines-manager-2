const express  = require('express');
const router   = new express.Router();
const path     = require('path');
const dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

/* GET data from mongodb instance */
router.get('/', function(req, res) {
  'use strict';
  dbHelper.find('planetypes', {}, function(err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

module.exports = router;
