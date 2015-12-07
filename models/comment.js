"use strict";
let mongoose = require("mongoose");
let commentSchema = new mongoose.Schema({
	message: String,
	dateCreated: { type : Date, default: Date.now },
	post: { type : mongoose.Schema.Types.ObjectId, ref: "Post" },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
});
module.exports = mongoose.model("Comment", commentSchema);
