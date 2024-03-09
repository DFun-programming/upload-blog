// Importing Express module
const express = require('express');
// Importing controller functions for post-related operations
const { createPost, getposts, deletepost, updatepost } = require('../controllers/post.controller');

// Importing middleware functions for authentication and error handling
const { isAuth, isError } = require('../middleware/auth');

// Creating an Express router instance
const router = express.Router();

// Routes for handling different post operations

// Route for creating a new post
router.post('/create', isAuth, createPost, isError);

// Route for retrieving all posts
router.get('/getposts', getposts, isError);

// Route for deleting a post by its ID and user ID
router.delete('/delete/:postId/:userId', isAuth, deletepost, isError);

// Route for updating a post by its ID and user ID
router.put('/update/:postId/:userId', isAuth, updatepost, isError);

// Exporting the router
module.exports = router;