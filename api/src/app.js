const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
//cors
const cors = require("cors");

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
//CORS config

const ALLOWED_ORIGINS_REGEX = [
  /https:\/\/on-drive-.*-.vercel.app/,
  /http:\/\/localhost:([0-9]{4})/,
];

const ALLOWED_ORIGINS = ["https://on-drive.vercel.app"];

const corsOptions = {
  origin: (origin, cb) => {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      cb(null, true);
    }
    for (let i = 0; ALLOWED_ORIGINS_REGEX.length; i++) {
      const regex = ALLOWED_ORIGINS_REGEX[i];
      if (regex.test(origin)) return cb(null, true);
    }
    cb(new Error("Not allowed by CORS"));
  },
};

server.use(cors(corsOptions));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
