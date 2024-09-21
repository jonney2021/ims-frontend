import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Function to handle login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response was successful
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    // Re-throw the error to be caught in the component
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          "Invalid email or password. Please try again."
      );
    } else if (error.request) {
      throw new Error(
        "No response received from server. Please try again later."
      );
    } else {
      throw new Error(
        `An error occurred. Please try again later. (${error.message})`
      );
    }
  }
};

// Function to handle logout
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/logout`, {
      //   withCredentials: true,
    });

    // Check if the response was successful
    if (response.status === 200) {
      return true;
    } else {
      throw new Error("Unexpected response from server during logout");
    }
  } catch (error) {
    // Re-throw the error to be caught in the component
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error occurred during logout."
      );
    } else if (error.request) {
      throw new Error(
        "No response received from server during logout. Please try again later."
      );
    } else {
      throw new Error(
        `An error occurred during logout. Please try again later. (${error.message})`
      );
    }
  }
};

// Function to handle forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/forgotpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response was successful
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    // Re-throw the error to be caught in the component
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          "Error occurred while processing your request."
      );
    } else if (error.request) {
      throw new Error(
        "No response received from server. Please try again later."
      );
    } else {
      throw new Error(
        `An error occurred. Please try again later. (${error.message})`
      );
    }
  }
};

// Function to handle password reset
export const resetPassword = async (password, confirmPassword, resetToken) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/users/resetpassword/${resetToken}`,
      { password, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response was successful
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    // Re-throw the error to be caught in the component
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          "Error occurred while resetting password."
      );
    } else if (error.request) {
      throw new Error(
        "No response received from server. Please try again later."
      );
    } else {
      throw new Error(
        `An error occurred. Please try again later. (${error.message})`
      );
    }
  }
};

// Function to check login status
export const checkLoginStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/loggedin`, {
      withCredentials: true,
    });

    // console.log("Login status response:", response.data);
    if (response.data && response.data.isLoggedIn) {
      return response.data.user;
    }
    return null;
  } catch (error) {
    console.error("Error checking login status:", error);
    return null;
  }
};

// Function to get user profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      withCredentials: true,
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    // Re-throw the error to be caught in the component
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error occurred while fetching profile."
      );
    } else if (error.request) {
      throw new Error(
        "No response received from server. Please try again later."
      );
    } else {
      throw new Error(
        `An error occurred. Please try again later. (${error.message})`
      );
    }
  }
};
