const db = require("../data/dbConfig.js");
const Users = require("./usersModel.js");
const request = require("supertest");
const server = require("../api/server.js");

describe("GET request in User Router without token", () => {
  it("GET request should return error without credentials", function() {
    return request(server)
      .get("/api/users")
      .then(response => {
        expect(response.body.message).toMatch(
          /Please provide valid credentials to enter./i
        );
      });
  });
});

describe("GET request in User Router with token", () => {
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
      .get("/api/users")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });
});
