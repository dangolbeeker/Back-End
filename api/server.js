const express = require("express");

server.get("/", (req, res) => {
  res.send("Hello, server is running");
});

module.exports = server;
