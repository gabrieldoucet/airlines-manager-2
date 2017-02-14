var express = require('express');
var router = new express.Router();

/* GET home page. */
router.get('/:name', function (req, res) {
  var templateName = req.params.name;
  res.render('./templates/' + templateName);
});

module.exports = router;