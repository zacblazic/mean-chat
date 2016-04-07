var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mongoose = require('mongoose'),
  User = mongoose.model('User');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' })
    }
    if (!user.authenticate(password)) {
      return done(null, false, { message: 'Incorrect username or password.' })
    }
    return done(null, user);
  });
}));
