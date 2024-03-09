import { setLoading, setToken, setUser } from "../../slices/userSlice"
import { endpoints } from "../api"
import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"

// Import required endpoints
const {
  SIGNUP_API,
  LOGIN_API,
  LOGIN_GOOGLE_API
} = endpoints;

// Function to sign up a user
export function signUp(
  username,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  navigate
) {
  return async (dispatch) => {
    // Show loading toast
    const toastId = toast.loading("Loading...");
    let message = "";
    dispatch(setLoading(true));
    try {
      // Call the signup API endpoint
      const response = await apiConnector("POST", SIGNUP_API, {
        username,
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });

      console.log("SIGNUP API RESPONSE............", response.data.message);

      // Get the message from the response
    
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // Show success toast
      toast.success(response.data.message);
      // Navigate to the signin page
      navigate('/signin');
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      // Show error toast
      toast.error(error.response.data.message);
      // Navigate to the signup page
      navigate("/signup");
    }
    // Hide loading toast and setLoading to false
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// Function to log in a user
export function login(email, password, navigate) {
  return async (dispatch) => {
    // Show loading toast
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      // Call the login API endpoint
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Show success toast
      toast.success("Login Successful");
      // Dispatch setToken action
      dispatch(setToken(response.data.token));
      // Get user image or generate initials image
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      // Dispatch setUser action
      dispatch(setUser({ ...response.data.user, image: userImage }));
      // Store token in localStorage
      localStorage.setItem("token", JSON.stringify(response.data.token));
      // Navigate to the dashboard's profile tab
      navigate("/dashboard?tab=profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      // Show error toast
      toast.error(error.response.data.message || "Login Failed");
    }
    // Hide loading toast and setLoading to false
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// Function to log in a user using Google OAuth
export function loginWithGoogle({ email, password, firstName, lastName, googlePhotoUrl }, navigate) {
  return async (dispatch) => {
    // Show loading toast
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      // Call the Google login API endpoint
      const response = await apiConnector("POST", LOGIN_GOOGLE_API, {
        email, password, firstName, lastName, googlePhotoUrl
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Show success toast
      toast.success("Login Successful");
      // Dispatch setToken action
      dispatch(setToken(response.data.token));
      // Get user image or generate initials image
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      // Dispatch setUser action
      dispatch(setUser({ ...response.data.user, image: userImage }));
      // Store token in localStorage
      localStorage.setItem("token", JSON.stringify(response.data.token));
      // Navigate to the dashboard's profile tab
      navigate("/dashboard?tab=profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      // Show error toast
      toast.error(error.message || "Login Failed");
    }
    // Hide loading toast and setLoading to false
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}