"use strict";
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username: String,
  local: {
    email: {
      type: String,
      sparse: true,
      lowercase: true,
      trim: true,
      unique: true
    },
    password: String
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

UserSchema.methods.CreateHash = function(password, cb){
  let SALT_ROUNDS = 10;
  if(process.env.NODE_ENV === 'test') SALT_ROUNDS = 1;
  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if(err) return cb(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if(err) return cb(err);
      cb(null, hash);
    });
  });
};

UserSchema.methods.validatePassword = function(password, hash, cb){
  bcrypt.compare(password, hash, (err, res) => {
    if(err) return cb(err);
    cb(null, res);
  });
};

UserSchema.methods.generateJWT = function(){
  return jwt.sign({
    _id: this._id,
    email: this.local.email,
    username: this.username
  }, process.env.AUTH_SECRET);
};

module.exports = mongoose.model('User', UserSchema);
