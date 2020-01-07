const express = require("express");
const router = express.Router();
const Users = require("./usersModel.js");
const Property = require("../property/propertyModel.js");

// GET all users ---- /api/users
router.get("/", (req, res) => {
  Users.findAll()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to retrieve all users. Please try again later."
      });
    });
});

// GET user by ID ---- /api/users/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to retrieve user. Please try again later." });
    });
});

// DELETE user ---- /api/users/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to delete user. Please try again later." });
    });
});

// UPDATE user ---- /api/users/:id
router.put("/:id", (req, res) => {
  const id = req.params.id;

  Users.update(id)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to update user. Please try again later." });
    });
});

// POST new property using user's ID --- /api/users/:id/property
router.post("/:id/property", (req, res) => {
  const id = req.params.id;
  const property = req.body;
  const newProperty = { ...property, user_id: id };

  Property.insert(newProperty)
    .then(added => {
      res.status(200).json(added);
    })
    .catch(error => {
      res.status(500).json({ error: error.stack });
    });
});

// GET properties using user's ID --- /api/users/:id/property
router.get("/:id/property", (req, res) => {
  const id = req.params.id;

  Property.findByUser(id)
    .then(properties => {
      res.status(201).json(properties);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to find any properties. Try again later" });
    });
});

module.exports = router;
