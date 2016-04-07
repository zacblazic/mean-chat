'use strict';

var mongoose = require('mongoose'),
  crypto = require('crypto'),
  jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  password: String,
  salt: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('base64');
  this.password = this.hashPassword(password);
};

UserSchema.methods.authenticate = function(password) {
  return this.password == this.hashPassword(password);
};

UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return password;
  }
};

UserSchema.methods.generateToken = function() {
  var expiration = new Date();
  expiration.setDate(expiration.getDate() + 60);
  var expirationSeconds = parseInt(expiration.getTime() / 1000);

  return jwt.sign({
    id: this._id,
    username: this.username,
    expiration: expirationSeconds
  }, 'secret');
};

mongoose.model('User', UserSchema);
