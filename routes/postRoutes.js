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
        .sort("-dateCreated")
        .populate("createdBy", "username")
        .exec((err, result) => {
            if (err) return next(err);
            res.send(result);
        });
});

router.post("/", auth, (req, res, next) => {
  if(!req.body.image) return next('Please include an image');
	let post = new Post(req.body);
	post.createdBy = req.payload._id;
  post.upVoters.push('init');
  post.downVoters.push('init');
  post.image = req.body.image;
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
    Post.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) return next(err);
        User.findOneAndUpdate({
            "posts": req.params.id
        }, {
            $pull: {
                posts: req.params.id
            }
        }, (err, result) => {
            if (err) return next(err);
            res.send(result);
        });
    });
});

router.put("/:id", (req, res, next) => {
    Post.update({ _id : req.params.id }, req.body, function(err, result) {
        if (err) return next(err);
        if (!result) return next('Post not found!');
        res.send(result);
    });
});

router.put("/upvote/:id", auth, (req, res, next) => {
  Post.findOne({ _id : req.params.id }).exec((err, result) => {
    for (var i = 0; i < result.upVoters.length; i++){
      if(result.upVoters[i] == req.payload._id){
        return res.send(result);
      }
      else if((i+1) >= result.upVoters.length){
        result.upVoters.push(req.payload._id);
        result.rating++;
        result.save();
        for (var i = 0; i <result.downVoters.length; i++){
          if(result.downVoters[i] == req.payload._id){
            result.downVoters.splice(i, 1);
            result.upVoters.splice(result.upVoters.indexOf(req.payload._id), 1);
            result.save();
            return res.send(result);
          }
        }
        return res.send(result);
      }
    }
  });
});

router.put("/downvote/:id", auth, (req, res, next) => {
  Post.findOne({ _id : req.params.id }).exec((err, result) => {
    for (var i = 0; i < result.downVoters.length; i++){
      if(result.downVoters[i] == req.payload._id){
        return res.send(result);
      }
      else if((i+1 >= result.downVoters.length)){
        result.downVoters.push(req.payload._id);
        result.rating--;
        result.save();
        for (var i = 0; i <result.upVoters.length; i++){
          if(result.upVoters[i] == req.payload._id){
            result.upVoters.splice(i, 1);
            result.downVoters.splice(result.downVoters.indexOf(req.payload._id), 1);
            result.save();
            return res.send(result);
          }
        }
        return res.send(result);
      }
    }
  });
});

module.exports = router;
