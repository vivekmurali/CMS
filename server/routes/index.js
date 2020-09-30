var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Posts");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/posts/:title", (req, res) => {
  Post.find({ siteTitle: req.params.title }, (err, posts) => {
    res.status(200).json(posts);
  });
});

module.exports = router;
