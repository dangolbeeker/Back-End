const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  findAll,
  findByUser,
  findById,
  remove,
  update
};

function insert(newUser) {
  return db("users")
    .insert(newUser, "id")
    .then(([id]) => findById(id));
}

function findAll() {
  return db("users");
}

function findByUser(user) {
  return db("users")
    .where("username", "=", user)
    .first();
}

function findById(id) {
  return db("users")
    .where("id", "=", id)
    .first();
}

function remove(id) {
  return db("users")
    .where("id", "=", id)
    .del();
}

function update(id, newUser) {
  return db("users")
    .where("id", "=", id)
    .update(newUser);
}
