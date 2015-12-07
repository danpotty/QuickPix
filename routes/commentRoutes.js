'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let Post = mongoose.model('Post');
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload',
  secret: 'hiskett & sons'
});

router.get('/:id', (req, res, next) => {
  Post.findOne({ _id: req.params.id }).exec((err, result) => {
    if(err) return next(err);
    if(!result) next('Could not find that post');
    res.send(result);
  });
});

module.exports = router;
