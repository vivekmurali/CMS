const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Posts");

const login = (req, res, next) => {
  var email = req.body.email,
    password = req.body.password;

  User.findOne({ email: email }).then(function (user) {
    if (!user) {
      console.log("no user found");
      res.status(400).send("No user found");
    } else {
      bcrypt.compare(password, user.password).then((a) => {
        if (a === false) {
          res.status(401).send("Wrong password");
          console.log("not same password");
        } else {
          const token = jwt.sign({ user }, "jsonkey");
          console.log(user.password);
          res.status(200).json({ token: token });
        }
      });
    }
  });
};
const register = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.status(403).send("User already exists");
    } else {
      req.body.password = bcrypt.hashSync(req.body.password);
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        siteTitle: req.body.siteTitle,
      });
      user
        .save()
        .then((user) => {
          res.status(200).send("Registered successfully");
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send("Could not register user");
        });
    }
  });
};

const edituser = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, "jsonkey", (err, user) => {
    if (err) {
      console.error(err.message);
      res.status(401).send("unauthorized");
      return;
    }
    await User.findByIdAndUpdate({_id: user.user._id},{
      email: req.body.email,
      password: req.body.password,
      siteTitle: req.body.siteTitle
    });
    res.status(200).send("Updated user settings");
  });
};

const newPost = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, "jsonkey", (err, user) => {
    if (err) {
      console.error(err.message);
      res.status(401).send("unauthorized");
      return;
    }
    console.log(user);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      siteTitle: user.user.siteTitle,
    });
    post
      .save()
      .then(() => res.status(201).json(post))
      .catch((err) => console.log(err.message));
  });
};
const editPost = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, "jsonkey", async (err, user) => {
    if (err) {
      res.status(401).send("not authorized");
      return;
    }
    await Post.findByIdAndUpdate(req.params.postId, {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
    });
    res.status(200).send("Updated successfully");
  });
};
const deletePost = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, "jsonkey", async (err, user) => {
    if (err) {
      res.status(401).send("not authorized");
      return;
    }
    try {
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).send("Deleted successfully");
    } catch (err) {
      console.error(err.message);
    }
  });
};

module.exports = { login, register, edituser, newPost, editPost, deletePost };
