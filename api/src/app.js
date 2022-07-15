const express = require("express");
const routes = require("./routes/index.js");
const { server_settings } = require("./config/server");

require("./db.js");

const server = express();

//server name
server.name = "API";
//server settings(cors & middlewares)
server_settings(server);
//server routes
server.use("/", routes);

module.exports = { server };
