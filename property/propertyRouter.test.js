const db = require("../data/dbConfig.js");
const Users = require("../users/usersModel.js");
const request = require("supertest");
const server = require("../api/server.js");

describe("This is to make sure everything is in testing", () => {
  beforeEach(async () => {
    await db("users").truncate();
    await request(server)
      .post("/api/auth/register")
      .send({ username: "John", password: "password" });
  });
});

describe("GET request in Property with token", () => {
  var token = null;
  beforeEach(async () => {
    request(server)
      .post("/api/auth/login")
      .send({ username: "John", password: "password" })
      .end(function(err, res) {
        token = res.body.token;
      });
  });
  it("should get a valid token", function() {
    request(server)
      .get("/api/property/1")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });
});
