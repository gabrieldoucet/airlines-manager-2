var express  = require('express');
var router   = new express.Router();
var path     = require('path');
var dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

/* GET data from mongodb instance */
router.get('/:name', function (req, res) {
  var collection = req.params.name;
  dbHelper.find(collection, function (err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

module.exports = router;