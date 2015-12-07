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

router.get('/', (req, res, next) => {
  Post.find({})
    // .populate('image', 'message', 'dateCreated', 'rating', 'createdBy')
    .exec((err, result) => {
      if(err) return next(err);
      res.send(result);
    });
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

router.delete("/:id", (req, res, next) => {
  Post.remove({ _id: req.params.id }, (err, result) => {
    if(err) return next(err);
    User.findOneAndUpdate({ "posts" : req.params.id }, { $pull : { posts : req.params.id }}, (err, result) => {
      if(err) return next(err);
      res.send(result);
    });
  });
});

router.put("/upvote/:id", (req, res, next) => {
  Post.findOne({ _id : req.params.id }).exec((err, result) => {
    result.rating++;
    result.save();
    res.send(result);
  });
});

router.put("/downvote/:id", (req, res, next) => {
  Post.findOne({ _id : req.params.id }).exec((err, result) => {
    result.rating--;
    result.save();
    res.send(result);
  });
});


module.exports = router;
