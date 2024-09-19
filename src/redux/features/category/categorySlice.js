import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategory,
  fetchCategories,
  fetchCategory,
  deleteCategory,
} from "../../../services/categoryService";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  category: null,
  isLoading: false,
  isError: false,
  message: "",
};

// Create a new category
export const createCategoryAsync = createAsyncThunk(
  "category/createCategory",
  async (categoryData, thunkAPI) => {
    try {
      const category = await createCategory(categoryData);
      return category;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get all categories
export const getCategoriesAsync = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      const categories = await fetchCategories();
      return categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get a single category by ID
export const getCategoryByIdAsync = createAsyncThunk(
  "category/getCategoryById",
  async (id, thunkAPI) => {
    try {
      const category = await fetchCategory(id);
      return category;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a category
export const deleteCategoryAsync = createAsyncThunk(
  "category/deleteCategory",
  async (id, thunkAPI) => {
    try {
      await deleteCategory(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
        toast.success("Category created successfully");
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCategoriesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategoriesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCategoryByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// Selectors
export const selectAllCategories = (state) => state.category.categories;
export const selectIsLoading = (state) => state.category.isLoading;
export const selectCurrentCategory = (state) => state.category.category;

export default categorySlice.reducer;
