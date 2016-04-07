'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  md5 = require('md5'),
  crypto = require('crypto'),
  jwt = require('jsonwebtoken');

var UserSchema = new Schema({
  username: { type: String, lowercase: true, unique: true },
  emailHash: String,
  displayName: String,
  password: String,
  salt: String,
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function (next) {
  if (this.username && this.isModified('username')) {
    this.emailHash = md5(this.username);
  }

  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

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
