var _ = require('lodash');

angular.module('am2App')
.factory('algo', [ function() {
  var maxWeight = 100;
  var tolerance = 0.01;

  var matrixGet = function (matrix, i, j) {
    return matrix[i][j];
  };

  var matrixSet = function (matrix, i, j, value) {
    if (_.isUndefined(matrix[i])) {
      matrix[i] = [];
    }
    matrix[i][j] = value;
  };

  var print = function (matrix) {
    for (i = 0; i < _.size(objects) + 1; i++) {
      var str = matrix[i].join(' ');
      str += '\n';
      console.log(str);
    }
  };

  var knapsack = function (objects) {
    var tab = [];
    var keep = [];

    // Initialise values and keep
    for (i = 0; i <= _.size(objects); i++){
      keep[i] = [];
      tab[i] = [];
      for (w = 0; w <= maxWeight; w++) {
        keep[i][w] = false;
        tab[i][w] = 0; // includes the case tab[0][w] = 0
      }  
    }

    for (i = 1; i <= _.size(objects); i++) {
      for (w = 0; w <= maxWeight; w++) {
        var wi = _.get(objects[i - 1], 'weight');
        var vi = _.get(objects[i - 1], 'value');
        if (wi <= w &&  tab[i - 1][w - wi] + vi > tab[i - 1][w]) {
          tab[i][w] = Math.max(tab[i - 1][w],  tab[i - 1][w - wi] + vi);
          keep[i][w] = true;
        } else {
          tab[i][w] = tab[i - 1][w];
          keep[i][w] = false;
        }
      }
    }

    // print(tab);
    var k = maxWeight;
    var results = [];
    for (i = _.size(objects); i > 0; i--) {
      if (keep[i][k]) {
        results.push(objects[i - 1]);
        k = k - _.get(objects[i - 1], 'weight');
      }
    }
    console.log(objects);
    return results;
  };

  var algo = function (objects) {
    objects = _.sortBy(objects, [function (obj) {return obj._weight}]);
    var combinations = [];
    
    // Adding algorithm specific variables: _count and _maxCount
    _.forEach(objects, function (obj) {
      var newObj = _.clone(obj);
      obj._maxCount = Math.floor(100 / obj._weight);
      obj._count = 0;
    });

    var n = objects.length;
    while (objects[n - 1]._count < objects[n - 1]._maxCount) {
      objects[0]._count = (objects[0]._count + 1);
      for (var j = 0; j < n - 1; j++) {
        if (objects[j]._count == objects[j]._maxCount) {
          objects[j]._count = 0;
          objects[j + 1]._count += 1;
        }
      }

      var total = 0;
      _.forEach(objects, function (obj) {
        total += obj._weight * obj._count;
      });

      if (total <= maxWeight * (1 + tolerance)) {
        combinations.push({objects: _.cloneDeep(objects), total: total});          
      }
    }

    // Filter combinations that take less than 100% of the demand
    combinations = _.sortBy(combinations, [function(combi) {return combi.total}]);

    var bestCombination = combinations[combinations.length - 1];
    console.log(bestCombination);
    return bestCombination;
  };

  return {
    knapsack: knapsack,
    algo: algo
  };
}]);