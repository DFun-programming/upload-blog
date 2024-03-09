// Importing Express module
const express = require('express');

// Importing middleware functions for error handling and authentication
const { isError, isAuth } = require('../middleware/auth');

// Importing controller functions for user-related operations
const { getUser, updateUser, deleteUser } = require('../controllers/user.controller');

// Creating an Express router instance
const router = express.Router();

// Routes for handling different user operations

// Route for retrieving a user by user ID
router.get('/get/:userId', getUser, isError);

// Route for updating a user by user ID
router.put('/update/:userId', isAuth, updateUser, isError);

// Route for deleting a user by user ID
router.delete('/delete/:userId', isAuth, deleteUser, isError);

// Exporting the router
module.exports = router;