const books = require("../data/books.json");
const bookModel = require("../model/book.model");

async function importBookToDB() {
  await bookModel.insertMany(books);
}

module.exports = { importBookToDB };
