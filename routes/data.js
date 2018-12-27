const express  = require('express');
const router   = new express.Router();
const path     = require('path');
const dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

/* GET data from mongodb instance */
router.post('/:name', function (req, res) {
  'use strict';
  let collection = req.params.name;
  let query      = req.body;
  dbHelper.find(collection, query, function (err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

module.exports = router;
