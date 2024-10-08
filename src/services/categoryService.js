import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/categories`,
      categoryData
    );

    if (response.status === 201 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to create category"
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

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/categories`);

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to fetch categories"
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

// Fetch a single category
export const fetchCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/categories/${categoryId}`
    );

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to fetch category"
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

// Update a category
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/categories/${categoryId}`,
      categoryData
    );

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to update category"
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

// Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/categories/${categoryId}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error(
          "Cannot delete category with existing items. Please remove or reassign items first."
        );
      }
      throw new Error(
        error.response.data.message || "Failed to delete category"
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
