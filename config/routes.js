const express = require("express");
const apiRegistry = require("./api-registry.json");

module.exports = function (server) {
  const protectedApi = express.Router();
  server.use("/api", protectedApi);

  server.use("/status", (req, res) => res.send(`BACKEND is runner.`));

  Object.keys(apiRegistry).forEach((path) => {
    const service = require(apiRegistry[path]);
    service.register(protectedApi, path);
  });

  server.use(express.static(require("path").join(__dirname, "../public")));
};
