'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Post = mongoose.model('Post');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload'
  secret: 'hiskett & sons'
});

module.exports = router;
