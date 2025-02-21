const Book = require("../models/Book");

// Get all books with optional filters
const getBooks = async (req, res) => {
  try {
    const { genre, sortBy, search } = req.query;
    let query = {};

    // Apply genre filter
    if (genre) query.genre = genre;

    // Apply search filter
    if (search) query.title = { $regex: search, $options: "i" };

    let books = await Book.find(query);

    // Apply sorting
    if (sortBy === "rating") {
      books = books.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "date") {
      books = books.sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
      );
    }

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get individual book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new book
const createBook = async (req, res) => {
  const { title, author, genre, rating, description, publishDate, imageUrl } =
    req.body;

  const newBook = new Book({
    title,
    author,
    genre,
    rating,
    description,
    publishDate,
  });

  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
