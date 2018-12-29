angular.module('am2App')
.factory('models', [function() {
  
  function Plane () {
    this.config = {eco: 0, business: 0, first: 0};
    this.name = "";
    this.hub = null;
    this.dests = [];
    this.type = null;
  }

  return {
    Plane: Plane
  };
}]);