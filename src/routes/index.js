const express = require("express");
const userRouter = require("./user.routes");
const bookRouter = require("./book.routes");

const router = express.Router();

router.use("/user", userRouter);
router.use("/books", bookRouter);
module.exports = router;

// ROUTES > CONTROLLERS > MODELS > SCHEMA;
