// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
  {
    // Username of the user (must be unique)
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Username must be unique
    },
    // First name of the user
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    // Last name of the user
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    // Email of the user (must be unique)
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Email must be unique
    },
    // Password of the user
    password: {
      type: String,
      required: true,
    },
    // Image URL for the user profile picture
    image: {
      type: String,
    },
  },
  // Add timestamps for when the document is created and last modified
  { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "User"
module.exports = mongoose.model("User", userSchema);
