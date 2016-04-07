'use strict';

var express = require('express'),
  http = require('http'),
  cons = require('consolidate'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  jwt = require('express-jwt'),
  path = require('path'),
  socketio = require('socket.io'),
  chalk = require('chalk'),
  passport = require('passport');


  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/mean-chat');

// module.exports.initSockets = function(app) {
//   var server = http.createServer(app);
//   var io = socketio(server);
//
//   io.on('connection', function(socket) {
//     require('../server/sockets/chat')(io, socket);
//   });
//
//   return server;
// };

var auth = jwt({ secret: 'secret', userProperty: 'payload' })

module.exports.initRoutes = function(app) {
  require('../app/system/server/routes/index')(app);
  require('../app/users/server/routes/user')(app);

};

module.exports.initModels = function() {
  require('../app/users/server/models/user');
};

module.exports.initAuth = function() {
  require('./passport');
};

module.exports.init = function() {

  var port = process.env.PORT || '3000';

  var app = express();

  // Add request logging
  app.use(morgan('dev'));

  // Add favicon later

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Serve static resources
  app.use(express.static('./'));

  // Setup mongoose models
  this.initModels();

  // Add passport
  this.initAuth();
  app.use(passport.initialize());

  // Choose view engine
  app.engine('html', cons.swig);
  app.set('view engine', 'html');
  app.set('views', 'app/system/server/views');

  // Definite routing
  this.initRoutes(app);

  // Bootstrap our sockets
  // app = this.initSockets(app);

  app.listen(port, function() {
    console.log(chalk.green('Listening on port: ' + port));
  });

  return app;
};
