// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const postSchema = new mongoose.Schema(
    {
        // Reference to the User model for the author of the post
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User", // Reference to the User model
        },
        // Content of the post
        content: {
          type: String,
          required: true,
        },
        // Title of the post (must be unique)
        title: {
          type: String,
          required: true,
          unique: true,
        },
        // Image URL for the post (default is "hostinger photo")
        image: {
          type: String,
          default: 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png', // Default image URL
        },
        // Category of the post (default is "uncategorized")
        category: {
          type: String,
          default: 'uncategorized',
        },
        // Slug for the post (must be unique)
        slug: {
          type: String,
          required: true,
          unique: true,
        },
        // Array of comment IDs associated with the post
        comments: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment", // Reference to the Comment model
        }]
    },
    // Add timestamps for when the document is created and last modified
    { timestamps: true }
);

// Export the Mongoose model for the post schema, using the name "Post"
module.exports = mongoose.model("Post", postSchema);