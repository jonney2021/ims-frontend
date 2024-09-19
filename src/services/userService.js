import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/register`,
      userData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to register user");
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

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch users");
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

// Get user by username
export const getUserByName = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch user");
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

// Update user
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/users/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to update user");
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

// Delete user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/users/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to delete user");
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
