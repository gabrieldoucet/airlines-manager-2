const express  = require('express');
const router   = new express.Router();
const path     = require('path');
const dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

/* GET data from mongodb instance */
router.get('/', function(req, res) {
  'use strict';
  dbHelper.find('hubs', {}, function(err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

router.get('/:code', function(req, res) {
  'use strict';
  let code = req.params.code;
  var query = {code: code};
  dbHelper.find('hubs', query, function(err, data) {
    if (err) {
      console.log(err);
    }
    var hub = data[0] || {};
    res.json(hub);
  });
});

module.exports = router;
