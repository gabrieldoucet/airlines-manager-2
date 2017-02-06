am2App
  .factory('algo', [ function() {
    var maxWeight = 10000;

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
      objects = _.sortBy(objects, [function (obj) {return obj.weight}]);
      var eObjects = [];
      var combinations = [];
      
      _.forEach(objects, function (obj) {
        obj._count = 0;
        obj._maxCount = maxCount: Math.floor(100 / obj.weight) + 1;
        eObjects.push({obj: obj, maxCount: Math.floor(100 / obj.weight) + 1, count: 0});
      });

      var n = eObjects.length;

      while (eObjects[n - 1].count < eObjects[n - 1].maxCount) {
        eObjects[0].count = (eObjects[0].count + 1);
        for (var j = 0; j < n - 1; j++) {
          if (eObjects[j].count == eObjects[j].maxCount) {
            eObjects[j].count = 0;
            eObjects[j + 1].count += 1;
          }
        }
        var combiObjects = [];
        var total = 0;
        _.forEach(eObjects, function (eObject) {
          total += eObject.obj.weight * eObject.count;
          combiObjects.push({obj: eObject.obj, count: eObject.count});
        });
        combinations.push({objects: combiObjects, total: total});
      }

      // Filter combinations that take less than 100% of the demand
      combinations = _.filter(combinations, function (c) { return c.total <= 100});
      combinations = _.sortBy(combinations, [function(c) {return c.total}]);

      var bestCombination = combinations[combinations.length - 1];
      console.log(bestCombination);
      return bestCombination;
    };

    return {
      knapsack: knapsack,
      algo: algo
    };
  }]);