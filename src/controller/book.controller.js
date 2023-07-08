const { isObjectIdOrHexString } = require("mongoose");
const bookModel = require("../model/book.model");

async function getBooks(req, res) {
  try {
    const books = await bookModel.find({});
    return res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getBookById(req, res) {
  try {
    const id = req.params.bookId;
    if (!isObjectIdOrHexString(id))
      return res.status(400).json({
        message: "Invalid book id",
      });
    const book = await bookModel.findOne({ _id: id });
    if (!book) return res.status(400).json({ message: "Book does not exist " });
    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { getBooks, getBookById };
