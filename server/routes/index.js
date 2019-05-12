const express = require('express');
const router  = new express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  'use strict';
  res.render(path.join(__dirname, '..', 'views', 'index'));
});

module.exports = router;
