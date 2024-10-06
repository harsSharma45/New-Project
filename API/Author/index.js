const express = require('express');
const Router = express.Router();
const AuthorModel = require('../../database/author');

// Get all authors
Router.get("/", async (req, res) => {
    try {
        const authors = await AuthorModel.find();
        return res.json({ authors });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get specific author by ID
Router.get('/:authorId', async (req, res) => {
    try {
        const author = await AuthorModel.findOne({ id: req.params.authorId });
        if (!author) {
            return res.status(404).json({ error: `No author found for ID ${req.params.authorId}` });
        }
        return res.json({ author });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get all authors based on a book's ISBN
Router.get("/book/:isbn", async (req, res) => {
    try {
        const authors = await AuthorModel.find({ books: req.params.isbn });
        if (!authors || authors.length === 0) {
            return res.status(404).json({ error: `No authors found for book with ISBN ${req.params.isbn}` });
        }
        return res.json({ authors });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Add new author
Router.post("/add", async (req, res) => {
    try {
        const { newAuthor } = req.body;
        const createdAuthor = await AuthorModel.create(newAuthor);
        return res.status(201).json({ message: "Author added successfully", author: createdAuthor });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update author name by ID
Router.put("/update/:authorId/:name", async (req, res) => {
    try {
        const updatedAuthor = await AuthorModel.findOneAndUpdate(
            { id: req.params.authorId },
            { name: req.params.name },
            { new: true }
        );
        if (!updatedAuthor) {
            return res.status(404).json({ error: `No author found for ID ${req.params.authorId}` });
        }
        return res.json({ author: updatedAuthor });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Delete an author by ID
Router.delete("/delete/:authorId", async (req, res) => {
    try {
        const deletedAuthor = await AuthorModel.findOneAndDelete({ id: req.params.authorId });
        if (!deletedAuthor) {
            return res.status(404).json({ error: `No author found for ID ${req.params.authorId}` });
        }
        return res.json({ message: "Author deleted successfully", author: deletedAuthor });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = Router;
