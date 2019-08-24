var _ = require('lodash');
var mongoose = require('mongoose');

var connectOptions = {
  useNewUrlParser: true,
  loggerLevel: 'warn'
};

const DB_SERVER_IP = process.env.DB_SERVER_IP;
const DB_SERVER_PORT = process.env.DB_SERVER_PORT;
const DB_NAME = process.env.DB_NAME;

let uri = `mongodb://${DB_SERVER_IP}:${DB_SERVER_PORT}/${DB_NAME}`;

mongoose.connect(uri, connectOptions, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to mongodb');
  }
});

// connect to database
module.exports = mongoose.connection;
