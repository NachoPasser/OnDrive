const express = require("express");
const routes = require("./routes/index.js");
const { server_settings } = require("./config/server");

//set dabatase & relations
require("./database/db.js");
require("./database/relations.js");


const server = express();

//server name
server.name = "API";
//server settings(cors & middlewares)
server_settings(server);
//server routes
server.use("/", routes);

module.exports = { server };
