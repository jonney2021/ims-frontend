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
        // withCredentials: true,
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
