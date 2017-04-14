var express  = require('express');
var router   = new express.Router();
var path     = require('path');
var dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

/* GET data from mongodb instance */
router.post('/:name', function (req, res) {
  var collection = req.params.name;
  var query = req.body;
  dbHelper.find(collection, query, function (err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

module.exports = router;