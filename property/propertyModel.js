const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  findAll,
  findByUser,
  findById,
  remove,
  update
};
//* POST new property
function insert(newProperty) {
  return db("property")
    .insert(newProperty, "id")
    .then(([id]) => findById(id));
}

//* GET all properties
function findAll() {
  return db("property");
}

//* GET all properties under user's ID
function findByUser(id) {
  return db("property").where("user_id", "=", id);
}

//* GET property by ID
function findById(id) {
  return db("property")
    .where("id", "=", id)
    .first();
}

//* DELETE property by ID
function remove(id) {
  return db("property")
    .where("id", "=", id)
    .del();
}

//* UPDATE property by ID
function update(id, property) {
  return db("property")
    .where("id", "=", id)
    .update(property);
}
