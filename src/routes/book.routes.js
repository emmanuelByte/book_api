const { Router } = require("express");
const { verifyAuthToken } = require("../middleware/authenticate");
const { getBooks, getBookById } = require("../controller/book.controller");

const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:bookId", getBookById);

module.exports = bookRouter;
