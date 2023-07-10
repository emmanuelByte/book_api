const { isObjectIdOrHexString } = require("mongoose");
const bookModel = require("../model/book.model");
const UserModel = require("../model/User.model");

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

async function saveBook(req, res) {
  try {
    const user = req.user;
    const data = req.body;
    if (!data.bookId)
      return res.status(400).json({
        message: "Book id is required",
      });
    if (!isObjectIdOrHexString(data.bookId))
      return res.status(400).json({
        message: "Invalid book id",
      });
    const book = await bookModel.findOne({ _id: data.bookId });
    if (!book) return res.status(400).json({ message: "Book does not exist " });
    const isBookSaved = user.books.includes(data.bookId);
    if (isBookSaved)
      return res.status(400).json({ message: "Book already saved " });
    await UserModel.updateOne(
      { _id: user._id },
      { $push: { books: book._id } }
    );

    return res.status(200).json({
      success: true,
      message: "Book saved successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getSavedBooks(req, res) {
  try {
    const user = req.user;
    console.log("user", user);
    const books = await bookModel.find({ _id: { $in: user.books } });
    return res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function deleteSavedBook(req, res) {
  try {
    const user = req.user;
    const bookId = req.params.bookId;
    if (!isObjectIdOrHexString(bookId))
      return res.status(400).json({
        message: "Invalid book id",
      });
    const book = await bookModel.findOne({ _id: bookId });
    if (!book) return res.status(400).json({ message: "Book does not exist " });

    await UserModel.updateOne({ _id: user._id }, { $pull: { books: bookId } });
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getBooks,
  getBookById,
  saveBook,
  getSavedBooks,
  deleteSavedBook,
};
