'use strict';

var passport = require('passport'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(app) {
  app.post('/register', function(req, res, next) {
    if(!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function (err){
      if(err){ return next(err); }

      return res.json({token: user.generateToken()})
    });
  });

  app.post('/login', function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info){
      if(err){ return next(err); }

      if(user){
        return res.json({token: user.generateToken()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

  app.get('/users', function(req, res, next) {
    User.find({}, '-salt -password', function(err, users) {
      if (err) { next(err); }
      res.json(users);
    });
  });

  app.param('user', function(req, res, next, id) {
    var query = User.findById(id, '-salt -password');

    query.exec(function(err, user) {
      if (err) { next(err); }
      if (!user) { next(new Error('user not found')); }
      req.user = user;
      return next();
    })
  });

  app.get('/users/:user', function(req, res) {
    res.json(req.user);
  });

  app.post('/users/:user', function(req, res, next) {
    req.user.displayName = req.body.displayName;
    req.user.save(function(err) {
      if (err) { return next(err); }
      res.json(req.user);
    });
  });
};
