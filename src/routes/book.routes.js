const { Router } = require("express");
const { verifyAuthToken } = require("../middleware/authenticate");
const {
  getBooks,
  getBookById,
  saveBook,
  getSavedBooks,
  deleteSavedBook,
} = require("../controller/book.controller");

const bookRouter = Router();

bookRouter.get("/", getBooks);

// Saved Books - AUTH Token
bookRouter.post("/saveBook", verifyAuthToken, saveBook);
bookRouter.get("/savedBooks", verifyAuthToken, getSavedBooks);
bookRouter.delete("/savedBooks/:bookId", verifyAuthToken, deleteSavedBook);
bookRouter.get("/:bookId", getBookById); // it has to be last because it picks up all the routes

module.exports = bookRouter;
