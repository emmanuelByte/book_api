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
  category: {
    type: [String],
  },
});

module.exports = mongoose.model("Book", BookSchema);
