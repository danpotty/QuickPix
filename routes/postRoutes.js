'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Post = mongoose.model('Post');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload',
  secret: 'hiskett & sons'
});

router.post("/", auth, (req, res, next) => {
	let post = new Post(req.body);
	post.createdBy = req.payload._id;
	post.save((err, result) => {
		if(err) return next(err);
		if(!result) return next("Could not create post");
		User.update({ _id : req.payload._id }, { $push: { posts : result._id }}, (err, user) => {
			if(err) return next(err);
			if(!user) return next("Could not push post into user");
			res.send(result);
		});
	});
});

module.exports = router;
