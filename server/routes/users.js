var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Posts");
const {
  login,
  register,
  editUser,
  newPost,
  editPost,
  deletePost,
} = require("../controllers/user");

router.route("/register").post((req, res, next) => {
  register(req, res, next);
});

router.route("/edituser").put((req, res, next) => {
  editUser(req, res, next);
});

router.route("/login").post((req, res, next) => {
  login(req, res, next);
});

router.post("/posts/new", (req, res, next) => {
  newPost(req, res, next);
});

router.put("/posts/edit/:postId", (req, res, next) => {
  editPost(req, res, next);
});

router.delete("/posts/delete/:postId", (req, res, next) => {
  deletePost(req, res, next);
});

module.exports = router;
