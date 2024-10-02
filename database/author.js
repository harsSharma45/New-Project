const mongoose = require('mongoose');

// Define Author Schema
const AuthorSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true, // Ensure that each author has a unique ID
    },
    name: {
        type: String,
        required: true, // Author name is required
        trim: true, // Trim whitespace
    },
    books: {
        type: [String],
        default: [], // Default value for books is an empty array
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Author model
const AuthorModel = mongoose.model("Author", AuthorSchema);

// Export the Author model
module.exports = AuthorModel;
