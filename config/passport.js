"use strict";
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({
    'local.email': email
  }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(`Cannot find user requested.`);
    user.validatePassword(password, user.local.password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(`Incorrect login information.`);
      return done(null, user);
    });
  });
}));
