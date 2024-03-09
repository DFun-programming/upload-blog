const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { errorHandler } = require("../utils/error");

// Controller to create a new comment
exports.createComment = async (req, res, next) => {
  try {
    // Extract content, postId, and userId from the request body
    const { content, postId, userId } = req.body;

    // Check if the user making the request matches the userId provided
    if (userId !== req.user.id) {
      // If not, return a 403 error indicating that the user is not allowed to create this comment
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    // Create a new comment object with the provided content, postId, and userId
    const newComment = new Comment({
      content,
      post: postId,
      user: userId,
    });

    // Save the new comment to the database
    await newComment.save();

    // Find the corresponding post and push the new comment into its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: newComment._id,
        },
      },
      { new: true }
    );

    // Log the updated post to the console
    console.log(updatedPost);

    // Respond with a success message and the details of the new comment and updated post
    res
      .status(200)
      .json({
        newComment,
        updatedPost,
        success: true,
        message: "successfully commented",
      });
  } catch (error) {
    // If an error occurs during the process, pass it to the error handling middleware
    next(error);
  }
};

// Controller to retrieve comments for a specific post
exports.getPostComments = async (req, res, next) => {
  try {
    // Find all comments associated with the specified post ID and sort them by creation date in descending order
    const comments = await Comment.find({ post: req.params.postId }).sort({
      createdAt: -1,
    });

    // Respond with the retrieved comments
    res.status(200).json({ comments, success: true });
  } catch (error) {
    // If an error occurs during the process, pass it to the error handling middleware
    next(error);
  }
};

// Controller to like or dislike a comment
exports.likeComment = async (req, res, next) => {
  try {
    // Find the comment by its ID
    const comment = await Comment.findById(req.params.commentId);

    // If the comment doesn't exist, return a 404 error
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    // Check if the user has already liked the comment
    const userIndex = comment.likes.indexOf(req.user.id);
    let message = "";

    // If the user hasn't liked the comment yet, increment the number of likes and add the user's ID to the likes array
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
      message = "comment liked";
    } else {
      // If the user has already liked the comment, decrement the number of likes and remove the user's ID from the likes array
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
      message = "comment disliked";
    }

    // Save the updated comment to the database
    await comment.save();

    // Respond with the updated comment and a success message
    res.status(200).json({ comment, success: true, message });
  } catch (error) {
    // If an error occurs during the process, pass it to the error handling middleware
    next(error);
  }
};
// This controller is responsible for editing comments
exports.editComment = async (req, res, next) => {
  try {
    // Find the comment in the database by its ID
    const comment = await Comment.findById(req.params.commentId);
    // If the comment doesn't exist, return a 404 error
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    
    // Check if the user making the request is the owner of the comment
    if (comment.user != req.user.id) {
      // If not, return a 403 error indicating that the user is not allowed to edit the comment
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    // Log the comment ID and the new content to be updated
    console.log(req.params.commentId);
    console.log(req.body.content);
    
    // Update the comment in the database with the new content
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true } // Return the updated comment after the update operation
    );
    
    // Respond with a success message and the updated comment
    res
      .status(201)
      .json({ editedComment, success: true, message: "successfully edited" });
  } catch (error) {
    // If an error occurs during the process, pass it to the error handling middleware
    next(error);
  }
};

//delete Comment controller
exports.deleteComment = async (req, res, next) => {
  try {
    //find the comment
    const comment = await Comment.findById(req.params.commentId);
    //if comment does not exist in the database
    if (!comment) {
      //pass the error to the isError middleware to handle
      return next(errorHandler(404, "Comment not found"));
    }
    //Allow users to delete their own comments only
    if (comment.user != req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    //delete the specified Comment
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    //find the post and delete the comment
    const updatedPost = await Post.findByIdAndUpdate(
      deletedComment.post,
      {
        $pull: {
          comments: deletedComment._id,
        },
      },
      { new: true }
    );
    //if everything goes well send the updated post
    return res
      .status(200)
      .json({
        updatedPost,
        success: true,
        message: "Comment has been deleted",
      });
  } catch (error) {
    next(error);
  }
};
