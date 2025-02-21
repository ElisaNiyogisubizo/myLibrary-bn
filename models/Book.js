const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  publishDate: { type: Date, required: true },
  imageUrl: { type: String, required: false },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
