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

module.exports = mongoose.model('User', UserSchema);
