// Import necessary libraries
import toast from "react-hot-toast";
import { userEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

// Destructure endpoint URLs
const { GET_USER_API, DELETE_USER_API, UPDATE_USER_API } = userEndpoints;

// Function to get user details by user ID
export const getUserByUserId = async (userId) => {
  // Display loading toast
  const toastId = toast.loading();

  try {
    // Make API request to get user details
    const response = await apiConnector("GET", `${GET_USER_API}/${userId}`);
    console.log("GET_USER API RESPONSE............", response);
    if (!response.data.success) {
      // If unsuccessful response, throw error
      throw new Error(response.data.message);
    }
     // Dismiss loading toast
     toast.dismiss(toastId);
     // If successful response,  return data 
      return response.data;
  } catch (e) {
    // If error occurs, handle and display error message
    console.log(e);
    // Dismiss loading toast
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

// Function to update user details by user ID
export const updateUserByUserId = async (userId, formData, token) => {
  // Display loading toast
  const toastId = toast.loading();
  try {
    // Make API request to update user details
    const response = await apiConnector("PUT", `${UPDATE_USER_API}/${userId}`, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_USER API RESPONSE............", response);
    if (!response.data.success) {
      // If unsuccessful response, throw error
      throw new Error(response.data.message);
    }
     // Dismiss loading toast
  toast.dismiss(toastId);
    // If successful response, display success message and store data
    toast.success(response.data.message);
    return response.data;
  } catch (e) {
    // If error occurs, handle and display error message
    console.log(e);
     // Dismiss loading toast
  toast.dismiss(toastId);
    toast.error(e.response.data.message);
    return  e.response.data;
  }
 
};

// Function to delete user by user ID
export const deleteUserByUserId = async (userId, token) => {
  // Display loading toast
  const toastId = toast.loading();
  try {
    // Make API request to delete user
    const response = await apiConnector("DELETE", `${DELETE_USER_API}/${userId}`, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_USER API RESPONSE............", response);
    if (!response.data.success) {
      // If unsuccessful response, throw error
      throw new Error(response.data.message);
    }
    // Dismiss loading toast
    toast.dismiss(toastId);
    // If successful response, display success message and store data
    toast.success(response.data.message);
    return response.data;
  } catch (e) {
    // If error occurs, handle and display error message
    console.log(e);
    // Dismiss loading toast
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
    return e.response.data;
  }
  
};
