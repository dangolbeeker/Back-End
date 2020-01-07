const express = require("express");
const router = express.Router();
const Property = require("./propertyModel.js");

// GET all property ---- /api/property
router.get("/", (req, res) => {
  Property.findAll()
    .then(properties => {
      res.status(201).json(properties);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET property by ID ---- /api/property/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Property.findById(id)
    .then(property => {
      res.status(201).json(property);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE property ---- /api/property/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Property.remove(id)
    .then(deleted => {
      res.status(201).json(deleted);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE property ---- /api/property/:id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updateProp = req.body;

  Property.update(id, updateProp)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
