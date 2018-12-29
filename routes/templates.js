const express = require('express');
const router  = new express.Router();

/* GET home page. */
router.get('/:name', function(req, res) {
  'use strict';
  let templateName = req.params.name;
  res.render('./templates/' + templateName);
});

module.exports = router;