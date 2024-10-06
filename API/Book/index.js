const express = require("express");
const Router = express.Router();
const BookModel = require("../../database/book");
const AuthorModel = require("../../database/author");
const { check, validationResult } = require("express-validator");

// Validation middleware for adding a new book
const validateBook = [
    check('newBooks.title').notEmpty().withMessage('Title is required'),
    check('newBooks.ISBN').notEmpty().withMessage('ISBN is required'),
    check('newBooks.category').notEmpty().withMessage('Category is required'),
    check('newBooks.language').notEmpty().withMessage('Language is required'),
];

// Get all books
Router.get('/', async (req, res) => {
    try {
        const books = await BookModel.find();
        return res.json({ books });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get a book by ISBN
Router.get('/is/:isbn', async (req, res) => {
    try {
        const book = await BookModel.findOne({ ISBN: req.params.isbn });
        if (!book) {
            return res.status(404).json({ error: `No book found for ISBN ${req.params.isbn}` });
        }
        return res.json({ book });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get books by category
Router.get('/c/:category', async (req, res) => {
    try {
        const books = await BookModel.find({ category: req.params.category });
        if (!books || books.length === 0) {
            return res.status(404).json({ error: `No books found for category ${req.params.category}` });
        }
        return res.json({ books });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get books by language
Router.get('/l/:language', async (req, res) => {
    try {
        const books = await BookModel.find({ language: req.params.language });
        return res.json({ books });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Add a new book
Router.post("/add", validateBook, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { newBooks } = req.body;
        const addedBook = await BookModel.create(newBooks);
        return res.status(201).json({ message: "Book added successfully", book: addedBook });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update book title by ISBN
Router.put("/update/title/:isbn", async (req, res) => {
    try {
        const updatedBook = await BookModel.findOneAndUpdate(
            { ISBN: req.params.isbn },
            { title: req.body.bookTitle },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: `No book found for ISBN ${req.params.isbn}` });
        }

        return res.json({ book: updatedBook });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update/add a new author for a book
Router.put("/update/author/:isbn/:authorID", async (req, res) => {
    try {
        const updatedBook = await BookModel.findOneAndUpdate(
            { ISBN: req.params.isbn },
            { $addToSet: { authors: req.params.authorID } },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: `No book found for ISBN ${req.params.isbn}` });
        }

        const updatedAuthor = await AuthorModel.findOneAndUpdate(
            { id: req.params.authorID },
            { $addToSet: { books: req.params.isbn } },
            { new: true }
        );

        return res.json({
            message: "New author added successfully",
            book: updatedBook,
            author: updatedAuthor
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Delete a book by ISBN
Router.delete("/delete/:isbn", async (req, res) => {
    try {
        const deletedBook = await BookModel.findOneAndDelete({ ISBN: req.params.isbn });
        if (!deletedBook) {
            return res.status(404).json({ error: `No book found for ISBN ${req.params.isbn}` });
        }
        return res.json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Remove an author from a book by ISBN
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
    try {
        const updatedBook = await BookModel.findOneAndUpdate(
            { ISBN: req.params.isbn },
            { $pull: { authors: parseInt(req.params.authorId) } },
            { new: true }
        );

        const updatedAuthor = await AuthorModel.findOneAndUpdate(
            { id: parseInt(req.params.authorId) },
            { $pull: { books: req.params.isbn } },
            { new: true }
        );

        return res.json({
            message: "Author removed successfully",
            book: updatedBook,
            author: updatedAuthor
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = Router;
