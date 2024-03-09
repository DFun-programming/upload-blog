// Define the base URL for the API
const BASE_URL = "http://localhost:8000/api/v1";

// Define authentication endpoints
export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",          // Endpoint for user signup
  LOGIN_API: BASE_URL + "/auth/login",            // Endpoint for user login
  LOGIN_GOOGLE_API: BASE_URL + "/auth/google",    // Endpoint for Google OAuth login
};

// Define user-related endpoints
export const userEndpoints = {
  GET_USER_API: BASE_URL + "/user/get",           // Endpoint to get user details
  UPDATE_USER_API: BASE_URL + "/user/update",     // Endpoint to update user details
  DELETE_USER_API: BASE_URL + "/user/delete",     // Endpoint to delete user account
};

// Define post-related endpoints
export const postEndpoints = {
  CREATE_POST_API: BASE_URL + "/post/create",     // Endpoint to create a new post
  GET_POST_API: BASE_URL + "/post/getposts",      // Endpoint to get posts
  DELETE_POST_API: BASE_URL + "/post/delete",     // Endpoint to delete a post
  UPDATE_POST_API: BASE_URL + "/post/update",     // Endpoint to update a post
};

// Define comment-related endpoints
export const commentEndpoints = {
  CREATE_COMMENT_API: BASE_URL + "/comment/create",   // Endpoint to create a new comment
  LIKE_COMMENT_API: BASE_URL + "/comment/like",       // Endpoint to like a comment
  EDIT_COMMENT_API: BASE_URL + "/comment/edit",       // Endpoint to edit a comment
  DELETE_COMMENT_API: BASE_URL + "/comment/delete",   // Endpoint to delete a comment
  GET_COMMENT_API: BASE_URL + "/comment/get",         // Endpoint to get comments
};