"use strict";
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let User = mongoose.model("User");
let Post = mongoose.model("Post");
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload',
  secret: 'hiskett & sons'
});

router.get("/profile/", auth, (req, res, next) => {
	Post.find({ createdBy : req.payload._id })
	.exec((err, result) => {
		if(err) return next(err);
		res.send(result);
	});
});

router.post("/register", (req, res, next) => {
	if(!req.body.email || !req.body.password) return next("Please include an email and password");
	let user = new User();
	user.username = req.body.username;
	user.local.email = req.body.email;
	user.CreateHash(req.body.password, (err, hash) => {
		if(err) return next(err);
		user.local.password = hash;
		user.save((err, result) => {
			if(err) return next(err);
			if(!result) return next("Could not create user");
			res.send({ token : result.generateJWT() });
		});
	});
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user) => {
		if(err) return next(err);
		res.send({ token : user.generateJWT() });
	})(req, res, next);
});

router.put('/:id', auth, (req, res, next) => {
    console.log(req.body, "TEST THIS");
    Post.update({ _id : req.params.id }, {
            image: req.body.url,
        },
        (err, result) => {
            if (err) return next(err);
            if (!result) return next("Could not create the object. Please check all fields.");
            console.log(result, "result ROUTES : 55");
            res.send(result);
        });
});

module.exports = router;