angular.module('am2App')
.controller('toolsController', ['$scope', function toolsController($scope) {

}]);



/*


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
 */