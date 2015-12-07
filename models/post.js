"use strict";
let mongoose = require("mongoose");
let postSchema = new mongoose.Schema({
	image: { type: String, require: true },
	message: String,
	dateCreated: { type : Date, default: Date.now },
	rating: { type: Number, default: 0 },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
});
module.exports = mongoose.model("Post", postSchema);
