import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategory,
  fetchCategories,
  fetchCategory,
} from "../../../services/categoryService";

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
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
      });
  },
});

export default categorySlice.reducer;
// export const {} = categorySlice.actions;
