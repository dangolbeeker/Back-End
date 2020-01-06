const express = require("express");

const authRouter = require("../auth/authRouter.js");

const server = express();
server.use(express.json());

server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send("Hello, server is running");
});

module.exports = server;
