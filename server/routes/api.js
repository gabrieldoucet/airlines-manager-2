const express  = require('express');
const router   = new express.Router();
const _ = require('lodash');
const path     = require('path');
const dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

/* GET data from mongodb instance */
router.post('/get-line-from-origin-dest', function(req, res) {
  let query = _.get(req, ['body']);
  console.log(query);
  dbHelper.findPromise('lines', query).then(function(line) {
    console.log(line);
    res.json(line);
  }).catch(function(err) {
    console.error(err);
    res.json({});
  });
});

module.exports = router;
