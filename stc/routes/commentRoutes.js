const express = require("express");
const router = express.Router({ mergeParams: true });
const Post = require("../models/post");
const Comment = require("../models/comment");
const { isLoggedIn } = require("../middleware");

router.route("/create").post(isLoggedIn, async (req, res) => {
	console.log("Comment aangemaakt");
	console.log(req.body);
	console.log(req.params);

	try {
		const { id } = req.params;
		console.log(req.params);
		const post = await Post.findById(id);
		const { body, rating } = req.body.comment;
		const comment = new Comment({
			body,
			rating,
			author : req.user._id
		});
		post.comments.push(comment);
		await comment.save();
		await post.save();
		res.redirect(`/stc/${id}`);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
