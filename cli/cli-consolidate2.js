/**
 * Created by Gabriel on 17/04/2017.
 */

const program = require('commander');
const path    = require('path');
const _       = require('lodash')

const calcHelper = require(path.join(__dirname, '..', 'server', 'helpers', 'calculationHelper'));
const dbHelper   = require(path.join(__dirname, '..', 'server', 'database', 'dbHelper'));

var getPlaneTypesToUpdate = function(line, planeTypes, force) {
  var result = {
    remove: [],
    add: []
  };
  existingPlaneTypes = _.map(line.optis, function(opti) {
    return opti.type;
  });
  var dbPlaneTypesCompatibleForLine = _.filter(planeTypes, function(planeType) {
    return planeType.rayon > line.distance;
  });
  var dbPlaneTypes = _.map(dbPlaneTypesCompatibleForLine, function(planeType) {
    return planeType.type;
  });
  if (force) {
    return {remove: [], add: dbPlaneTypes}
  }
  var planeTypesToAdd = _.difference(dbPlaneTypes, existingPlaneTypes);
  var planeTypesToRemove = _.difference(existingPlaneTypes, dbPlaneTypes);
  _.set(result, ['add'], planeTypesToAdd);
  _.set(result, ['remove'], planeTypesToRemove);
  return result;
};

var findLineFromPlaneDest = function(plane, dest, hubs, lines) {
  var fromTo = getFromTo(_.get(plane, ['hub']), dest, hubs);
  var resultLine = _.find(lines, {from: fromTo.from, to: fromTo.to});
  return resultLine;
};

const filterForTest = function(_planeTypes) {
  var planeTypes = _.cloneDeep(_planeTypes);
  var reducedPlaneTypes = _.slice(planeTypes, 7);
  // Remove (or flag) the planeTypes that are no longer in the database

  strBefore = _.map(planeTypes, function(planeType) {
    return planeType.type;
  }).join(', ');
  console.log('Before', strBefore);

  var strAfter = _.map(reducedPlaneTypes, function(planeType) {
    return planeType.type;
  }).join(', ');
  console.log('After', strAfter);
  return reducedPlaneTypes;
};

const filterForTest2 = function(_planeTypes) {
  var planeTypes = _.cloneDeep(_planeTypes);
  var index = _.findIndex(planeTypes, {type: 'A3X0'});
  planeTypes.splice(index, 1);
  return planeTypes;
};

var getFromTo = function(_from, _to, hubs) {
  var from;
  var to;
  if (!calcHelper.isHub(hubs, _to)) {
    from = _from;
    to   = _to;
  } else {
    from = _from < _to ? _from : _to;
    to   = _from < _to ? _to : _from;
  }
  return {to: to, from: from, lineDescriptor: from + '-' + to};
};

const consolidate2 = function() {

  var promisePlaneTypes = dbHelper.findPromise('planetypes', {});
  var promiseLines = dbHelper.findPromise('lines', {});
  var promiseHubs = dbHelper.findPromise('hubs', {});
  var promisePlanes = dbHelper.findPromise('planes', {});

  var promises = [promisePlaneTypes, promiseLines, promiseHubs, promisePlanes];
  Promise.all(promises).then(function(results) {
    var planeTypesFromDb = _.sortBy(results[0], 'type');
//    planeTypesFromDb = filterForTest(planeTypesFromDb);
    planeTypesFromDb = filterForTest2(planeTypesFromDb);

    // Store the plane types in a map for easy access
    var planeTypeMap = {};
    _.forEach(planeTypesFromDb, function(planeTypeObj) {
      var type = _.get(planeTypeObj, ['type']);
      _.set(planeTypeMap, type, planeTypeObj);
    });

    var lines = _.sortBy(results[1], ['from', 'to']);
    var hubs = _.sortBy(results[2], ['code']);

    // For all the planes
    var planesFromDb = _.sortBy(results[3], ['name']);
    var planeMap = {}; // To quickly access each plane object from its
    var destMap = {}; // To capture any update in the destinations
    _.forEach(planesFromDb, function(plane) {
      var planeName = _.get(plane, ['name']);
      var destinations = _.get(plane, ['dests']);
      _.forEach(destinations, function(dest) {
        var fromTo = getFromTo(_.get(plane, ['hub']), dest, hubs);
        var lineDescriptor = _.get(fromTo, ['lineDescriptor']);
        if (_.isNil(_.get(destMap, [lineDescriptor]))) {
          _.set(destMap, [lineDescriptor], []);
        }
        (_.get(destMap, [lineDescriptor])).push(planeName);
      });
      _.set(planeMap, [planeName], plane);
    });

    var updateMap = {};

    console.log('Detecting changes for:');
    _.forEach(lines, function(_line) {
      var line = _.cloneDeep(_line);
      console.log('o ' + line.from + '-' + line.to);

      var planeTypesAdded = false;
      var planeTypesDeleted = false;
      var planesAdded = false;
      var planesDeleted = false;

      // Convert the optimisation of the line into a map for easy add/remove operations
      var optimisationMap = {};
      _.forEach(line.optis, function(opti) {
        return _.set(optimisationMap, [opti.type], opti);
      });

      // Get the planes types to remove or add for this line
      var planeTypesToUpdate = getPlaneTypesToUpdate(line, planeTypesFromDb, program.force);
      var planeTypesToRemove = _.get(planeTypesToUpdate, ['remove']);
      var planeTypesToAdd = _.get(planeTypesToUpdate, ['add']);

      console.log('  Optimisations updates:');
      if (_.size(planeTypesToAdd) === 0 && _.size(planeTypesToRemove) === 0) {
        console.log('    None');
      }
      // Loop through the additions
      _.forEach(planeTypesToAdd, function(type) {
        var planeTypeToCompute = _.get(planeTypeMap, [type]);
        console.log('    +', type);
        let opti = calcHelper.getOptimisation(planeTypeToCompute, line);
        _.set(optimisationMap, [type], opti);
        planeTypesAdded = true;
      });

      // Loop through the removals
      _.forEach(planeTypesToRemove, function(planeTypeToRemove) {
        console.log('    -', planeTypeToRemove);
        optimisationMap = _.omit(optimisationMap, planeTypeToRemove);
        planeTypesDeleted = true;
      });
      console.log('');

      if (planeTypesAdded || planeTypesDeleted) {
        var updatedOptis = _.map(optimisationMap, function(opti) {
          return opti;
        });
        updatedOptis = _.sortBy(updatedOptis, ['percent']);
        _.set(line, ['optis'], updatedOptis);
      }

      var lineDescriptor = line.from + '-' + line.to;
      var actualPlanes = _.get(destMap, [lineDescriptor]);
      var linePlaneNames = _.map(line.planes, function(plane) {return plane.name;});
      var planeNamesToRemove = _.difference(linePlaneNames, actualPlanes);
      var planeNamesToAdd = _.difference(actualPlanes, linePlaneNames);

      console.log('  Plane updates:');
      if (_.size(planeNamesToAdd) === 0 && _.size(planeNamesToRemove) === 0) {
        console.log('    None');
      }
      var planes = _.get(line, ['planes']);
      _.forEach(planeNamesToAdd, function(planeNameToAdd) {
        console.log('    +', planeNameToAdd);
        var newPlane = _.get(planeMap, [planeNameToAdd]);
        planes.push(newPlane);
        planesAdded = true;
      });

      _.forEach(planeNamesToRemove, function(planeNameToRemove) {
        var index = _.findIndex(planes, {name: planeNameToRemove});
        planes.splice(index, 1);
        planesDeleted = true;
        console.log('    -', planeNameToRemove);
      });
      if (planesAdded || planesDeleted) {
        _.set(line, ['planes'], planes);
      }

      var updateFlag = planesAdded || planesDeleted || planeTypesAdded || planeTypesDeleted;
      if (updateFlag) {
        _.set(updateMap, line.amID, line);
      }
      console.log('');

    }); // End of line loop

    return updateMap;
  }).then(function(updateMap) {
    // Perform the updates
    var updatePromises = _.map(updateMap, function(lineToUpdate) {
      var _id = _.get(lineToUpdate, ['_id']);
      console.log('Updating: ' + lineToUpdate.from + '-' + lineToUpdate.to);
      return dbHelper.replaceOnePromise('lines', {_id: _id}, _.omit(lineToUpdate, ['_id']), {});
    });
    Promise.all(updatePromises).then(function() {
      dbHelper.closeConnection(function() {
        process.exit(0);
      });
    }).catch(function(err) {
      console.log('An error occurred during the updates');
      console.error(err);
      dbHelper.closeConnection(function() {
        process.exit(-2);
      });
    });
  }).catch(function(err) {
    console.log('An error occurred');
    console.error(err);
    dbHelper.closeConnection(function() {
      process.exit(-1);
    });
  });
};

program
  .option('-f, --force', 'Force the update of all planes')
  .parse(process.argv);

// Handles the ctrl+c in the terminal
process.on('SIGINT', function() {
  dbHelper.closeConnection(function() {
    process.exit(0);
  });
});

consolidate2();
