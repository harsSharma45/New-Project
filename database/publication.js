const mongoose = require('mongoose');

// Define the schema for publications
const PublicationSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,   // Ensure id is provided
        unique: true      // Ensure id is unique
    },
    name: {
        type: String,
        required: true,   // Ensure name is provided
    },
    books: {
        type: [String],    // Array of strings to hold book ISBNs
        default: [],       // Default to an empty array if no books are provided
    }
});

// Create a publication model
const PublicationModel = mongoose.model("Publication", PublicationSchema);

// Export the model
module.exports = PublicationModel;
