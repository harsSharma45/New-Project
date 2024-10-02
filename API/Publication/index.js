const express = require('express');
const Router = express.Router();
const PublicationModel = require('../../database/publication');
const BookModel = require('../../database/book');

// Get all publications
Router.get("/", async (req, res) => {
    try {
        const publications = await PublicationModel.find();
        return res.json({ publications });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get a specific publication by ID
Router.get('/:id', async (req, res) => {
    try {
        const publication = await PublicationModel.findOne({ id: req.params.id });
        if (!publication) {
            return res.status(404).json({ error: `No publication found for ID ${req.params.id}` });
        }
        return res.json({ publication });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get all publications based on book ISBN
Router.get("/book/:isbn", async (req, res) => {
    try {
        const publication = await PublicationModel.findOne({ books: req.params.isbn });
        return res.json({ publication });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Add a new publication
Router.post("/add", async (req, res) => {
    try {
        const { newPublication } = req.body;
        const addedPublication = await PublicationModel.create(newPublication);
        return res.status(201).json({ message: "Publication added successfully", publication: addedPublication });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update publication name by ID
Router.put("/update/name/:id", async (req, res) => {
    try {
        const updatedPublication = await PublicationModel.findOneAndUpdate(
            { id: req.params.id },
            { name: req.body.newName },
            { new: true }
        );
        return res.json({ publication: updatedPublication });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update/add a new book to a publication
Router.put("/update/book/:isbn", async (req, res) => {
    try {
        const updatedPublication = await PublicationModel.findOneAndUpdate(
            { id: req.body.pubId },
            { $addToSet: { books: req.params.isbn } },
            { new: true }
        );

        const updatedBooks = await BookModel.findOneAndUpdate(
            { ISBN: req.params.isbn },
            { $addToSet: { publications: req.body.pubId } },
            { new: true }
        );

        return res.json({
            publication: updatedPublication,
            book: updatedBooks
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Delete a publication from a book
Router.delete("/delete/book/:isbn/:pubId", async (req, res) => {
    try {
        const updatedPublication = await PublicationModel.findOneAndUpdate(
            { id: req.params.pubId },
            { $pull: { books: req.params.isbn } },
            { new: true }
        );

        const updatedBooks = await BookModel.findOneAndUpdate(
            { ISBN: req.params.isbn },
            { $pull: { publications: req.params.pubId } },
            { new: true }
        );

        return res.json({
            book: updatedBooks,
            publication: updatedPublication
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Delete a publication by ID
Router.delete("/delete/:pubId", async (req, res) => {
    try {
        const deletedPublication = await PublicationModel.findOneAndDelete({ id: req.params.pubId });
        return res.json({ publication: deletedPublication });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = Router;
