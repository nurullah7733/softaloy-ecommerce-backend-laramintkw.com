const express = require("express");
require("dotenv").config();
const app = new express();
const router = require("./src/routes/api");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Security Middleware bib Import
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");
const cors = require("cors");
// Database Lib Import
const mongoose = require("mongoose");

// Security Middleware Implement
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// request limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Body Parser Implement
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 100, max: 3000 });
app.use(limiter);

// ******* its for cloud database *******
let URI = process.env.DATABASE_URL;
let option = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASS,
};

// let OPTION = {
//   user: process.env.DATABASE_USER,
//   pass: process.env.DATABASE_PASS,
//   autoIndex: true,
// };

mongoose.connect(URI, option, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log("Database Connection Success");
  }
});
// Routing Implement
app.use("/", router);

// undefiend Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
