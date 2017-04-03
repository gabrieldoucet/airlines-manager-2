var express = require('express');
var router  = new express.Router();
var path    = require('path');

/* GET home page. */
router.get('/:name', function (req, res) {
  var dataFileName = req.params.name;
  var data         = require(path.join(__dirname, '..', 'data', dataFileName));
  res.json(data);
});

module.exports = router;