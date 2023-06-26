const express = require("express");
const userRouter = require("./user.routes");

const router = express.Router();

router.use("/user", userRouter);

module.exports = router;

// ROUTES > CONTROLLERS > MODELS > SCHEMA;
