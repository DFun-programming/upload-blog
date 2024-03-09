// Importing necessary functions and modules
import { postEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

// Destructuring postEndpoints object for easier access
const { CREATE_POST_API, GET_POST_API, DELETE_POST_API, UPDATE_POST_API } =
  postEndpoints;

// Function to create a new post
export async function createPost(formData, token) {
  // Display loading toast
  const toastId = toast.loading("loading..");
  try {
    // Making POST request to create a post
    const response = await apiConnector("POST", CREATE_POST_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    // Logging response
    console.log("CREATE_POST_API RESPONSE............", response);
    // If post creation is not successful
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // Display success toast
    toast.success("Post created Successfully");
    // Dismiss loading toast
    toast.dismiss(toastId);
    // Return response data
    return response.data;
  } catch (e) {
    // Catch and handle errors
    console.log(e);
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
    return e.response.data;
  }
}
// Function to retrieve posts by user ID
export async function getPostByUserId(userId, startIndex) {
  // Display loading toast
  const toastId = toast.loading("loading..");
  try {
    // Making GET request to retrieve posts by user ID
    const response = await apiConnector(
      "GET",
      startIndex === 0
        ? `${GET_POST_API}?user=${userId}`
        : `${GET_POST_API}?user=${userId}&&startIndex=${startIndex}`
    );
    // Logging response
    console.log("GET_POST_DETAILS API RESPONSE............", response);
    // If retrieval is not successful
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // Dismiss loading toast
    toast.dismiss(toastId);
    // Return response data
    return response.data;
  } catch (e) {
    // Catch and handle errors
    console.log(e);
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
    return e.response.data;
  }
}
// Function to delete a post by ID
export async function deletePostById(postId, userId, token) {
  // Display loading toast
  const toastId = toast.loading();

  try {
    // Sending DELETE request to delete the post
    const response = await apiConnector(
      "DELETE",
      `${DELETE_POST_API}/${postId}/${userId}`,
      null, // No request body needed for DELETE method
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // Logging response
    console.log("DELETE_POST_API RESPONSE............", response);

    // If deletion is not successful, throw an error
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // Dismiss loading toast and display success message
    toast.dismiss(toastId);
    toast.success("Post Deleted Successfully");

    // Return the response data
    return response.data;
  } catch (e) {
    // Catch and handle errors
    console.log(e);
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
    return e.response.data;
  }
}

// Function to update a post by ID
export async function updatePostById(post, userId, token) {
  // Display loading toast
  const toastId = toast.loading();
  try {
    // Sending PUT request to update the post
    const response = await apiConnector(
      "PUT",
      `${UPDATE_POST_API}/${post._id}/${userId}`,
      post, // Request body containing updated post data
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // Logging response
    console.log("UPDATE_POST_API RESPONSE............", response);

    // If update is not successful, throw an error
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // Dismiss loading toast and display success message
    toast.dismiss(toastId);
    toast.success("Post has been updated Successfully");

    // Return the response data
    return response.data;
  } catch (e) {
    // Catch and handle errors
    console.log(e);
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
    return e.response.data;
  }
}
// Function to retrieve a post by post slug
export async function getPostByPostSlug(postSlug) {
  // Display loading toast
  const toastId = toast.loading("loading...");
  try {
    // Sending GET request to retrieve post by post slug
    const response = await apiConnector(
      "GET",
      `${GET_POST_API}?slug=${postSlug}`
    );
    // Logging response
    console.log("GET_POST_DETAILS API RESPONSE............", response);

    // If retrieval is not successful, throw an error
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // Dismiss loading toast and return the response data
    toast.dismiss(toastId);
    return response.data;
  } catch (e) {
    // Catch and handle errors
    toast.dismiss(toastId);
    console.log(e);
    toast.error(e.response.data.message || "Something went Wrong");
    return e.response.data;
  }
}
// Function to retrieve posts with a limit
export async function getPostByLimit(startIndex, limit) {
  try {
    // Sending GET request to retrieve posts with a limit
    const response = await apiConnector(
      "GET",
      // Constructing API endpoint based on startIndex and limit
      startIndex === 0
        ? `${GET_POST_API}?limit=${limit}`
        : `${GET_POST_API}?startIndex=${startIndex}&&limit=${limit}`
    );
    // Logging response
    console.log("GET_POST_DETAILS API RESPONSE............", response);

    // If retrieval is not successful, throw an error
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // Return the response data
    return response.data;
  } catch (e) {
    // Catch and handle errors
    console.log(e);
    toast.error(e.response.data.message || "Something went Wrong");
    return e.response.data;
  }
}

// Function to retrieve posts by search parameters
export async function getPostBySearchParam(searchQuery) {
  // Display loading toast
  const toastId = toast.loading("loading...");

  try {
    // Sending GET request to retrieve posts by search parameters
    const response = await apiConnector(
      "GET",
      `${GET_POST_API}?${searchQuery}`
    );
    // Logging response
    console.log("GET_POST_DETAILS API RESPONSE............", response);

    // If retrieval is not successful, throw an error
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // Dismiss loading toast and return the response data
    toast.dismiss(toastId);
    return response.data;
  } catch (e) {
    // Catch and handle errors
    console.log(e);
    toast.dismiss(toastId);
    toast.error(e.response.data.message || "Something went Wrong");
    return e.response.data;
  }
}

// Function to retrieve posts by post ID
export async function getPostById(postId) {
  // Display loading toast
  const toastId = toast.loading("loading..");
  try {
    // Making GET request to retrieve posts by user ID
    const response = await apiConnector(
      "GET",
      `${GET_POST_API}?postId=${postId}`
    );
    // Logging response
    console.log("GET_POST_DETAILS_BY_ID API RESPONSE............", response);
    // If retrieval is not successful
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // Dismiss loading toast
    toast.dismiss(toastId);
    // Return response data
    return response.data;
  } catch (e) {
    // Catch and handle errors
    console.log(e);
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
    return e.response.data;
  }
}
