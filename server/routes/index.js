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
module.exports = router;
