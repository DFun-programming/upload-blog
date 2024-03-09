// Import the Mongoose library
const mongoose = require("mongoose");

// Define the comment schema using the Mongoose Schema constructor
const commentSchema = new mongoose.Schema(
  {
    // Content of the comment
    content: {
      type: String,
      required: true,
    },
    // Reference to the Post model for the associated post
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post", // Reference to the Post model
    },
    // Reference to the User model for the user who created the comment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
    // Array of user IDs who liked the comment
    likes: {
      type: Array,
      default: [], // Default value is an empty array
    },
    // Number of likes for the comment
    numberOfLikes: {
      type: Number,
      default: 0, // Default value is 0
    },
  },
  // Add timestamps for when the document is created and last modified
  { timestamps: true }
);

// Export the Mongoose model for the comment schema, using the name "Comment"
module.exports = mongoose.model('Comment', commentSchema);
