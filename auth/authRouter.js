const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel.js");

router.post("/register", (req, res) => {
  const newUser = req.body;

  const hash = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hash;

  Users.insert(newUser)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to register new user. Please try again later."
      });
    });
});

module.exports = router;
