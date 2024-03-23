// Import required modules
const { errorHandler } = require("../utils/error");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Function to create a new post
exports.createPost = async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  // Check if all required fields are provided
  if (!req.body.title || !req.body.content ) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  // Check if image is uploaded
  if (!req.body.image) {
    return next(errorHandler(400, 'Please Upload the image first'));
  }
  // Check if post with the same title already exists
  const existedPostWithTitle = await Post.findOne({title:req.body.title});
  if(existedPostWithTitle){
    return next(errorHandler(400, 'Post with same title already exist. please change the title'));
  }
  // Generate slug from the title
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,
    slug,
    user: req.user.id,
  });
  try {
    // Save the new post
    const savedPost = await newPost.save();
    res.status(201).json({savedPost, success:true, message:"Blog has been created successfully"});
  } catch (error) {
    next(error);
  }
};

// Function to get posts
exports.getposts = async (req, res, next) => {
  try {
    // Parse query parameters
    //from the index post will be fetched
    const startIndex = parseInt(req.query.startIndex) || 0;
    //a certain amount of posts will be fetched (pagination) (default: 9)
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    // Query posts based on provided filters and search term
    const posts = await Post.find({
      ...(req.query.user && { user: req.query.user }),
      ...(req.query.category && req.query.category !== 'uncategorized' && { category: req.query.category }),//check if category === uncategorized then send posts from every category
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } }, //to check title or content of a post for the search term
          { content: { $regex: req.query.searchTerm, $options: 'i' } }, //chck if any post exits for which searchterm/ searched word match with it's title or content  
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    // Get total number of posts
    const totalPosts = await Post.countDocuments();
    // Get number of posts from last month
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthPosts = await Post.countDocuments({ createdAt: { $gte: oneMonthAgo } });
    // Send response
    res.status(200).json({ posts, totalPosts, lastMonthPosts, success:true });
  } catch (error) {
    next(error);
  }
};

// Function to delete a post
exports.deletepost = async (req, res, next) => {
  // Check if the logged-in user is the owner of the post
  if ( req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    // Delete the post
    await Post.findByIdAndDelete(req.params.postId);
    // Delete associated comments
    await Comment.deleteMany({ post: req.params.postId });
    res.status(200).json({ message:'The post has been deleted', success:true });
  } catch (error) {
    next(error);
  }
};

// Function to update a post
exports.updatepost = async (req, res, next) => {
  // Check if the logged-in user is the owner of the post
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json({ updatedPost, message:"Post has been updated successfully", success:true });
  } catch (error) {
    next(error);
  }
};