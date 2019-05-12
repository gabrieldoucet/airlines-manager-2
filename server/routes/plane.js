const express  = require('express');
const router   = new express.Router();
const path     = require('path');
const dbHelper = require(path.join(__dirname, '..', 'database', 'dbHelper'));

/* GET data from mongodb instance */
router.get('/', function(req, res) {
  'use strict';
  dbHelper.find('planes', {}, function(err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

router.get('/debug', function(req, res) {
  'use strict';
  console.log('Debug', typeof dbHelper.findPromise);
  dbHelper.findPromise('planes', {}).then(function(a, b) {
    console.log('========', a, b);
    res.json(a);
  }).catch(function(err) {
    console.log(err);
  })
});


router.post('/:name', function(req, res) {
  'use strict';
  let name = req.params.name;
  let newPlane = req.body;
  console.log('Plane to add', newPlane);
  dbHelper.create('planes', newPlane).then(function(newPlane) {
    console.log('New plane succesfully added');
    res.json(newPlane);
  }).catch(function(error) {
    console.error('An error occurred', error);
    res.json({});
  });
});

/* GET data from mongodb instance */
router.get('/:name', function(req, res) {
  'use strict';
  let name = req.params.name;
  var query = {name: name};
  dbHelper.find('planes', query, function(err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

// , function(err, results) {
//   results = _.map(results, function(result) {
//     return _.get(result, '_doc');
//   });
//   callback(err, results);
// });

module.exports = router;
