const db = require("../data/dbConfig.js");
const Users = require("../users/usersModel.js");
const request = require("supertest");
const server = require("../api/server.js");

describe("POST REGISTER - new user", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("should insert a new user", async function() {
    await Users.insert({ username: "username", password: "password" });
    const allUsers = await db("users");

    expect(allUsers).toHaveLength(1);
    expect(allUsers[0].username).toBe("username");
  });
});

describe("POST REGISTER - new user using an endpoint", function() {
  it("should insert a new user using endpoint", async function() {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "John", password: "password" });
    const allUsers = await db("users");

    expect(allUsers).toHaveLength(2);
    expect(allUsers[1].username).toBe("John");
  });
});

describe("POST LOGIN - /api/auth/login", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("requires valid credentials", function() {
    return request(server)
      .post("/api/auth/login")
      .then(response => {
        expect(response.body.message).toMatch(
          /Please provide valid user credentials./i
        );
      });
  });
  it("returns a token when logged in", async function() {
    await Users.insert({ username: "John", password: "password" });
    const returningUser = await Users.findByUser("John");
    expect(returningUser).toBeDefined();
  });
});
