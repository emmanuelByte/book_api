const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: [String], //Array of string
  },
  publication_date: {
    type: String,
  },
  publisher: {
    type: String,
  },
  isbn: {
    type: String,
  },
  language: {
    type: String,
  },
  page_count: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
  },
  cover_image: {
    type: String,
  },
  availability: {
    type: String,
  },
});

module.exports = mongoose.model("Book", BookSchema);
