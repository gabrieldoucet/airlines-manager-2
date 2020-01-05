var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var connectOptions = {
  useNewUrlParser: true,
  loggerLevel: 'warn',
    useUnifiedTopology: true
};

const DB_SERVER_IP = process.env.DB_SERVER_IP;
const DB_SERVER_PORT = process.env.DB_SERVER_PORT;
const DB_NAME = process.env.DB_NAME;

let uri = `mongodb://${DB_SERVER_IP}:${DB_SERVER_PORT}/${DB_NAME}`;

mongoose.connect(uri, connectOptions).then(function() {
  console.log('Connected to mongodb');
}).catch(function(err) {
  console.error(err);
});

// connect to database
module.exports = mongoose.connection;
