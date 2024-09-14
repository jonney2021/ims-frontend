import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a new item
export const createItem = async (itemData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/items`, itemData);

    if (response.status === 201 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to create product"
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

// Get all items
export const getItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/items`);

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch items");
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

// Delete an item
export const deleteItem = async (itemId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/items/${itemId}`);

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to delete item");
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
