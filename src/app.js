const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const helmet = require("helmet");

const errorHandler = require("./middleware/errorHandler");
const { default: listEndpoints } = require("list_end_points");
const router = require("./routes");

const app = express();

app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(logger("dev")); // show the logs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("", router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);
listEndpoints(app);
module.exports = app;
