am2App
  .factory('planesRefService', function() {
    var planesRef;
    return {
      setPlanesRef: function (data) {
        planesRef = data;
      },
      getPlanesRef: function () {
        return planesRef;
      },
      getSeatsFromType: function(type) {
        var seats = 0;
        _.forEach(planesRef, function (plane) {
          if (_.isEqual(plane.type, type)) {
             seats = plane.seats;
          }
        });
        return seats;
      },
      getSpeedFromType: function(type) {
        var speed = 0;
        _.forEach(planesRef, function (plane) {
          if (_.isEqual(plane.type, type)) {
             speed = plane.speed;
          }
        });
        return speed;
      }
    }
  });