const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// Get all books (with optional filters)
router.get("/", getBooks);

// Get individual book by ID
router.get("/:id", getBookById);

// Create a new book
router.post("/", createBook);

// Update a book by ID
router.put("/:id", updateBook);

// Delete a book by ID
router.delete("/:id", deleteBook);

module.exports = router;
