const books = require("../data/books.json");
const bookModel = require("../model/book.model");

async function importBookToDB() {
  console.log("Importing books to DB");
  await bookModel.insertMany(books);
  console.log("Books imported to DB");
}

module.exports = { importBookToDB };
