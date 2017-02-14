var express = require('express');
var router = new express.Router();
var path = require('path');

var dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

/* GET home page. */
router.get('/:name', function (req, res) {
  var dataCollection = req.params.name;
  var data = dbHelper.get(dataCollection, function (err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

module.exports = router;