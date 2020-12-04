const express = require("express");
const router = express.Router();
const Post = require("../models/post");
// const Comment = require("../models/comment");

const { isLoggedIn } = require("../middleware");

router.route("/").post(async (req, res) => {
	try {
		const { title, category, body, region } = req.body.post;
		const post = new Post({
			title,
			categoryType : category,
			body,
			region,
			author       : req.user._id
		});
		await post.save();
		res.redirect(`/stc/${post._id}`);
	} catch (e) {
		console.log(e);
	}
});

router.route("/vraag").get(async (req, res) => {
    const posts = await Post.find({
        categoryType : "vraag"
    })
        .populate("author")
        .sort({ date: -1 })
        .limit(20);
    res.render("stc/hulpvraag.ejs", {
        posts
    });
});
router.route("/aanbod").get(async (req, res) => {
    const posts = await Post.find({
        categoryType : "aanbod"
    })
        .populate("author")
        .sort({ date: -1 })
        .limit(20);
    res.render("stc/hulpvraag.ejs", {
        posts
    });
});
router.route("/create").get(isLoggedIn, (req, res) => {
	res.render("stc/createhulp.ejs");
});
router.route("/:id")
	.get(async (req, res) => {
		const { id } = req.params;
		const post = await (await Post.findById(id).populate("comments")).populate("author");
		res.render("stc/show.ejs", {
			post
		});
	})
	.delete(async (req, res) => {
		const { id } = req.params;
		await Post.findByIdAndDelete(id);
		res.redirect("/");
	});


module.exports = router;
