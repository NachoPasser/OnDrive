const { json, urlencoded } = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan"); //cors
const cors = require("cors");
//CORS Options
const { OPTIONS } = require("./cors");

const server_settings = (server) => {
  server.use(cors(OPTIONS));
  server.use(urlencoded({ extended: true }));
  server.use(json());
  server.use(cookieParser());
  server.use(morgan("dev"));
};

module.exports = { server_settings };
