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
  Post.findOne({ _id: req.params.id })
  .populate("comments")
  .exec((err, result) => {
    if(err) return next(err);
    if(!result) next('Could not find that post');
    res.send(result);
  });
});

// /api/v1/comment/:id
router.post("/:id", auth, (req, res, next) => {
	let comment = new Comment(req.body);
	comment.user = req.payload._id;
	comment.post = req.params.id;
	comment.save((err, result) => {
		if(err) return next(err);
		if(!result) return next("Could not create this comment");
		User.update({ _id : req.payload._id }, { $push: { comments: result._id }}, (err, user) => {
			if(err) return next(err);
			Post.update({ _id : req.params.id }, { $push: { comments: result._id }}, (err, post) => {
				if(err) return next(err);
        console.log('commentRoutes(36), new comment:');
        console.log(comment._id);
				res.send(result);
			});
		});
	});
});

router.put("/:id", (req, res, next) => {
  if(!req.body.message) return next('Please enter a comment');
  Comment.update({ _id : req.params.id }, { message : req.body.message }, function(err, result) {
    if(err) return next(err);
    if(!result) return next('Comment not found!');
    res.send(result);
  });
});

router.delete("/:id", (req, res, next) => {
  console.log('commentRoutes(53), deleting comment:');
  console.log(req.params.id);
	Comment.remove({ _id : req.params.id }, (err, result) => {
		if(err) return next(err);
		Post.findOneAndUpdate({ "comments" : req.params.id }, { $pull : { comments : req.params.id }}, (err, result) => {
			if(err) return next(err);
      User.findOneAndUpdate({ "comments" : req.params.id }, { $pull : { comments : req.params.id }}, (err, result) => {
  			if(err) return next(err);
			    res.send(result);
      });
		});
	});
});

module.exports = router;
