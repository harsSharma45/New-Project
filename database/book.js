const mongoose = require('mongoose');

// Define Book Schema
const BookSchema = new mongoose.Schema({
    ISBN: {
        type: String,
        required: true, // ISBN is required
        unique: true, // Ensure that each book has a unique ISBN
    },
    title: {
        type: String,
        required: true, // Title is required
        trim: true, // Trim whitespace
    },
    pubDate: {
        type: String,
        required: true, // Publication date is required
    },
    language: {
        type: [String],
        required: true, // Language is required
    },
    numPage: {
        type: Number,
        required: true, // Number of pages is required
        min: 1, // Minimum number of pages is 1
    },
    authors: {
        type: [Number],
        default: [], // Default value for authors is an empty array
    },
    publications: {
        type: [Number],
        default: [], // Default value for publications is an empty array
    },
    category: {
        type: [String],
        default: [], // Default value for category is an empty array
    },
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Book model
const BookModel = mongoose.model("Book", BookSchema);

// Export the Book model
module.exports = BookModel;
