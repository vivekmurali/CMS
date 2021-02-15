var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Posts");
const Comment = require("../models/Comment");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/posts/:title", (req, res) => {
  Post.find({ siteTitle: req.params.title }, (err, posts) => {
    // console.log(posts);
    // let comments = posts.map((post) => post._id);
    res.status(200).json(posts);
    // res.status(200).json({ posts: posts, comments: comments });
  });
});

router.get("/allposts", (req, res) => {
  User.find({}, (err, user) => {
    if (err) throw err;
    res.send(user);
  });
});

router.get("/posts", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, "jsonkey", (err, user) => {
    if (err) {
      console.error(err.message);
      res.status(401).send("unauthorized");
      return;
    }
    Post.find({ siteTitle: user.user.siteTitle }, (err, posts) => {
      if (err) throw err;
      res.status(200).json(posts);
    });
  });
});

router.post("/comments", (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    postId: req.body.postId,
  });
  comment
    .save()
    .then(() => {
      res.status(200).send("Added comment");
    })
    .catch((err) => {
      res.send(400).send("Could not comment");
    });
});
module.exports = router;
