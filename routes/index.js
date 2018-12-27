const express = require('express');
const router  = new express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function (req, res) {
  'use strict';
  res.sendFile(path.join(__dirname, '..', 'views', 'index1.html'));
});

module.exports = router;
