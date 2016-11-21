var am2App = angular.module('am2App', []);

am2App.controller('AM2AppController', ['$scope', '$compile',
  function AM2AppController($scope, $compile) {
    $scope.coeffs = {eco: 1, business: 1.8, first: 4.23};

    $scope.optimize = function () {
      $scope.answers = [];
      _.forEach($scope.avions, function (avion) {
        var demand = $scope.eco + $scope.business + $scope.first;
        var pEco = $scope.eco / demand;
        var pBusiness = $scope.business / demand;
        var pFirst = $scope.first / demand;
        var optiSeats = _.get(avion, 'sieges') / (pEco + pBusiness * $scope.coeffs.business + pFirst * $scope.coeffs.first);
        var optiEco = _.round(pEco * optiSeats);
        var optiBusiness = _.round(pBusiness * optiSeats);
        var optiFirst = _.round(pFirst * optiSeats);
        $scope.answers.push({type: avion.type, optiEco: optiEco, optiBusiness: optiBusiness, optiFirst: optiFirst});
      })
    };

    $scope.avions = [
      {
        "type": "A320-NEO",
        "sieges": 195,
        "rayon": 6482,
        "conso": 1.88,
        "vitesse": 839,
        "tonnage": 19.65
      },
      {
        "type": "A380-800",
        "sieges": 853,
        "rayon": 15556,
        "conso": 2.44,
        "vitesse": 903,
        "tonnage": 89.2
      },
      {
        "type": "A350-900XWB",
        "sieges": 475,
        "rayon": 15186,
        "conso": 2.11,
        "vitesse": 911,
        "tonnage": 47.5
      },
      { 
        "type": "777-300ER",
        "sieges": 550,
        "rayon": 14695,
        "conso": 2.28,
        "vitesse": 892,
        "tonnage": 69.9
      },
      {
        "type": "777-200LR",
        "sieges": 440,
        "rayon": 17512,
        "conso": 2.65,
        "vitesse": 892,
        "tonnage": 64
      },
      {
        "type": "787-9",
        "sieges": 420,
        "rayon": 15556,
        "conso": 2.12,
        "vitesse": 911,
        "tonnage": 42
      }
    ];
}]);