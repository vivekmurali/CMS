var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.route("/register").post((req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.status(403).send("User already exists");
    } else {
      req.body.password = bcrypt.hashSync(req.body.password);
      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });
      user
        .save()
        .then((user) => {
          req.session.userId = user._id;
          res.status(200).send("Registered successfully");
        })
        .catch((error) => {
          res.status(400).send("Could not register user");
        });
    }
  });
});

router.route("/login").post((req, res) => {
  var email = req.body.email,
    password = req.body.password;

  User.findOne({ email: email }).then(function (user) {
    if (!user) {
      console.log("no user found");
      res.status(400).send("No user found");
    } else if (!bcrypt.compare(password, user.password)) {
      res.status(401).send("Wrong password");
      console.log("not same password");
    } else {
      const token = jwt.sign({ user }, "jsonkey");
      res.status(200).json({ token: token });
    }
  });
});

module.exports = router;
