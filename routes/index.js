const express = require('express');
const router  = new express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  'use strict';
  res.render('./index');
});

module.exports = router;