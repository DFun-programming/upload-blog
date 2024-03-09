// Import required modules
const User = require("../models/User");
const { errorHandler } = require("../utils/error");
const bcrypt = require("bcrypt");

// Function to get user details
exports.getUser = async (req, res, next) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.userId);
    if (!user) {
      // If user not found, return error
      return next(errorHandler(404, 'User not found'));
    }
    // Hide password and set role
    user.password = undefined;
    user.role = 'user';
    // Send response with user details
    res.status(200).json({ user, success: true, message: "user found" });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

// Function to update user details
exports.updateUser = async (req, res, next) => {
  // Destructure fields from the request body
  let { password, firstName, lastName, username, image, email } = req.body;
  // Check if the logged-in user is the owner of the user profile
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  // Validate password
  if (password) {
    if (password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    // Hash the password
    password = await bcrypt.hash(password, 10);
  }
  // Validate email
  if (email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return next(errorHandler(400, 'Enter a valid email'));
    }
  }
  // Validate username
  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
    }
    if (username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, 'Username can only contain letters and numbers'));
    }
  }
  try {
    // Update the user details
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: username,
          email: email,
          image: image,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      },
      { new: true }
    );
    // Hide password
    updatedUser.password = undefined;
    // Send response with updated user details
    res.status(200).json({ user: updatedUser, success: true, message: "User updated successfully" });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

// Function to delete a user
exports.deleteUser = async (req, res, next) => {
  // Check if the logged-in user is the owner of the user profile
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    // Delete the user
    await User.findByIdAndDelete(req.params.userId);
    // Send success message
    res.status(200).json({ message: 'User has been deleted', success: true });
  } catch (error) {
    // Handle errors
    next(error);
  }
};
