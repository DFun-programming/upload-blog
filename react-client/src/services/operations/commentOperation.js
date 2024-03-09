// Importing necessary functions and modules
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { commentEndpoints } from "../api";

// Destructuring commentEndpoints object for easier access
const {
  CREATE_COMMENT_API,
  LIKE_COMMENT_API,
  EDIT_COMMENT_API,
  DELETE_COMMENT_API,
  GET_COMMENT_API,
} = commentEndpoints;

// Function to handle errors in comment-related operations
const commentErrorHandle = (e, toastId) => {
  console.log(e);
  // Dismiss the loading toast if it exists
  if (toastId) {
    toast.dismiss(toastId);
  }
  // Display error message using toast
  toast.error(e.response.data.message);
};

// Function to create a new comment
export async function createComment(commentData, token) {
  try {
    // Making POST request to create a comment
    const response = await apiConnector(
      "POST",
      CREATE_COMMENT_API,
      commentData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // Logging response
    console.log("CREATE_COMMENT_DETAILS API RESPONSE............", response);

    // If comment creation is successful
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // Display success message using toast
    toast.success("Comment posted");
    return response.data;
  } catch (e) {
    // If an error occurs, handle it
    commentErrorHandle(e);
    return e.response.data;
  }
}

// Function to like a comment by its ID
export async function likeComment(commentId, token) {
  try {
    // Making POST request to like a comment
    const response = await apiConnector(
      "POST",
      `${LIKE_COMMENT_API}/${commentId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // Logging response
    console.log("LIKE_COMMENT_DETAILS API RESPONSE............", response);

    // If liking the comment is successful
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // Display success message using toast
    toast.success(response.data.message);
    return response.data;
  } catch (e) {
    // If an error occurs, handle it
    commentErrorHandle(e);
    return e.response.data;
  }
}

// Function to delete a comment by its ID
export async function deleteComment(commentId, token) {
  try {
    // Making DELETE request to delete a comment
    const response = await apiConnector(
      "DELETE",
      `${DELETE_COMMENT_API}/${commentId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // Logging response
    console.log("DELETE_COMMENT_DETAILS API RESPONSE............", response);

    // If deletion is successful
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // Display success message using toast
    toast.success(response.data.message);
    return response.data;
  } catch (e) {
    // If an error occurs, handle it
    commentErrorHandle(e);
    return e.response.data;
  }
}

// Function to edit a comment by its ID
export async function editComment(commentId, content, token) {
  try {
    // Making PUT request to edit the comment
    const response = await apiConnector(
      "PUT",
      `${EDIT_COMMENT_API}/${commentId}`,
      { content }, // Request body containing updated content
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // Logging response
    console.log("EDIT_COMMENT_DETAILS API RESPONSE............", response);

    // If edit is not successful, throw an error
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // Display success message using toast
    toast.success(response.data.message);
    return response.data;
  } catch (e) {
    // If an error occurs, handle it
    commentErrorHandle(e);
    return e.response.data;
  }
}

// Function to retrieve comments for a post by its ID
export async function getComment(postId) {
  try {
    // Sending GET request to retrieve comments for a post
    const response = await apiConnector("GET", `${GET_COMMENT_API}/${postId}`);
    // Logging response
    console.log("GET_COMMENT_DETAILS API RESPONSE............", response);

    // If retrieval is not successful, throw an error
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // Return the response data
    return response.data;
  } catch (e) {
    // If an error occurs, handle it
    commentErrorHandle(e);
    return e.response.data;
  }
}